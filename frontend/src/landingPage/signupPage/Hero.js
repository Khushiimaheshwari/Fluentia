import React from 'react';
import './Hero.css';
import { Link } from "react-router-dom";


function Hero({ signupData, setSignupData, handleSignup, isPending, error }) {
    return (
        <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row">
            <div className="col-md-6 d-flex flex-column justify-content-center p-5">
                <div className="d-flex align-items-center mb-5 gap-2">
                    <img src="media/logo.png" alt="Fluentia Logo" style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
                    <h2 className="fw-bold mb-0" style={{ color: '#0056b3', fontSize: '3rem' }}>Fluentia</h2>
                </div>

                <h2 className="fw-bold">Create an Account</h2>
                <p className="text-muted mb-4">
                    Join LangConnect and start your language learning journey
                </p>

                {error && (
                    <div className='mb-4 text-danger'>
                        <span>{error?.response?.data?.message || "Something went wrong"}</span>
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control bg-light" placeholder="Enter your full name" value={signupData.fullName} onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control bg-light" placeholder="Enter your email address" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control bg-light" placeholder="Create a strong password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
                        <small className="text-muted">Password must be at least 6 characters long</small>
                    </div>

                    <div className="form-check mb-4">
                        <input type="checkbox" className="form-check-input" id="terms" />
                        <label className="form-check-label" htmlFor="terms">
                            I agree to the <a href="#" className="text-primary">terms of service</a> and <a href="#" className="text-primary">privacy policy</a>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        {isPending ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Loading...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <p className="mt-3">
                    Already have an account? <Link to="/loginPage" className="text-primary">Sign in</Link>
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
