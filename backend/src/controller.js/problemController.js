import Problem from "../models/Problem.js";

export async function getProblems(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const difficulty = String(req.query.difficulty || "").trim();
    const tag = String(req.query.tag || "").trim();
    const q = String(req.query.q || "").trim();

    const criteria = {};

    if (difficulty) {
      criteria.difficulty = difficulty;
    }

    if (tag) {
      criteria.tags = { $in: [new RegExp(`^${tag}$`, "i")] };
    }

    if (q) {
      criteria.$or = [
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
        { "description.text": { $regex: q, $options: "i" } },
      ];
    }

    const [problems, total] = await Promise.all([
      Problem.find(criteria)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Problem.countDocuments(criteria),
    ]);

    res.status(200).json({
      problems,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in getProblems controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProblemBySlug(req, res) {
  try {
    const { slug } = req.params;

    const problem = await Problem.findOne({ slug }).lean();

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.status(200).json({ problem });
  } catch (error) {
    console.error("Error in getProblemBySlug controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProblemByTitle(req, res) {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Problem title is required" });
    }

    const decodedTitle = decodeURIComponent(title);
    const problem = await Problem.findOne({ title: { $regex: `^${decodedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } }).lean();

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.status(200).json({ problem });
  } catch (error) {
    console.error("Error in getProblemByTitle controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
