import { useState } from 'react';
import './ProfileCard.css';

export default function ProfileCard({
  image,
  name,
  username,
  bio,
  title
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card-wrapper">
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleClick}
      >
        {/* Front Side - Full Photo */}
        <div className="flip-card-front">
          <div className="photo-overlay"></div>
          <img
            src={image}
            alt={name}
            className="full-photo"
          />
          <div className="front-content">
            <div className="name-container">
              <h2 className="profile-name">{name}</h2>
              <p className="profile-username">@{username}</p>
            </div>
            <div className="click-hint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              <span>Klik untuk detail</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back">
          <div className="flip-card-inner">
            <div className="back-content">
              <div className="back-header">
                <h3 className="back-title">About Me</h3>
                <div className="decorative-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="bio-container">
                <p className="bio-text">{bio}</p>
              </div>

              <div className="back-footer">
                <div className="role-badge">{title}</div>
              </div>

              <div className="click-hint back-hint">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                <span>Klik untuk kembali</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
