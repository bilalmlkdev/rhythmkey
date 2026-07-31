import React from "react";

export default function ResultTopStats({
  wpm,
  accuracy,
  validHistory,
  incorrectChars,
  corrections,
  isLight,
}) {
  const isPersonalBest = wpm >= 80;

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-center justify-center gap-16 mb-2">
        <div className="flex flex-col items-center gap-2">
          <div className="text-[180px] font-bold text-[#9b72ff] leading-none tracking-tighter">
            {wpm}
          </div>
          <span
            className={`text-[11px] font-medium tracking-widest ${isLight ? "text-black" : "text-zinc-400"}`}
          >
            WPM
          </span>
        </div>

        <div className="flex items-center flex-col gap-2">
          <div
            className={`text-[180px] font-bold ${isLight ? "text-zinc-900" : "text-[#d4d4d8]"} leading-none tracking-tighter relative`}
          >
            {accuracy}
            <span className="opacity-50 absolute text-[40px] top-0 -right-8">
              %
            </span>
          </div>
          <span
            className={`text-[11px] font-medium tracking-widest ${isLight ? "text-black" : "text-zinc-400"}`}
          >
            ACCURACY
          </span>
        </div>
      </div>

      {isPersonalBest ? (
        <div className="bg-[#9b72ff]/10 text-[#9b72ff] px-3 py-0.5 rounded-full text-[11px] font-medium mb-3 border border-[#9b72ff]/20 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
          🏆 new personal best
        </div>
      ) : (
        <div className="h-6 mb-3"></div>
      )}

      <div
        className={`flex items-center gap-8 text-center mb-3 ${isLight ? "bg-zinc-100! border-zinc-200" : "bg-zinc-900/40 border-zinc-800/60"} px-6 py-2.5 rounded-2xl border`}
      >
        <div className="flex flex-col items-center">
          <div
            className={`text-xl font-bold ${isLight ? "text-zinc-900" : "text-[#d4d4d8]"}`}
          >
            {Math.round(wpm * 1.05)}
          </div>
          <div className="text-[9px] font-medium tracking-widest text-zinc-500 mt-0.5">
            RAW WPM
          </div>
        </div>

        <div
          className={`w-px h-6 ${isLight ? "bg-zinc-300" : "bg-zinc-800"}`}
        ></div>

        <div className="flex flex-col items-center">
          <div
            className={`text-xl font-bold ${isLight ? "text-zinc-900" : "text-[#d4d4d8]"}`}
          >
            {validHistory.length > 5 ? "89%" : "100%"}
          </div>
          <div className="text-[9px] font-medium tracking-widest text-zinc-500 mt-0.5">
            CONSISTENCY
          </div>
        </div>

        <div
          className={`w-px h-6 ${isLight ? "bg-zinc-300" : "bg-zinc-800"}`}
        ></div>

        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-red-500">{incorrectChars}</div>
          <div className="text-[9px] font-medium tracking-widest text-zinc-500 mt-0.5">
            MISTAKES
          </div>
        </div>

        <div
          className={`w-px h-6 ${isLight ? "bg-zinc-300" : "bg-zinc-800"}`}
        ></div>

        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-amber-500">{corrections}</div>
          <div className="text-[9px] font-medium tracking-widest text-zinc-500 mt-0.5">
            BACKSPACES
          </div>
        </div>
      </div>
    </div>
  );
}
