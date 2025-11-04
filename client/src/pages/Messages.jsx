import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Messages() {
  const currentUser = useSelector((s) => s.auth.username);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock conversations data - replace with API call
    const mockConversations = [
      {
        id: 1,
        participants: [currentUser, "eco_warrior"],
        lastMessage: {
          text: "Thanks for sharing that solar panel guide! Really helpful.",
          timestamp: "2 minutes ago",
          sender: "eco_warrior"
        },
        unreadCount: 2,
        avatar: "https://ui-avatars.com/api/?name=eco_warrior&background=2d5a27&color=fff",
        messages: [
          { id: 1, text: "Hey! Saw your post about solar panels", sender: currentUser, timestamp: "1 hour ago" },
          { id: 2, text: "Hi there! Yeah, just got them installed last week", sender: "eco_warrior", timestamp: "58 minutes ago" },
          { id: 3, text: "How's the energy production so far?", sender: currentUser, timestamp: "55 minutes ago" },
          { id: 4, text: "Pretty amazing! Already generating 20% of our daily usage", sender: "eco_warrior", timestamp: "50 minutes ago" },
          { id: 5, text: "That's fantastic! Do you have a guide for installation?", sender: currentUser, timestamp: "45 minutes ago" },
          { id: 6, text: "I can share some resources. Let me find the links", sender: "eco_warrior", timestamp: "3 minutes ago" },
          { id: 7, text: "Thanks for sharing that solar panel guide! Really helpful.", sender: "eco_warrior", timestamp: "2 minutes ago" }
        ]
      },
      {
        id: 2,
        participants: [currentUser, "green_guru"],
        lastMessage: {
          text: "The composting workshop is this Saturday at 2pm",
          timestamp: "1 hour ago",
          sender: "green_guru"
        },
        unreadCount: 0,
        avatar: "https://ui-avatars.com/api/?name=green_guru&background=4a7c59&color=fff",
        messages: [
          { id: 1, text: "Hi! Interested in attending your composting workshop", sender: currentUser, timestamp: "3 hours ago" },
          { id: 2, text: "Great to hear! It's going to be really hands-on", sender: "green_guru", timestamp: "2.5 hours ago" },
          { id: 3, text: "Should I bring anything specific?", sender: currentUser, timestamp: "2 hours ago" },
          { id: 4, text: "Just bring some kitchen scraps if you have them!", sender: "green_guru", timestamp: "1.5 hours ago" },
          { id: 5, text: "The composting workshop is this Saturday at 2pm", sender: "green_guru", timestamp: "1 hour ago" }
        ]
      },
      {
        id: 3,
        participants: [currentUser, "climate_activist"],
        lastMessage: {
          text: "Would love to collaborate on that climate policy post",
          timestamp: "Yesterday",
          sender: currentUser
        },
        unreadCount: 1,
        avatar: "https://ui-avatars.com/api/?name=climate_activist&background=6b8e23&color=fff",
        messages: [
          { id: 1, text: "Saw your post about the new climate legislation", sender: currentUser, timestamp: "Yesterday" },
          { id: 2, text: "Yes! It's a big step forward for renewable energy policy", sender: "climate_activist", timestamp: "Yesterday" },
          { id: 3, text: "Would love to collaborate on that climate policy post", sender: currentUser, timestamp: "Yesterday" }
        ]
      }
    ];
    
    setConversations(mockConversations);
    setActiveChat(mockConversations[0]);
  }, [currentUser]);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: currentUser,
      timestamp: "just now"
    };

    // Update active chat messages
    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, message],
      lastMessage: {
        text: newMessage,
        timestamp: "just now",
        sender: currentUser
      }
    };

    // Update conversations list
    setConversations(conversations.map(conv => 
      conv.id === activeChat.id ? updatedChat : conv
    ));
    
    setActiveChat(updatedChat);
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => 
      p !== currentUser && p.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "350px 1fr", 
      height: "calc(100vh - 100px)", 
      maxWidth: "1200px", 
      margin: "0 auto",
      gap: "1px",
      background: "#e0e0e0",
      borderRadius: "12px",
      overflow: "hidden"
    }}>
      {/* Conversations Sidebar */}
      <div style={{ background: "white", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ 
          padding: "20px", 
          borderBottom: "1px solid #e0e0e0",
          background: "#f8f9fa"
        }}>
          <h2 style={{ margin: "0 0 15px 0", color: "#2d5a27" }}>Messages</h2>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "20px",
              outline: "none"
            }}
          />
        </div>

        {/* Conversations List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filteredConversations.map(conv => {
            const otherUser = conv.participants.find(p => p !== currentUser);
            return (
              <div
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                  background: activeChat?.id === conv.id ? "#f0f8ff" : "white",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center"
                }}
              >
                <div style={{ position: "relative" }}>
                  <img 
                    src={conv.avatar}
                    alt={otherUser}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                  {conv.unreadCount > 0 && (
                    <div style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      background: "#2d5a27",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}>
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontWeight: "bold", 
                    marginBottom: "4px",
                    color: "#2d5a27"
                  }}>
                    {otherUser}
                  </div>
                  <div style={{ 
                    color: "#666", 
                    fontSize: "0.9rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {conv.lastMessage.text}
                  </div>
                  <div style={{ 
                    color: "#999", 
                    fontSize: "0.8rem", 
                    marginTop: "2px" 
                  }}>
                    {conv.lastMessage.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ background: "white", display: "flex", flexDirection: "column" }}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div style={{ 
              padding: "20px", 
              borderBottom: "1px solid #e0e0e0",
              background: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <img 
                src={activeChat.avatar}
                alt={activeChat.participants.find(p => p !== currentUser)}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <div>
                <h3 style={{ margin: 0, color: "#2d5a27" }}>
                  {activeChat.participants.find(p => p !== currentUser)}
                </h3>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>Online</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ 
              flex: 1, 
              overflowY: "auto", 
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              {activeChat.messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    display: "flex",
                    justifyContent: message.sender === currentUser ? "flex-end" : "flex-start"
                  }}
                >
                  <div style={{
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius: "18px",
                    background: message.sender === currentUser ? "#2d5a27" : "#f0f0f0",
                    color: message.sender === currentUser ? "white" : "#333"
                  }}>
                    <div>{message.text}</div>
                    <div style={{ 
                      fontSize: "0.8rem", 
                      opacity: 0.7, 
                      marginTop: "4px",
                      textAlign: "right"
                    }}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div style={{ 
              padding: "20px", 
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: "12px",
              alignItems: "flex-end"
            }}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={1}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  outline: "none",
                  resize: "none",
                  fontFamily: "inherit"
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                style={{
                  padding: "12px 20px",
                  background: newMessage.trim() ? "#2d5a27" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: newMessage.trim() ? "pointer" : "not-allowed",
                  fontWeight: "bold"
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            height: "100%",
            color: "#666",
            textAlign: "center"
          }}>
            <div>
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}