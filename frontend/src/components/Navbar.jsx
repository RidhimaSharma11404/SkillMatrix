import React from 'react';

export default function Navbar({ onOpenAddModal, totalDevs, availableDevs }) {
  return (
    <header className="navbar">
      <div className="brand-section">
        <div className="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <div>
          <h1 className="brand-title">SkillMatrix</h1>
          <p className="brand-subtitle">Cognizant Developer Talent &amp; Bench Allocation Hub</p>
        </div>
      </div>

      <div className="nav-actions">
        <button className="btn btn-primary" onClick={onOpenAddModal}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Developer
        </button>
      </div>
    </header>
  );
}
