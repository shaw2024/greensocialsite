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
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      <aside style={{ padding: 12, borderRight: '1px solid #ddd' }}>
        <h3>GreenSocialSite</h3>
        <div style={{ marginBottom: 12 }}>{username ? <>Hello, {username}</> : <>Hello, Guest</>}</div>
        <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
          {categories.map(c => (
            <div key={c._id}><Link to={`/category/${c._id}`}>{c.name}</Link></div>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => navigate('/new')}>New Question</button>
          {username && <button onClick={doLogout} style={{ marginLeft: 8 }}>Logout</button>}
          {!username && <div style={{ marginTop: 8 }}><small>Using demo account automatically.</small></div>}
        </div>
      </aside>
      <main style={{ padding: 12 }}>
        <Outlet />
      </main>
    </div>
  );
}
