import React from "react";

export default function ResultDetailsBar({
  correctChars,
  incorrectChars,
  totalChars,
  corrections,
  timeTaken,
  testType,
  isLight,
}) {
  return (
    <div
      className={`flex gap-6 text-[11px] font-medium text-zinc-500 mt-5 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-500 fill-mode-both`}
    >
      <div>
        CHARACTERS{" "}
        <span
          className={isLight ? "text-zinc-800 font-semibold" : "text-[#d4d4d8]"}
        >
          {correctChars} / {incorrectChars} / {totalChars}
        </span>
      </div>
      <div>
        CORRECTIONS{" "}
        <span
          className={isLight ? "text-zinc-800 font-semibold" : "text-[#d4d4d8]"}
        >
          {corrections}
        </span>
      </div>
      <div>
        TIME{" "}
        <span
          className={isLight ? "text-zinc-800 font-semibold" : "text-[#d4d4d8]"}
        >
          {timeTaken}s
        </span>
      </div>
      <div>
        TEST <span className="text-[#9b72ff]">{testType}</span>
      </div>
    </div>
  );
}
