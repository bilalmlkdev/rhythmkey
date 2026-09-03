
import { Palette } from "lucide-react";

export default function ThemeSelector({ theme, setTheme, isLight }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
      >
        <Palette size={15} className={`${isLight ? "text-black" : "text-white"}`} /> Theme
      </span>
      <div
        className={`flex rounded-lg p-1 border gap-0.5 ${
          isLight
            ? "bg-zinc-100 border-zinc-200"
            : "bg-zinc-800 border-zinc-700"
        }`}
      >
        {["dark", "light", "system"].map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all cursor-pointer ${
              theme === t
                ? "bg-[#9b72ff] text-white shadow-sm"
                : isLight
                  ? "text-zinc-500 hover:text-zinc-800"
                  : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
