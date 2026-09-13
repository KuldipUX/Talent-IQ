import { chatClient, videoClient } from "../lib/stream.js";

export async function getStreamToken(req,res) {
    try{
        //use clerid for stream  (not mongodb _id)=>it should match the id we have in the stream dashboard
        const videoToken = videoClient.generateUserToken({ user_id: req.user.clerkId })
        const chatToken = chatClient.createToken(req.user.clerkId)

        res.status(200).json({
            token: videoToken,
            videoToken,
            chatToken,
            userId: req.user.clerkId,
            userName:req.user.name,
              userImage: req.user.profileImage
        })
    }catch(error){
         console.log("Error in getStreamToken Controller:",error.message);
           res.status(500).json({message: "Internal Server Error"});
    }
}