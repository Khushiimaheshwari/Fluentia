import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../../lib/api";
import FriendCard from "../../components/FriendCard";
import NoFriendsFound from "../../components/NoFriendFound";

function Friends() {
    const { data: friends = [], isLoading } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    return (
        <div className="p-3 p-sm-4 p-lg-5">
            <h1 className="mb-4 fw-bold" style={{ color: "#000000" }}>Friends</h1>
            {isLoading ? (
                <div className="d-flex justify-content-center py-5">
                    <span>Loading...</span>
                </div>
            ) : friends.length === 0 ? (
                <NoFriendsFound />
            ) : (
                <div className="row g-4">
                    {friends.map((friend) => (
                        <div key={friend._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <FriendCard friend={friend} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Friends;
