import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <main className="p-6">
          <h1 className="text-3xl font-bold">TeamFlow Frontend</h1>
          <p className="mt-4 text-slate-600">
            New React project starter based on the source structure.
          </p>
        </main>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
