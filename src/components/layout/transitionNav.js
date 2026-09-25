import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Shared between PageTransition (provider) and consumers, kept out of
// the component file so react-refresh keeps PageTransition.jsx a
// components-only module.
export const TransitionNavContext = createContext(null);

// For programmatic navigation (e.g. a "back" button) that isn't a
// plain <Link> click. Pass -1 to go back in history, or a path string.
export function useTransitionNavigate() {
  const transitionTo = useContext(TransitionNavContext);
  const navigate = useNavigate();
  return transitionTo || navigate; // fallback if used outside the provider
}
