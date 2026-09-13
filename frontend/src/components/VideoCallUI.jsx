import {
  Channel,
  Chat,
 MessageComposer,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  CheckCheckIcon,
  CircleIcon,
  ExpandIcon,
  HashIcon,
  Minimize2Icon,
  PanelRightCloseIcon,
  Loader2Icon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!channel) return undefined;

    const handleNewMessage = () => {
      if (!isChatOpen) setUnreadCount((count) => count + 1);
    };

    channel.on("message.new", handleNewMessage);
    return () => channel.off("message.new", handleNewMessage);
  }, [channel, isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen((open) => {
      if (!open) {
        setUnreadCount(0);
        setIsChatExpanded(false);
      }
      return !open;
    });
  };

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
          <p className="text-lg">Joining call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-3 relative str-video">
      <div className="flex-1 flex flex-col gap-3">
        {/* Participants count badge and Chat Toggle */}
        <div className="flex items-center justify-between gap-2 bg-base-100 p-3 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              {participantCount} {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>
          {chatClient && channel && (
            <button
              onClick={toggleChat}
              className={`session-chat-toggle btn btn-sm gap-2 ${isChatOpen ? "btn-primary" : "btn-ghost"}`}
              title={isChatOpen ? "Hide chat" : "Show chat"}
            >
              <MessageSquareIcon className="size-4" />
              Chat
              {!isChatOpen && unreadCount > 0 && (
                <span className="badge badge-secondary badge-sm text-[10px]">{unreadCount > 9 ? "9+" : unreadCount}</span>
              )}
            </button>
          )}
        </div>

        <div className="session-video-frame flex-1 bg-base-300 rounded-lg relative">
          <SpeakerLayout />
        </div>

        <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* CHAT SECTION */}

      {chatClient && channel && (
        <div
          className={`session-chat-panel flex flex-col rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
            isChatOpen
              ? isChatExpanded
                ? "session-chat-expanded opacity-100"
                : "session-chat-open opacity-100"
              : "session-chat-closed opacity-0 pointer-events-none"
          }`}
        >
          {isChatOpen && (
            <>
              <div className="session-chat-header">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="session-chat-icon">
                    <HashIcon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white truncate">Interview room</h3>
                      <CircleIcon className="size-2.5 fill-emerald-400 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400 truncate">{participantCount} {participantCount === 1 ? "person" : "people"} in call</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsChatExpanded((expanded) => !expanded)}
                    className="session-chat-close"
                    title={isChatExpanded ? "Reduce chat width" : "Expand chat width"}
                    aria-label={isChatExpanded ? "Reduce chat width" : "Expand chat width"}
                  >
                    {isChatExpanded ? <Minimize2Icon className="size-4" /> : <ExpandIcon className="size-4" />}
                  </button>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="session-chat-close"
                    title="Close chat"
                    aria-label="Close chat"
                  >
                    <PanelRightCloseIcon className="size-4" />
                  </button>
                </div>
              </div>

              <div className="session-chat-context">
                <div className="flex items-center gap-2">
                  <CheckCheckIcon className="size-4 text-cyan-300" />
                  <span>Messages are shared with everyone in this session</span>
                </div>
              </div>

              <div className="flex-1 overflow-hidden session-chat-body stream-chat-dark">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageComposer />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default VideoCallUI;