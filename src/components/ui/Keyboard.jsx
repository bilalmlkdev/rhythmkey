import { useState, useRef, useEffect } from "react";
import {
  SunDim, Sun, LayoutGrid, Search, Mic, Moon, Rewind, Play, FastForward,
  VolumeX, Volume1, Volume2, Hash, Lightbulb, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight,
} from "lucide-react";

// ---- Theme tokens ----
// Every theme sets: case (frame), base (letter keys), mod (modifier keys),
// accent (esc/enter/space), text-on-base, text-on-mod, text-on-accent.
const THEMES = {
  classic: {
    case: "#232226", base: "#e4d7d7", mod: "#9b72ff", accent: "#9b72ff",
    textBase: "#4a4a4b", textMod: "#f0f0f0", textAccent: "#ffffff",
  },
  mint: {
    case: "#1b2622", base: "#eaf3ee", mod: "#2f6f56", accent: "#37b787",
    textBase: "#264034", textMod: "#eafaf3", textAccent: "#ffffff",
  },
  royal: {
    case: "#1a1c30", base: "#e2e4f7", mod: "#3c3f8a", accent: "#5b5fef",
    textBase: "#2a2b52", textMod: "#eceefd", textAccent: "#ffffff",
  },
  dolch: {
    case: "#2b241c", base: "#f1e6cf", mod: "#6b5236", accent: "#c98a3f",
    textBase: "#4a3c26", textMod: "#f6ecd9", textAccent: "#2b2115",
  },
  sand: {
    case: "#26221b", base: "#f3ead4", mod: "#8a6f45", accent: "#c9a227",
    textBase: "#4a3c22", textMod: "#f8f1de", textAccent: "#2b2115",
  },
  scarlet: {
    case: "#241416", base: "#e9e2e2", mod: "#5c1a1a", accent: "#d43b34",
    textBase: "#3a2222", textMod: "#f3e4e4", textAccent: "#ffffff",
  },
};

export const KEYBOARD_THEMES = Object.keys(THEMES);

// Small preview tokens (base + accent only) so other components can render
// an accurate swatch without duplicating the full theme definitions above.
export const KEYBOARD_THEME_PREVIEWS = Object.fromEntries(
  Object.entries(THEMES).map(([name, t]) => [name, { base: t.base, accent: t.accent }])
);

const LAYOUT_MAPS = {
  qwerty: {},
  azerty: {
    KeyQ: "A", KeyW: "Z", KeyA: "Q", KeyZ: "W", KeyM: ";", Semicolon: "M",
    Minus: ")", Equal: "=", BracketLeft: "^", BracketRight: "$",
    Backslash: "£", Quote: "ù", Slash: "!",
  },
  dvorak: {
    KeyQ: "'", KeyW: ",", KeyE: ".", KeyR: "P", KeyT: "Y", KeyY: "F", KeyU: "G",
    KeyI: "C", KeyO: "R", KeyP: "L", KeyA: "A", KeyS: "O", KeyD: "E", KeyF: "U",
    KeyG: "I", KeyH: "D", KeyJ: "H", KeyK: "T", KeyL: "N", KeyZ: ";", KeyX: "Q",
    KeyC: "J", KeyV: "K", KeyB: "X", KeyN: "B", KeyM: "M", Minus: "[", Equal: "]",
    BracketLeft: "/", BracketRight: "=", Backslash: "\\", Semicolon: "S",
    Quote: "-", Comma: "W", Period: "V", Slash: "Z",
  },
};

