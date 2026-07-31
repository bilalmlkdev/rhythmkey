import React from "react";
import KeyCap from "./KeyCap";

export default function KeyRow({ row, isPressed }) {
  return (
    <div className="flex gap-[1.5px] justify-center w-full">
      {row.map((keyDef) => {
        const pressed = isPressed(keyDef.code);
        const isFKey = /^F([1-9]|1[0-2])$/.test(keyDef.code);
        return (
          <KeyCap
            key={keyDef.code}
            keyDef={keyDef}
            pressed={pressed}
            isFKey={isFKey}
          />
        );
      })}
    </div>
  );
}
