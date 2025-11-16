import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        await dispatch(login({ username, password })).unwrap();
        // Navigation will happen via useEffect when isAuthenticated becomes true
      } catch (err) {
        // Error will be shown via error state
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "400px" }}>
      <div className="card">
        <h2 style={{ textAlign: "center", color: "var(--primary-green)" }}>Sign In to GreenSocialSite</h2>
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
          <input 
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: "100%", 
            padding: "10px", 
            background: "#2d5a27", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
        <div style={{ marginTop: "15px", padding: "10px", background: "var(--light-green)", borderRadius: "4px", fontSize: "14px" }}>
          <strong>Demo Credentials:</strong><br />
          Username: demo<br />
          Password: password123
        </div>
        
        {/* Bypass Signin Box */}
        <div style={{ 
          marginTop: "20px", 
          padding: "20px", 
          background: "linear-gradient(135deg, var(--primary-green), #4a7c59)", 
          color: "var(--white)", 
          borderRadius: "8px", 
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(45, 90, 39, 0.3)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>🚀 Quick Access</h3>
          <p style={{ margin: "0 0 15px 0", fontSize: "0.9rem", opacity: 0.9 }}>
            Skip the login and explore the social features instantly!
          </p>
          <button
            onClick={() => {
              // Auto-fill and submit the form
              setFormData({ username: 'demo', password: 'password123' });
              setTimeout(() => {
                document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
              }, 100);
            }}
            style={{
              background: "var(--white)",
              color: "var(--primary-green)",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            🌱 Enter GreenSocialSite Now
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
