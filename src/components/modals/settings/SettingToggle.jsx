import React from "react";
import { getSettingIcon } from "../../../utils/settingsIcons";

export default function SettingToggle({
  icon,
  label,
  enabled,
  setEnabled,
  isLight,
}) {
  const IconComponent = getSettingIcon(icon);
  return (
    <div className="flex items-center justify-between">
      <span
        className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
      >
        {/* eslint-disable-next-line react-hooks/static-components -- icon registry lookup returns a stable component reference */}
        <IconComponent
          size={15}
          className={`${isLight ? "text-black" : "text-white"}`}
        />
        {label}
      </span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
          enabled ? "bg-[#9b72ff]" : isLight ? "bg-zinc-300" : "bg-zinc-700"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
