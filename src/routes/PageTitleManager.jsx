import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTitleManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title =
      pathname === "/"
        ? "TeamFlow"
        : pathname === "/status"
          ? "System status | TeamFlow"
          : "Page not found | TeamFlow";
  }, [pathname]);
  return null;
}
