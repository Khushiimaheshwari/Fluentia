import { NavLink, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import React from "react";
import { FaHome, FaUserFriends, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sidebar">

      <div className="sidebar-header">
        <NavLink to="/home" className="text-decoration-none d-flex align-items-center justify-content-center gap-2">
          <img
            src="/media/logo.png"
            alt="Fluentia Logo"
            style={{ width: "45px", height: "45px", objectFit: "contain" }}
          />
          <span>Fluentia</span>
        </NavLink>
      </div>

      <nav className="flex-grow-1">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="/friends"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaUserFriends /> Friends
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaBell /> Notifications
        </NavLink>
      </nav>

      <div className="sidebar-user">
        <img
          src={authUser?.profilePic || "/media/fallback-avatar.png"}
          alt="User Avatar"
          className="img-fluid"
        />



        {/* <div
          className="user-info">
          <h6>{authUser?.fullName || "User Name"}</h6>
          <span>Online</span>
        </div> */}
        <Link to="/profile" className="user-info" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h6>{authUser?.fullName || 'User Name'}</h6>
          <span>Online</span>
        </Link>
      </div>
    </aside>
  );
}
export default Sidebar;