import React from 'react';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from "../../lib/api";
import Hero from './Hero';
import { capitalize } from "../../lib/utils";
import FriendCard, { getLanguageFlag } from "../../components/FriendCard";
import NoFriendsFound from "../../components/NoFriendFound";
import useAuthUser from "../../hooks/useAuthUser";

function Home() {
    const queryClient = useQueryClient();
    const [outgoingRequestIds, setOutgoingRequestsIds] = useState(new Set())
    const { authUser } = useAuthUser();

    const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
        retry: (failureCount, error) => {
            // Don't retry on authentication errors
            return error.response?.status !== 401 && failureCount < 2;
        },
    });

    const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
        retry: (failureCount, error) => {
            // Don't retry on authentication errors
            return error.response?.status !== 401 && failureCount < 2;
        },
    })

    const { data: outgoingFriendReqs } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
        retry: (failureCount, error) => {
            // Don't retry on authentication errors
            return error.response?.status !== 401 && failureCount < 2;
        },
    });

    const { mutate: sendRequestMutation, isPending } = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
        },

        onError: (error) => {
            if (error.response?.status === 400) {
                alert("This user has already sent you a friend request. Please check your notifications to accept it.");
            }
        },
    });

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
            outgoingFriendReqs.forEach((req) => {
                outgoingIds.add(req.recipient._id);
            });
            setOutgoingRequestsIds(outgoingIds);
        }
    }, [outgoingFriendReqs]);

    // Reset outgoingRequestIds when user changes (logs out)
    useEffect(() => {
        setOutgoingRequestsIds(new Set());         
    }, [authUser]);

    console.log("Auth user changed, resetting outgoingRequestIds", outgoingRequestIds);

    return (
        <>
            <Hero
                loadingFriends={loadingFriends}
                friends={friends}
                NoFriendsFound={NoFriendsFound}
                FriendCard={FriendCard}
                loadingUsers={loadingUsers}
                recommendedUsers={recommendedUsers}
                outgoingRequestsIds={outgoingRequestIds}
                sendRequestMutation={sendRequestMutation}
                isPending={isPending}
                getLanguageFlag={getLanguageFlag}
                capitialize={capitalize}
            />
        </>
    );
}
export default Home;
