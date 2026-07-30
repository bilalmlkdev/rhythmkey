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
            ? "text-zinc-700 hover:text-[#e26928]"
            : "text-zinc-400 hover:text-[#e26928]"
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
            ? "text-zinc-700 hover:text-[#e26928]"
            : "text-zinc-400 hover:text-[#e26928]"
        }`}
      >
        GitHub
      </a>
      .
    </footer>
  );
}
