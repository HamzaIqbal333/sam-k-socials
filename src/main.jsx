import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App.jsx";

// Empty ("/") everywhere except the GitHub Pages build, which sets this to "/<repo-name>/"
// via .env.ghpages (see ADMIN_SETUP.md / the GitHub Pages deploy notes) — project sites there
// are served from a subpath, so React Router needs to know it up front.
const basename = import.meta.env.VITE_ROUTER_BASENAME || "/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
