import { Routes, Route } from "react-router-dom";

const HomePage = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
    <h2 className="text-2xl font-semibold">Home</h2>
    <p className="mt-2 text-slate-600">
      This is the default route for the new app shell.
    </p>
  </div>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);
