export type StepIconName = "home" | "bowl" | "handshake" | "form" | "search" | "check";

export default function StepIcon({ name }: { name: StepIconName }) {
  const common = {
    width: 25,
    height: 25,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "home") {
    return <svg {...common}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></svg>;
  }
  if (name === "bowl") {
    return <svg {...common}><path d="M4 10h16c0 5-3.6 9-8 9s-8-4-8-9Z" /><path d="M7 6c1-1 1-2 0-3M12 6c1-1 1-2 0-3M17 6c1-1 1-2 0-3M8 21h8" /></svg>;
  }
  if (name === "handshake") {
    return <svg {...common}><path d="m8 12 3 3c1 1 2.5 1 3.4 0l3.8-3.8" /><path d="m2 9 4-4 3 2 3-1 3 2 3-1 4 4-3 3M6 13l3 3M9 16l2 2" /></svg>;
  }
  if (name === "form") {
    return <svg {...common}><path d="M7 3h10v4H7zM5 5H3v16h18V5h-2" /><path d="M7 12h10M7 16h7" /></svg>;
  }
  if (name === "search") {
    return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5M8 11l2 2 4-4" /></svg>;
  }
  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
}
