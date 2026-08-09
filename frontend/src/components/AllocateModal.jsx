import React, { useState } from 'react';

export default function AllocateModal({ isOpen, onClose, dev, onAllocate }) {
  const [projectName, setProjectName] = useState('Cognizant Digital Transformation');

  if (!isOpen || !dev) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    onAllocate(dev.id, projectName.trim());
  };

  const sampleProjects = [
    'HSBC Global Banking Migration',
    'Aetna Healthcare Claims AI',
    'Walmart Supply Chain Modernization',
    'JPMorgan Cloud Microservices',
    'Verizon 5G Network Platform',
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Allocate to Client Project</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Assign <strong>{dev.name}</strong> ({dev.role}) to an active client engagement.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Client Engagement / Project Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. HSBC Global Banking Modernization"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Quick Suggestions:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {sampleProjects.map((proj) => (
                <button
                  type="button"
                  key={proj}
                  className="skill-chip"
                  style={{ fontSize: '0.72rem' }}
                  onClick={() => setProjectName(proj)}
                >
                  {proj}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Allocation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
