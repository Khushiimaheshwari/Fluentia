import React from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../../lib/api";
import Hero from './Hero';

function Notification() {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <>
      <>
        <Hero
          isLoading={isLoading}
          incomingRequests={incomingRequests}
          acceptedRequests={acceptedRequests}
          acceptRequestMutation={acceptRequestMutation}
          isPending={isPending}
        />
      </>
    </>
  )
}

export default Notification;
