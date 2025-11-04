import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";
import { login } from "./features/auth/authSlice";

async function bootstrap() {
  // Auto-login with seeded demo credentials to bypass signin
  const state = store.getState();
  if (!state.auth.token) {
    try {
      await store.dispatch(login({ username: "demo", password: "password123" }));
    } catch (err) {
      // ignore - will show login page if auto-login fails
      console.warn("Auto-login failed:", err);
    }
  }

  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={import.meta.env.PROD ? "/greensocialsite" : "/"}>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

bootstrap();
