import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import PageLoader from "./components/PageLoader.js";
import useAuthUser from "./hooks/useAuthUser.js"
import Layout from "./components/Layout.js";
import Login from './landingPage/loginPage/Login';
import Home from './landingPage/homePage/Home';
import Chat from './landingPage/chatPage/Chat';
import Signup from './landingPage/signupPage/Signup';
import Onboard from './landingPage/onboardingPage/Onboard';
import Notification from './landingPage/notificationPage/Notification';
import Call from './landingPage/callPage/Call';
import Friends from './landingPage/friendPage/friends';
import FluentiaHomepage from "./landingPage/indexPage/Hero.js";


const App = () => {
    const { isLoading, authUser } = useAuthUser();
    const isAuthenticated = Boolean(authUser);
    const isOnboarded = authUser?.isOnboarded;

    if (isLoading) return <PageLoader />;

    return (
        <ThemeProvider>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element= {<FluentiaHomepage />}
                    />
                    <Route
                        path="/home"
                        element={
                            isAuthenticated && isOnboarded ? (
                                <Layout showSidebar={true}>
                                    <Home />
                                </Layout>
                            ) : (
                                <Navigate to={!isAuthenticated ? "/loginPage" : "/onboardingPage"} />
                            )
                        }
                    />
                    <Route
                        path="/signupPage"
                        element={
                            !isAuthenticated ? <Signup /> : <Navigate to={isOnboarded ? "/home" : "/onboardingPage"} />
                        }
                    />
                    <Route
                        path="/loginPage"
                        element={
                            !isAuthenticated ? <Login /> : <Navigate to={isOnboarded ? "/home" : "/onboardingPage"} />
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            isAuthenticated && isOnboarded ? (
                                <Layout showSidebar={true}>
                                    <Notification />
                                </Layout>
                            ) : (
                                <Navigate
                                    to={!isAuthenticated ? "/loginPage" : "/onboardingPage"}
                                />
                            )
                        }
                    />
                    <Route
                        path="/friends"
                        element={
                            isAuthenticated && isOnboarded ? (
                                <Layout showSidebar={true}>
                                    <Friends />
                                </Layout>
                            ) : (
                                <Navigate to={!isAuthenticated ? "/loginPage" : "/onboardingPage"} />
                            )
                        }
                    />
                    <Route
                        path="/call/:id"
                        element={
                            isAuthenticated && isOnboarded ? (
                                <Call />
                            ) : (
                                <Navigate to={!isAuthenticated ? "/loginPage" : "/onboardingPage"} />
                            )
                        }
                    />
                    <Route
                        path="/callPage/:id"
                        element={
                            isAuthenticated && isOnboarded ? (
                                <Call />
                            ) : (
                                <Navigate to={!isAuthenticated ? "/loginPage" : "/onboardingPage"} />
                            )
                        }
                    />

                    <Route
                        path="/chatPage/:id"
                        element={
                            isAuthenticated && isOnboarded ? (
                                <Layout showSidebar={false}>
                                    <Chat />
                                </Layout>
                            ) : (
                                <Navigate to={!isAuthenticated ? "/loginPage" : "/onboardingPage"} />
                            )
                        }
                    />

                    <Route
                        path="/onboardingPage"
                        element={
                            isAuthenticated ? (
                                !isOnboarded ? (
                                    <Onboard />
                                ) : (
                                    <Navigate to="/" />
                                )
                            ) : (
                                <Navigate to="/loginPage" />
                            )
                        }
                    />
                </Routes>
                <Toaster />
            </div>
        </ThemeProvider>
    );
};

export default App;
