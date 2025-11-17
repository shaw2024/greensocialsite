import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";

function bootstrap() {
  // Clear any existing authentication to ensure fresh start
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  
  // Render the app - user will see login page by default
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
}

bootstrap();
