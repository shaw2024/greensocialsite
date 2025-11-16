import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { logout } from "../features/auth/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories.items || []);
  const username = useSelector((s) => s.auth.username);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  const doLogout = () => { 
    dispatch(logout()); 
    navigate('/login'); 
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const SidebarContent = ({ mobile = false }) => (
    <div className={`${mobile ? 'mobile-sidebar' : 'sidebar'} ${mobile && mobileMenuOpen ? 'open' : ''}`}>
      <div>
        <h3 style={{ margin: '0 0 10px 0', color: 'var(--primary-green)', fontSize: '1.5rem' }}>
          🌱 GreenSocialSite
        </h3>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {username ? <>Welcome back, <strong>{username}</strong></> : <>Hello, Guest</>}
        </div>
      </div>

      {/* Social Navigation */}
      <nav>
        <h4 style={{ 
          margin: '0 0 12px 0', 
          color: 'var(--text-secondary)', 
          fontSize: '0.9rem', 
          textTransform: 'uppercase',
          fontWeight: '600'
        }}>
          Social
        </h4>
        <div className="nav-section">
          <Link to="/" className="nav-link" onClick={mobile ? closeMobileMenu : undefined}>
            🏠 Dashboard
          </Link>
          <Link to="/feed" className="nav-link" onClick={mobile ? closeMobileMenu : undefined}>
            📱 Feed
          </Link>
          <Link to="/users" className="nav-link" onClick={mobile ? closeMobileMenu : undefined}>
            👥 Community
          </Link>
          <Link to="/messages" className="nav-link" onClick={mobile ? closeMobileMenu : undefined}>
            💬 Messages
          </Link>
          <Link to="/profile" className="nav-link" onClick={mobile ? closeMobileMenu : undefined}>
            👤 Profile
          </Link>
        </div>
      </nav>

      {/* Categories */}
      <nav>
        <h4 style={{ 
          margin: '0 0 12px 0', 
          color: 'var(--text-secondary)', 
          fontSize: '0.9rem', 
          textTransform: 'uppercase',
          fontWeight: '600'
        }}>
          Topics
        </h4>
        <div style={{ 
          maxHeight: '200px', 
          overflow: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px' 
        }}>
          {categories.map((c) => (
            <Link 
              key={c._id} 
              to={`/category/${c._id}`} 
              className="nav-link"
              style={{ fontSize: '0.9rem', padding: '6px 12px' }}
              onClick={mobile ? closeMobileMenu : undefined}
            >
              🌿 {c.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Actions */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {username ? (
          <button
            onClick={doLogout}
            style={{
              background: 'none',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              padding: '8px 12px',
              borderRadius: 'var(--border-radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}
          >
            🚪 Logout
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                color: 'var(--white)',
                background: 'var(--primary-green)',
                padding: '8px 12px',
                borderRadius: 'var(--border-radius-sm)',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}
              onClick={mobile ? closeMobileMenu : undefined}
            >
              🔑 Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: 'none',
                color: 'var(--primary-green)',
                border: '1px solid var(--primary-green)',
                padding: '8px 12px',
                borderRadius: 'var(--border-radius-sm)',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}
              onClick={mobile ? closeMobileMenu : undefined}
            >
              📝 Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation Header */}
      <header className="mobile-nav">
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <h2 style={{ color: 'var(--primary-green)', margin: 0, fontSize: '1.2rem' }}>
          🌱 GreenSocialSite
        </h2>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Sidebar */}
      <SidebarContent mobile={true} />

      <div className="app-layout">
        {/* Desktop Sidebar */}
        <SidebarContent />
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
