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
      </div>
      </div>
    </div>
  );
}
