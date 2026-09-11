import React from "react";
import { Github, Twitter, Mail, Keyboard } from "lucide-react";
import { borderColor } from "./utils";

export default function Footer({ isLight }) {
  const borderCol = borderColor(isLight);

  return (
    <footer className={`border-l border-r mx-6.5 border-t ${borderCol}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6">
        <div className="flex items-center gap-2">
          <Keyboard size={15} className="text-[#9b72ff]" />
          <span className="text-xs text-zinc-500">
            © {new Date().getFullYear()} RhythmKey, All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/bilalmlkdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1.5 hover:text-[#9b72ff] transition-colors text-zinc-500"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href="https://twitter.com/bilalmlkdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1.5 hover:text-[#9b72ff] transition-colors text-zinc-500"
          >
            <Twitter size={14} /> Twitter
          </a>
          <a
            href="mailto:bilalmlkdev@gmail.com"
            className="text-xs flex items-center gap-1.5 hover:text-[#9b72ff] transition-colors text-zinc-500"
          >
            <Mail size={14} /> Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
