"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SPRING = { stiffness: 220, damping: 24, mass: 0.65 };

export default function TiltCard({
  children,
  className = "",
  maxTilt = 4,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduced = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, SPRING);
  const rotateY = useSpring(tiltY, SPRING);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (
      reduced ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * maxTilt * 2);
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * maxTilt * 2);
  }

  function reset() {
    tiltX.set(0);
    tiltY.set(0);
  }

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div className="[perspective:1000px]">
      <motion.div
        className={className}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        {children}
      </motion.div>
    </div>
  );
}
