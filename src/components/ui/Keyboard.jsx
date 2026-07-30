import React, { useState, useRef, useEffect } from "react";
import clickSound from '../../sounds/click.wav';
import {
  SunDim,
  Sun,
  LayoutGrid,
  Search,
  Mic,
  Moon,
  Rewind,
  Play,
  FastForward,
  VolumeX,
  Volume1,
  Volume2,
  Hash,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MechanicalKeyboard({
  soundEnabled = true,
  soundVolume = 1,
  audioSrc = clickSound,
}) {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);

  // Load and decode the audio file once on mount
  useEffect(() => {
    if (!soundEnabled || !audioSrc) return;

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }

      fetch(audioSrc)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => audioCtxRef.current.decodeAudioData(arrayBuffer))
        .then((decodedBuffer) => {
          audioBufferRef.current = decodedBuffer;
        })
        .catch((error) => {
          console.error("Error loading keyboard audio file:", error);
        });
    } catch (e) {
      console.error(e);
    }
  }, [audioSrc, soundEnabled]);

  const playKeySound = () => {
    if (!soundEnabled || !audioCtxRef.current || !audioBufferRef.current) return;

    try {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      // Create a buffer source for the key click
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;

      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.setValueAtTime(soundVolume, audioCtxRef.current.currentTime);

      source.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);

      // Play the full single-click sound from the beginning (0)
      source.start(0);
    } catch (e) {
      console.error(e);
    }
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

  const keyRows = [
    [
      { label: "esc", code: "Escape", width: "45px", color: "bright-red", align: "tl" },
      { label: "F1", icon: <SunDim size={14} />, code: "F1", width: "40px", color: "white", align: "c" },
      { label: "F2", icon: <Sun size={14} />, code: "F2", width: "40px", color: "white", align: "c" },
      { label: "F3", icon: <LayoutGrid size={14} />, code: "F3", width: "40px", color: "white", align: "c" },
      { label: "F4", icon: <Search size={14} />, code: "F4", width: "40px", color: "white", align: "c" },
      { label: "F5", icon: <Mic size={14} />, code: "F5", width: "40px", color: "dark-red", align: "c" },
      { label: "F6", icon: <Moon size={14} />, code: "F6", width: "40px", color: "dark-red", align: "c" },
      { label: "F7", icon: <Rewind size={14} />, code: "F7", width: "40px", color: "dark-red", align: "c" },
      { label: "F8", icon: <Play size={14} />, code: "F8", width: "40px", color: "dark-red", align: "c" },
      { label: "F9", icon: <FastForward size={14} />, code: "F9", width: "40px", color: "dark-red", align: "c" },
      { label: "F10", icon: <VolumeX size={14} />, code: "F10", width: "40px", color: "white", align: "c" },
      { label: "F11", icon: <Volume1 size={14} />, code: "F11", width: "40px", color: "white", align: "c" },
      { label: "F12", icon: <Volume2 size={14} />, code: "F12", width: "40px", color: "white", align: "c" },
      { label: "", icon: <Hash size={14} />, code: "F13", width: "40px", color: "dark-red", align: "c" },
      { label: "del", code: "Delete", width: "45px", color: "dark-red", align: "tl" },
      { label: "", icon: <Lightbulb size={14} />, code: "Insert", width: "45px", color: "dark-red", align: "c" },
    ],
    [
      { label: "~\n`", code: "Backquote", width: "40px", color: "white", align: "tl" },
      { label: "!\n1", code: "Digit1", width: "40px", color: "white", align: "tl" },
      { label: "@\n2", code: "Digit2", width: "40px", color: "white", align: "tl" },
      { label: "#\n3", code: "Digit3", width: "40px", color: "white", align: "tl" },
      { label: "$\n4", code: "Digit4", width: "40px", color: "white", align: "tl" },
      { label: "%\n5", code: "Digit5", width: "40px", color: "white", align: "tl" },
      { label: "^\n6", code: "Digit6", width: "40px", color: "white", align: "tl" },
      { label: "&\n7", code: "Digit7", width: "40px", color: "white", align: "tl" },
      { label: "*\n8", code: "Digit8", width: "40px", color: "white", align: "tl" },
      { label: "(\n9", code: "Digit9", width: "40px", color: "white", align: "tl" },
      { label: ")\n0", code: "Digit0", width: "40px", color: "white", align: "tl" },
      { label: "_\n-", code: "Minus", width: "40px", color: "white", align: "tl" },
      { label: "+\n=", code: "Equal", width: "40px", color: "white", align: "tl" },
      { label: "←", code: "Backspace", width: "96px", color: "dark-red", align: "tl" },
      { label: "pgup", code: "PageUp", width: "40px", color: "dark-red", align: "tl" },
    ],
    [
      { label: "tab", code: "Tab", width: "68px", color: "dark-red", align: "tl" },
      { label: "Q", code: "KeyQ", width: "40px", color: "white", align: "tl" },
      { label: "W", code: "KeyW", width: "40px", color: "white", align: "tl" },
      { label: "E", code: "KeyE", width: "40px", color: "white", align: "tl" },
      { label: "R", code: "KeyR", width: "40px", color: "white", align: "tl" },
      { label: "T", code: "KeyT", width: "40px", color: "white", align: "tl" },
      { label: "Y", code: "KeyY", width: "40px", color: "white", align: "tl" },
      { label: "U", code: "KeyU", width: "40px", color: "white", align: "tl" },
      { label: "I", code: "KeyI", width: "40px", color: "white", align: "tl" },
      { label: "O", code: "KeyO", width: "40px", color: "white", align: "tl" },
      { label: "P", code: "KeyP", width: "40px", color: "white", align: "tl" },
      { label: "{\n[", code: "BracketLeft", width: "40px", color: "white", align: "tl" },
      { label: "}\n]", code: "BracketRight", width: "40px", color: "white", align: "tl" },
      { label: "|\n\\", code: "Backslash", width: "68px", color: "white", align: "tl" },
      { label: "pgdn", code: "PageDown", width: "40px", color: "dark-red", align: "tl" },
    ],
    [
      { label: "caps lock", code: "CapsLock", width: "83px", color: "dark-red", align: "tl" },
      { label: "A", code: "KeyA", width: "40px", color: "white", align: "tl" },
      { label: "S", code: "KeyS", width: "40px", color: "white", align: "tl" },
      { label: "D", code: "KeyD", width: "40px", color: "white", align: "tl" },
      { label: "F", code: "KeyF", width: "40px", color: "white", align: "tl" },
      { label: "G", code: "KeyG", width: "40px", color: "white", align: "tl" },
      { label: "H", code: "KeyH", width: "40px", color: "white", align: "tl" },
      { label: "J", code: "KeyJ", width: "40px", color: "white", align: "tl" },
      { label: "K", code: "KeyK", width: "40px", color: "white", align: "tl" },
      { label: "L", code: "KeyL", width: "40px", color: "white", align: "tl" },
      { label: ":\n;", code: "Semicolon", width: "40px", color: "white", align: "tl" },
      { label: "\"\n'", code: "Quote", width: "40px", color: "white", align: "tl" },
      { label: "return", code: "Enter", width: "95px", color: "bright-red", align: "tl" },
      { label: "home", code: "Home", width: "40px", color: "dark-red", align: "tl" },
    ],
    [
      { label: "shift", code: "ShiftLeft", width: "100px", color: "dark-red", align: "tl" },
      { label: "Z", code: "KeyZ", width: "40px", color: "white", align: "tl" },
      { label: "X", code: "KeyX", width: "40px", color: "white", align: "tl" },
      { label: "C", code: "KeyC", width: "40px", color: "white", align: "tl" },
      { label: "V", code: "KeyV", width: "40px", color: "white", align: "tl" },
      { label: "B", code: "KeyB", width: "40px", color: "white", align: "tl" },
      { label: "N", code: "KeyN", width: "40px", color: "white", align: "tl" },
      { label: "M", code: "KeyM", width: "40px", color: "white", align: "tl" },
      { label: "<\n,", code: "Comma", width: "40px", color: "white", align: "tl" },
      { label: ">\n.", code: "Period", width: "40px", color: "white", align: "tl" },
      { label: "?\n/", code: "Slash", width: "40px", color: "white", align: "tl" },
      { label: "shift", code: "ShiftRight", width: "78px", color: "dark-red", align: "tl" },
      { label: "", icon: <ChevronUp size={16} />, code: "ArrowUp", width: "40px", color: "white", align: "c" },
      { label: "end", code: "End", width: "40px", color: "dark-red", align: "tl" },
    ],
    [
      { label: "ctrl", code: "ControlLeft", width: "51px", color: "dark-red", align: "tl" },
      { label: "option", code: "AltLeft", width: "51px", color: "dark-red", align: "tl" },
      { label: "⌘", code: "MetaLeft", width: "51px", color: "dark-red", align: "tl" },
      { label: "", code: "Space", width: "271px", color: "white", align: "c" },
      { label: "⌘", code: "MetaRight", width: "40px", color: "dark-red", align: "tl" },
      { label: "fn", code: "Fn", width: "40px", color: "dark-red", align: "tl" },
      { label: "ctrl", code: "ControlRight", width: "40px", color: "dark-red", align: "tl" },
      { label: "", icon: <ChevronLeft size={16} />, code: "ArrowLeft", width: "40px", color: "white", align: "c" },
      { label: "", icon: <ChevronDown size={16} />, code: "ArrowDown", width: "40px", color: "white", align: "c" },
      { label: "", icon: <ChevronRight size={16} />, code: "ArrowRight", width: "40px", color: "white", align: "c" },
    ],
  ];

  return (
    <>
      <style>{`
        .keycap {
          position: relative;
          display: inline-flex;
          border-radius: 6px;
          height: 40px;
          box-shadow:
            inset -2px 0 2px rgba(0, 0, 0, 0.2),
            inset 0 -3px 3px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(0, 0, 0, 0.7),
            2px 5px 8px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          transition: transform 0.05s ease-in-out, box-shadow 0.05s ease-in-out;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .keycap::before {
          content: "";
          position: absolute;
          top: 2px;
          left: 3px;
          bottom: 8px;
          right: 6px;
          border-radius: 4px;
          box-shadow:
            -2px -2px 3px rgba(255, 255, 255, 0.05),
            2px 2px 3px rgba(0, 0, 0, 0.1);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.05s ease-in-out;
        }

        /* --- Color Palettes --- */
        .key-white {
          background: linear-gradient(180deg, #d3d5d8, #b8bbbd);
        }
        .key-white::before {
          background: linear-gradient(90deg, #f0f1f3, #e6e8ea);
        }
        .key-white .keycap-label {
          color: #4a4a4b;
        }

        .key-dark-red {
          background: linear-gradient(180deg, #5b2828, #451b1b);
        }
        .key-dark-red::before {
          background: linear-gradient(90deg, #853737, #722d2d);
        }
        .key-dark-red .keycap-label {
          color: #f0f0f0;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }

        .key-bright-red {
          background: linear-gradient(180deg, #a6372c, #85261d);
        }
        .key-bright-red::before {
          background: linear-gradient(90deg, #cd4a3e, #b83d31);
        }
        .key-bright-red .keycap-label {
          color: #ffffff;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
        }

        /* --- Alignments --- */
        .keycap-label {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          font-size: 10px;
          font-weight: 500;
          line-height: 1.15;
          white-space: pre-wrap;
          transition: transform 0.05s ease-in-out;
          pointer-events: none;
        }
        .align-tl {
          align-items: flex-start;
          justify-content: flex-start;
          padding: 5px 7px;
          text-align: left;
        }
        .align-c {
          align-items: center;
          justify-content: center;
          padding: 4px;
          text-align: center;
        }
        .keycap-icon {
          margin-bottom: 2px;
        }

        /* --- Pressed State --- */
        .keycap.pressed {
          transform: translateY(2px);
          box-shadow:
            inset -1px 0 1px rgba(0, 0, 0, 0.1),
            inset 0 -2px 2px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(0, 0, 0, 0.7),
            1px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .keycap.pressed::before {
          top: 3px;
          bottom: 6px;
        }
        .keycap.pressed .keycap-label {
          transform: translateY(1px);
        }
      `}</style>

      {/* Inner Plate with reduced gap */}
      <div className="bg-[#383439] p-2 rounded-[14px] shadow-inner  border-[#484449] border flex flex-col gap-[1.5px] relative top-2">
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-[1.5px] justify-center w-full">
            {row.map((key) => {
              const pressed = isPressed(key.code);
              return (
                <div
                  key={key.code}
                  className={`keycap key-${key.color} ${pressed ? "pressed" : ""}`}
                  style={{ width: key.width }}
                >
                  <div className={`keycap-label align-${key.align}`}>
                    {key.icon && (
                      <span className="keycap-icon">{key.icon}</span>
                    )}
                    {key.label && (
                      <span className={key.icon ? "text-[8.5px] opacity-90 mt-[1px]" : ""}>
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
    </>
  );
}
