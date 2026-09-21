import { useEffect, useState } from "react";
import { api } from "../services/network.js";

export default function StatusPage() {
  const [state, setState] = useState({ loading: true, data: null, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    api
      .get("/health", { signal: controller.signal })
      .then(({ data }) => {
        if (!controller.signal.aborted)
          setState({ loading: false, data, error: "" });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        if (error.response?.status === 503 && error.response.data?.services) {
          setState({ loading: false, data: error.response.data, error: "" });
        } else {
          setState({
            loading: false,
            data: null,
            error: "We couldn't reach TeamFlow. Please try again in a moment.",
          });
        }
      });
    return () => controller.abort();
  }, [attempt]);

  function refresh() {
    setState({ loading: true, data: null, error: "" });
    setAttempt((value) => value + 1);
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Connection overview</p>
          <h1>System status</h1>
        </div>
        <button
          className="button secondary"
          onClick={refresh}
          disabled={state.loading}
        >
          {state.loading ? "Checking…" : "Check again"}
        </button>
      </div>
      <div aria-live="polite" aria-busy={state.loading}>
        {state.loading && (
          <p className="panel" role="status">
            Checking your connection…
          </p>
        )}
        {state.error && (
          <div className="panel error-panel" role="alert">
            <h2>Connection unavailable</h2>
            <p>{state.error}</p>
          </div>
        )}
        {state.data && (
          <>
            <div className="panel status-summary">
              <span
                className={
                  state.data.status === "ok"
                    ? "status-dot up"
                    : "status-dot down"
                }
                aria-hidden="true"
              />
              <div>
                <h2>
                  {state.data.status === "ok"
                    ? "All systems operational"
                    : "Some services are unavailable"}
                </h2>
                <p>
                  {state.data.status === "ok"
                    ? "Your workspace services are connected."
                    : "Please check again shortly."}
                </p>
              </div>
            </div>
            <dl className="service-grid">
              {[
                ["API", "up"],
                ["Database", state.data.services.database],
                ["Cache", state.data.services.redis],
              ].map(([name, status]) => (
                <div className="panel service-card" key={name}>
                  <dt>{name}</dt>
                  <dd className={status === "up" ? "badge up" : "badge down"}>
                    {status === "up" ? "Connected" : "Unavailable"}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="last-checked">
              Last checked:{" "}
              {new Date(state.data.timestamp).toLocaleTimeString()}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
