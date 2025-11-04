import config from '../config/environment.js';

const API_BASE = config.API_BASE_URL;

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Mock API responses for GitHub Pages deployment
const mockResponses = {
  '/api/auth/login': {
    token: 'mock-jwt-token-for-demo',
    username: 'demo'
  },
  '/api/auth/register': {
    token: 'mock-jwt-token-for-demo',
    username: 'newuser'
  },
  '/api/categories': [
    { _id: '1', name: 'Environment' },
    { _id: '2', name: 'Sustainability' },
    { _id: '3', name: 'Recycling' },
    { _id: '4', name: 'Green Tech' },
    { _id: '5', name: 'Nature' }
  ]
};

async function mockFetch(path, options) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (mockResponses[path]) {
    return {
      ok: true,
      json: async () => mockResponses[path]
    };
  }
  
  throw new Error(`Mock endpoint not found: ${path}`);
}

export async function post(path, body) {
  if (config.USE_MOCK_DATA) {
    return mockFetch(path, { method: 'POST', body });
  }
  
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function get(path) {
  if (config.USE_MOCK_DATA) {
    return mockFetch(path, { method: 'GET' });
  }
  
  const res = await fetch(`${API_BASE}${path}`, { headers: { ...authHeaders() } });
  if (!res.ok) throw await res.json();
  return res.json();
}

export default { get, post };
