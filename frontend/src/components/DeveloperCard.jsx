import React from 'react';

export default function DeveloperCard({
  dev,
  onEdit,
  onDelete,
  onAllocateClick,
  onRelease,
}) {
  const isAvailable = dev.status === 'AVAILABLE';

  const formatLevel = (level) => {
    switch (level) {
      case 'JUNIOR': return 'Junior Dev';
      case 'MID_LEVEL': return 'Mid-Level';
      case 'SENIOR': return 'Senior Dev';
      case 'TECH_LEAD': return 'Tech Lead';
      default: return level;
    }
  };

  return (
    <div className="dev-card">
      <div>
        <div className="dev-header">
          <img
            src={dev.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${dev.name}`}
            alt={dev.name}
            className="dev-avatar"
          />
          <div className="dev-main-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="dev-name" title={dev.name}>{dev.name}</h3>
              <span className={`badge ${isAvailable ? 'badge-available' : 'badge-allocated'}`}>
                <span className="badge-dot"></span>
                {isAvailable ? 'On Bench' : 'Allocated'}
              </span>
            </div>
            <p className="dev-role">{dev.role}</p>
            <span className="dev-email">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {dev.email}
            </span>
          </div>
        </div>

        <div className="dev-meta">
          <div className="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>{formatLevel(dev.experienceLevel)} ({dev.yearsOfExperience} yrs)</span>
          </div>
          <div className="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{dev.location || 'India (Hybrid)'}</span>
          </div>
        </div>

        {!isAvailable && dev.currentProject && (
          <div className="current-project-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span><strong>Project:</strong> {dev.currentProject}</span>
          </div>
        )}

        <div className="skills-wrapper">
          <div className="skills-label">Technical Stack</div>
          <div className="skill-tags">
            {dev.skills && Array.from(dev.skills).map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="dev-actions">
        {isAvailable ? (
          <button
            className="btn btn-allocate btn-sm"
            onClick={() => onAllocateClick(dev)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
            Assign Project
          </button>
        ) : (
          <button
            className="btn btn-success btn-sm"
            onClick={() => onRelease(dev.id)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            Release to Bench
          </button>
        )}

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(dev)}
            title="Edit Profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(dev.id, dev.name)}
            title="Delete Profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
