import React from "react";

export default function Footer({ isLight }) {
  return (
    <footer
      className={`w-full text-center text-xs tracking-wide transition-colors duration-200 relative bottom-4.5 ${
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
        href="https://github.com/byllzz"
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
    </footer>
  );
}
