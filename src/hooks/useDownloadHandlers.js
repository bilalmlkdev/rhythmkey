import { useCallback } from "react";

export function useDownloadHandlers({
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
}) {
  const handleDownload = useCallback(
    (format) => {
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
        const a = document.createElement("a");
        a.href = dataStr;
        a.download = "RhythmKey_stats.json";
        a.click();
        a.remove();
      } else if (format === "csv") {
        const csvContent =
          "data:text/csv;charset=utf-8,Time(s),WPM,Accuracy(%)\n" +
          history.map((e) => `${e.time},${e.wpm},${e.accuracy}`).join("\n");
        const a = document.createElement("a");
        a.href = encodeURI(csvContent);
        a.download = "RhythmKey_stats.csv";
        a.click();
        a.remove();
      } else if (format === "markdown") {
        const mdContent =
          `# RhythmKey Typing Test Results\n\n- **WPM**: ${wpm}\n- **Accuracy**: ${accuracy}%\n- **Characters**: ${correctChars}/${incorrectChars}/${totalChars}\n- **Corrections**: ${corrections}\n\n## History Log\n| Time (s) | WPM | Accuracy (%) |\n|---|---|---|\n` +
          history
            .map((e) => `| ${e.time} | ${e.wpm} | ${e.accuracy} |`)
            .join("\n");
        const blob = new Blob([mdContent], {
          type: "text/markdown;charset=utf-8;",
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "RhythmKey_stats.md";
        a.click();
        a.remove();
      } else if (format === "svg" && svgRef.current) {
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgRef.current);
        if (
          !source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)
        ) {
          source = source.replace(
            /^<svg/,
            '<svg xmlns="http://www.w3.org/2000/svg"',
          );
        }
        const blob = new Blob([source], {
          type: "image/svg+xml;charset=utf-8",
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "RhythmKey_graph.svg";
        a.click();
        a.remove();
      } else if ((format === "png" || format === "jpg") && svgRef.current) {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgRef.current);
        const blob = new Blob([source], {
          type: "image/svg+xml;charset=utf-8",
        });
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
          a.href = canvas.toDataURL(
            format === "png" ? "image/png" : "image/jpeg",
            1.0,
          );
          a.download = `RhythmKey_graph.${format}`;
          a.click();
          a.remove();
        };
        image.src = blobURL;
      }
    },
    [
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
    ],
  );

  return { handleDownload };
}
