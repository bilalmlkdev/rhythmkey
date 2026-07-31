import React, { useState, useRef } from "react";
import { X, Upload, FileText, Trash2 } from "lucide-react";

export default function CustomTextModal({ isOpen, onClose, onStart, isLight }) {
  const [text, setText] = useState("");
  const [trimMode, setTrimMode] = useState("words"); // "words" or "chars"
  const [trimCount, setTrimCount] = useState(50);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    setText("");
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getProcessedText = () => {
    let processed = text.trim();
    if (!processed) return "";
    if (trimMode === "words") {
      const words = processed.split(/\s+/);
      if (words.length > trimCount) {
        processed = words.slice(0, trimCount).join(" ");
      }
    } else if (trimMode === "chars") {
      if (processed.length > trimCount) {
        processed = processed.slice(0, trimCount);
      }
    }
    return processed;
  };

  const handleStart = () => {
    const finalText = getProcessedText();
    if (!finalText) return;
    onStart(finalText);
    onClose();
  };

  return (
    <>
      {/* Backdrop – now dimmed but still allows keyboard visibility */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal – positioned in upper area, leaving bottom for keyboard */}
      <div
        className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl max-h-[70vh] rounded-2xl border p-6 shadow-2xl flex flex-col ${
          isLight
            ? "bg-white border-zinc-200 text-zinc-800"
            : "bg-zinc-900 border-zinc-800 text-zinc-200"
        }`}
        style={{ height: "auto", maxHeight: "70vh" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FileText className="text-[#9b72ff]" size={20} /> Custom Text
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight
                ? "hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800"
                : "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your custom text here..."
            className={`w-full flex-1 p-3 rounded-xl border text-sm font-mono resize-none focus:outline-none min-h-[200px] ${
              isLight
                ? "bg-zinc-50 border-zinc-200 text-zinc-800 focus:border-[#9b72ff]"
                : "bg-zinc-800 border-zinc-700 text-zinc-200 focus:border-[#9b72ff]"
            }`}
          />

          {/* File upload row */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".txt,.md,.csv,.json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                isLight
                  ? "border-zinc-200 hover:bg-zinc-100"
                  : "border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <Upload size={14} /> Upload File
            </button>
            {fileName && (
              <span className="text-xs text-zinc-500">{fileName}</span>
            )}
            {text && (
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors ml-auto"
                title="Clear text"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          {/* Trim options */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Trim by:</span>
              <div className="flex rounded-lg border overflow-hidden">
                <button
                  onClick={() => setTrimMode("words")}
                  className={`px-3 py-1 text-[11px] font-medium ${
                    trimMode === "words"
                      ? "bg-[#9b72ff] text-white"
                      : isLight
                        ? "bg-zinc-100 text-zinc-600"
                        : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  Words
                </button>
                <button
                  onClick={() => setTrimMode("chars")}
                  className={`px-3 py-1 text-[11px] font-medium ${
                    trimMode === "chars"
                      ? "bg-[#9b72ff] text-white"
                      : isLight
                        ? "bg-zinc-100 text-zinc-600"
                        : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  Characters
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Limit:</span>
              <input
                type="number"
                min="1"
                max="1000"
                value={trimCount}
                onChange={(e) =>
                  setTrimCount(Math.max(1, parseInt(e.target.value) || 1))
                }
                className={`w-16 px-2 py-1 rounded border text-sm ${
                  isLight
                    ? "border-zinc-200 bg-zinc-50"
                    : "border-zinc-700 bg-zinc-800"
                }`}
              />
            </div>
          </div>

          {/* Preview of processed text */}
          <div className="text-xs text-zinc-500">
            Preview: {getProcessedText().slice(0, 100)}
            {getProcessedText().length > 100 && "..."}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium border ${
              isLight
                ? "border-zinc-200 hover:bg-zinc-100"
                : "border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            disabled={!text.trim()}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium ${
              text.trim()
                ? "bg-[#9b72ff] text-white hover:bg-[#9b72ff]/80"
                : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
            }`}
          >
            Start Typing
          </button>
        </div>
      </div>
    </>
  );
}
