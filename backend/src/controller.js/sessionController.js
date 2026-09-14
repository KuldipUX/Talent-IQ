import Session from "../models/Session.js";
import Problem from "../models/Problem.js";
import crypto from "node:crypto";

const escapeRegex = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24;

async function reconcileSessionLifetime(session) {
  if (!session || session.status !== "active") return session;

  const createdAt = new Date(session.createdAt || session.startedAt || Date.now()).getTime();
  if (Date.now() - createdAt > SESSION_LIFETIME_MS) {
    session.status = "expired";
    session.endedAt = new Date();
    await session.save();
  }

  return session;
}

async function expireStaleSessions() {
  const cutoff = new Date(Date.now() - SESSION_LIFETIME_MS);
  await Session.updateMany(
    { status: "active", createdAt: { $lt: cutoff } },
    { $set: { status: "expired", endedAt: new Date() } }
  );
}

export async function createSession(req, res) {
  let session;
  let videoCall;
  let chatChannel;

  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const normalizedDifficulty = String(difficulty || "").toLowerCase();

    if (!problem || !["easy", "medium", "hard"].includes(normalizedDifficulty)) {
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }

    const problemDocument = await Problem.findOne({
      title: { $regex: `^${escapeRegex(problem)}$`, $options: "i" },
    });
    if (!problemDocument) {
      return res.status(404).json({ message: "Problem not found in question bank" });
    }

    const problemTitle = problemDocument.title || problem;
    const callId = `session_${crypto.randomUUID()}`;

    session = await Session.create({
      problem: problemTitle,
      difficulty: normalizedDifficulty,
      host: userId,
      callId,
    });

    console.info("Session created without Stream provisioning:", {
      sessionId: session._id.toString(),
      callId,
      problem: problemTitle,
      difficulty: normalizedDifficulty,
    });

    return res.status(201).json({ session });
  } catch (error) {
    console.error("Error in createSession controller:", error);

    try {
      if (chatChannel) await chatChannel.delete();
    } catch (cleanupError) {
      console.error("Failed to clean up chat channel:", cleanupError);
    }

    try {
      if (videoCall) await videoCall.delete({ hard: true });
    } catch (cleanupError) {
      console.error("Failed to clean up video call:", cleanupError);
    }

    try {
      if (session) await Session.deleteOne({ _id: session._id });
    } catch (cleanupError) {
      console.error("Failed to clean up session:", cleanupError);
    }

    return res.status(502).json({ message: "Unable to provision the interview session. Please try again." });
  }
}
export async function getActiveSessions(req,res) {
    try {
        await expireStaleSessions();
        const sessions = await Session.find({status:"active"}).populate("host","name profileImage email clerkId")
        .populate("participant","name profileImage email clerkId")
        .sort({createdAt:-1})
        .limit(20);
        res.status(200).json({sessions});
    } catch (error) {
        console.log("Error in getActiveSessions controller:",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getMyRecentSessions(req,res) {
    try {
        const userId = req.user._id;

        await expireStaleSessions();

        const sessions = await Session.find({
            status: { $in: ["completed", "expired", "closed"] },
            $or:[{host:userId},{participant:userId}],
        }).sort({createdAt:-1}).limit(20);

        res.status(200).json({sessions});
    } catch (error) {
        console.log("Error in getMyRecentSessions Controller:",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) return res.status(404).json({ message: "Session not found" });

    await reconcileSessionLifetime(session);

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    await reconcileSessionLifetime(session);

    if (session.status !== "active") {
      return res.status(400).json({ message: `Cannot join a ${session.status} session` });
    }

    if (session.host.toString() === userId.toString()) {
      return res.status(400).json({ message: "Host cannot join their own session as participant" });
    }

    const updatedSession = await Session.findOneAndUpdate(
      { _id: id, status: "active", participant: null },
      { $set: { participant: userId } },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(409).json({ message: "Session is full" });
    }

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json({ session: updatedSession });
  } catch (error) {
    console.log("Error in joinSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    // check if user is the host
    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only the host can end the session" });
    }

    // check if session is already completed
    if (session.status === "completed" || session.status === "expired" || session.status === "closed") {
      return res.status(400).json({ message: `Session is already ${session.status}` });
    }

    // delete stream video call
    const call = videoClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // delete stream chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    session.endedAt = new Date();
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}