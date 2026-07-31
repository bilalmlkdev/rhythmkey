import React, { useState, useRef, useEffect } from "react";
import ResultChart from "./ResultChart";
import ResultDetailsBar from "./ResultDetailsBar";
import ResultTopStats from "./ResultTopStats";
import ResultActions from "./ResultActions";
import { useResultGraph } from "../../hooks/useResultGraph";
import { useDownloadHandlers } from "../../hooks/useDownloadHandlers";

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

  // Graph data
  const {
    validHistory,
    chartHeight,
    chartWidth,
    maxTime,
    maxWpm,
    minWpm,
    wpmPoints,
    accPoints,
  } = useResultGraph(history, wpm);

  // Download handlers
  const { handleDownload } = useDownloadHandlers({
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    totalChars,
    corrections,
    history,
    chartWidth,
    chartHeight,
    svgRef,
    isLight,
    setShowDownloadMenu,
  });

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
