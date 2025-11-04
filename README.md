# 🌱 GreenSocialSite

A full-stack social network focused on environmental sustainability, green living, and eco-friendly practices. Connect with like-minded eco-warriors, share green tips, ask questions, and build a sustainable community.

## 🌟 Features

### 🔐 Authentication System
- **Secure login/register** with JWT tokens
- **Auto-login bypass** for development
- **Demo credentials**: `demo` / `password123`

### 📱 Social Network Features
- **🏠 Dashboard** - Community overview with stats and activity feed
- **📰 Social Feed** - Create posts, like, comment, and share content
- **👥 Community** - Discover users, follow/unfollow, search by interests
- **💬 Messages** - Direct messaging with real-time chat interface
- **👤 Profiles** - Editable user profiles with bio, stats, and interests

### 🌿 Green Living Focus
- **Environmental Topics** - Categories for sustainability discussions
- **Q&A System** - Ask and answer eco-friendly questions
- **Green Community** - Connect with environmental enthusiasts
- **Sustainable Living Tips** - Share and discover eco-practices

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shaw2024/greensocialsite.git
   cd greensocialsite
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd server
   npm install
   
   # Frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment setup**
   ```bash
   # Server environment (server/.env)
   PORT=4000
   JWT_SECRET=supersecretkey
   MONGODB_URI=  # Leave empty for in-memory database
   ```

4. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1: Backend server
   cd server
   npm run dev
   
   # Terminal 2: Frontend server
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 🎯 Usage

### Demo Access
The site includes auto-login for easy testing:
- **Username**: `demo`
- **Password**: `password123`

### Social Features
1. **Create Posts** - Share your green living journey in the Feed
2. **Follow Users** - Connect with eco-warriors in the Community
3. **Send Messages** - Chat with other members
4. **Edit Profile** - Customize your bio and interests
5. **Ask Questions** - Get help with sustainability topics

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database (with in-memory option for development)
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React 19** - User interface library
- **Vite** - Build tool and development server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Modern CSS** - Responsive design with green theme

### Development Tools
- **nodemon** - Backend hot reload
- **Vite HMR** - Frontend hot module replacement
- **ESLint** - Code linting
- **Git** - Version control

## 🌍 Mission

GreenSocialSite aims to create a vibrant community of environmentally conscious individuals who share knowledge, support each other's green living journeys, and collectively work towards a more sustainable future.

**Join us in making the world a greener place! 🌱**
