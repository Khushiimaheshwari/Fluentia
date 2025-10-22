import React, { useState, useEffect } from 'react';
import { MessageCircle, Video, Users, Shield, Zap, Globe, Star, ArrowRight, Play, CheckCircle, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const FluentiaHomepage = () => {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    // Add Bootstrap CSS
    const bootstrapLink = document.createElement('link');
    bootstrapLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    bootstrapLink.rel = 'stylesheet';
    document.head.appendChild(bootstrapLink);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (bootstrapLink.parentNode) {
        bootstrapLink.parentNode.removeChild(bootstrapLink);
      }
    };
  }, []);

  const features = [
    {
      icon: <MessageCircle size={32} />,
      title: "Real-Time Messaging",
      description: "Connect instantly with 1-to-1 and group chats, typing indicators, and emoji support",
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
    },
    {
      icon: <Video size={32} />,
      title: "HD Video Calls",
      description: "High-quality video calls with screen sharing, recording, and call controls",
      gradient: "linear-gradient(135deg, #6366f1, #4338ca)"
    },
    {
      icon: <Users size={32} />,
      title: "Find Language Partners",
      description: "Discover perfect language exchange partners based on your profile and goals",
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)"
    },
    {
      icon: <Shield size={32} />,
      title: "Secure & Private",
      description: "JWT authentication and MongoDB Atlas ensure your conversations stay safe",
      gradient: "linear-gradient(135deg, #14b8a6, #0d9488)"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Learners", icon: <Users size={24} /> },
    { number: "50+", label: "Languages", icon: <Globe size={24} /> },
    { number: "1M+", label: "Messages Sent", icon: <MessageCircle size={24} /> },
    { number: "99.9%", label: "Uptime", icon: <Zap size={24} /> }
  ];

  const benefits = [
    "Practice conversations naturally",
    "Make friends worldwide",
    "Improve language skills together",
    "Learn at your own pace",
    "Join a supportive community",
    "Track your progress"
  ];

  const futureFeatures = [
    { title: "Group Video Calls", desc: "Connect with multiple learners", icon: "👥" },
    { title: "Voice Messages", desc: "Practice pronunciation easily", icon: "🎙️" },
    { title: "Gamification", desc: "Badges, streaks, and points", icon: "🏆" },
    { title: "AI Practice Partner", desc: "24/7 conversation practice", icon: "🤖" }
  ];

  return (
    <>
      <div className="gradient-bg min-vh-100">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg fixed-top navbar-blur">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#" style={{textDecoration: 'none'}}>
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                    src="/media/logo.png"
                    alt="Fluentia Logo"
                    style={{ width: "45px", height: "45px", objectFit: "contain" }}
                />
              </div>
              <span className="navbar-brand-custom">FLUENTIA</span>
            </a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item ms-3">
                  <Link to="/loginPage" className="btn btn-custom text-white">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="section-hero" style={{paddingTop: '120px', paddingBottom: '80px'}}>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className={`animate-fade-in ${isVisible['section-hero'] ? 'visible' : ''}`}>
                  <div className="hero-badge mb-4">
                    <Star size={16} className="me-2" />
                    Find Your Perfect Language Partner
                  </div>
                  <h1 className="display-1 fw-bold mb-4">
                    <span className="gradient-text">
                      Find Your <span className="position-relative underline-animated gradient-text-flow">Flow</span>
                    </span>
                  </h1>
                  <p className="lead fs-3 text-secondary mb-5 mx-auto" style={{maxWidth: '800px'}}>
                    A modern communication platform where people can <strong>practice conversations, make friends, and improve their language skills together.</strong>
                  </p>
                  <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5">
                    <Link to="/loginPage">
                        <button className="btn btn-custom text-white d-flex align-items-center">
                            Start Learning Today
                            <ArrowRight size={20} className="ms-2" />
                        </button>
                    </Link>
                    <button className="btn btn-link text-secondary d-flex align-items-center p-0" style={{textDecoration: 'none'}}>
                      <div className="me-3 bg-white rounded-circle shadow d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                        <Play size={20} className="ms-1" />
                      </div>
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hero Stats */}
            <div className="row g-4 mt-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-6 col-md-3">
                  <div className={`stat-card text-center animate-fade-in ${isVisible['section-hero'] ? 'visible' : ''}`} 
                       style={{animationDelay: `${index * 100}ms`}}>
                    <div className="stat-icon mb-3">{stat.icon}</div>
                    <h3 className="h2 fw-bold text-dark mb-1">{stat.number}</h3>
                    <p className="text-secondary small mb-0">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="section-features" className="py-5 bg-white">
          <div className="container py-5">
            <div className={`row animate-fade-in ${isVisible['section-features'] ? 'visible' : ''}`}>
              <div className="col-12 text-center mb-5">
                <h2 className="display-3 fw-bold mb-4">
                  Powerful Features for <span style={{color: 'var(--secondary-blue)'}}>Better Learning</span>
                </h2>
                <p className="lead fs-4 text-secondary mx-auto" style={{maxWidth: '700px'}}>
                  Everything you need to practice languages, connect with others, and improve your communication skills in one beautiful platform.
                </p>
              </div>
            </div>
            
            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6">
                  <div className={`card h-100 card-hover animate-fade-in ${isVisible['section-features'] ? 'visible' : ''}`} 
                       style={{animationDelay: `${index * 100}ms`}}>
                    <div className="card-body p-4">
                      <div className="feature-icon mb-4" style={{background: feature.gradient}}>
                        {feature.icon}
                      </div>
                      <h3 className="h4 fw-bold text-dark mb-3">{feature.title}</h3>
                      <p className="text-secondary fs-5 mb-0">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="section-about" className="py-5 gradient-bg">
          <div className="container py-5">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className={`animate-slide-left ${isVisible['section-about'] ? 'visible' : ''}`}>
                  <h2 className="display-3 fw-bold mb-4">
                    Why Choose <span style={{color: 'var(--secondary-blue)'}}>Fluentia?</span>
                  </h2>
                  <p className="lead fs-4 text-secondary mb-4">
                    Built for hackathons, teams, learners, and personal use. Fluentia ensures seamless communication, security, and scalability with a user-first design approach.
                  </p>
                  
                  <div className="mb-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className={`d-flex align-items-center mb-3 animate-slide-left ${isVisible['section-about'] ? 'visible' : ''}`} 
                           style={{animationDelay: `${index * 100}ms`}}>
                        <CheckCircle size={24} className="text-success me-3 flex-shrink-0" />
                        <span className="text-secondary fs-5">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn btn-custom text-white mt-3">
                    Learn More About Us
                  </button>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className={`position-relative animate-slide-right ${isVisible['section-about'] ? 'visible' : ''}`}>
                  <div className="testimonial-card">
                    <div className="d-flex align-items-center mb-4">
                      <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3" 
                           style={{width: '48px', height: '48px'}}>
                        <Heart size={24} />
                      </div>
                      <div>
                        <h4 className="h5 fw-bold mb-1">Join Our Community</h4>
                        <p className="mb-0 opacity-75">Connect with learners worldwide</p>
                      </div>
                    </div>
                    <p className="fs-5 mb-4 opacity-90">
                      "Fluentia has transformed how I practice languages. The community is amazing and the video calls feel so natural!"
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="bg-white bg-opacity-25 rounded-circle me-3" style={{width: '40px', height: '40px'}}></div>
                      <div>
                        <p className="fw-bold mb-0">Sarah Chen</p>
                        <small className="opacity-75">Language Enthusiast</small>
                      </div>
                    </div>
                  </div>
                  <div className="floating-badge">
                    <Award size={48} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Enhancements */}
        <section id="section-community" className="py-5 bg-white">
          <div className="container py-5">
            <div className={`row animate-fade-in ${isVisible['section-community'] ? 'visible' : ''}`}>
              <div className="col-12 text-center mb-5">
                <h2 className="display-3 fw-bold mb-4">
                  The Future is <span style={{color: 'var(--secondary-blue)'}}>Bright</span>
                </h2>
                <p className="lead fs-4 text-secondary mx-auto mb-5" style={{maxWidth: '700px'}}>
                  We're constantly evolving. Here's what's coming next to make your language learning journey even better.
                </p>
              </div>
            </div>
            
            <div className="row g-4 mb-5">
              {futureFeatures.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <div className={`future-card text-center h-100 animate-fade-in ${isVisible['section-community'] ? 'visible' : ''}`} 
                       style={{animationDelay: `${index * 100}ms`}}>
                    <div className="fs-1 mb-3">{item.icon}</div>
                    <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                    <p className="text-secondary small mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="cta-section text-center text-white">
                  <h3 className="display-4 fw-bold mb-3">
                    Ready to Find Your Flow?
                  </h3>
                  <p className="lead fs-4 mb-4 mx-auto opacity-90" style={{maxWidth: '600px'}}>
                    Join thousands of learners who are already improving their language skills with Fluentia.
                  </p>
                  <button className="btn btn-light btn-lg px-5 py-3 fw-bold" style={{color: 'var(--secondary-blue)', borderRadius: '50px'}}>
                    Start Your Journey Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white py-5 mt-5">
            <div className="container">
                <div className="row align-items-center mb-4">
                {/* Brand Section */}
                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                    <div
                        className="me-3 bg-white d-flex align-items-center justify-content-center"
                        style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "30px",
                        }}
                    >
                        <img
                        src="/media/logo.png"
                        alt="Fluentia Logo"
                        style={{
                            width: "38px",
                            height: "38px",
                            objectFit: "contain",
                            borderRadius: "50%",
                        }}
                        />
                    </div>
                    <span className="h4 fw-bold mb-0">FLUENTIA</span>
                    </div>
                </div>

                {/* Links Section */}
                <div className="col-md-6">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-end">
                    <div className="d-flex gap-4 mb-md-0">
                        <a href="#" className="text-light text-decoration-none small link-hover">
                        Privacy
                        </a>
                        <a href="#" className="text-light text-decoration-none small link-hover">
                        Terms
                        </a>
                        <a href="#" className="text-light text-decoration-none small link-hover">
                        Support
                        </a>
                    </div>
                    {/* Social Icons */}
                    <div className="d-flex gap-3 ms-md-4">
                        <a href="#" className="text-light fs-5 link-hover"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="text-light fs-5 link-hover"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="text-light fs-5 link-hover"><i className="bi bi-linkedin"></i></a>
                        <a href="#" className="text-light fs-5 link-hover"><i className="bi bi-instagram"></i></a>
                    </div>
                    </div>
                </div>
                </div>

                {/* Divider */}
                <hr className="border-secondary" />

                {/* Copyright */}
                <div className="row mb-0">
                <div className="col text-center">
                    <small>
                    © 2025 <strong>Fluentia</strong>. All rights reserved.
                    </small>
                </div>
                </div>
            </div>
            </footer>
      </div>
    </>
  );
};

export default FluentiaHomepage;