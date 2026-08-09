const BASE_URL = 'http://localhost:8080/api/v1/developers';

export const developerApi = {
  // Fetch all developers with optional filters
  async getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    if (params.skill) query.append('skill', params.skill);

    const url = `${BASE_URL}${query.toString() ? `?${query.toString()}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch developers');
    }
    return response.json();
  },

  // Fetch dashboard stats
  async getStats() {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return response.json();
  },

  // Create developer
  async create(data) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.fieldErrors ? err.fieldErrors.join(', ') : err.message || 'Failed to create developer');
    }
    return response.json();
  },

  // Update developer
  async update(id, data) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.fieldErrors ? err.fieldErrors.join(', ') : err.message || 'Failed to update developer');
    }
    return response.json();
  },

  // Allocate developer to project
  async allocate(id, projectName) {
    const response = await fetch(`${BASE_URL}/${id}/allocate`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectName }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to allocate developer');
    }
    return response.json();
  },

  // Release developer back to bench
  async release(id) {
    const response = await fetch(`${BASE_URL}/${id}/release`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to release developer');
    }
    return response.json();
  },

  // Delete developer
  async delete(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete developer');
    }
    return true;
  },
};