function buildBaseRows() {
  return [
    [
      { label: "esc", code: "Escape", width: "45px", color: "accent", align: "tl" },
      { label: "F1", icon: <SunDim size={12} />, code: "F1", width: "40px", color: "base", align: "c" },
      { label: "F2", icon: <Sun size={12} />, code: "F2", width: "40px", color: "base", align: "c" },
      { label: "F3", icon: <LayoutGrid size={12} />, code: "F3", width: "40px", color: "base", align: "c" },
      { label: "F4", icon: <Search size={11} />, code: "F4", width: "40px", color: "base", align: "c" },
      { label: "F5", icon: <Mic size={11} />, code: "F5", width: "40px", color: "mod", align: "c" },
      { label: "F6", icon: <Moon size={11} />, code: "F6", width: "40px", color: "mod", align: "c" },
      { label: "F7", icon: <Rewind size={11} />, code: "F7", width: "40px", color: "mod", align: "c" },
      { label: "F8", icon: <Play size={11} />, code: "F8", width: "40px", color: "mod", align: "c" },
      { label: "F9", icon: <FastForward size={11} />, code: "F9", width: "40px", color: "mod", align: "c" },
      { label: "F10", icon: <VolumeX size={11} />, code: "F10", width: "40px", color: "base", align: "c" },
      { label: "F11", icon: <Volume1 size={11} />, code: "F11", width: "40px", color: "base", align: "c" },
      { label: "F12", icon: <Volume2 size={11} />, code: "F12", width: "40px", color: "base", align: "c" },
      { label: "", icon: <Hash size={10} />, code: "F13", width: "40px", color: "mod", align: "tl" },
      { label: "del", code: "Delete", width: "45px", color: "mod", align: "tl" },
      { label: "", icon: <Lightbulb size={10} />, code: "Insert", width: "45px", color: "mod", align: "tl" },
    ],
    [
      { label: "~\n`", code: "Backquote", width: "40px", color: "base", align: "tl" },
      { label: "!\n1", code: "Digit1", width: "40px", color: "base", align: "tl" },
      { label: "@\n2", code: "Digit2", width: "40px", color: "base", align: "tl" },
      { label: "#\n3", code: "Digit3", width: "40px", color: "base", align: "tl" },
      { label: "$\n4", code: "Digit4", width: "40px", color: "base", align: "tl" },
      { label: "%\n5", code: "Digit5", width: "40px", color: "base", align: "tl" },
      { label: "^\n6", code: "Digit6", width: "40px", color: "base", align: "tl" },
      { label: "&\n7", code: "Digit7", width: "40px", color: "base", align: "tl" },
      { label: "*\n8", code: "Digit8", width: "40px", color: "base", align: "tl" },
      { label: "(\n9", code: "Digit9", width: "40px", color: "base", align: "tl" },
      { label: ")\n0", code: "Digit0", width: "40px", color: "base", align: "tl" },
      { label: "_\n-", code: "Minus", width: "40px", color: "base", align: "tl" },
      { label: "+\n=", code: "Equal", width: "40px", color: "base", align: "tl" },
      { label: "backspace\n←", code: "Backspace", width: "96px", color: "mod", align: "tl" },
      { label: "pgup", code: "PageUp", width: "40px", color: "mod", align: "tl" },
    ],
    [
      { label: "tab", code: "Tab", width: "68px", color: "mod", align: "tl" },
      { label: "Q", code: "KeyQ", width: "40px", color: "base", align: "tl" },
      { label: "W", code: "KeyW", width: "40px", color: "base", align: "tl" },
      { label: "E", code: "KeyE", width: "40px", color: "base", align: "tl" },
      { label: "R", code: "KeyR", width: "40px", color: "base", align: "tl" },
      { label: "T", code: "KeyT", width: "40px", color: "base", align: "tl" },
      { label: "Y", code: "KeyY", width: "40px", color: "base", align: "tl" },
      { label: "U", code: "KeyU", width: "40px", color: "base", align: "tl" },
      { label: "I", code: "KeyI", width: "40px", color: "base", align: "tl" },
      { label: "O", code: "KeyO", width: "40px", color: "base", align: "tl" },
      { label: "P", code: "KeyP", width: "40px", color: "base", align: "tl" },
      { label: "{\n[", code: "BracketLeft", width: "40px", color: "base", align: "tl" },
      { label: "}\n]", code: "BracketRight", width: "40px", color: "base", align: "tl" },
      { label: "|\n\\", code: "Backslash", width: "68px", color: "base", align: "tl" },
      { label: "pgdn", code: "PageDown", width: "40px", color: "mod", align: "tl" },
    ],
    [
      { label: "caps lock", code: "CapsLock", width: "83px", color: "mod", align: "tl" },
      { label: "A", code: "KeyA", width: "40px", color: "base", align: "tl" },
      { label: "S", code: "KeyS", width: "40px", color: "base", align: "tl" },
      { label: "D", code: "KeyD", width: "40px", color: "base", align: "tl" },
      { label: "F", code: "KeyF", width: "40px", color: "base", align: "tl" },
      { label: "G", code: "KeyG", width: "40px", color: "base", align: "tl" },
      { label: "H", code: "KeyH", width: "40px", color: "base", align: "tl" },
      { label: "J", code: "KeyJ", width: "40px", color: "base", align: "tl" },
      { label: "K", code: "KeyK", width: "40px", color: "base", align: "tl" },
      { label: "L", code: "KeyL", width: "40px", color: "base", align: "tl" },
      { label: ":\n;", code: "Semicolon", width: "40px", color: "base", align: "tl" },
      { label: "\"\n'", code: "Quote", width: "40px", color: "base", align: "tl" },
      { label: "return", code: "Enter", width: "95px", color: "accent", align: "tl" },
      { label: "home", code: "Home", width: "40px", color: "mod", align: "tl" },
    ],
    [
      { label: "shift", code: "ShiftLeft", width: "100px", color: "mod", align: "tl" },
      { label: "Z", code: "KeyZ", width: "40px", color: "base", align: "tl" },
      { label: "X", code: "KeyX", width: "40px", color: "base", align: "tl" },
      { label: "C", code: "KeyC", width: "40px", color: "base", align: "tl" },
      { label: "V", code: "KeyV", width: "40px", color: "base", align: "tl" },
      { label: "B", code: "KeyB", width: "40px", color: "base", align: "tl" },
      { label: "N", code: "KeyN", width: "40px", color: "base", align: "tl" },
      { label: "M", code: "KeyM", width: "40px", color: "base", align: "tl" },
      { label: "<\n,", code: "Comma", width: "40px", color: "base", align: "tl" },
      { label: ">\n.", code: "Period", width: "40px", color: "base", align: "tl" },
      { label: "?\n/", code: "Slash", width: "40px", color: "base", align: "tl" },
      { label: "shift", code: "ShiftRight", width: "78px", color: "mod", align: "tl" },
      { label: "", icon: <ChevronUp size={16} />, code: "ArrowUp", width: "40px", color: "base", align: "c" },
      { label: "end", code: "End", width: "40px", color: "mod", align: "tl" },
    ],
    [
      { label: "ctrl", code: "ControlLeft", width: "51px", color: "mod", align: "tl" },
      { label: "option", code: "AltLeft", width: "51px", color: "mod", align: "tl" },
      { label: "⌘", code: "MetaLeft", width: "51px", color: "mod", align: "tl" },
      { label: "", code: "Space", width: "271px", color: "base", align: "c" },
      { label: "⌘", code: "MetaRight", width: "40px", color: "mod", align: "tl" },
      { label: "fn", code: "Fn", width: "40px", color: "mod", align: "tl" },
      { label: "ctrl", code: "ControlRight", width: "40px", color: "mod", align: "tl" },
      { label: "", icon: <ChevronLeft size={16} />, code: "ArrowLeft", width: "40px", color: "base", align: "c" },
      { label: "", icon: <ChevronDown size={16} />, code: "ArrowDown", width: "40px", color: "base", align: "c" },
      { label: "", icon: <ChevronRight size={16} />, code: "ArrowRight", width: "40px", color: "base", align: "c" },
    ],
  ];
}

