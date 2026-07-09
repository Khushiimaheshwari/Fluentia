import React, { useEffect, useRef } from 'react';
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import { useTheme } from "../hooks/useTheme";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; //fetching & caching friend requests
import { getFriendRequests } from "../lib/api";

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const { currentTheme, themes, isDropdownOpen, toggleTheme, toggleDropdown, closeDropdown } = useTheme();
    const dropdownRef = useRef(null);//detect clicks outside the dropdown

    const { logoutMutation } = useLogout();
    const { data: friendRequests, isLoading: isLoadingRequests } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
        enabled: !!authUser,
        refetchInterval: 30000,
    });

    const incomingRequests = friendRequests?.incomingReqs || [];
    const notificationCount = incomingRequests.length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDropdown]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
            <div className="container-fluid">

                {isChatPage && (
                    <Link to="/home" className="d-flex align-items-center text-decoration-none">
                        <img
                            src="/media/logo.png"
                            alt="Fluentia Logo"
                            style={{ width: "45px", height: "45px", objectFit: "contain" }}
                        />
                        <span>Fluentia</span>
                    </Link>
                )}

                <div className="d-flex align-items-center ms-auto gap-3">

                    <Link to="/notifications" className="btn btn-light rounded-circle position-relative">
                        <i className="fas fa-bell"></i>
                        {notificationCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: "0.6rem", padding: "0.2rem 0.4rem" }}>
                                {notificationCount}
                                <span className="visually-hidden">unread notifications</span>
                            </span>
                        )}
                    </Link>

                    <div className="position-relative" ref={dropdownRef}>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownOpen}
                        >
                            <i className="fas fa-adjust"></i>
                        </button>

                        {isDropdownOpen && (
                            <div className="theme-dropdown position-absolute end-0 mt-2 bg-white border rounded shadow-lg z-50"
                                style={{ width: '200px', maxHeight: '300px', overflowY: 'auto' }}>
                                <div className="p-2 border-bottom">
                                    <small className="text-muted">Select Theme</small>
                                </div>
                                {themes.map((theme) => (
                                    <button
                                        key={theme.name}
                                        className={`dropdown-item d-flex align-items-center ${currentTheme === theme.name ? 'active' : ''}`}
                                        onClick={() => toggleTheme(theme.name)}
                                        style={{
                                            padding: '8px 12px',
                                            borderLeft: currentTheme === theme.name ? `3px solid ${theme.colors[1]}` : '3px solid transparent'
                                        }}
                                    >
                                        <div
                                            className="me-2"
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                background: `linear-gradient(135deg, ${theme.colors[1]}, ${theme.colors[2]})`
                                            }}
                                        ></div>
                                        <span>{theme.label}</span>
                                        {currentTheme === theme.name && (
                                            <i className="fas fa-check ms-auto text-success"></i>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="d-flex align-items-center">
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                overflow: "hidden"
                            }}
                        >
                            <img
                                src={authUser?.profilePic || "/media/fallback-avatar.png"}
                                alt="User Avatar"
                                className="img-fluid"
                            />
                        </div>    
                    </div>

                    <button className="btn btn-light rounded-circle" onClick={logoutMutation}>
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;



