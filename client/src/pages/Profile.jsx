import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  const currentUser = useSelector((s) => s.auth.username);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [stats, setStats] = useState({ questions: 0, answers: 0, followers: 0, following: 0 });

  const isOwnProfile = !userId || userId === currentUser;

  useEffect(() => {
    // Mock profile data - replace with API call
    const mockProfile = {
      username: userId || currentUser,
      bio: "Passionate about environmental sustainability and green technology.",
      location: "San Francisco, CA",
      interests: "Climate Change, Renewable Energy, Sustainable Living",
      joinDate: "2024-01-15",
      avatar: `https://ui-avatars.com/api/?name=${userId || currentUser}&background=2d5a27&color=fff`
    };
    setProfile(mockProfile);
    setBio(mockProfile.bio);
    setLocation(mockProfile.location);
    setInterests(mockProfile.interests);
    
    // Mock stats
    setStats({
      questions: Math.floor(Math.random() * 50) + 5,
      answers: Math.floor(Math.random() * 200) + 10,
      followers: Math.floor(Math.random() * 100) + 2,
      following: Math.floor(Math.random() * 80) + 5
    });
  }, [userId, currentUser]);

  const handleSaveProfile = () => {
    // TODO: API call to update profile
    setProfile({ ...profile, bio, location, interests });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleFollow = () => {
    // TODO: API call to follow/unfollow
    setIsFollowing(!isFollowing);
    setStats(prev => ({
      ...prev,
      followers: prev.followers + (isFollowing ? -1 : 1)
    }));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="page-container" style={{ maxWidth: "800px" }}>
      {/* Profile Header */}
      <div style={{ 
        background: "linear-gradient(135deg, #2d5a27, #4a7c59)", 
        color: "white", 
        padding: "30px", 
        borderRadius: "12px", 
        marginBottom: "20px",
        position: "relative"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img 
            src={profile.avatar} 
            alt={profile.username}
            style={{ 
              width: "120px", 
              height: "120px", 
              borderRadius: "50%", 
              border: "4px solid white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: "0 0 10px 0", fontSize: "2.5rem" }}>{profile.username}</h1>
            <p style={{ margin: "0 0 5px 0", opacity: 0.9 }}>{profile.location}</p>
            <p style={{ margin: "0", opacity: 0.8, fontSize: "0.9rem" }}>
              Member since {new Date(profile.joinDate).toLocaleDateString()}
            </p>
          </div>
          {!isOwnProfile && (
            <button
              onClick={handleFollow}
              style={{
                padding: "12px 24px",
                background: isFollowing ? "#666" : "white",
                color: isFollowing ? "white" : "#2d5a27",
                border: "none",
                borderRadius: "25px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: "15px", 
        marginBottom: "25px" 
      }}>
        {[
          { label: "Questions", value: stats.questions },
          { label: "Answers", value: stats.answers },
          { label: "Followers", value: stats.followers },
          { label: "Following", value: stats.following }
        ].map((stat, idx) => (
          <div key={idx} style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "8px", 
            textAlign: "center",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d5a27" }}>{stat.value}</div>
            <div style={{ color: "#666", fontSize: "0.9rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Details */}
      <div style={{ 
        background: "white", 
        padding: "25px", 
        borderRadius: "8px", 
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#2d5a27" }}>About</h2>
          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                padding: "8px 16px",
                background: isEditing ? "#666" : "#2d5a27",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          )}
        </div>

        {isEditing ? (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                style={{ 
                  width: "100%", 
                  padding: "10px", 
                  border: "1px solid #ddd", 
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "10px", 
                  border: "1px solid #ddd", 
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Interests</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Comma-separated interests"
                style={{ 
                  width: "100%", 
                  padding: "10px", 
                  border: "1px solid #ddd", 
                  borderRadius: "4px",
                  fontSize: "1rem"
                }}
              />
            </div>
            <button
              onClick={handleSaveProfile}
              style={{
                padding: "12px 24px",
                background: "#2d5a27",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>Bio</h4>
              <p style={{ margin: 0, lineHeight: "1.6", color: "#555" }}>{profile.bio}</p>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>Location</h4>
              <p style={{ margin: 0, color: "#555" }}>{profile.location}</p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>Interests</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {profile.interests.split(", ").map((interest, idx) => (
                  <span key={idx} style={{
                    background: "#e8f5e8",
                    color: "#2d5a27",
                    padding: "4px 12px",
                    borderRadius: "15px",
                    fontSize: "0.9rem",
                    border: "1px solid #c8e6c9"
                  }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}