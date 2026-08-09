const BASE_URL = 'http://localhost:8080/api/v1/developers';

// Fallback in-memory / local storage seed data for standalone cloud deployment (e.g. Vercel)
const INITIAL_DEVELOPERS = [
  {
    id: 1,
    name: "Aarav Patel",
    email: "aarav.patel@cognizant.com",
    role: "Senior Java Microservices Engineer",
    experienceLevel: "SENIOR",
    yearsOfExperience: 6,
    skills: ["Java", "Spring Boot", "Microservices", "Kafka", "Docker", "PostgreSQL"],
    status: "AVAILABLE",
    currentProject: null,
    location: "Bangalore, India",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Aarav"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@cognizant.com",
    role: "Full Stack React & Spring Developer",
    experienceLevel: "MID_LEVEL",
    yearsOfExperience: 4,
    skills: ["React", "Java", "Spring Boot", "TypeScript", "Tailwind CSS", "REST API"],
    status: "ALLOCATED",
    currentProject: "HSBC Global Banking Modernization",
    location: "Hyderabad, India",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Priya"
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    email: "rohan.k@cognizant.com",
    role: "Lead Cloud Solutions Architect",
    experienceLevel: "TECH_LEAD",
    yearsOfExperience: 10,
    skills: ["AWS", "Kubernetes", "Spring Cloud", "Terraform", "Java", "CI/CD"],
    status: "ALLOCATED",
    currentProject: "JPMorgan Cloud Migration",
    location: "Pune, India",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Rohan"
  },
  {
    id: 4,
    name: "Ananya Iyer",
    email: "ananya.iyer@cognizant.com",
    role: "Junior Frontend UI/UX Engineer",
    experienceLevel: "JUNIOR",
    yearsOfExperience: 2,
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Redux", "Figma"],
    status: "AVAILABLE",
    currentProject: null,
    location: "Chennai, India",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Ananya"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@cognizant.com",
    role: "DevOps & Site Reliability Engineer",
    experienceLevel: "SENIOR",
    yearsOfExperience: 7,
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Linux", "Prometheus"],
    status: "AVAILABLE",
    currentProject: null,
    location: "Bangalore, India",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Vikram"
  },
  {
    id: 6,
    name: "Sneha Reddy",
    email: "sneha.reddy@cognizant.com",
    role: "Backend Java API Developer",
    experienceLevel: "MID_LEVEL",
    yearsOfExperience: 3,
    skills: ["Java", "Spring Boot", "Hibernate", "MySQL", "JUnit", "Swagger"],
    status: "AVAILABLE",
    currentProject: null,
    location: "Hyderabad, India",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Sneha"
  },
  {
    id: 7,
    name: "Aditya Verma",
    email: "aditya.verma@cognizant.com",
    role: "Data & AI Integration Specialist",
    experienceLevel: "MID_LEVEL",
    yearsOfExperience: 5,
    skills: ["Python", "Java", "FastAPI", "PostgreSQL", "OpenAI API", "Docker"],
    status: "ALLOCATED",
    currentProject: "Aetna Healthcare AI Claims",
    location: "Noida, India",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Aditya"
  }
];

function getLocalData() {
  const stored = localStorage.getItem('skillmatrix_devs');
  if (!stored) {
    localStorage.setItem('skillmatrix_devs', JSON.stringify(INITIAL_DEVELOPERS));
    return INITIAL_DEVELOPERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEVELOPERS;
  }
}

function saveLocalData(data) {
  localStorage.setItem('skillmatrix_devs', JSON.stringify(data));
}

export const developerApi = {
  // Fetch all developers with optional filters
  async getAll(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.search) query.append('search', params.search);
      if (params.status) query.append('status', params.status);
      if (params.skill) query.append('skill', params.skill);

      const url = `${BASE_URL}${query.toString() ? `?${query.toString()}` : ''}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback to local storage
    }

    // Filter local storage data
    let list = getLocalData();
    if (params.status) {
      list = list.filter(d => d.status === params.status);
    }
    if (params.skill) {
      list = list.filter(d => d.skills && d.skills.some(s => s.toLowerCase() === params.skill.toLowerCase()));
    }
    if (params.search) {
      const term = params.search.toLowerCase();
      list = list.filter(d =>
        (d.name && d.name.toLowerCase().includes(term)) ||
        (d.role && d.role.toLowerCase().includes(term)) ||
        (d.location && d.location.toLowerCase().includes(term)) ||
        (d.skills && d.skills.some(s => s.toLowerCase().includes(term)))
      );
    }
    return list;
  },

  // Fetch dashboard stats
  async getStats() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const response = await fetch(`${BASE_URL}/stats`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }

    const list = getLocalData();
    const total = list.length;
    const available = list.filter(d => d.status === 'AVAILABLE').length;
    const allocated = list.filter(d => d.status === 'ALLOCATED').length;
    const benchPercentage = total > 0 ? Math.round(((available / total) * 100) * 10) / 10 : 0;

    const topSkills = {};
    list.forEach(d => {
      if (d.skills) {
        d.skills.forEach(s => {
          topSkills[s] = (topSkills[s] || 0) + 1;
        });
      }
    });

    return {
      totalDevelopers: total,
      availableDevelopers: available,
      allocatedDevelopers: allocated,
      benchPercentage,
      topSkills
    };
  },

  // Create developer
  async create(data) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }

    const list = getLocalData();
    const newDev = {
      id: Date.now(),
      ...data,
      status: data.status || 'AVAILABLE',
      currentProject: null,
      avatarUrl: data.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${data.name.replace(/\s+/g, '')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.unshift(newDev);
    saveLocalData(list);
    return newDev;
  },

  // Update developer
  async update(id, data) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }

    const list = getLocalData();
    const index = list.findIndex(d => d.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() };
      saveLocalData(list);
      return list[index];
    }
    throw new Error('Developer not found');
  },

  // Allocate developer to project
  async allocate(id, projectName) {
    try {
      const response = await fetch(`${BASE_URL}/${id}/allocate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }

    const list = getLocalData();
    const index = list.findIndex(d => d.id === id);
    if (index !== -1) {
      list[index].status = 'ALLOCATED';
      list[index].currentProject = projectName;
      saveLocalData(list);
      return list[index];
    }
    throw new Error('Developer not found');
  },

  // Release developer back to bench
  async release(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}/release`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }

    const list = getLocalData();
    const index = list.findIndex(d => d.id === id);
    if (index !== -1) {
      list[index].status = 'AVAILABLE';
      list[index].currentProject = null;
      saveLocalData(list);
      return list[index];
    }
    throw new Error('Developer not found');
  },

  // Delete developer
  async delete(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return true;
      }
    } catch {
      // Fallback
    }

    let list = getLocalData();
    list = list.filter(d => d.id !== id);
    saveLocalData(list);
    return true;
  },
};
