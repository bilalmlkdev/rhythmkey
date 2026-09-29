export function borderColor(isLight) {
  return isLight ? "border-zinc-200/80" : "border-white/10";
}

// Landing page colours. Matches the app: #111113 dark surface, #9b72ff accent.
export function ui(isLight) {
  return isLight
    ? {
        page: "bg-white text-zinc-900",
        panel: "bg-zinc-50",
        cell: "bg-white",
        nav: "bg-white/85",
        muted: "text-zinc-600",
        faint: "text-zinc-500",
        line: "border-zinc-200",
        lineBg: "bg-zinc-200",
        accent: "text-[#9b72ff]",
        accentBg: "bg-[#9b72ff]",
        btn: "bg-zinc-900 text-white hover:bg-black",
        ghost: "border border-zinc-300 text-zinc-800 hover:bg-zinc-100",
        field: "bg-white border-zinc-200 text-zinc-900",
        pill: "bg-zinc-100 border-zinc-200",
        pillOn: "bg-[#9b72ff]/15 text-[#7c55e6]",
        done: "text-zinc-900",
        todo: "text-zinc-400",
        wrong: "text-red-600",
        label: "text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500",
      }
    : {
        page: "bg-[#111113] text-zinc-100",
        panel: "bg-[#161618]",
        cell: "bg-[#111113]",
        nav: "bg-[#111113]/85",
        muted: "text-zinc-400",
        faint: "text-zinc-500",
        line: "border-white/10",
        lineBg: "bg-white/10",
        accent: "text-[#9b72ff]",
        accentBg: "bg-[#9b72ff]",
        btn: "bg-white text-black hover:bg-white/90",
        ghost: "border border-white/15 text-zinc-200 hover:bg-white/5",
        field: "bg-[#131315] border-white/10 text-zinc-100",
        pill: "bg-white/5 border-white/10",
        pillOn: "bg-[#9b72ff]/20 text-[#b79cff]",
        done: "text-zinc-100",
        todo: "text-zinc-600",
        wrong: "text-red-500",
        label: "text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500",
      };
}
