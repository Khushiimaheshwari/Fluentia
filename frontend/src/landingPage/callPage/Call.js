import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../../lib/api";

import { StreamVideoClient } from "@stream-io/video-react-sdk";

import toast from "react-hot-toast";
import PageLoader from "../../components/PageLoader";
import CallContainer from "./CallContainer";

const STREAM_API_KEY = process.env.REACT_APP_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  console.log("Client:", client);
  console.log("Call:", call);
  console.log("Is Loading:", isLoading);
  console.log("Is Connecting:", isConnecting);

  if (isLoading || isConnecting) return <PageLoader />;

  return <CallContainer client={client} call={call} />;
};

export default CallPage;
