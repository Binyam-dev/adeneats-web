/**
 * Decorative wisp threading the three "How it works" steps — a nod to the
 * three rounds of the coffee ceremony (abol, tona, baraka) rather than plain
 * step numbers. Pure SVG + CSS animation; respects prefers-reduced-motion
 * via the global animation-duration override in globals.css.
 */
export default function SteamThread() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-6 hidden h-10 w-full md:block"
    >
      <defs>
        <linearGradient id="steam-thread-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0" />
          <stop offset="15%" stopColor="var(--color-teal)" stopOpacity="0.55" />
          <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.55" />
          <stop offset="85%" stopColor="var(--color-berbere)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-berbere)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 8 14 Q 20 2, 33 12 T 50 10 T 67 8 T 92 6"
        fill="none"
        stroke="url(#steam-thread-gradient)"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeDasharray="3 4"
        className="animate-[steam-drift_6s_linear_infinite]"
      />
    </svg>
  );
}
