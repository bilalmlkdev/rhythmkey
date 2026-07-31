import React from "react";
import { Volume2 } from "lucide-react";
import SettingToggle from "./SettingToggle";

export default function SoundSection({
  settings,
  updateSetting, 
  isLight,
}) {
  return (
    <div className="space-y-1">
      <SettingToggle
        icon="Volume2"
        label="Sound Effects"
        enabled={settings.soundEnabled}
        setEnabled={(v) => updateSetting("soundEnabled", v)}
        isLight={isLight}
      />
      <div className="flex items-center gap-3 pl-6">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.soundVolume}
          onChange={(e) =>
            updateSetting("soundVolume", parseFloat(e.target.value))
          }
          disabled={!settings.soundEnabled}
          className={`flex-1 accent-[#9b72ff] h-1 rounded-lg cursor-pointer ${
            !settings.soundEnabled ? "opacity-40 cursor-not-allowed" : ""
          }`}
        />
        <span
          className={`text-[11px] w-10 text-right ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
        >
          {Math.round(settings.soundVolume * 100)}%
        </span>
      </div>
      <div className="flex items-center justify-between pl-6">
        <span
          className={`text-[11px] ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
        >
          Sound Pack
        </span>
        <select
          value={settings.soundPack}
          onChange={(e) => updateSetting("soundPack", e.target.value)}
          className={`px-2 py-1 rounded-md text-[11px] font-medium border ${
            isLight
              ? "bg-zinc-100 border-zinc-200 text-zinc-800"
              : "bg-zinc-800 border-zinc-700 text-zinc-200"
          }`}
        >
          <option value="click">Click</option>
          <option value="mechanical">Mechanical</option>
          <option value="typewriter">Typewriter</option>
        </select>
      </div>
    </div>
  );
}
