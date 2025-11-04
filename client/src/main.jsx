import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";
import { login } from "./features/auth/authSlice";

// Auto-login component that handles the authentication flow
function AppWithAutoLogin() {
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    async function initializeAuth() {
      const state = store.getState();
      
      // If no token in localStorage and no token in state, try auto-login
      if (!state.auth.token && !localStorage.getItem("token")) {
        try {
          console.log("Attempting auto-login with demo credentials...");
          const result = await store.dispatch(login({ username: "demo", password: "password123" }));
          if (result.type === "auth/login/fulfilled") {
            console.log("Auto-login successful!");
          }
        } catch (err) {
          console.warn("Auto-login failed:", err);
        }
      }
      
      setIsInitialized(true);
    }

    initializeAuth();
  }, []);

  // Show loading until auth is initialized
  if (!isInitialized) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#2d5a27'
      }}>
        🌱 Loading GreenSocialSite...
      </div>
    );
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppWithAutoLogin />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
