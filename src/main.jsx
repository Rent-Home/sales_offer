import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/BusinessAuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
         <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
