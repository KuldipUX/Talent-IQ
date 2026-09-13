import { clerkClient, requireAuth } from '@clerk/express';
import User from '../models/User.js';
import { upsertStreamUser } from '../lib/stream.js';

export const protectRoute = [
    requireAuth(),
    async (req,res,next) => {
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({msg:"Unauthorized - invalid token"})
          //find user in db by clerk ID
        let user = await User.findOne({ clerkId });
        if (!user) {
          const clerkUser = await clerkClient.users.getUser(clerkId);
          const email = clerkUser.emailAddresses[0]?.emailAddress;
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
          await upsertStreamUser({
            id: clerkId,
            name: user.name,
            image: user.profileImage,
          });
        }
          //attach user to req
            req.user= user;
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware",error);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
]