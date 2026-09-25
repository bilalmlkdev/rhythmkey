import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import { TransitionNavContext } from "./transitionNav";
import { ROUTE_PRELOADS } from "../../routeChunks";

export function PageTransitionProvider({ isLight, children }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("idle"); // idle | covering | revealing
  // React Router runs navigations inside a React transition, so React
  // keeps rendering the OLD route until the destination chunk has
  // committed. Starting the reveal before that swap happens makes the
  // landing page flash through the loader on first-time (slow) chunk
  // loads, so the cover only fades once isNavPending goes false.
  const [isNavPending, startNavTransition] = useTransition();
  // Bumped right after every navigation attempt so the reveal effect
  // re-evaluates even when the destination chunk was already cached and
  // isNavPending never had a chance to be observed as true.
  const [navTick, setNavTick] = useState(0);
  const wantReveal = useRef(false);
  const safetyTimer = useRef(null);

  const COVER_MS = 260; // time for overlay to become fully opaque
  const REVEAL_MS = 420; // time for overlay to fade back out

  const reveal = useCallback(() => {
    wantReveal.current = false;
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
    setPhase((p) => (p === "covering" ? "revealing" : p));
    setTimeout(
      () => setPhase((p) => (p === "revealing" ? "idle" : p)),
      REVEAL_MS,
    );
  }, []);

  // Reveal only after the destination route has actually committed
  // behind the cover (i.e. the lazy chunk finished loading). The state
  // update itself goes through a timeout so this effect never calls
  // setState synchronously.
  useEffect(() => {
    if (!wantReveal.current || phase !== "covering" || isNavPending) return;
    const t = setTimeout(reveal, 0);
    return () => clearTimeout(t);
  }, [isNavPending, phase, navTick, reveal]);

  const transitionTo = useCallback(
    (to) => {
      if (phase !== "idle") return; // ignore spam-clicks mid-transition
      setPhase("covering");

      // Warm the destination chunk while the cover animates, so slow
      // first-time downloads usually finish before we even navigate.
      const preload = ROUTE_PRELOADS[to];
      if (preload) preload().catch(() => {});

      setTimeout(() => {
        wantReveal.current = true;
        startNavTransition(() => {
          if (to === -1) navigate(-1);
          else navigate(to);
        });
        setNavTick((t) => t + 1);
        // Only exists so a dead network can never trap the user behind
        // a permanent cover if the chunk never arrives.
        safetyTimer.current = setTimeout(() => reveal(), 10000);
      }, COVER_MS);
    },
    [phase, navigate, startNavTransition, reveal],
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
