// Mock API service for GitHub Pages deployment
// This replaces the real backend API with localStorage-based mock data

const STORAGE_KEYS = {
  AUTH: 'greensocial_auth',
  USERS: 'greensocial_users',
  POSTS: 'greensocial_posts',
  CATEGORIES: 'greensocial_categories',
  QUESTIONS: 'greensocial_questions',
  MESSAGES: 'greensocial_messages'
};

// Initialize mock data if not exists
function initializeMockData() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const users = [
      {
        username: "demo",
        password: "password123", // In real app, this would be hashed
        bio: "Environmental enthusiast and community builder",
        location: "San Francisco, CA",
        interests: "Climate Change, Solar Energy, Sustainable Living",
        joinDate: "2024-01-15"
      },
      {
        username: "eco_warrior",
        bio: "Fighting climate change one solar panel at a time! 🌞",
        location: "Portland, OR",
        interests: "Solar Energy, Climate Action, Green Tech"
      },
      {
        username: "green_guru",
        bio: "Urban farmer and sustainability educator. Growing food in small spaces! 🌱",
        location: "New York, NY",
        interests: "Urban Farming, Composting, Sustainable Living"
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    const categories = [
      { _id: "1", name: "Environment" },
      { _id: "2", name: "Sustainability" },
      { _id: "3", name: "Recycling" },
      { _id: "4", name: "Green Tech" },
      { _id: "5", name: "Nature" }
    ];
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }

  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    const posts = [
      {
        id: 1,
        author: "eco_warrior",
        content: "Just installed solar panels on my roof! Excited to see how much energy I can generate this month. 🌞 #SolarEnergy #GreenLiving",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 8,
        shares: 3,
        liked: false,
        category: "Green Tech"
      },
      {
        id: 2,
        author: "green_guru",
        content: "Check out this amazing vertical garden I built! Perfect for small spaces and grows so much food. Anyone else trying urban farming?",
        timestamp: "4 hours ago",
        likes: 67,
        comments: 23,
        shares: 12,
        liked: false,
        category: "Sustainable Living"
      }
    ];
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }
}

// Mock API functions
export const mockApi = {
  // Auth endpoints
  login: async (credentials) => {
    initializeMockData();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    
    if (user) {
      const token = btoa(JSON.stringify({ username: user.username, exp: Date.now() + 86400000 }));
      const authData = { token, username: user.username };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authData));
      return { token, username: user.username };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    initializeMockData();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    
    if (users.find(u => u.username === userData.username)) {
      throw new Error('Username already exists');
    }
    
    const newUser = {
      ...userData,
      bio: "",
      location: "",
      interests: "",
      joinDate: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    return mockApi.login(userData);
  },

  // Categories
  getCategories: async () => {
    initializeMockData();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES));
  },

  // Posts/Feed
  getPosts: async () => {
    initializeMockData();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
  },

  createPost: async (postData) => {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const newPost = {
      id: Date.now(),
      ...postData,
      timestamp: "just now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return newPost;
  },

  likePost: async (postId) => {
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    }
    return post;
  },

  // Users
  getUsers: async () => {
    initializeMockData();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    return users.map(({ password, ...user }) => user); // Remove password from response
  },

  getCurrentUser: async () => {
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || '{}');
    if (auth.username) {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
      const user = users.find(u => u.username === auth.username);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }
    return null;
  },

  updateProfile: async (profileData) => {
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || '{}');
    if (!auth.username) throw new Error('Not authenticated');

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const userIndex = users.findIndex(u => u.username === auth.username);
    
    if (userIndex >= 0) {
      users[userIndex] = { ...users[userIndex], ...profileData };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      const { password, ...userWithoutPassword } = users[userIndex];
      return userWithoutPassword;
    }
    
    throw new Error('User not found');
  }
};

// Helper function to check if we're in GitHub Pages environment
export const isGitHubPages = () => {
  return window.location.hostname.includes('github.io') || 
         window.location.pathname.startsWith('/greensocialsite');
};

// Wrapper function that uses mock API in GitHub Pages, real API in development
export const getApi = () => {
  if (isGitHubPages()) {
    return mockApi;
  }
  // Return the real API import (this would be the existing api.js)
  return null; // Will be replaced with real API in development
};