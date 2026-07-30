import React, { useState, useRef, useEffect } from "react";
import ResultChart from "./ResultChart";
import ResultDetailsBar from "./ResultDetailsBar";
import ResultTopStats from "./ResultTopStats";
import ResultActions from "./ResultActions";

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
  history = [],
  onRestart,
  onNextTest,
  isLight,
}) {
  const timeTaken = Math.round(selectedTime - timeLeft);

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

  // --- Dynamic Graph Calculation ---
  const validHistory = history.filter((h) => h.time > 0);
  const chartHeight = 140;
  const chartWidth = 900;

  const maxTime = Math.max(...validHistory.map((d) => d.time), 1);
  const maxWpm = Math.max(...validHistory.map((d) => d.wpm), wpm + 10, 40);
  const minWpm = 0;

  const wpmPoints = validHistory
    .map((d, i) => {
      const x = (d.time / maxTime) * chartWidth;
      const y = chartHeight - ((d.wpm - minWpm) / (maxWpm - minWpm)) * chartHeight;
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

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
            { wpm, accuracy, correctChars, incorrectChars, totalChars, corrections, history },
            null,
            2
          )
        );
      const a = document.createElement("a");
      a.href = dataStr;
      a.download = "keythm_stats.json";
      a.click();
      a.remove();
    } else if (format === "csv") {
      let csvContent =
        "data:text/csv;charset=utf-8,Time(s),WPM,Accuracy(%)\n" +
        history.map((e) => `${e.time},${e.wpm},${e.accuracy}`).join("\n");
      const a = document.createElement("a");
      a.href = encodeURI(csvContent);
      a.download = "keythm_stats.csv";
      a.click();
      a.remove();
    } else if (format === "markdown") {
      let mdContent =
        `# Keythm Typing Test Results\n\n- **WPM**: ${wpm}\n- **Accuracy**: ${accuracy}%\n- **Characters**: ${correctChars}/${incorrectChars}/${totalChars}\n- **Corrections**: ${corrections}\n\n## History Log\n| Time (s) | WPM | Accuracy (%) |\n|---|---|---|\n` +
        history.map((e) => `| ${e.time} | ${e.wpm} | ${e.accuracy} |`).join("\n");
      const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "keythm_stats.md";
      a.click();
      a.remove();
    } else if (format === "svg" && svgRef.current) {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgRef.current);
      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "keythm_graph.svg";
      a.click();
      a.remove();
    } else if ((format === "png" || format === "jpg") && svgRef.current) {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgRef.current);
      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const blobURL = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = chartWidth;
        canvas.height = chartHeight;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = isLight ? "#ffffff" : "#111113";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);

        const a = document.createElement("a");
        a.href = canvas.toDataURL(format === "png" ? "image/png" : "image/jpeg", 1.0);
        a.download = `keythm_graph.${format}`;
        a.click();
        a.remove();
      };
      image.src = blobURL;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-2 select-none overflow-hidden max-w-5xl mx-auto">
      <ResultTopStats
        wpm={wpm}
        accuracy={accuracy}
        validHistory={validHistory}
        incorrectChars={incorrectChars}
        corrections={corrections}
        isLight={isLight}
      />

      <ResultChart
        svgRef={svgRef}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        maxWpm={maxWpm}
        maxTime={maxTime}
        minWpm={minWpm}
        validHistory={validHistory}
        wpmPoints={wpmPoints}
        accPoints={accPoints}
        isLight={isLight}
      />

      <ResultDetailsBar
        correctChars={correctChars}
        incorrectChars={incorrectChars}
        totalChars={totalChars}
        corrections={corrections}
        timeTaken={timeTaken}
        testType={testType}
        isLight={isLight}
      />

      <ResultActions
        onNextTest={onNextTest}
        onRestart={onRestart}
        downloadRef={downloadRef}
        showDownloadMenu={showDownloadMenu}
        setShowDownloadMenu={setShowDownloadMenu}
        setShowFormulaMenu={setShowFormulaMenu}
        handleDownload={handleDownload}
        formulaRef={formulaRef}
        showFormulaMenu={showFormulaMenu}
        isLight={isLight}
      />
    </div>
  );
}
