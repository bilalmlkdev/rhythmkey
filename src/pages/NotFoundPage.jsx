import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFoundPage({ isLight }) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 ${
        isLight ? "bg-white text-gray-900" : "bg-black text-white"
      }`}
    >
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#9b72ff] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className={`${isLight ? "text-gray-600" : "text-gray-400"} mb-8`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#9b72ff] text-white rounded-full hover:bg-[#9b72ff]/80 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
