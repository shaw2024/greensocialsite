import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Feed() {
  const currentUser = useSelector((s) => s.auth.username);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [filter, setFilter] = useState("all"); // all, following, trending

  useEffect(() => {
    // Mock feed data - replace with API call
    const mockPosts = [
      {
        id: 1,
        author: "eco_warrior",
        avatar: "https://ui-avatars.com/api/?name=eco_warrior&background=2d5a27&color=fff",
        content: "Just installed solar panels on my roof! Excited to see how much energy I can generate this month. 🌞 #SolarEnergy #GreenLiving",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 8,
        shares: 3,
        liked: false,
        type: "text",
        category: "Green Tech"
      },
      {
        id: 2,
        author: "green_guru",
        avatar: "https://ui-avatars.com/api/?name=green_guru&background=4a7c59&color=fff",
        content: "Check out this amazing vertical garden I built! Perfect for small spaces and grows so much food. Anyone else trying urban farming?",
        timestamp: "4 hours ago",
        likes: 67,
        comments: 23,
        shares: 12,
        liked: true,
        type: "text",
        category: "Sustainable Living",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop"
      },
      {
        id: 3,
        author: "climate_activist",
        avatar: "https://ui-avatars.com/api/?name=climate_activist&background=6b8e23&color=fff",
        content: "New study shows that if we all switch to electric vehicles in the next 10 years, we could reduce carbon emissions by 40%! Time to make the switch. What EV are you considering?",
        timestamp: "6 hours ago",
        likes: 142,
        comments: 56,
        shares: 28,
        liked: false,
        type: "text",
        category: "Climate Change"
      },
      {
        id: 4,
        author: currentUser,
        avatar: `https://ui-avatars.com/api/?name=${currentUser}&background=2d5a27&color=fff`,
        content: "Started composting last week and I'm amazed at how much food waste we were throwing away! My garden is going to love this nutrient-rich soil. 🌱",
        timestamp: "1 day ago",
        likes: 31,
        comments: 12,
        shares: 5,
        liked: false,
        type: "text",
        category: "Sustainable Living"
      }
    ];
    setPosts(mockPosts);
  }, [currentUser]);

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: currentUser,
      avatar: `https://ui-avatars.com/api/?name=${currentUser}&background=2d5a27&color=fff`,
      content: newPost,
      timestamp: "just now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      type: "text",
      category: "General"
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    if (filter === "following") return post.author !== currentUser; // Mock: show non-own posts
    if (filter === "trending") return post.likes > 50;
    return true;
  });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#2d5a27", marginBottom: "25px" }}>Social Feed</h1>
      
      {/* Post Creation */}
      <div style={{ 
        background: "white", 
        padding: "20px", 
        borderRadius: "12px", 
        marginBottom: "20px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <img 
            src={`https://ui-avatars.com/api/?name=${currentUser}&background=2d5a27&color=fff`}
            alt={currentUser}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <div style={{ flex: 1 }}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your green living tips, ask questions, or start a discussion..."
              rows={3}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                resize: "vertical",
                fontFamily: "inherit"
              }}
            />
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginTop: "10px" 
            }}>
              <div style={{ fontSize: "0.9rem", color: "#666" }}>
                {280 - newPost.length} characters remaining
              </div>
              <button
                onClick={handlePost}
                disabled={!newPost.trim() || newPost.length > 280}
                style={{
                  padding: "10px 20px",
                  background: newPost.trim() && newPost.length <= 280 ? "#2d5a27" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: newPost.trim() && newPost.length <= 280 ? "pointer" : "not-allowed",
                  fontWeight: "bold"
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: "flex", 
        gap: "1px", 
        marginBottom: "20px", 
        background: "#e0e0e0", 
        borderRadius: "8px", 
        overflow: "hidden" 
      }}>
        {[
          { key: "all", label: "All Posts" },
          { key: "following", label: "Following" },
          { key: "trending", label: "Trending" }
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

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filteredPosts.map(post => (
          <div key={post.id} style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            {/* Post Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <Link to={`/profile/${post.author}`}>
                <img 
                  src={post.avatar}
                  alt={post.author}
                  style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                />
              </Link>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Link 
                    to={`/profile/${post.author}`}
                    style={{ 
                      fontWeight: "bold", 
                      color: "#2d5a27", 
                      textDecoration: "none" 
                    }}
                  >
                    {post.author}
                  </Link>
                  <span style={{
                    background: "#e8f5e8",
                    color: "#2d5a27",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "0.8rem",
                    fontWeight: "500"
                  }}>
                    {post.category}
                  </span>
                </div>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>{post.timestamp}</div>
              </div>
            </div>

            {/* Post Content */}
            <div style={{ marginBottom: "15px" }}>
              <p style={{ margin: "0 0 12px 0", lineHeight: "1.6", fontSize: "1rem" }}>
                {post.content}
              </p>
              {post.image && (
                <img 
                  src={post.image}
                  alt="Post content"
                  style={{ 
                    width: "100%", 
                    borderRadius: "8px", 
                    maxHeight: "300px", 
                    objectFit: "cover" 
                  }}
                />
              )}
            </div>

            {/* Post Actions */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              borderTop: "1px solid #f0f0f0",
              paddingTop: "12px"
            }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  onClick={() => handleLike(post.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: post.liked ? "#2d5a27" : "#666",
                    fontWeight: post.liked ? "bold" : "normal"
                  }}
                >
                  <span>{post.liked ? "💚" : "🤍"}</span>
                  {post.likes}
                </button>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666"
                }}>
                  <span>💬</span>
                  {post.comments}
                </button>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666"
                }}>
                  <span>🔄</span>
                  {post.shares}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          color: "#666",
          background: "white",
          borderRadius: "12px",
          border: "1px solid #e0e0e0"
        }}>
          <h3>No posts found</h3>
          <p>Try changing your filter or follow more users to see more content!</p>
        </div>
      )}
    </div>
  );
}