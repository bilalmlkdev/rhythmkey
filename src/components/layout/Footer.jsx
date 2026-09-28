import React from "react";

export default function Footer({ isLight }) {
  return (
    <footer
      className={`w-full text-center text-xs tracking-wide transition-colors duration-200 mt-4 ${
        isLight ? "text-zinc-400" : "text-[#5e5e5e]"
      }`}
    >
      Built by{" "}
      <a
        href="https://bilalmlkdev.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className={`font-medium transition-colors ${
          isLight
            ? "text-zinc-700 hover:text-[#9b72ff]"
            : "text-zinc-400 hover:text-[#9b72ff]"
        }`}
      >
        Bilal Malik
      </a>
      . The source code is available on{" "}
      <a
        href="https://github.com/bilalmlkdev/rhythmkey.git"
        target="_blank"
        rel="noopener noreferrer"
        className={`font-medium transition-colors ${
          isLight
            ? "text-zinc-700 hover:text-[#9b72ff]"
            : "text-zinc-400 hover:text-[#9b72ff]"
        }`}
      >
        GitHub
      </a>
      .
      <div className="mt-2">
        <a
          href="https://keebkit.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[11px] transition-colors ${
            isLight
              ? "text-zinc-400 hover:text-[#9b72ff]"
              : "text-zinc-600 hover:text-[#9b72ff]"
          }`}
        >
          Like this keyboard? Get the component on keebkit ↗
        </a>
      </div>
    </footer>
  );
}
