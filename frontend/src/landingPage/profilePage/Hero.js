import React, { useState, useEffect } from 'react';

import { 
  MessageCircle, 
  Home, 
  Users, 
  Bell, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  MapPin, 
  Globe,
  User,
  Mail,
  Phone,
  Settings,
  LogOut
} from 'lucide-react';

const FluentiaProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Khushi Maheshwari',
    bio: 'Passionate language learner exploring French culture and conversations. Love connecting with people from around the world!',
    nativeLanguage: 'English',
    learningLanguage: 'French',
    location: 'Mumbai, India',
    profilePic: null
  });
  const [editData, setEditData] = useState({...profileData});

  useEffect(() => {
    // Add Bootstrap CSS
    const bootstrapLink = document.createElement('link');
    bootstrapLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    bootstrapLink.rel = 'stylesheet';
    document.head.appendChild(bootstrapLink);

    return () => {
      if (bootstrapLink.parentNode) {
        bootstrapLink.parentNode.removeChild(bootstrapLink);
      }
    };
  }, []);

  const handleEdit = () => {
    setEditData({...profileData});
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({...editData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({...profileData});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  return (
    <>
      <style>{`
        :root {
          --fluentia-primary: #1e3a8a;
          --fluentia-secondary: #3b82f6;
          --fluentia-accent: #60a5fa;
          --fluentia-light: #dbeafe;
          --fluentia-dark: #1e293b;
          --fluentia-sidebar: #1e3a8a;
        }
        
        body {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .sidebar {
          background: var(--fluentia-sidebar);
          min-height: 100vh;
          width: 280px;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-brand {
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-nav {
          padding: 20px 0;
        }
        
        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          margin: 2px 10px;
          border-radius: 12px;
        }
        
        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(5px);
        }
        
        .sidebar-item.active {
          background: var(--fluentia-secondary);
          color: white;
        }
        
        .sidebar-user {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
        }
        
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
        }
        
        .navbar-custom {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 15px 30px;
        }
        
        .profile-header {
          background: linear-gradient(135deg, var(--fluentia-secondary), var(--fluentia-primary));
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
        }
        
        .profile-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }
        
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.3);
          background: linear-gradient(135deg, #f59e0b, #f97316);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .profile-avatar:hover {
          transform: scale(1.05);
        }
        
        .avatar-edit-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 36px;
          height: 36px;
          background: var(--fluentia-secondary);
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .avatar-edit-btn:hover {
          background: var(--fluentia-primary);
          transform: scale(1.1);
        }
        
        .profile-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .profile-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }
        
        .form-control-custom {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .form-control-custom:focus {
          border-color: var(--fluentia-secondary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .btn-fluentia {
          background: linear-gradient(135deg, var(--fluentia-secondary), var(--fluentia-primary));
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-fluentia:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          color: white;
        }
        
        .btn-outline-fluentia {
          border: 2px solid var(--fluentia-secondary);
          color: var(--fluentia-secondary);
          background: transparent;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-outline-fluentia:hover {
          background: var(--fluentia-secondary);
          color: white;
          transform: translateY(-2px);
        }
        
        .language-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--fluentia-light);
          color: var(--fluentia-primary);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 500;
          font-size: 14px;
        }
        
        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .info-item:last-child {
          border-bottom: none;
        }
        
        .info-icon {
          width: 40px;
          height: 40px;
          background: var(--fluentia-light);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fluentia-secondary);
        }
        
        .edit-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }
        
        .edit-modal {
          background: white;
          border-radius: 20px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .online-indicator {
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid white;
          border-radius: 50%;
          position: absolute;
          bottom: 8px;
          right: 8px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-brand">
            <div className="d-flex align-items-center">
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageCircle size={24} color="white" />
              </div>
              <h4 className="text-white fw-bold mb-0">FLUENTIA</h4>
            </div>
          </div>
          
          <div className="sidebar-nav">
            <a href="#" className="sidebar-item">
              <Home size={20} className="me-3" />
              Home
            </a>
            <a href="#" className="sidebar-item">
              <Users size={20} className="me-3" />
              Friends
            </a>
            <a href="#" className="sidebar-item">
              <Bell size={20} className="me-3" />
              Notifications
            </a>
            <a href="#" className="sidebar-item active">
              <User size={20} className="me-3" />
              Profile
            </a>
            <a href="#" className="sidebar-item">
              <Settings size={20} className="me-3" />
              Settings
            </a>
          </div>
          
          <div className="sidebar-user">
            <div className="position-relative me-3">
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '700',
                color: 'white'
              }}>
                K
              </div>
              <div className="online-indicator"></div>
            </div>
            <div className="text-white">
              <div className="fw-bold">Khushi</div>
              <div className="fw-bold">Maheshwari</div>
              <small className="text-success">Online</small>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Top Navbar */}
          <nav className="navbar-custom d-flex justify-content-between align-items-center">
            <h2 className="h4 fw-bold mb-0" style={{color: 'var(--fluentia-dark)'}}>My Profile</h2>
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-link p-0" style={{color: 'var(--fluentia-secondary)'}}>
                <Bell size={20} />
              </button>
              <button className="btn btn-link p-0" style={{color: 'var(--fluentia-secondary)'}}>
                <Settings size={20} />
              </button>
              <button className="btn btn-link p-0 text-danger">
                <LogOut size={20} />
              </button>
            </div>
          </nav>

          {/* Profile Content */}
          <div className="container-fluid p-4">
            {/* Profile Header */}
            <div className="profile-header fade-in">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="profile-avatar position-relative me-4">
                    {profileData.fullName.charAt(0).toUpperCase()}
                    <div className="avatar-edit-btn" onClick={() => {}}>
                      <Camera size={16} color="white" />
                    </div>
                  </div>
                  <div className="text-white">
                    <h1 className="h2 fw-bold mb-2">{profileData.fullName}</h1>
                    <p className="mb-3 opacity-90">{profileData.bio}</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <div className="language-badge">
                        🇺🇸 Native: {profileData.nativeLanguage}
                      </div>
                      <div className="language-badge">
                        🇫🇷 Learning: {profileData.learningLanguage}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-light btn-lg" onClick={handleEdit}>
                    <Edit3 size={20} className="me-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {/* Profile Information */}
              <div className="col-lg-8">
                <div className="profile-card p-4 fade-in">
                  <h4 className="fw-bold mb-4" style={{color: 'var(--fluentia-dark)'}}>
                    Profile Information
                  </h4>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Full Name</div>
                      <div className="text-secondary">{profileData.fullName}</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <Globe size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Native Language</div>
                      <div className="text-secondary">🇺🇸 {profileData.nativeLanguage}</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <Globe size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Learning Language</div>
                      <div className="text-secondary">🇫🇷 {profileData.learningLanguage}</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Location</div>
                      <div className="text-secondary">{profileData.location}</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Bio</div>
                      <div className="text-secondary">{profileData.bio}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="col-lg-4">
                <div className="profile-card p-4 fade-in">
                  <h5 className="fw-bold mb-4" style={{color: 'var(--fluentia-dark)'}}>
                    Learning Stats
                  </h5>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-secondary">Conversations</span>
                    <span className="fw-bold" style={{color: 'var(--fluentia-secondary)'}}>47</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-secondary">Friends</span>
                    <span className="fw-bold" style={{color: 'var(--fluentia-secondary)'}}>23</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-secondary">Learning Streak</span>
                    <span className="fw-bold" style={{color: 'var(--fluentia-secondary)'}}>15 days</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary">Level</span>
                    <span className="fw-bold" style={{color: 'var(--fluentia-secondary)'}}>Intermediate</span>
                  </div>
                </div>

                <div className="profile-card p-4 mt-4 fade-in">
                  <h5 className="fw-bold mb-3" style={{color: 'var(--fluentia-dark)'}}>
                    Quick Actions
                  </h5>
                  
                  <button className="btn btn-fluentia w-100 mb-3">
                    <MessageCircle size={18} />
                    Start Conversation
                  </button>
                  
                  <button className="btn btn-outline-fluentia w-100">
                    <Users size={18} />
                    Find Language Partners
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0" style={{color: 'var(--fluentia-dark)'}}>
                Edit Profile
              </h4>
              <button className="btn btn-link p-0" onClick={handleCancel}>
                <X size={24} style={{color: 'var(--fluentia-secondary)'}} />
              </button>
            </div>
            
            <form>
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-custom"
                  value={editData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Bio</label>
                <textarea 
                  className="form-control form-control-custom"
                  rows="3"
                  value={editData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Native Language</label>
                <select 
                  className="form-control form-control-custom"
                  value={editData.nativeLanguage}
                  onChange={(e) => handleInputChange('nativeLanguage', e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.name}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Learning Language</label>
                <select 
                  className="form-control form-control-custom"
                  value={editData.learningLanguage}
                  onChange={(e) => handleInputChange('learningLanguage', e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.name}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-bold">Location</label>
                <input 
                  type="text" 
                  className="form-control form-control-custom"
                  value={editData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              
              <div className="d-flex gap-3">
                <button type="button" className="btn btn-fluentia flex-fill" onClick={handleSave}>
                  <Save size={18} />
                  Save Changes
                </button>
                <button type="button" className="btn btn-outline-fluentia" onClick={handleCancel}>
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FluentiaProfilePage;