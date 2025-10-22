import React from 'react';
import { Link } from "react-router-dom";

function Hero({ loginData, setLoginData, handleLogin, isPending, error }) {
    return (
        <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row">

            <div className="col-md-6 d-flex flex-column justify-content-center p-5">
                <div className="d-flex align-items-center mb-5 gap-2">
                    <img src="media/logo.png" alt="Fluentia Logo" style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
                    <h2 className="fw-bold mb-0" style={{ color: '#0056b3', fontSize: '3rem' }}>Fluentia</h2>
                </div>

                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted mb-4">
                    Sign in to your account to continue your language journey
                </p>

                {error && (
                    <div className='mb-4 text-danger'>
                        <span>{error?.response?.data?.message || "Something went wrong"}</span>
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control bg-light" placeholder="Enter your email address" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control bg-light" placeholder="Enter your password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={isPending}>
                        {isPending ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <p className="mt-3">
                    Don't have an account? <Link to="/signupPage" className="text-primary">Create one</Link>
                </p>
            </div>

            <div className="col-md-6 bg-light d-flex flex-column align-items-center justify-content-center text-center p-5">
                <img src="media/sign_element.jpg" alt="Language connection Element" className="img-fluid mb-4" style={{ maxWidth: '80%' }} />
                <h2 className="fw-bold">Connect with language partners worldwide</h2>
                <p className="text-muted">
                    Practice conversations, make friends, and improve your language skills together
                </p>
            </div>
        </div>
    );
}

export default Hero;