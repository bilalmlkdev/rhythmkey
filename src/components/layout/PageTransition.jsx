import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useNavigate, Link } from "react-router-dom";

const TransitionNavContext = createContext(null);

export function PageTransitionProvider({ isLight, children }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("idle"); // idle | covering | revealing
  const pendingTo = useRef(null);

  const COVER_MS = 260; // time for overlay to become fully opaque
  const REVEAL_MS = 420; // time for overlay to fade back out

  const transitionTo = useCallback(
    (to) => {
      if (phase !== "idle") return; // ignore spam-clicks mid-transition
      pendingTo.current = to;
      setPhase("covering");

      // Wait for the cover animation to finish, THEN swap the route
      // while the screen is fully covered, THEN start revealing.
      setTimeout(() => {
        if (pendingTo.current === -1) {
          navigate(-1);
        } else {
          navigate(pendingTo.current);
        }
        setPhase("revealing");
        setTimeout(() => setPhase("idle"), REVEAL_MS);
      }, COVER_MS);
    },
    [navigate, phase],
  );

  return (
    <TransitionNavContext.Provider value={transitionTo}>
      {children}
      {phase !== "idle" && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none ${
            isLight ? "bg-white" : "bg-[#0b0b0d]"
          } ${
            phase === "covering"
              ? "animate-[fadeIn_260ms_ease-out_forwards]"
              : "animate-[fadeOut_420ms_ease-out_forwards]"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="grid grid-cols-2 gap-1 animate-[pulseScale_0.6s_ease-in-out_infinite]">
              <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm opacity-50" />
            </div>
            <span
              className={`text-xs tracking-wide ${
                isLight ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              RhythmKey
            </span>
          </div>
        </div>
      )}
    </TransitionNavContext.Provider>
  );
}

// For programmatic navigation (e.g. a "back" button) that isn't a
// plain <Link> click. Pass -1 to go back in history, or a path string.
export function useTransitionNavigate() {
  const transitionTo = useContext(TransitionNavContext);
  const navigate = useNavigate();
  return transitionTo || navigate; // fallback if used outside the provider
}

// Drop-in replacement for react-router-dom's <Link> that plays the
// cover/navigate/reveal sequence on every click instead of navigating
// instantly.
export function TransitionLink({ to, onClick, ...props }) {
  const transitionTo = useContext(TransitionNavContext);

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Only intercept plain left-clicks (not ctrl/cmd/middle-click,
    // which should open in a new tab as usual).
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    if (transitionTo) {
      e.preventDefault();
      transitionTo(to);
    }
    // else: let react-router's default Link handle it normally
  };

  return <Link to={to} onClick={handleClick} {...props} />;
}
