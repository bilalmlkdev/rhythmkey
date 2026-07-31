import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiAlertCircle,
  FiGithub,
  FiSend,
} from "react-icons/fi";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full p-8 bg-white dark:bg-[#111113] overflow-y-auto flex justify-center">
      <div className="w-full max-w-3xl flex flex-col">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="self-start flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Editor
        </button>

        {/* About Section */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About Keythm
        </h1>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          <strong className="text-gray-900 dark:text-white">Keythm</strong> is a
          free, open‑source typing test application built to help you improve
          your typing speed and accuracy. It offers a clean, distraction‑free
          interface with live stats, customizable settings, and support for
          multiple test modes including time, words, quotes, stories, and
          infinite typing.
        </p>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          Keythm is designed to be lightweight and fully client‑side, leveraging
          modern web technologies for a smooth typing experience. All your data
          stays locally in your browser—no account needed, no tracking, and
          complete privacy.
        </p>

        {/* Developer Section */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Developer
        </h2>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          Built and maintained by{" "}
          <a
            href="https://github.com/byllzz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            byllzz
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/byllzz/keythm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Keythm
          </a>
          , inspired by modern typing tools like Monkeytype and Keybr.
        </p>

        {/* Contact & Support Section */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Contact &amp; Support
        </h2>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span>
              Email:{" "}
              <a
                href="mailto:bilalmlkdev@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                bilalmlkdev@gmail.com
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiAlertCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span>
              Bug reports:{" "}
              <a
                href="https://github.com/byllzz/keythm/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub Issues
              </a>
            </span>
          </div>
        </div>

        {/* Social Section */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Social
        </h2>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiGithub className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <a
              href="https://github.com/byllzz/keythm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
            <FiSend className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <a
              href="https://t.me/byllzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Telegram
            </a>
          </div>
        </div>

        {/* Technology & Credits Section */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
          Technology &amp; Credits
        </h2>

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Keythm is built with React, Tailwind CSS, and Vite. We gratefully
          acknowledge the following open‑source projects and services:
        </p>

        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-8">
          <li>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              React
            </a>{" "}
            – UI library
          </li>
          <li>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Tailwind CSS
            </a>{" "}
            – styling engine
          </li>
          <li>
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Vite
            </a>{" "}
            – build tool
          </li>
          <li>
            <a
              href="https://reactrouter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              React Router
            </a>{" "}
            – routing
          </li>
          <li>
            <a
              href="https://lucide.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Lucide Icons
            </a>{" "}
            – icon set
          </li>
          <li>
            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              React Icons
            </a>{" "}
            – additional icons
          </li>
        </ul>
      </div>
    </div>
  );
}
