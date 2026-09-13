import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/session.js";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;
    let isMounted = true;

    const initCall = async () => {
      if (!session?.callId) return;
      if (!isHost && !isParticipant) return;
      if (session.status !== "active") return;

      try {
        console.debug("[stream] initializing call", {
          callId: session.callId,
          status: session.status,
          isHost,
          isParticipant,
          user: isHost ? "host" : isParticipant ? "participant" : "unknown",
        });

        const { token, chatToken, userId, userName, userImage } = await sessionApi.getStreamToken();

        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!isMounted) {
          await disconnectStreamClient();
          return;
        }

        setStreamClient(client);

        videoCall = client.call("default", session.callId);
        console.debug("[stream] joining call", { callId: session.callId });
        await videoCall.join({ create: true });
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          chatToken
        );
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel("messaging", session.callId);
        await chatChannel.watch();
        setChannel(chatChannel);

        console.debug("[stream] call + chat joined", {
          callId: session.callId,
          channelId: session.callId,
        });
      } catch (error) {
        console.error("[stream] failed to initialize call", {
          callId: session?.callId,
          status: session?.status,
          error,
        });
        toast.error("Failed to join video call");
      } finally {
        if (isMounted) {
          setIsInitializingCall(false);
        }
      }
    };

    if (session && !loadingSession) initCall();

    return () => {
      isMounted = false;
      (async () => {
        try {
          console.debug("[stream] effect cleanup", {
            callId: session?.callId,
            status: session?.status,
          });
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("[stream] cleanup error:", error);
        }
      })();
    };
  }, [session?._id, session?.callId, session?.status, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;