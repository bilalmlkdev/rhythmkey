import React from "react";
import * as Icons from "lucide-react";

export default function SelectSetting({
  icon,
  label,
  value,
  onChange,
  options,
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-2 py-1 rounded-md text-[11px] font-medium border ${
          isLight
            ? "bg-zinc-100 border-zinc-200 text-zinc-800"
            : "bg-zinc-800 border-zinc-700 text-zinc-200"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
