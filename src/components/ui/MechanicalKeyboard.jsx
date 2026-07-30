import React, { useState, useRef, useEffect } from "react";
import {
  Sun,
  Monitor,
  Mic,
  Moon,
  SkipBack,
  Play,
  SkipForward,
  VolumeX,
  Lightbulb,
} from "lucide-react";
import { BsVolumeDownFill, BsFillVolumeUpFill } from "react-icons/bs";

export default function MechanicalKeyboard({
  soundEnabled = true,
  soundVolume = 0.5,
}) {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const audioCtxRef = useRef(null);

  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }
      const oscillator = audioCtxRef.current.createOscillator();
      const gainNode = audioCtxRef.current.createGain();
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
      gainNode.gain.setValueAtTime(
        soundVolume,
        audioCtxRef.current.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtxRef.current.currentTime + 0.04,
      );
      oscillator.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);
      oscillator.start();
      oscillator.stop(audioCtxRef.current.currentTime + 0.04);
    } catch (e) {}
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setActiveKeys((prev) => new Set(prev).add(e.code));
      playKeySound();
    };
    const handleKeyUp = (e) => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [soundEnabled, soundVolume]);

  const isPressed = (code) => activeKeys.has(code);

  // ---- Key dimensions tuned for 704 x 259 px ----
  const stdWidth = "w-[38px]"; // standard key width (1u)
  const stdHeight = "h-[40px]"; // standard row key height
  const topHeight = "h-[30px]"; // top row (F‑keys etc.) height
  const gapX = "gap-x-[1px]"; // horizontal gap between keys
  const gapY = "gap-y-[1px]"; // vertical gap between rows

  const keyRows = [
    [
      { label: "esc", code: "Escape", type: "orange" },
      { icon: <Sun size={14} />, code: "F1", type: "top" },
      { icon: <Monitor size={14} />, code: "F2", type: "top" },
      { icon: <Monitor size={14} />, code: "F3", type: "top" },
      { icon: <Monitor size={14} />, code: "F4", type: "top" },
      { icon: <Mic size={14} />, code: "F5", type: "dark-top" },
      { icon: <Moon size={14} />, code: "F6", type: "dark-top" },
      { icon: <SkipBack size={14} />, code: "F7", type: "dark-top" },
      { icon: <Play size={14} />, code: "F8", type: "dark-top" },
      { icon: <SkipForward size={14} />, code: "F9", type: "dark-top" },
      { icon: <VolumeX size={14} />, code: "F10", type: "top" },
      { icon: <BsVolumeDownFill size={14} />, code: "F11", type: "top" },
      { icon: <BsFillVolumeUpFill size={14} />, code: "F12", type: "top" },
      { label: "del", code: "Delete", type: "dark" },
      { icon: <Lightbulb size={14} />, code: "Insert", type: "dark" },
    ],
    [
      { label: "~\n`", code: "Backquote", type: "light" },
      { label: "!\n1", code: "Digit1", type: "light" },
      { label: "@\n2", code: "Digit2", type: "light" },
      { label: "#\n3", code: "Digit3", type: "light" },
      { label: "$\n4", code: "Digit4", type: "light" },
      { label: "%\n5", code: "Digit5", type: "light" },
      { label: "^\n6", code: "Digit6", type: "light" },
      { label: "&\n7", code: "Digit7", type: "light" },
      { label: "*\n8", code: "Digit8", type: "light" },
      { label: "(\n9", code: "Digit9", type: "light" },
      { label: ")\n0", code: "Digit0", type: "light" },
      { label: "_\n-", code: "Minus", type: "light" },
      { label: "+\n=", code: "Equal", type: "light" },
      { label: "←", code: "Backspace", type: "dark", width: "w-[61px]" },
      { label: "pgup", code: "PageUp", type: "dark" },
    ],
    [
      { label: "tab", code: "Tab", type: "dark", width: "w-[52px]" },
      { label: "Q", code: "KeyQ", type: "light" },
      { label: "W", code: "KeyW", type: "light" },
      { label: "E", code: "KeyE", type: "light" },
      { label: "R", code: "KeyR", type: "light" },
      { label: "T", code: "KeyT", type: "light" },
      { label: "Y", code: "KeyY", type: "light" },
      { label: "U", code: "KeyU", type: "light" },
      { label: "I", code: "KeyI", type: "light" },
      { label: "O", code: "KeyO", type: "light" },
      { label: "P", code: "KeyP", type: "light" },
      { label: "{\n[", code: "BracketLeft", type: "light" },
      { label: "}\n]", code: "BracketRight", type: "light" },
      { label: "|\n\\", code: "Backslash", type: "dark", width: "w-[47px]" },
      { label: "pgdn", code: "PageDown", type: "dark" },
    ],
    [
      { label: "caps lock", code: "CapsLock", type: "dark", width: "w-[61px]" },
      { label: "A", code: "KeyA", type: "light" },
      { label: "S", code: "KeyS", type: "light" },
      { label: "D", code: "KeyD", type: "light" },
      { label: "F", code: "KeyF", type: "light" },
      { label: "G", code: "KeyG", type: "light" },
      { label: "H", code: "KeyH", type: "light" },
      { label: "J", code: "KeyJ", type: "light" },
      { label: "K", code: "KeyK", type: "light" },
      { label: "L", code: "KeyL", type: "light" },
      { label: ":\n;", code: "Semicolon", type: "light" },
      { label: "\"\n'", code: "Quote", type: "light" },
      { label: "return", code: "Enter", type: "dark", width: "w-[76px]" },
      { label: "home", code: "Home", type: "dark" },
    ],
    [
      { label: "shift", code: "ShiftLeft", type: "dark", width: "w-[85px]" },
      { label: "Z", code: "KeyZ", type: "light" },
      { label: "X", code: "KeyX", type: "light" },
      { label: "C", code: "KeyC", type: "light" },
      { label: "V", code: "KeyV", type: "light" },
      { label: "B", code: "KeyB", type: "light" },
      { label: "N", code: "KeyN", type: "light" },
      { label: "M", code: "KeyM", type: "light" },
      { label: "<\n,", code: "Comma", type: "light" },
      { label: ">\n.", code: "Period", type: "light" },
      { label: "?\n/", code: "Slash", type: "light" },
      { label: "shift", code: "ShiftRight", type: "dark", width: "w-[52px]" },
      { label: "↑", code: "ArrowUp", type: "light" },
      { label: "end", code: "End", type: "dark" },
    ],
    [
      { label: "ctrl", code: "ControlLeft", type: "dark", width: "w-[49px]" },
      { label: "option", code: "AltLeft", type: "dark", width: "w-[49px]" },
      { label: "⌘", code: "MetaLeft", type: "dark", width: "w-[49px]" },
      { label: "", code: "Space", type: "light", width: "w-[228px]" },
      { label: "⌘", code: "MetaRight", type: "dark", width: "w-[49px]" },
      { label: "fn", code: "Fn", type: "dark", width: "w-[38px]" },
      { label: "ctrl", code: "ControlRight", type: "dark", width: "w-[38px]" },
      { label: "←", code: "ArrowLeft", type: "light" },
      { label: "↓", code: "ArrowDown", type: "light" },
      { label: "→", code: "ArrowRight", type: "light" },
    ],
  ];

  return (
    <div className="w-[704px] h-[259px] bg-[#464648] p-2 rounded-2xl shadow-2xl border-2 border-[#38383a] mx-auto flex flex-col justify-center">
      <div className={`flex flex-col ${gapY} h-full justify-center`}>
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className={`flex ${gapX} justify-center`}>
            {row.map((key) => {
              const pressed = isPressed(key.code);

              let baseBg = "";
              let surfaceBg = "";
              let shadowClass = "";
              let textColor = "";

              // Adjusted colors to closely match your reference screenshot
              if (key.type === "orange") {
                baseBg = "bg-[#c2410c]";
                surfaceBg = "bg-[#ea580c]";
                shadowClass =
                  "shadow-[0_4px_0_#9a3412,0_5px_4px_rgba(0,0,0,0.3)]";
                textColor = "text-white";
              } else if (key.type === "light" || key.type === "top") {
                baseBg = "bg-[#d1d5db]";
                surfaceBg = "bg-[#f3f4f6]";
                shadowClass =
                  "shadow-[0_4px_0_#9ca3af,0_5px_4px_rgba(0,0,0,0.2)]";
                textColor = "text-[#374151]";
              } else {
                // dark & dark-top types
                baseBg = "bg-[#4b5563]";
                surfaceBg = "bg-[#6b7280]";
                shadowClass =
                  "shadow-[0_4px_0_#374151,0_5px_4px_rgba(0,0,0,0.3)]";
                textColor = "text-gray-100";
              }

              const widthClass = key.width || stdWidth;
              const heightClass =
                key.type === "top" ||
                key.type === "dark-top" ||
                (key.type === "orange" && rowIndex === 0)
                  ? topHeight
                  : stdHeight;

              return (
                <div
                  key={key.code}
                  className={`
                    ${widthClass} ${heightClass} ${baseBg}
                    rounded-[6px] relative select-none
                    transition-all duration-75
                    ${pressed ? "translate-y-[4px] shadow-[0_0px_0_transparent,0_1px_2px_rgba(0,0,0,0.2)]" : shadowClass}
                  `}
                >
                  {/* The Inner Keycap Surface */}
                  <div
                    className={`
                      absolute left-[3px] right-[3px] top-[2px] bottom-[5px]
                      rounded-[4px] flex items-center justify-center
                      ${surfaceBg} ${textColor}
                      border-t-[1px] border-white/60 border-b-[1px] border-black/10
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.05)]
                    `}
                  >
                    {key.icon ? (
                      <span className="flex items-center justify-center">
                        {key.icon}
                      </span>
                    ) : (
                      <span
                        className="whitespace-pre text-center leading-tight font-medium"
                        style={{ fontSize: "10px" }}
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
    </div>
  );
}
