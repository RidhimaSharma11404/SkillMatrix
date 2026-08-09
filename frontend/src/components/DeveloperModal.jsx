import React, { useState, useEffect } from 'react';

export default function DeveloperModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    experienceLevel: 'MID_LEVEL',
    yearsOfExperience: 3,
    location: 'Bangalore, India',
    skillsInput: '',
    status: 'AVAILABLE',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || '',
        experienceLevel: initialData.experienceLevel || 'MID_LEVEL',
        yearsOfExperience: initialData.yearsOfExperience || 3,
        location: initialData.location || 'Bangalore, India',
        skillsInput: initialData.skills ? Array.from(initialData.skills).join(', ') : '',
        status: initialData.status || 'AVAILABLE',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        experienceLevel: 'MID_LEVEL',
        yearsOfExperience: 3,
        location: 'Bangalore, India',
        skillsInput: 'Java, Spring Boot, React, SQL',
        status: 'AVAILABLE',
      });
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.role.trim()) {
      setError('Please fill in all required fields (Name, Email, Role)');
      return;
    }

    const skillsArray = formData.skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (skillsArray.length === 0) {
      setError('Please provide at least one technical skill');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim(),
      experienceLevel: formData.experienceLevel,
      yearsOfExperience: parseInt(formData.yearsOfExperience, 10) || 0,
      location: formData.location.trim(),
      skills: skillsArray,
      status: formData.status,
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {initialData ? 'Edit Developer Profile' : 'Add New Developer'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cognizant Corporate Email *</label>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. rahul.sharma@cognizant.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Primary Role / Designation *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Full Stack React & Spring Developer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Experience Tier</label>
              <select
                className="form-control"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              >
                <option value="JUNIOR">Junior Developer (0-2 yrs)</option>
                <option value="MID_LEVEL">Mid-Level Engineer (2-5 yrs)</option>
                <option value="SENIOR">Senior Engineer (5-8 yrs)</option>
                <option value="TECH_LEAD">Tech Lead / Architect (8+ yrs)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Years of Experience</label>
              <input
                type="number"
                min="0"
                max="40"
                className="form-control"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Work Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Bangalore (Hybrid)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technical Skills (Comma Separated) *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Java, Spring Boot, React, Docker, AWS, PostgreSQL"
              value={formData.skillsInput}
              onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
              required
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Separate skills with commas (e.g. Java, Spring Boot, React)
            </span>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'Create Developer Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
