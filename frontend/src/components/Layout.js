import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="d-flex">

      {showSidebar && (
        <div className="sidebar-container">
          <Sidebar />
        </div>
      )}
      
      <div style={{ marginLeft: showSidebar ? "260px" : "0", width: "100%" }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: showSidebar ? "260px" : "0",
            right: 0,
            zIndex: 1000,
          }}
        >
          <Navbar />
        </div>

        <div style={{ marginTop: "70px", padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;



