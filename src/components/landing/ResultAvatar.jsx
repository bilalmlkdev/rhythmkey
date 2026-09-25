import React, { useState } from "react";

function getAvatarUrl(seed) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
    seed || "rhythmkey",
  )}&backgroundColor=f5f4ef`;
}

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`;
}

export default function ResultAvatar({ seed, size = 22 }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Seed changes remount this component (callers pass key={seed}), so
  // loaded/errored start fresh on every swap and the fade-in replays.

  if (errored) {
    return (
      <div
        className="rounded-full flex items-center justify-center text-white font-bold select-none shrink-0"
        style={{
          width: size,
          height: size,
          background: getAvatarColor(seed),
          fontSize: size * 0.45,
        }}
      >
        {seed.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className="rounded-full shrink-0 bg-white/5 overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        key={seed}
        src={getAvatarUrl(seed)}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className="rounded-full object-cover transition-opacity duration-300"
        style={{ width: size, height: size, opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}
