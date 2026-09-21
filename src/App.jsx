import { BrowserRouter, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import PageTitleManager from "./routes/PageTitleManager.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <PageTitleManager />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="app-shell">
          <header className="app-header">
            <NavLink to="/" className="brand" aria-label="TeamFlow home">
              <span className="brand-mark" aria-hidden="true">
                T
              </span>
              TeamFlow
            </NavLink>
            <nav aria-label="Main navigation">
              <NavLink to="/" end>
                Home
              </NavLink>
              <NavLink to="/status">System status</NavLink>
            </nav>
          </header>
          <main id="main-content" className="app-main" tabIndex={-1}>
            <AppRoutes />
          </main>
          <footer className="app-footer">
            TeamFlow · A shared space for your team.
          </footer>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
