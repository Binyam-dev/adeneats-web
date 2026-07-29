export default function SteamEffect({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 120"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <path className="steam-wisp steam-wisp-a" d="M48 110c-19-27 19-30 2-57C35 30 59 24 58 4" />
      <path className="steam-wisp steam-wisp-b" d="M91 116c-16-25 18-35 1-57C77 38 102 27 96 8" />
      <path className="steam-wisp steam-wisp-c" d="M132 110c-17-25 17-31 3-52-13-20 7-30 8-48" />
    </svg>
  );
}
