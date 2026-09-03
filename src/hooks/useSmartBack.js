import { useTransitionNavigate } from "../components/layout/PageTransition";

/**
 * Returns a function that navigates back in browser history
 */
export function useSmartBack(fallbackPath = "/") {
  const navigate = useTransitionNavigate();

  return () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };
}
