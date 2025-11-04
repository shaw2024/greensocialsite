import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";
import { login } from "./features/auth/authSlice";

async function bootstrap() {
  // Auto-login with seeded demo credentials if there's no token
  const state = store.getState();
  if (!state.auth.token) {
    try {
      await store.dispatch(login({ username: "demo", password: "password123" }));
    } catch (err) {
      // ignore - user can still interact with UI to trigger login
      console.warn("Auto-login failed:", err);
    }
  }

  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

bootstrap();
