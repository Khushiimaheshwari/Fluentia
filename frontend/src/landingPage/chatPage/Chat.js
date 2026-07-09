import React from 'react';
import ChatContainer from "./ChatContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../../lib/api";


import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../../components/ChatLoader";
import CallButton from "../../components/CallButton";

const STREAM_API_KEY = process.env.REACT_APP_STREAM_API_KEY;
if (!STREAM_API_KEY) {
  console.error("Steam api key is missing. Please chcek your environment variables.");
}

function Chat() {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });


  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser || !STREAM_API_KEY) {
        console.error("Missing required data for chat initialization");
        setLoading(false);
        return;
      }

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);


  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/callPage/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };




  if (loading || !chatClient || !channel) return <ChatLoader />;
  return (
    <ChatContainer
      chatClient={chatClient}
      channel={channel}
      handleVideoCall={handleVideoCall}
    />
  );
};
export default Chat;
