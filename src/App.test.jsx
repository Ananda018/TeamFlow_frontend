import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

it("renders the home shell and navigation", () => {
  window.history.replaceState({}, "", "/");
  render(<App />);
  expect(
    screen.getByRole("navigation", { name: "Main navigation" })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "A place for your team"
  );
});

it("shows an unknown route with a way home", () => {
  window.history.replaceState({}, "", "/missing");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "Page not found" })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute(
    "href",
    "/"
  );
  window.history.replaceState({}, "", "/");
});

it("contains rendering failures", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  function BrokenPage() {
    throw new Error("Render failure");
  }
  render(
    <ErrorBoundary>
      <BrokenPage />
    </ErrorBoundary>
  );
  expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
});
