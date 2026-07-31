import React from "react";
import { ArrowRight, RotateCcw, Download, Info } from "lucide-react";

export default function ResultActions({
  onNextTest,
  onRestart,
  downloadRef,
  showDownloadMenu,
  setShowDownloadMenu,
  setShowFormulaMenu,
  handleDownload,
  formulaRef,
  showFormulaMenu,
  isLight,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-500 relative animate-in fade-in slide-in-from-bottom-6 duration-700">
      <button
        onClick={onNextTest}
        className={`flex items-center gap-1.5 transition-colors ${
          isLight
            ? "hover:text-zinc-900 text-zinc-600"
            : "hover:text-zinc-300 text-zinc-400"
        }`}
        title="Start a new test with new generated text"
      >
        <ArrowRight size={13} /> next test
      </button>

      <button
        onClick={onRestart}
        className={`flex items-center gap-1.5 transition-colors px-3.5 py-1.5 rounded-full border ${
          isLight
            ? "bg-zinc-900 hover:bg-black text-white border-none"
            : "bg-zinc-900/50 hover:text-[#9b72ff] text-zinc-400 border-zinc-800"
        }`}
        title="Try the exact same text again"
      >
        <RotateCcw size={13} /> restart same text
      </button>

      {/* Download Dropdown */}
      <div className="relative" ref={downloadRef}>
        <button
          onClick={() => {
            setShowDownloadMenu(!showDownloadMenu);
            setShowFormulaMenu(false);
          }}
          className={`flex items-center gap-1.5 transition-colors ${
            isLight
              ? "hover:text-zinc-900 text-zinc-600"
              : "hover:text-zinc-300 text-zinc-400"
          }`}
        >
          <Download size={13} /> download graph
        </button>

        {showDownloadMenu && (
          <div
            className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-44 ${
              isLight
                ? "bg-white border-zinc-200 text-zinc-800"
                : "bg-[#18181b] border-zinc-800 text-zinc-300"
            } border rounded-xl shadow-2xl py-1.5 z-50 text-[11px] flex flex-col animate-in fade-in zoom-in-95 duration-150`}
          >
            <div className="px-3 py-1 font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">
              Data Formats
            </div>
            {["json", "csv", "markdown"].map((format) => (
              <button
                key={format}
                onClick={() => handleDownload(format)}
                className={`px-3 py-1.5 text-left transition-colors ${
                  isLight
                    ? "hover:bg-zinc-100 hover:text-[#9b72ff]"
                    : "hover:bg-zinc-800/60 hover:text-[#9b72ff]"
                }`}
              >
                {format.toUpperCase()} format
              </button>
            ))}

            <div
              className={`my-1 border-t ${isLight ? "border-zinc-200" : "border-zinc-800/80"}`}
            ></div>

            <div className="px-3 py-1 font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">
              Image Exports
            </div>
            {["png", "jpg", "svg"].map((format) => (
              <button
                key={format}
                onClick={() => handleDownload(format)}
                className={`px-3 py-1.5 text-left transition-colors ${
                  isLight
                    ? "hover:bg-zinc-100 hover:text-[#9b72ff]"
                    : "hover:bg-zinc-800/60 hover:text-[#9b72ff]"
                }`}
              >
                {format.toUpperCase()} {format === "svg" ? "vector" : "image"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Formula Info Dropdown */}
      <div className="relative" ref={formulaRef}>
        <button
          onClick={() => {
            setShowFormulaMenu(!showFormulaMenu);
            setShowDownloadMenu(false);
          }}
          className={`flex items-center gap-1.5 transition-colors ${
            isLight
              ? "hover:text-zinc-900 text-zinc-600"
              : "hover:text-zinc-300 text-zinc-400"
          }`}
        >
          <Info size={13} /> formula info
        </button>

        {showFormulaMenu && (
          <div
            className={`absolute bottom-full mb-2 right-0 md:left-1/2 md:-translate-x-1/2 w-80 ${
              isLight
                ? "bg-white border-zinc-200 text-zinc-800"
                : "bg-[#18181b] border-zinc-800 text-zinc-300"
            } border rounded-xl shadow-2xl p-3.5 z-50 text-left animate-in fade-in zoom-in-95 duration-150`}
          >
            <div
              className={`font-semibold text-xs mb-2.5 pb-2 border-b ${isLight ? "border-zinc-200 text-zinc-900" : "border-zinc-800 text-zinc-200"} flex items-center justify-between`}
            >
              <span>Calculation Formulas</span>
              <span className="text-[10px] text-[#9b72ff]">RhythmKey Metrics</span>
            </div>
            <div className="space-y-2.5 text-[11px] text-zinc-500">
              <div>
                <span
                  className={`font-semibold block ${isLight ? "text-zinc-900" : "text-zinc-200"}`}
                >
                  WPM (Words Per Minute)
                </span>
                <p className="mt-0.5">
                  (Correct Characters / 5) / Time in Minutes
                </p>
              </div>
              <div>
                <span
                  className={`font-semibold block ${isLight ? "text-zinc-900" : "text-zinc-200"}`}
                >
                  Accuracy (%)
                </span>
                <p className="mt-0.5">
                  ((Total Characters - Mistakes) / Total Characters) * 100
                </p>
              </div>
              <div>
                <span
                  className={`font-semibold block ${isLight ? "text-zinc-900" : "text-zinc-200"}`}
                >
                  Raw WPM
                </span>
                <p className="mt-0.5">
                  (Total Keystrokes / 5) / Time in Minutes
                </p>
              </div>
              <div>
                <span
                  className={`font-semibold block ${isLight ? "text-zinc-900" : "text-zinc-200"}`}
                >
                  Consistency
                </span>
                <p className="mt-0.5">
                  Calculated based on standard deviation and variance across
                  per-second WPM snapshots.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
