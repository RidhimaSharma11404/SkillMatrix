import React from 'react';

export default function StatsCards({ stats }) {
  const {
    totalDevelopers = 0,
    availableDevelopers = 0,
    allocatedDevelopers = 0,
    benchPercentage = 0,
  } = stats || {};

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper icon-purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Engineers</span>
          <span className="stat-value">{totalDevelopers}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper icon-green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 14 14"></polyline>
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-label">Bench Available</span>
          <span className="stat-value">{availableDevelopers}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper icon-blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-label">Allocated to Client</span>
          <span className="stat-value">{allocatedDevelopers}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper icon-amber">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div className="stat-info">
          <span className="stat-label">Bench Rate</span>
          <span className="stat-value">{benchPercentage}%</span>
        </div>
      </div>
    </div>
  );
}
