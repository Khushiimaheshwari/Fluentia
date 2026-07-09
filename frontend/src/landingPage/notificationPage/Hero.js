import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faBell,
  faClock,
  faMessage
} from "@fortawesome/free-solid-svg-icons";
function Hero({
  isLoading,
  incomingRequests,
  acceptedRequests,
  acceptRequestMutation,
  isPending
}) {
  return (
    <div className="py-4">
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 className="mb-4 fw-bold " style={{ color: "#000000" }}>Notifications</h1>

        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="mb-5">
                <h2 className="h5 fw-semibold d-flex align-items-center mb-3 text-primary">
                  <FontAwesomeIcon icon={faUserCheck} className="text-primary me-2" />
                  Friend Requests
                  <span className="badge bg-primary ms-2">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="d-flex flex-column gap-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card shadow-sm border-0"
                      style={{ backgroundColor: "#f8faff" }}
                    >
                      <div className="card-body p-3 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              backgroundColor: "#e9f1ff"
                            }}
                          >
                            <img
                              src={request.sender.profilePic || "/media/fallback-avatar.png"}
                              alt={request.sender.fullName}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }}
                            />
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">{request.sender.fullName}</h6>
                            <div className="d-flex flex-wrap gap-2">
                              <span className="badge bg-secondary">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="badge bg-light text-primary border">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedRequests.length > 0 && (
              <section className="mb-5">
                <h2 className="h5 fw-semibold d-flex align-items-center mb-3" style={{ color: "#0056b3" }}>
                  <FontAwesomeIcon icon={faBell} className="me-2" style={{ color: "#0056b3" }} />
                  New Connections
                </h2>

                <div className="d-flex flex-column gap-3">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="card shadow-sm border-0"
                      style={{ backgroundColor: "#f8faff" }}
                    >
                      <div className="card-body p-3 d-flex align-items-start gap-3">
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "#e9f1ff"
                          }}
                        >
                          <img
                            src={notification.recipient.profilePic || "/media/fallback-avatar.png"}
                            alt={notification.recipient.fullName}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">{notification.recipient.fullName}</h6>
                          <p className="text-muted small mb-1">
                            {notification.recipient.fullName} accepted your friend request
                          </p>
                          <p className="text-muted small d-flex align-items-center">
                            <FontAwesomeIcon icon={faClock} className="me-1" />
                            Recently
                          </p>
                        </div>
                        <span className="badge bg-primary d-flex align-items-center">
                          <FontAwesomeIcon icon={faMessage} className="me-1" />
                          New Friend
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="text-center py-5 text-muted">
                <p>No Notifications Found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Hero;