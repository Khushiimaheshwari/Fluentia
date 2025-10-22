import "bootstrap/dist/css/bootstrap.min.css";

function ChatLoader() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 p-4">
      <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>

      <p className="mt-3 text-center fs-5 font-monospace">
        Connecting to chat...
      </p>
    </div>
  );
}

export default ChatLoader;
