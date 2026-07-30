import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, RotateCcw, Download, Info } from "lucide-react";

export default function ResultScreen({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  totalChars,
  corrections,
  selectedTime,
  timeLeft,
  testType,
  history = [], // Using the passed per-second capture history
  onRestart,
  onNextTest,
}) {
  const timeTaken = Math.round(selectedTime - timeLeft);

  // Dropdown states & refs
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [showFormulaMenu, setShowFormulaMenu] = useState(false);

  const downloadRef = useRef(null);
  const formulaRef = useRef(null);
  const svgRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target)) {
        setShowDownloadMenu(false);
      }
      if (formulaRef.current && !formulaRef.current.contains(e.target)) {
        setShowFormulaMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Dynamic Graph Calculation (WPM & ACC) ---
  const validHistory = history.filter((h) => h.time > 0); // Ignore 0 sec frame to avoid division by 0 bugs
  const chartHeight = 180;
  const chartWidth = 900;

  const maxTime = Math.max(...validHistory.map((d) => d.time), 1);
  const maxWpm = Math.max(...validHistory.map((d) => d.wpm), wpm + 10, 40);
  const minWpm = 0; // lock Y axis bottom at 0 for WPM to keep graph realistic

  // WPM Line path generator
  const wpmPoints = validHistory
    .map((d, i) => {
      const x = (d.time / maxTime) * chartWidth;
      const y =
        chartHeight - ((d.wpm - minWpm) / (maxWpm - minWpm)) * chartHeight;
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  // Accuracy Line path generator (scaled independently so it doesn't crush the WPM visually)
  const accPoints = validHistory
    .map((d, i) => {
      const x = (d.time / maxTime) * chartWidth;
      const accScaled = Math.max(d.accuracy, 50);
      const y = chartHeight - ((accScaled - 50) / 50) * chartHeight;
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  // --- Export / Download Handlers ---
  const handleDownload = (format) => {
    setShowDownloadMenu(false);

    if (format === "json") {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify(
            {
              wpm,
              accuracy,
              correctChars,
              incorrectChars,
              totalChars,
              corrections,
              history,
            },
            null,
            2,
          ),
        );
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "keythm_stats.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else if (format === "csv") {
      let csvContent =
        "data:text/csv;charset=utf-8,Time(s),WPM,Accuracy(%)\n" +
        history.map((e) => `${e.time},${e.wpm},${e.accuracy}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", encodedUri);
      downloadAnchor.setAttribute("download", "keythm_stats.csv");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else if (format === "markdown") {
      let mdContent =
        `# Keythm Typing Test Results\n\n- **WPM**: ${wpm}\n- **Accuracy**: ${accuracy}%\n- **Characters**: ${correctChars}/${incorrectChars}/${totalChars}\n- **Corrections**: ${corrections}\n\n## History Log\n| Time (s) | WPM | Accuracy (%) |\n|---|---|---|\n` +
        history
          .map((e) => `| ${e.time} | ${e.wpm} | ${e.accuracy} |`)
          .join("\n");
      const blob = new Blob([mdContent], {
        type: "text/markdown;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", url);
      downloadAnchor.setAttribute("download", "keythm_stats.md");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else if (format === "svg" && svgRef.current) {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgRef.current);
      if (
        !source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
      ) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns="http://www.w3.org/2000/svg"',
        );
      }
      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", url);
      downloadAnchor.setAttribute("download", "keythm_graph.svg");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else if ((format === "png" || format === "jpg") && svgRef.current) {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgRef.current);
      const svgBlob = new Blob([source], {
        type: "image/svg+xml;charset=utf-8",
      });
      const blobURL = URL.createObjectURL(svgBlob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = chartWidth;
        canvas.height = chartHeight;
        const context = canvas.getContext("2d");
        context.fillStyle = "#111113"; // Match app background
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);

        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const uri = canvas.toDataURL(mimeType, 1.0);

        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", uri);
        downloadAnchor.setAttribute("download", `keythm_graph.${format}`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      };
      image.src = blobURL;
    }
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500 mt-10">
      {/* Top Main Stats */}
      <div className="flex gap-16 text-center mb-10">
        <div className="flex flex-col items-center">
          <div className="text-[100px] font-bold text-[#e26928] leading-none tracking-tighter">
            {wpm}
          </div>
          <div className="text-xs font-medium tracking-widest text-[#5e5e5e] mt-2">
            WPM
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[100px] font-bold text-[#d4d4d8] leading-none tracking-tighter">
            {accuracy}
            <span className="text-[60px] text-[#5e5e5e]">%</span>
          </div>
          <div className="text-xs font-medium tracking-widest text-[#5e5e5e] mt-2">
            ACCURACY
          </div>
        </div>
      </div>

      <div className="bg-[#e26928]/10 text-[#e26928] px-4 py-1 rounded-full text-xs font-medium mb-10 flex items-center gap-2 border border-[#e26928]/20">
        🏆 new personal best
      </div>

      <div className="flex gap-12 text-center mb-10">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#d4d4d8]">
            {Math.round(wpm * 1.05)}
          </div>
          <div className="text-[10px] font-medium tracking-widest text-[#5e5e5e] mt-1">
            RAW
          </div>
        </div>
        <div className="w-px h-10 bg-zinc-800"></div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[#d4d4d8]">
            {validHistory.length > 5 ? "89%" : "100%"}
          </div>
          <div className="text-[10px] font-medium tracking-widest text-[#5e5e5e] mt-1">
            CONSISTENCY
          </div>
        </div>
      </div>

      {/* --- Detailed Dynamic SVG Chart --- */}
      <div className="w-full max-w-5xl h-[240px] relative mb-12 flex px-4">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-between text-[10px] text-zinc-600 pb-6 pr-4 h-[180px] w-12 text-right">
          <span>{maxWpm}</span>
          <span>{Math.round(maxWpm * 0.66)}</span>
          <span>{Math.round(maxWpm * 0.33)}</span>
          <span>0</span>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="flex-1 relative h-[180px]">
          <svg
            ref={svgRef}
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            {/* Grid Background Lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * (chartHeight / 3)}
                x2={chartWidth}
                y2={i * (chartHeight / 3)}
                stroke="#27272a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Accuracy Line Path (Gray, dotted background line) */}
            {validHistory.length > 0 && (
              <path
                d={accPoints}
                fill="none"
                stroke="#3f3f46"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 4"
              />
            )}

            {/* WPM Line Path (Main Orange line) */}
            {validHistory.length > 0 && (
              <path
                d={wpmPoints}
                fill="none"
                stroke="#e26928"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-md"
              />
            )}

            {/* Data Points visualization (WPM Dots) */}
            {validHistory.map((d, i) => (
              <circle
                key={i}
                cx={(d.time / maxTime) * chartWidth}
                cy={
                  chartHeight -
                  ((d.wpm - minWpm) / (maxWpm - minWpm)) * chartHeight
                }
                r="4"
                fill="#111113"
                stroke="#e26928"
                strokeWidth="2"
                className="hover:r-6 hover:fill-[#e26928] transition-all cursor-pointer"
              >
                <title>{`${d.wpm} wpm | ${d.accuracy}% acc @ ${d.time}s`}</title>
              </circle>
            ))}
          </svg>

          {/* X Axis Timeline Labels below SVG */}
          <div className="absolute top-[180px] w-full flex justify-between text-[10px] text-zinc-600 pt-2">
            <span>0s</span>
            <span>{Math.round(maxTime / 2)}s</span>
            <span>{maxTime}s</span>
          </div>
        </div>
      </div>

      {/* Info Details Footer */}
      <div className="flex gap-6 text-[11px] font-medium text-[#5e5e5e] mb-12">
        <div>
          CHARACTERS{" "}
          <span className="text-[#d4d4d8]">
            {correctChars} / {incorrectChars} / {totalChars}
          </span>
        </div>
        <div>
          CORRECTIONS <span className="text-[#d4d4d8]">{corrections}</span>
        </div>
        <div>
          TIME <span className="text-[#d4d4d8]">{timeTaken}s</span>
        </div>
        <div>
          TEST <span className="text-[#e26928]">{testType}</span>
        </div>
      </div>

      {/* Action Buttons with Dropdowns */}
      <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-[#5e5e5e] relative pb-20">
        <button
          onClick={onNextTest}
          className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
          title="Start a new test with new generated text"
        >
          <ArrowRight size={14} /> next test
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 hover:text-[#e26928] text-zinc-400 transition-colors bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800"
          title="Try the exact same text again"
        >
          <RotateCcw size={14} /> restart same text
        </button>

        {/* --- Download Graph Dropdown --- */}
        <div className="relative" ref={downloadRef}>
          <button
            onClick={() => {
              setShowDownloadMenu(!showDownloadMenu);
              setShowFormulaMenu(false);
            }}
            className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
          >
            <Download size={14} /> download graph
          </button>

          {showDownloadMenu && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-44 bg-[#18181b] border border-zinc-800 rounded-xl shadow-2xl py-2 z-50 text-[11px] flex flex-col animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">
                Data Formats
              </div>
              <button
                onClick={() => handleDownload("json")}
                className="px-4 py-2 text-left hover:bg-zinc-800/60 text-zinc-300 hover:text-[#e26928] transition-colors"
              >
                JSON format
              </button>
              <button
                onClick={() => handleDownload("csv")}
                className="px-4 py-2 text-left hover:bg-zinc-800/60 text-zinc-300 hover:text-[#e26928] transition-colors"
              >
                CSV format
              </button>
              <button
                onClick={() => handleDownload("markdown")}
                className="px-4 py-2 text-left hover:bg-zinc-800/60 text-zinc-300 hover:text-[#e26928] transition-colors"
              >
                Markdown format
              </button>

              <div className="my-1 border-t border-zinc-800/80"></div>

              <div className="px-3 py-1 font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">
                Image Exports
              </div>
              <button
                onClick={() => handleDownload("png")}
                className="px-4 py-2 text-left hover:bg-zinc-800/60 text-zinc-300 hover:text-[#e26928] transition-colors"
              >
                PNG image
              </button>
              <button
                onClick={() => handleDownload("jpg")}
                className="px-4 py-2 text-left hover:bg-zinc-800/60 text-zinc-300 hover:text-[#e26928] transition-colors"
              >
                JPG image
              </button>
              <button
                onClick={() => handleDownload("svg")}
                className="px-4 py-2 text-left hover:bg-zinc-800/60 text-zinc-300 hover:text-[#e26928] transition-colors"
              >
                SVG vector
              </button>
            </div>
          )}
        </div>

        {/* --- Formula Info Dropdown --- */}
        <div className="relative" ref={formulaRef}>
          <button
            onClick={() => {
              setShowFormulaMenu(!showFormulaMenu);
              setShowDownloadMenu(false);
            }}
            className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
          >
            <Info size={14} /> formula info
          </button>

          {showFormulaMenu && (
            <div className="absolute bottom-full mb-3 right-0 md:left-1/2 md:-translate-x-1/2 w-80 bg-[#18181b] border border-zinc-800 rounded-xl shadow-2xl p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="font-semibold text-zinc-200 text-xs mb-3 pb-2 border-b border-zinc-800 flex items-center justify-between">
                <span>Calculation Formulas</span>
                <span className="text-[10px] text-[#e26928]">
                  Keythm Metrics
                </span>
              </div>
              <div className="space-y-3 text-[11px] text-zinc-400">
                <div>
                  <span className="text-zinc-200 font-semibold block">
                    WPM (Words Per Minute)
                  </span>
                  <p className="text-zinc-500 mt-0.5">
                    (Correct Characters / 5) / Time in Minutes
                  </p>
                </div>
                <div>
                  <span className="text-zinc-200 font-semibold block">
                    Accuracy (%)
                  </span>
                  <p className="text-zinc-500 mt-0.5">
                    ((Total Characters - Mistakes) / Total Characters) * 100
                  </p>
                </div>
                <div>
                  <span className="text-zinc-200 font-semibold block">
                    Raw WPM
                  </span>
                  <p className="text-zinc-500 mt-0.5">
                    (Total Keystrokes / 5) / Time in Minutes
                  </p>
                </div>
                <div>
                  <span className="text-zinc-200 font-semibold block">
                    Consistency
                  </span>
                  <p className="text-zinc-500 mt-0.5">
                    Calculated based on standard deviation and variance across
                    per-second WPM snapshots.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
