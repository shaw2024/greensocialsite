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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };
  
  const openMobileMenu = () => {
    setMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const SidebarContent = ({ mobile = false }) => (
    <div className={`${mobile ? 'mobile-sidebar' : 'sidebar'} ${mobile && mobileMenuOpen ? 'open' : ''}`}>
      {!mobile && (
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--primary-green)', fontSize: '1.5rem' }}>
            🌱 GreenSocialSite
          </h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {username ? <>Welcome back, <strong>{username}</strong></> : <>Hello, Guest</>}
          </div>
        </div>
      )}
      
      {mobile && (
        <div style={{ 
          textAlign: 'center', 
          paddingBottom: 'var(--spacing-md)', 
          borderBottom: '1px solid var(--border-light)', 
          marginBottom: 'var(--spacing-md)' 
        }}>
          <h3 style={{ margin: '0 0 4px 0', color: 'var(--primary-green)', fontSize: '1.1rem' }}>
            🌱 Menu
          </h3>
          {username && (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              Hi, <strong>{username}</strong>
            </div>
          )}
        </div>
      )}

      {/* Social Navigation */}
      <nav>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          color: 'var(--text-secondary)', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase',
          fontWeight: '600'
        }}>
          Social
        </h4>
        <div className="nav-section">
          <Link to="/dashboard" className="nav-link" onClick={mobile ? closeMobileMenu : undefined}>
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

      {/* Close button for mobile */}
      {mobile && (
        <button
          onClick={closeMobileMenu}
          style={{
            position: 'absolute',
            top: 'var(--spacing-md)',
            right: 'var(--spacing-md)',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: 'var(--spacing-xs)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      )}
      
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
            <button
              onClick={() => {
                localStorage.setItem('token', 'demo-token');
                localStorage.setItem('username', 'demo');
                if (mobile) closeMobileMenu();
                window.location.href = '/dashboard';
              }}
              style={{
                color: 'var(--white)',
                background: 'var(--primary-green)',
                padding: '10px 12px',
                borderRadius: 'var(--border-radius-sm)',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              🚀 Try Demo
            </button>
            <Link
              to="/login"
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
              🔑 Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-light)',
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
          className="hamburger-btn"
          onClick={() => mobileMenuOpen ? closeMobileMenu() : openMobileMenu()}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            padding: 'var(--spacing-sm)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px'
          }}
        >
          <span style={{
            display: 'block',
            width: '25px',
            height: '3px',
            background: 'var(--primary-green)',
            margin: '3px 0',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></span>
          <span style={{
            display: 'block',
            width: '25px',
            height: '3px',
            background: 'var(--primary-green)',
            margin: '3px 0',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            opacity: mobileMenuOpen ? 0 : 1
          }}></span>
          <span style={{
            display: 'block',
            width: '25px',
            height: '3px',
            background: 'var(--primary-green)',
            margin: '3px 0',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }}></span>
        </button>
        <h2 style={{ color: 'var(--primary-green)', margin: 0, fontSize: '1rem' }}>
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
        {/* Desktop Sidebar - only show on desktop */}
        <div className="sidebar-desktop">
          <SidebarContent />
        </div>
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
