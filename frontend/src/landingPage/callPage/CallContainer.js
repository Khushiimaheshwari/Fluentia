import React, { useEffect, useState } from 'react';
import {
  StreamVideo,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const CallContainer = ({ client, call }) => {
  console.log("CallContainer - Client:", client);
  console.log("CallContainer - Call:", call);

  const navigate = useNavigate();
  const [hasLeftCall, setHasLeftCall] = useState(false);

  if (!client || !call) {
    console.log("Client or call not available, showing error message");
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex items-center justify-center h-full">
          <p>Could not initialize call. Please refresh or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <CallStateHandler
            call={call}
            navigate={navigate}
            hasLeftCall={hasLeftCall}
            setHasLeftCall={setHasLeftCall}
          />
          <SpeakerLayout />
          <CallControls />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};


const CallStateHandler = ({ call, navigate, hasLeftCall, setHasLeftCall }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  console.log("Calling State:", callingState);

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      if (!hasLeftCall) {
        console.log("Call ended, navigating to home");
        setHasLeftCall(true);
        navigate("/");
      }
    }
  }, [callingState, navigate, hasLeftCall, setHasLeftCall]);

  return null;
};

export default CallContainer;
