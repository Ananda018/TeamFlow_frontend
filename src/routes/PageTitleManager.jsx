import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const title = location.pathname === "/" ? "TeamFlow" : "TeamFlow | App";
    document.title = title;
  }, [location]);

  return null;
};

export default PageTitleManager;
