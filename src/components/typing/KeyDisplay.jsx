export default function KeyDisplay({ lastKey, isLight }) {
  return (
    <div
      className={`absolute bottom-[45%] -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-200 ${
        lastKey ? "h-auto" : "h-0 overflow-hidden p-0 border-none"
      }`}
    >
      {lastKey ? (
        <>
          <div
            className={`font-bold text-[40px] tracking-tighter select-none animate-slideUp ${
              isLight ? "text-zinc-800" : "text-zinc-200"
            }`}
          >
            {lastKey}
          </div>
        </>
      ) : (
        <div className="h-0" />
      )}
    </div>
  );
}
