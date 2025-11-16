import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Users() {
  const currentUser = useSelector((s) => s.auth.username);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, followers, following, suggested
  const [followingList, setFollowingList] = useState(new Set());

  useEffect(() => {
    // Mock users data - replace with API call
    const mockUsers = [
      {
        username: "eco_warrior",
        bio: "Fighting climate change one solar panel at a time! 🌞",
        location: "Portland, OR",
        followers: 234,
        following: 189,
        posts: 67,
        avatar: "https://ui-avatars.com/api/?name=eco_warrior&background=2d5a27&color=fff",
        interests: ["Solar Energy", "Climate Action", "Green Tech"],
        lastActive: "2 hours ago",
        verified: true
      },
      {
        username: "green_guru",
        bio: "Urban farmer and sustainability educator. Growing food in small spaces! 🌱",
        location: "New York, NY",
        followers: 1567,
        following: 432,
        posts: 245,
        avatar: "https://ui-avatars.com/api/?name=green_guru&background=4a7c59&color=fff",
        interests: ["Urban Farming", "Composting", "Sustainable Living"],
        lastActive: "1 hour ago",
        verified: true
      },
      {
        username: "climate_activist",
        bio: "Policy researcher and environmental advocate. Let's make change happen! ♻️",
        location: "Washington, DC",
        followers: 3421,
        following: 876,
        posts: 156,
        avatar: "https://ui-avatars.com/api/?name=climate_activist&background=6b8e23&color=fff",
        interests: ["Climate Policy", "Environmental Law", "Activism"],
        lastActive: "30 minutes ago",
        verified: true
      },
      {
        username: "recycling_queen",
        bio: "Zero waste lifestyle enthusiast. Helping others reduce their footprint! 🗂️",
        location: "San Francisco, CA",
        followers: 892,
        following: 234,
        posts: 178,
        avatar: "https://ui-avatars.com/api/?name=recycling_queen&background=8fbc8f&color=fff",
        interests: ["Zero Waste", "Recycling", "Minimalism"],
        lastActive: "5 hours ago",
        verified: false
      },
      {
        username: "renewable_rob",
        bio: "Wind and solar engineer. Building the clean energy future! ⚡",
        location: "Austin, TX",
        followers: 567,
        following: 123,
        posts: 89,
        avatar: "https://ui-avatars.com/api/?name=renewable_rob&background=228b22&color=fff",
        interests: ["Renewable Energy", "Engineering", "Innovation"],
        lastActive: "1 day ago",
        verified: false
      },
      {
        username: "ocean_protector",
        bio: "Marine biologist working to save our oceans. Every drop counts! 🌊",
        location: "Miami, FL",
        followers: 1234,
        following: 456,
        posts: 234,
        avatar: "https://ui-avatars.com/api/?name=ocean_protector&background=20b2aa&color=fff",
        interests: ["Ocean Conservation", "Marine Biology", "Plastic Reduction"],
        lastActive: "3 hours ago",
        verified: true
      }
    ];

    setUsers(mockUsers);
    
    // Mock following relationships
    setFollowingList(new Set(["green_guru", "climate_activist"]));
  }, []);

  const handleFollow = (username) => {
    const newFollowingList = new Set(followingList);
    if (newFollowingList.has(username)) {
      newFollowingList.delete(username);
    } else {
      newFollowingList.add(username);
    }
    setFollowingList(newFollowingList);

    // Update follower count in users list
    setUsers(users.map(user => 
      user.username === username 
        ? { 
            ...user, 
            followers: user.followers + (newFollowingList.has(username) ? 1 : -1)
          }
        : user
    ));
  };

  const filteredUsers = users
    .filter(user => user.username !== currentUser) // Don't show current user
    .filter(user => {
      if (filter === "followers") return Math.random() > 0.5; // Mock: random followers
      if (filter === "following") return followingList.has(user.username);
      if (filter === "suggested") return !followingList.has(user.username) && user.followers > 500;
      return true;
    })
    .filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="page-container">
      <h1 style={{ color: "#2d5a27", marginBottom: "25px" }}>Community</h1>
      
      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search users by name, bio, or interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #ddd",
            borderRadius: "25px",
            fontSize: "1rem",
            outline: "none"
          }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: "flex", 
        gap: "1px", 
        marginBottom: "25px", 
        background: "#e0e0e0", 
        borderRadius: "8px", 
        overflow: "hidden" 
      }}>
        {[
          { key: "all", label: "All Users" },
          { key: "following", label: "Following" },
          { key: "followers", label: "Followers" },
          { key: "suggested", label: "Suggested" }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: filter === tab.key ? "#2d5a27" : "white",
              color: filter === tab.key ? "white" : "#666",
              border: "none",
              cursor: "pointer",
              fontWeight: filter === tab.key ? "bold" : "normal"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Users Grid */}
      <div style={{ display: "grid", gap: "20px" }}>
        {filteredUsers.map(user => (
          <div key={user.username} style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            gap: "20px",
            alignItems: "flex-start"
          }}>
            {/* Avatar */}
            <Link to={`/profile/${user.username}`}>
              <div style={{ position: "relative" }}>
                <img 
                  src={user.avatar}
                  alt={user.username}
                  style={{ 
                    width: "80px", 
                    height: "80px", 
                    borderRadius: "50%",
                    border: "3px solid #e0e0e0"
                  }}
                />
                {user.verified && (
                  <div style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    background: "#2d5a27",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    border: "2px solid white"
                  }}>
                    ✓
                  </div>
                )}
              </div>
            </Link>

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <Link 
                  to={`/profile/${user.username}`}
                  style={{ 
                    fontSize: "1.3rem", 
                    fontWeight: "bold", 
                    color: "#2d5a27", 
                    textDecoration: "none" 
                  }}
                >
                  {user.username}
                </Link>
                <span style={{ color: "#666", fontSize: "0.9rem" }}>
                  • {user.location}
                </span>
              </div>
              
              <p style={{ 
                margin: "0 0 12px 0", 
                color: "#555", 
                lineHeight: "1.5",
                fontSize: "0.95rem"
              }}>
                {user.bio}
              </p>

              {/* Stats */}
              <div style={{ 
                display: "flex", 
                gap: "20px", 
                marginBottom: "12px", 
                fontSize: "0.9rem",
                color: "#666"
              }}>
                <span><strong>{user.posts}</strong> posts</span>
                <span><strong>{user.followers}</strong> followers</span>
                <span><strong>{user.following}</strong> following</span>
                <span>Active {user.lastActive}</span>
              </div>

              {/* Interests */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "15px" }}>
                {user.interests.map((interest, idx) => (
                  <span key={idx} style={{
                    background: "#e8f5e8",
                    color: "#2d5a27",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "500"
                  }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Follow Button */}
            <button
              onClick={() => handleFollow(user.username)}
              style={{
                padding: "10px 20px",
                background: followingList.has(user.username) ? "#666" : "#2d5a27",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
                whiteSpace: "nowrap"
              }}
            >
              {followingList.has(user.username) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          color: "#666",
          background: "white",
          borderRadius: "12px",
          border: "1px solid #e0e0e0"
        }}>
          <h3>No users found</h3>
          <p>
            {searchTerm 
              ? `No users match "${searchTerm}". Try a different search term.`
              : "No users found for this filter. Try a different filter option."
            }
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div style={{
        marginTop: "30px",
        background: "linear-gradient(135deg, #2d5a27, #4a7c59)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center"
      }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Community Stats</h3>
        <div style={{ display: "flex", justifyContent: "space-around", fontSize: "0.9rem" }}>
          <div><strong>{users.length + 1}</strong> Total Members</div>
          <div><strong>{followingList.size}</strong> Following</div>
          <div><strong>{Math.floor(Math.random() * 50) + 10}</strong> Online Now</div>
        </div>
      </div>
    </div>
  );
}