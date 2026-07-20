"use client";

import { motion, useReducedMotion } from "framer-motion";

type TibebBandProps = {
  /** The load-in sweep only makes sense once per page — the nav instance
   * plays it; the footer instance stays static. */
  animateOnMount?: boolean;
  className?: string;
};

const TILE = 32;

/**
 * The tibeb band: a woven-style geometric strip (gold diamonds, berbere-red
 * squares, brand-teal ground) referencing Habesha dress borders. Rendered
 * against the site's deep teff-brown background, so the teal ground reads
 * as a vivid ribbon rather than blending in. Appears exactly three times on
 * the site — under the nav, above the footer, and (via animateOnMount) as
 * the page-load draw-in moment.
 */
export default function TibebBand({
  animateOnMount = false,
  className = "",
}: TibebBandProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`h-8 w-full overflow-hidden bg-teal sm:h-10 ${className}`}
    >
      <motion.div
        className="h-full w-full"
        style={{ transformOrigin: "left center" }}
        initial={animateOnMount && !prefersReducedMotion ? { scaleX: 0 } : false}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="tibeb-tile"
              x="0"
              y="0"
              width={TILE}
              height={TILE}
              patternUnits="userSpaceOnUse"
            >
              <rect width={TILE} height={TILE} fill="#1d9e75" />
              {/* central gold diamond */}
              <polygon
                points={`${TILE / 2},4 ${TILE - 4},${TILE / 2} ${TILE / 2},${TILE - 4} 4,${TILE / 2}`}
                fill="#e2a93b"
              />
              {/* berbere-red corner squares, offset to weave against the diamond */}
              <rect x="1" y="1" width="4" height="4" fill="#c43b1e" />
              <rect x={TILE - 5} y="1" width="4" height="4" fill="#c43b1e" />
              <rect x="1" y={TILE - 5} width="4" height="4" fill="#c43b1e" />
              <rect x={TILE - 5} y={TILE - 5} width="4" height="4" fill="#c43b1e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tibeb-tile)" />
        </svg>
      </motion.div>
    </div>
  );
}
