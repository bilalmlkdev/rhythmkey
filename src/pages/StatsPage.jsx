import React from "react";
import { useStats } from "../hooks/useStats";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart2, Trash2 } from "lucide-react";

export default function StatsPage({ isLight }) {
  const { stats, clearStats } = useStats();

  const averageWpm =
    stats.length > 0
      ? Math.round(stats.reduce((sum, s) => sum + s.wpm, 0) / stats.length)
      : 0;
  const averageAcc =
    stats.length > 0
      ? Math.round(stats.reduce((sum, s) => sum + s.accuracy, 0) / stats.length)
      : 0;
  const bestWpm = stats.length > 0 ? Math.max(...stats.map((s) => s.wpm)) : 0;
  const bestAcc =
    stats.length > 0 ? Math.max(...stats.map((s) => s.accuracy)) : 0;

  return (
    <div
      className={`min-h-screen ${
        isLight ? "bg-[#FFFFFF] text-zinc-800" : "bg-[#111113] text-zinc-200"
      } font-grotesk px-6 py-8`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`p-2 rounded-lg transition-colors ${
                isLight ? "hover:bg-zinc-100" : "hover:bg-zinc-800"
              }`}
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart2 className="text-[#9b72ff]" /> Stats History
            </h1>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Clear all stats?")) clearStats();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors text-sm font-medium"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>

        {/* Summary Cards */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 ${
            isLight ? "text-zinc-800" : "text-zinc-200"
          }`}
        >
          <div
            className={`p-4 rounded-xl border ${
              isLight
                ? "border-zinc-200 bg-zinc-50"
                : "border-zinc-800 bg-zinc-900/50"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">
              Tests
            </div>
            <div className="text-3xl font-bold">{stats.length}</div>
          </div>
          <div
            className={`p-4 rounded-xl border ${
              isLight
                ? "border-zinc-200 bg-zinc-50"
                : "border-zinc-800 bg-zinc-900/50"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">
              Avg WPM
            </div>
            <div className="text-3xl font-bold text-[#9b72ff]">
              {averageWpm}
            </div>
          </div>
          <div
            className={`p-4 rounded-xl border ${
              isLight
                ? "border-zinc-200 bg-zinc-50"
                : "border-zinc-800 bg-zinc-900/50"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">
              Best WPM
            </div>
            <div className="text-3xl font-bold text-green-500">{bestWpm}</div>
          </div>
          <div
            className={`p-4 rounded-xl border ${
              isLight
                ? "border-zinc-200 bg-zinc-50"
                : "border-zinc-800 bg-zinc-900/50"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">
              Avg Acc
            </div>
            <div className="text-3xl font-bold">{averageAcc}%</div>
          </div>
        </div>

        {/* Table */}
        <div
          className={`border rounded-xl overflow-hidden ${
            isLight ? "border-zinc-200" : "border-zinc-800"
          }`}
        >
          <table className="w-full text-left text-sm">
            <thead
              className={`border-b ${
                isLight
                  ? "bg-zinc-50 border-zinc-200"
                  : "bg-zinc-900/50 border-zinc-800"
              }`}
            >
              <tr>
                <th className="py-3 px-4 font-medium text-zinc-400">Date</th>
                <th className="py-3 px-4 font-medium text-zinc-400">Type</th>
                <th className="py-3 px-4 font-medium text-zinc-400">WPM</th>
                <th className="py-3 px-4 font-medium text-zinc-400">Acc</th>
                <th className="py-3 px-4 font-medium text-zinc-400">Time</th>
              </tr>
            </thead>
            <tbody>
              {stats.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-zinc-500">
                    No results yet. Complete a test to see stats.
                  </td>
                </tr>
              ) : (
                stats.map((s, i) => (
                  <tr
                    key={i}
                    className={`border-b ${
                      isLight
                        ? "border-zinc-200 hover:bg-zinc-50"
                        : "border-zinc-800/50 hover:bg-zinc-800/30"
                    } transition-colors`}
                  >
                    <td className="py-3 px-4">
                      {new Date(s.date).toLocaleDateString()}{" "}
                      {new Date(s.date).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4 capitalize">{s.testType}</td>
                    <td className="py-3 px-4 font-bold">{s.wpm}</td>
                    <td className="py-3 px-4">{s.accuracy}%</td>
                    <td className="py-3 px-4">{Math.round(s.timeTaken)}s</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
