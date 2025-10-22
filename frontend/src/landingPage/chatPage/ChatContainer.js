import React from 'react';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CallButton from "../../components/CallButton";
function ChatContainer({ chatClient, channel, handleVideoCall }) {
  return (
    <div className="d-flex flex-column" style={{ height: "93vh", width: "100%" }}>
      <Chat client={chatClient} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <div className="position-relative w-100">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default ChatContainer;
