import React, { useState, useRef, useEffect } from "react";
import clickSound from "../../../sounds/click.wav";
import { baseRows, layoutMaps } from "./keyboardLayout";
import KeyRow from "./KeyRow";
import KeyboardStyles from "./KeyboardStyles";

export default function Keyboard({
  soundEnabled = true,
  soundVolume = 1,
  audioSrc = clickSound,
  isLight,
  layout = "qwerty",
}) {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);

  // Load audio
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
    if (!soundEnabled || !audioCtxRef.current || !audioBufferRef.current)
      return;

    try {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const source = audioCtxRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;

      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.setValueAtTime(
        soundVolume,
        audioCtxRef.current.currentTime,
      );

      source.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);

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

  // Apply layout mapping to base rows
  const getMappedLabel = (key) => {
    const map = layoutMaps[layout] || {};
    if (map[key.code]) {
      return { label: map[key.code] };
    }
    return null;
  };

  const keyRows = baseRows.map((row) =>
    row.map((key) => {
      const mapped = getMappedLabel(key);
      if (mapped) {
        return { ...key, ...mapped };
      }
      return key;
    }),
  );

  return (
    <>
      <KeyboardStyles />
      <div
        className={`${
          isLight
            ? "bg-[#9a72ff1b] border-[#000000]/30"
            : "bg-[#383439] border-[#FFFFFF]/30"
        } p-2 rounded-[14px] shadow-inner border-2 flex flex-col gap-[1.5px] relative top-2`}
      >
        {keyRows.map((row, rowIndex) => (
          <KeyRow key={rowIndex} row={row} isPressed={isPressed} />
        ))}
      </div>
    </>
  );
}
