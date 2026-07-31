import React from "react";
import * as Icons from "lucide-react";

export default function ButtonGroupSetting({
  icon,
  label,
  options,
  value,
  onChange,
  formatLabel,
  isLight,
}) {
  const IconComponent = Icons[icon] || Icons.Settings;
  return (
    <div className="flex items-center justify-between">
      <span
        className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
      >
        <IconComponent size={15} className={`${isLight ? "text-black" : "text-white"}`} /> {label}
      </span>
      <div
        className={`flex rounded-lg p-1 border gap-0.5 ${
          isLight
            ? "bg-zinc-100 border-zinc-200"
            : "bg-zinc-800 border-zinc-700"
        }`}
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              value === opt
                ? "bg-[#9b72ff] text-white shadow-sm"
                : isLight
                  ? "text-zinc-500 hover:text-zinc-800"
                  : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {formatLabel ? formatLabel(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  );
}
