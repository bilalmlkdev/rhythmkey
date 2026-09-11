import React from "react";

function dotTexture(isLight) {
  return isLight
    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(0,0,0,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
}

export default function TextureStrip({ isLight }) {
  return (
    <div className="h-[60px]">
      <div
        className="w-full h-full bg-repeat"
        style={{
          backgroundImage: dotTexture(isLight),
          backgroundSize: "16.74px 16.74px",
        }}
      />
    </div>
  );
}
