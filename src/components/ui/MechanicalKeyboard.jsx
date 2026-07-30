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
import { BsVolumeDownFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";

export default function MechanicalKeyboard({ soundEnabled, soundVolume }) {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const audioCtxRef = useRef(null);

  // Play a mechanical click sound using Web Audio API
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
    } catch (e) {
      // fallback: do nothing
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setActiveKeys((prev) => new Set(prev).add(e.code));
      playKeySound(); // sound on keydown
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

  const keyRows = [
    [
      { label: "esc", code: "Escape", type: "orange", width: "w-[42px]" },
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
      { label: "del", code: "Delete", type: "dark", width: "w-[42px]" },
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
      { label: "←", code: "Backspace", type: "dark", width: "w-[68px]" },
      { label: "pgup", code: "PageUp", type: "dark" },
    ],
    [
      { label: "tab", code: "Tab", type: "dark", width: "w-[58px]" },
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
      { label: "|\n\\", code: "Backslash", type: "dark", width: "w-[52px]" },
      { label: "pgdn", code: "PageDown", type: "dark" },
    ],
    [
      { label: "caps lock", code: "CapsLock", type: "dark", width: "w-[68px]" },
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
      { label: "return", code: "Enter", type: "dark", width: "w-[84px]" },
      { label: "home", code: "Home", type: "dark" },
    ],
    [
      { label: "shift", code: "ShiftLeft", type: "dark", width: "w-[94px]" },
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
      { label: "shift", code: "ShiftRight", type: "dark", width: "w-[58px]" },
      { label: "↑", code: "ArrowUp", type: "light" },
      { label: "end", code: "End", type: "dark" },
    ],
    [
      { label: "ctrl", code: "ControlLeft", type: "dark", width: "w-[54px]" },
      { label: "option", code: "AltLeft", type: "dark", width: "w-[54px]" },
      { label: "⌘", code: "MetaLeft", type: "dark", width: "w-[54px]" },
      { label: "", code: "Space", type: "light", width: "w-[252px]" },
      { label: "⌘", code: "MetaRight", type: "dark", width: "w-[54px]" },
      { label: "fn", code: "Fn", type: "dark", width: "w-[42px]" },
      { label: "ctrl", code: "ControlRight", type: "dark", width: "w-[42px]" },
      { label: "←", code: "ArrowLeft", type: "light" },
      { label: "↓", code: "ArrowDown", type: "light" },
      { label: "→", code: "ArrowRight", type: "light" },
    ],
  ];

  return (
    <div className="bg-[#464648] p-2.5 rounded-2xl shadow-2xl border-[3px] border-[#38383a] max-w-fit mx-auto mt-8 flex flex-col gap-1.5">
      {keyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 justify-center">
          {row.map((key) => {
            const pressed = isPressed(key.code);

            let baseColor = "";
            let shadowColor = "";

            if (key.type === "orange") {
              baseColor = "bg-[#e26928] text-white";
              shadowColor = "shadow-[0_4px_0_#9d4617]";
            } else if (key.type === "light") {
              baseColor = "bg-[#d9d9d9] text-[#333]";
              shadowColor = "shadow-[0_4px_0_#999999]";
            } else if (key.type === "dark") {
              baseColor = "bg-[#717175] text-zinc-100";
              shadowColor = "shadow-[0_4px_0_#4a4a4d]";
            } else if (key.type === "top") {
              baseColor = "bg-[#d9d9d9] text-[#333]";
              shadowColor = "shadow-[0_4px_0_#999999]";
            } else if (key.type === "dark-top") {
              baseColor = "bg-[#717175] text-zinc-100";
              shadowColor = "shadow-[0_4px_0_#4a4a4d]";
            }

            const widthClass = key.width || "w-[42px]";
            const heightClass =
              key.type === "top" ||
              key.type === "dark-top" ||
              (key.type === "orange" && rowIndex === 0)
                ? "h-[36px]"
                : "h-[42px]";

            return (
              <div
                key={key.code}
                className={`
                  ${widthClass} ${heightClass} ${baseColor}
                  rounded-[6px] flex items-center justify-center relative
                  transition-all duration-75 select-none
                  ${pressed ? "translate-y-[4px] shadow-none" : shadowColor}
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
            );
          })}
        </div>
      ))}
    </div>
  );
}
