import React from "react";

function CallButton({ handleVideoCall }) {
  return (
    <div
      className="p-2 d-flex justify-content-end position-absolute"
      style={{ zIndex: 10, top: '10px', right: '10px' }}
    >
      <button
        onClick={handleVideoCall}
        className="btn btn-primary btn-sm text-white"
      >
        <i className="fa-solid fa-video"></i>
      </button>
    </div>
  );
}

export default CallButton;
