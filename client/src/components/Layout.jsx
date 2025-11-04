import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { logout } from "../features/auth/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories.items || []);
  const username = useSelector((s) => s.auth.username);
  const navigate = useNavigate();

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  const doLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh', background: '#f8f9fa' }}>
      <aside style={{ 
        padding: '20px', 
        borderRight: '1px solid #ddd', 
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d5a27', fontSize: '1.5rem' }}>🌱 GreenSocialSite</h3>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            {username ? <>Welcome back, <strong>{username}</strong></> : <>Hello, Guest</>}
          </div>
        </div>

        {/* Social Navigation */}
        <nav>
          <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '0.9rem', textTransform: 'uppercase' }}>Social</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/" style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '8px 12px', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🏠 Dashboard
            </Link>
            <Link to="/feed" style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '8px 12px', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📰 Feed
            </Link>
            <Link to="/users" style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '8px 12px', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              👥 Community
            </Link>
            <Link to="/messages" style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '8px 12px', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💬 Messages
            </Link>
            <Link to="/profile" style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '8px 12px', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              👤 Profile
            </Link>
          </div>
        </nav>

        {/* Categories Navigation */}
        <nav>
          <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '0.9rem', textTransform: 'uppercase' }}>Topics</h4>
          <div style={{ maxHeight: '200px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {categories.map(c => (
              <Link key={c._id} to={`/category/${c._id}`} style={{ 
                textDecoration: 'none', 
                color: '#666', 
                padding: '6px 12px', 
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                {c.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={() => navigate('/new')}
            style={{
              padding: '10px 15px',
              background: '#2d5a27',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ➕ New Question
          </button>
          {username && (
            <button 
              onClick={doLogout} 
              style={{
                padding: '8px 15px',
                background: 'transparent',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              🚪 Logout
            </button>
          )}
        </div>
      </aside>
      <main style={{ padding: '0', minHeight: '100vh', overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
