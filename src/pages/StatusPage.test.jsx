import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StatusPage from "./StatusPage.jsx";
import { api } from "../services/network.js";

vi.mock("../services/network.js", () => ({ api: { get: vi.fn() } }));
const healthy = {
  status: "ok",
  services: { database: "up", redis: "up" },
  timestamp: "2026-09-21T10:00:00Z",
};

describe("system status", () => {
  it("shows loading while the request is pending", () => {
    api.get.mockReturnValue(new Promise(() => {}));
    render(<StatusPage />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Checking your connection"
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("shows healthy services", async () => {
    api.get.mockResolvedValue({ data: healthy });
    render(<StatusPage />);
    expect(
      await screen.findByText("All systems operational")
    ).toBeInTheDocument();
    expect(screen.getAllByText("Connected")).toHaveLength(3);
  });
  it("renders service failures returned with HTTP 503", async () => {
    api.get.mockRejectedValue({
      response: {
        status: 503,
        data: {
          ...healthy,
          status: "degraded",
          services: { database: "up", redis: "down" },
        },
      },
    });
    render(<StatusPage />);
    expect(
      await screen.findByText("Some services are unavailable")
    ).toBeInTheDocument();
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });
  it("offers a retry after a network error", async () => {
    api.get
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce({ data: healthy });
    render(<StatusPage />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Connection unavailable"
    );
    fireEvent.click(screen.getByRole("button", { name: "Check again" }));
    expect(
      await screen.findByText("All systems operational")
    ).toBeInTheDocument();
  });
  it("aborts an in-flight request when unmounted", () => {
    api.get.mockReturnValue(new Promise(() => {}));
    const { unmount } = render(<StatusPage />);
    const { signal } = api.get.mock.lastCall[1];
    unmount();
    expect(signal.aborted).toBe(true);
  });
});
