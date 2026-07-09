import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faUserFriends,
  faMapMarkerAlt,
  faUserPlus,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import NoFriendsFound from "../../components/NoFriendFound";
import FriendCard, { getLanguageFlag } from "../../components/FriendCard";
import { capitalize } from "../../lib/utils";

function Hero({
  loadingFriends,
  friends,
  loadingUsers,
  recommendedUsers,
  outgoingRequestsIds,
  sendRequestMutation,
  isPending,
  getLanguageFlag,
  capitialize,
}) {

  
  return (
    <div className="p-3 p-sm-4 p-lg-5">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
          <h2 className="fs-3 fw-bold mb-0">Your Friends</h2>
          <Link
            to="/notifications"
            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
          >
            <FontAwesomeIcon icon={faUserFriends} />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="d-flex justify-content-center py-5">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="row g-4">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >
                <FriendCard friend={friend} />
              </div>
            ))}
          </div>
        )}

        <section className="mt-4">
          <div className="mb-4">
            <h2 className="fw-bold fs-3">Meet New Learners</h2>
            <p className="text-muted">
              Discover perfect language exchange partners based on your profile
            </p>
          </div>

          {loadingUsers ? (
            <div className="d-flex justify-content-center py-5">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-light text-primary p-4 text-center border-0">
              <h5 className="fw-semibold mb-2">No recommendations available</h5>
              <p className="text-muted">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                console.log(hasRequestBeenSent);

                return (
                  <div className="col-md-4" key={user._id}>
                    <div className="card shadow-sm" style={{
                      background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
                      borderRadius: "16px",
                      boxShadow: "0 8px 25px rgba(0, 86, 179, 0.15)",
                      border: "1px solid rgba(0, 86, 179, 0.1)"
                    }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <img
                            src={user.profilePic || "/media/fallback-avatar.png"}
                            alt={user.fullName}
                            className="rounded-circle me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div>
                            <h5 className="mb-0">{user.fullName}</h5>
                            {user.location && (
                              <div className="text-secondary small mt-1 d-flex align-items-center">
                                <FontAwesomeIcon
                                  icon={faMapMarkerAlt}
                                  className="me-1"
                                />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mb-3 d-flex flex-wrap gap-2">
                          <span className="badge px-2 py-1" style={{
                            backgroundColor: "rgba(0, 86, 179, 0.1)",
                            color: "#0056b3",
                            border: "1px solid rgba(0, 86, 179, 0.2)",
                            borderRadius: "12px",
                            fontWeight: "500"
                          }}>
                            {getLanguageFlag(user.nativeLanguage)}
                            <span className="ms-1">Native: {capitialize(user.nativeLanguage)}</span>
                          </span>
                          <span className="badge px-2 py-1" style={{
                            backgroundColor: "rgba(0, 86, 179, 0.1)",
                            color: "#0056b3",
                            border: "1px solid rgba(0, 86, 179, 0.2)",
                            borderRadius: "12px",
                            fontWeight: "500"
                          }}>
                            {getLanguageFlag(user.learningLanguage)}
                            <span className="ms-1">Learning: {capitialize(user.learningLanguage)}</span>
                          </span>
                        </div>

                        {user.bio && (
                          <p className="small text-secondary mb-3">
                            {user.bio}
                          </p>
                        )}

                        <button
                          className={`btn w-100 fw-semibold ${hasRequestBeenSent
                              ? "btn-outline-secondary"
                              : "btn-primary"
                            }`}
                          onClick={() => {
                            if (!hasRequestBeenSent) {
                              sendRequestMutation(user._id); 
                            }
                          }}
                          disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="me-2"
                              />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faUserPlus}
                                className="me-2"
                              />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Hero;
