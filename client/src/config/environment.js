// Environment configuration for API endpoints
const config = {
  development: {
    API_BASE_URL: 'http://localhost:4000',
    USE_MOCK_DATA: false
  },
  production: {
    API_BASE_URL: 'https://your-backend-api.herokuapp.com', // Replace with actual backend URL
    USE_MOCK_DATA: true // Use mock data for demo on GitHub Pages
  }
};

const currentConfig = config[process.env.NODE_ENV] || config.development;

export default currentConfig;