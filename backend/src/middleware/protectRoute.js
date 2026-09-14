import { clerkClient, getAuth } from '@clerk/express';
import User from '../models/User.js';
import { upsertStreamUser } from '../lib/stream.js';

export const protectRoute = [
    async (req, res, next) => {
        try {
            let clerkId = null;

            if (typeof req.auth === "function") {
                clerkId = req.auth()?.userId;
            } else if (req.auth && typeof req.auth === "object") {
                clerkId = req.auth.userId;
            }

            if (!clerkId) {
                try {
                    const auth = getAuth(req);
                    clerkId = auth?.userId;
                } catch {
                    // getAuth throws if auth object is not on req
                }
            }

            if (!clerkId) {
                return res.status(401).json({ message: "Unauthorized - authentication required" });
            }

            // Find user in db by clerk ID
            let user = await User.findOne({ clerkId });
            if (!user) {
                const clerkUser = await clerkClient.users.getUser(clerkId);
                const email = clerkUser.emailAddresses?.[0]?.emailAddress || `${clerkId}@clerk.local`;
                const name = [clerkUser.firstName, clerkUser.lastName]
                    .filter(Boolean)
                    .join(" ") || email || clerkId;

                user = await User.findOneAndUpdate(
                    { email },
                    {
                        clerkId,
                        email,
                        name,
                        profileImage: clerkUser.imageUrl || "",
                    },
                    { new: true, upsert: true, runValidators: true }
                );

                try {
                    await upsertStreamUser({
                        id: clerkId,
                        name: user.name,
                        image: user.profileImage,
                    });
                } catch (streamError) {
                    console.error("Non-fatal: Stream user upsert failed:", streamError?.message || streamError);
                }
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
];