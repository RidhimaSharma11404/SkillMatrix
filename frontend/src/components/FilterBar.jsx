import React from 'react';

const POPULAR_SKILLS = [
  'Java',
  'Spring Boot',
  'React',
  'Microservices',
  'Docker',
  'AWS',
  'Kubernetes',
  'TypeScript',
  'PostgreSQL',
];

export default function FilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  selectedSkill,
  setSelectedSkill,
}) {
  return (
    <div className="filter-container">
      <div className="filter-top">
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by engineer name, role, skill, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Allocation Statuses</option>
          <option value="AVAILABLE">🟢 Available on Bench</option>
          <option value="ALLOCATED">🔵 Allocated to Project</option>
        </select>
      </div>

      <div className="skill-chips">
        <span className="skill-chip-label">Quick Skill Filter:</span>
        <button
          className={`skill-chip ${!selectedSkill ? 'active' : ''}`}
          onClick={() => setSelectedSkill('')}
        >
          All Skills
        </button>
        {POPULAR_SKILLS.map((skill) => (
          <button
            key={skill}
            className={`skill-chip ${selectedSkill === skill ? 'active' : ''}`}
            onClick={() => setSelectedSkill(selectedSkill === skill ? '' : skill)}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
}
