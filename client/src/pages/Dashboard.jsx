import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const username = useSelector((s) => s.auth.username);
  
  const quickStats = {
    totalMembers: 1247,
    activeToday: 89,
    questionsToday: 23,
    postsToday: 67
  };

  const recentActivity = [
    { type: "question", user: "eco_warrior", content: "What's the best way to start composting in an apartment?", time: "5 min ago" },
    { type: "post", user: "green_guru", content: "Just harvested my first vertical garden! The yield is amazing 🌱", time: "12 min ago" },
    { type: "answer", user: "climate_activist", content: "Answered a question about solar panel efficiency", time: "18 min ago" },
    { type: "follow", user: "recycling_queen", content: "Started following renewable_rob", time: "25 min ago" }
  ];

  return (
    <div className="page-container">
      {/* Welcome Header */}
      <div className="card" style={{ 
        background: "linear-gradient(135deg, var(--primary-green), #4a7c59)", 
        color: "var(--white)", 
        textAlign: "center"
      }}>
        <h1>Welcome back, {username}! 🌍</h1>
        <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.9 }}>
          Connect with eco-warriors, share green living tips, and make a positive impact together
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid-4">
        {[
          { label: "Community Members", value: quickStats.totalMembers, icon: "👥" },
          { label: "Active Today", value: quickStats.activeToday, icon: "🟢" },
          { label: "Questions Today", value: quickStats.questionsToday, icon: "❓" },
          { label: "Posts Shared", value: quickStats.postsToday, icon: "📝" }
        ].map((stat, idx) => (
          <div key={idx} style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "12px", 
            textAlign: "center",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#2d5a27", marginBottom: "4px" }}>
              {stat.value.toLocaleString()}
            </div>
            <div style={{ color: "#666", fontSize: "0.9rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 style={{ color: "var(--primary-green)" }}>Quick Actions</h2>
        <div className="grid-2">
          {[
            { title: "Share Your Story", description: "Post about your green living journey", link: "/feed", icon: "📝", color: "#2d5a27" },
            { title: "Ask the Community", description: "Get help with sustainability questions", link: "/new", icon: "❓", color: "#4a7c59" },
            { title: "Discover People", description: "Connect with like-minded eco-warriors", link: "/users", icon: "🔍", color: "#6b8e23" },
            { title: "Check Messages", description: "Stay connected with your network", link: "/messages", icon: "💬", color: "#8fbc8f" }
          ].map((action, idx) => (
            <Link 
              key={idx} 
              to={action.link}
              style={{ 
                textDecoration: "none",
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                display: "block"
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{action.icon}</div>
              <h3 style={{ margin: "0 0 8px 0", color: action.color }}>{action.title}</h3>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#2d5a27", margin: 0 }}>Recent Community Activity</h2>
          <Link to="/feed" style={{ color: "#2d5a27", textDecoration: "none", fontWeight: "bold" }}>
            View All →
          </Link>
        </div>
        <div style={{ 
          background: "white", 
          borderRadius: "12px", 
          border: "1px solid #e0e0e0",
          overflow: "hidden"
        }}>
          {recentActivity.map((activity, idx) => (
            <div key={idx} style={{ 
              padding: "15px 20px", 
              borderBottom: idx < recentActivity.length - 1 ? "1px solid #f0f0f0" : "none",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <div style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "50%",
                background: "#e8f5e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem"
              }}>
                {activity.type === "question" && "❓"}
                {activity.type === "post" && "📝"}
                {activity.type === "answer" && "💡"}
                {activity.type === "follow" && "👥"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", color: "#2d5a27", marginBottom: "4px" }}>
                  {activity.user}
                </div>
                <div style={{ color: "#555", fontSize: "0.9rem", lineHeight: "1.4" }}>
                  {activity.content}
                </div>
              </div>
              <div style={{ color: "#999", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
