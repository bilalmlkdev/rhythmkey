import React from "react";

export default function KeyCap({ keyDef, pressed, isFKey }) {
  const { label, icon, width, color, align } = keyDef;
  return (
    <div
      className={`keycap key-${color} ${pressed ? "pressed" : ""}`}
      style={{ width }}
    >
      <div
        className={`keycap-label align-${align} ${isFKey ? "fkey-label" : ""}`}
      >
        {icon && <span className="keycap-icon">{icon}</span>}
        {label && (
          <span className={icon ? "text-[8.5px] opacity-90 mt-[1px]" : ""}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
