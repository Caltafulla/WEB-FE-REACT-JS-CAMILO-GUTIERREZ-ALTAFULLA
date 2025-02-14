import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("app-root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
