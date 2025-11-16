import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../features/auth/authSlice";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (username && password) {
      try {
        await dispatch(register({ username, password })).unwrap();
        // Navigation will happen via useEffect when isAuthenticated becomes true
      } catch (err) {
        // Error will be shown via error state
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Sign Up for GreenSocialSite</h2>
      
      {error && (
        <div style={{ background: "#fee", color: "#c33", padding: "10px", marginBottom: "20px", borderRadius: "4px" }}>
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
            minLength={3}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ 
              width: "100%", 
              padding: "8px", 
              border: `1px solid ${confirmPassword && password !== confirmPassword ? "#f44" : "#ddd"}`, 
              borderRadius: "4px" 
            }}
          />
          {confirmPassword && password !== confirmPassword && (
            <small style={{ color: "#f44" }}>Passwords don't match</small>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={loading || (confirmPassword && password !== confirmPassword)}
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
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        
        {/* Quick Access Button */}
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          background: "var(--light-green)", 
          borderRadius: "6px",
          border: "1px solid var(--primary-green)"
        }}>
          <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Want to explore first?
          </p>
          <Link 
            to="/login"
            style={{
              background: "var(--primary-green)",
              color: "var(--white)",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500"
            }}
          >
            🌱 Quick Access Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
