import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import DeveloperCard from './components/DeveloperCard';
import DeveloperModal from './components/DeveloperModal';
import AllocateModal from './components/AllocateModal';
import Toast from './components/Toast';
import { developerApi } from './api/developerService';

export default function App() {
  const [developers, setDevelopers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  // Modals state
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [editingDev, setEditingDev] = useState(null);
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [allocatingDev, setAllocatingDev] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Load stats
  const fetchStats = async () => {
    try {
      const data = await developerApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  // Load developers
  const fetchDevelopers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await developerApi.getAll({
        search,
        status: statusFilter,
        skill: selectedSkill,
      });
      setDevelopers(data);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, selectedSkill]);

  useEffect(() => {
    fetchDevelopers();
    fetchStats();
  }, [fetchDevelopers]);

  // Handle Create or Update
  const handleSaveDeveloper = async (formData) => {
    try {
      if (editingDev) {
        await developerApi.update(editingDev.id, formData);
        showToast(`Profile for ${formData.name} updated successfully!`);
      } else {
        await developerApi.create(formData);
        showToast(`New developer ${formData.name} added to SkillMatrix!`);
      }
      setIsDevModalOpen(false);
      setEditingDev(null);
      fetchDevelopers();
      fetchStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Allocate
  const handleAllocate = async (id, projectName) => {
    try {
      await developerApi.allocate(id, projectName);
      showToast(`Assigned to ${projectName} successfully!`);
      setIsAllocateModalOpen(false);
      setAllocatingDev(null);
      fetchDevelopers();
      fetchStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Release
  const handleRelease = async (id) => {
    try {
      await developerApi.release(id);
      showToast('Developer released back to bench (Available).');
      fetchDevelopers();
      fetchStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from SkillMatrix?`)) {
      try {
        await developerApi.delete(id);
        showToast(`Deleted ${name} from SkillMatrix.`);
        fetchDevelopers();
        fetchStats();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar
        onOpenAddModal={() => {
          setEditingDev(null);
          setIsDevModalOpen(true);
        }}
      />

      <StatsCards stats={stats} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Loading developer matrix...</div>
          <span style={{ fontSize: '0.85rem' }}>Fetching data from Spring Boot REST API</span>
        </div>
      ) : developers.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3 className="empty-title">No developers found</h3>
          <p className="empty-desc">
            No engineers matched your search criteria. Try clearing filters or add a new developer profile.
          </p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '16px' }}
            onClick={() => {
              setSearch('');
              setStatusFilter('');
              setSelectedSkill('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="dev-grid">
          {developers.map((dev) => (
            <DeveloperCard
              key={dev.id}
              dev={dev}
              onEdit={(d) => {
                setEditingDev(d);
                setIsDevModalOpen(true);
              }}
              onDelete={handleDelete}
              onAllocateClick={(d) => {
                setAllocatingDev(d);
                setIsAllocateModalOpen(true);
              }}
              onRelease={handleRelease}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <DeveloperModal
        isOpen={isDevModalOpen}
        onClose={() => {
          setIsDevModalOpen(false);
          setEditingDev(null);
        }}
        onSubmit={handleSaveDeveloper}
        initialData={editingDev}
      />

      {/* Allocate Modal */}
      <AllocateModal
        isOpen={isAllocateModalOpen}
        onClose={() => {
          setIsAllocateModalOpen(false);
          setAllocatingDev(null);
        }}
        dev={allocatingDev}
        onAllocate={handleAllocate}
      />

      <Toast toasts={toasts} />
    </div>
  );
}
