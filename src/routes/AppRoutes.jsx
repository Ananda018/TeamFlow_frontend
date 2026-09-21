import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import StatusPage from "../pages/StatusPage.jsx";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/status" element={<StatusPage />} />
    <Route
      path="*"
      element={
        <section className="panel">
          <h1>Page not found</h1>
          <p>This page doesn't exist.</p>
          <Link className="button" to="/">
            Go home
          </Link>
        </section>
      }
    />
  </Routes>
);