export default function Keyboard({
  theme = "classic",
  layout = "qwerty",
  enableSound = true,
  enableHaptics = true,
  soundUrl = "/sounds/click.ogg",
  className = "",
  align = "center",
  onKeyEvent,
}) {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);
  const t = THEMES[theme] ?? THEMES.classic;

  useEffect(() => {
    if (!enableSound) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        audioCtxRef.current = new Ctx();
      }
      fetch(soundUrl)
        .then((r) => r.arrayBuffer())
        .then((buf) => audioCtxRef.current.decodeAudioData(buf))
        .then((decoded) => { audioBufferRef.current = decoded; })
        .catch(() => {});
    } catch {
      /* AudioContext unavailable */
    }
  }, [enableSound, soundUrl]);

  const playSound = () => {
    if (!enableSound || !audioCtxRef.current || !audioBufferRef.current) return;
    try {
      if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      const gain = audioCtxRef.current.createGain();
      gain.gain.setValueAtTime(0.5, audioCtxRef.current.currentTime);
      source.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      source.start(0);
    } catch {
      /* playback failed */
    }
  };

  const triggerHaptics = () => {
    if (!enableHaptics) return;
    try {
      navigator.vibrate?.(6);
    } catch {
      /* vibration unavailable */
    }
  };

  const pressKey = (code, source = "physical") => {
    setActiveKeys((prev) => new Set(prev).add(code));
    playSound();
    triggerHaptics();
    onKeyEvent?.({ code, phase: "down", source });
  };

  const releaseKey = (code, source = "physical") => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(code);
      return next;
    });
    onKeyEvent?.({ code, phase: "up", source });
  };

  useEffect(() => {
    const handleDown = (e) => {
      if (e.repeat) return;
      pressKey(e.code, "physical");
    };
    const handleUp = (e) => {
      releaseKey(e.code, "physical");
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSound, enableHaptics, onKeyEvent]);

  const isPressed = (code) => activeKeys.has(code);

  const getMappedLabel = (key) => {
    const map = LAYOUT_MAPS[layout] ?? {};
    const mapped = map[key.code];
    return mapped ? { label: mapped } : null;
  };

  const keyRows = buildBaseRows().map((row) =>
    row.map((key) => {
      const mapped = getMappedLabel(key);
      return mapped ? { ...key, ...mapped } : key;
    })
  );

  const colorFor = (color) => {
    if (color === "accent") return { bg: t.accent, fg: t.textAccent };
    if (color === "mod") return { bg: t.mod, fg: t.textMod };
    return { bg: t.base, fg: t.textBase };
  };

  return (
    <div
      className={`keyboard-frame shadow-inner  flex flex-col gap-[1.5px] relative ${className}`}
      // style={{ background: t.case, borderColor: "rgba(255,255,255,0.06)" }}
    >
      {keyRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-[1.5px] w-max ${align === "start" ? "justify-start" : "justify-center"}`}
        >
          {row.map((key) => {
            const pressed = isPressed(key.code);
            const isFKey = /^F([1-9]|1[0-2])$/.test(key.code);
            const { bg, fg } = colorFor(key.color);
            const style = {
              width: key.width,
              flexShrink: 0,
              background: bg,
              transform: pressed ? "translateY(2px)" : "none",
              boxShadow: pressed
                ? "inset -1px 0 1px rgba(0,0,0,.15), inset 0 -2px 2px rgba(0,0,0,.25), 0 0 0 1px rgba(0,0,0,.6), 1px 2px 4px rgba(0,0,0,.25)"
                : "inset -2px 0 2px rgba(0,0,0,.2), inset 0 -3px 3px rgba(0,0,0,.3), 0 0 0 1px rgba(0,0,0,.6), 2px 5px 8px rgba(0,0,0,.28)",
            };
            const faceStyle = {
              position: "absolute",
              top: pressed ? "3px" : "2px",
              left: "3px",
              right: "6px",
              bottom: pressed ? "6px" : "8px",
              borderRadius: "4px",
              background: bg,
              boxShadow:
                "-2px -2px 3px rgba(255,255,255,0.05), 2px 2px 3px rgba(0,0,0,0.1)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(0,0,0,0.15)",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              transition: "all 0.05s ease-in-out",
            };
            return (
              <div
                key={key.code}
                role="button"
                tabIndex={-1}
                aria-label={key.label || key.code}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pressKey(key.code, "mouse");
                }}
                onMouseUp={() => releaseKey(key.code, "mouse")}
                onMouseLeave={() => {
                  if (isPressed(key.code)) releaseKey(key.code, "mouse");
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  pressKey(key.code, "touch");
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  releaseKey(key.code, "touch");
                }}
                style={style}
                className="relative inline-flex rounded-[6px] h-[40px] overflow-hidden select-none transition-transform duration-75 cursor-pointer"
              >
                <div aria-hidden="true" style={faceStyle} />
                <div
                  className={`relative z-[1] flex flex-col w-full h-full font-medium leading-[1.15] whitespace-pre-wrap pointer-events-none ${
                    key.align === "c"
                      ? "items-center justify-center p-1 text-center"
                      : "items-start justify-start px-[7px] py-[5px] text-left"
                  } ${isFKey ? "-translate-y-[2px]" : ""}`}
                  style={{ color: fg, fontSize: "10px" }}
                >
                  {key.icon && <span className="mb-[2px]">{key.icon}</span>}
                  {key.label && (
                    <span
                      className={
                        key.icon ? "text-[8.5px] opacity-90 mt-[1px]" : ""
                      }
                    >
                      {key.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
