import React from "react";

interface SkylineLogoProps {
  /** Stroke/fill color — defaults to currentColor so it inherits text color */
  color?: string;
  /** Width of the icon in pixels (height scales proportionally) */
  size?: number;
  className?: string;
}

/**
 * StateEra skyline perspective logo.
 * Uses `currentColor` by default so it inherits its parent's text color,
 * making it easy to use on both dark (maroon) and light backgrounds.
 */
export const SkylineLogo: React.FC<SkylineLogoProps> = ({
  color = "currentColor",
  size = 28,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 90"
      width={size}
      height={Math.round(size * 0.75)}
      fill="none"
      aria-label="StateEra skyline logo"
      role="img"
      className={className}
      style={{ color }}
    >
      {/* Perspective ground — solid filled V-wedge converging at bottom center */}
      <polygon
        points="60,67 0,51 0,57 60,76 120,57 120,51"
        fill="currentColor"
      />

      {/* Far-left tiny building */}
      <rect x="3.5" y="45" width="6" height="16" stroke="currentColor" strokeWidth="2" />

      {/* Left spire (narrow pointed) */}
      <polygon
        points="17,30 20,19 23,30"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <rect x="17" y="30" width="6" height="21" stroke="currentColor" strokeWidth="2.2" />

      {/* Left medium building */}
      <rect x="24" y="35" width="12" height="16" stroke="currentColor" strokeWidth="2.2" />

      {/* Left-center tall slab */}
      <rect x="37" y="22" width="13" height="29" stroke="currentColor" strokeWidth="2.2" />

      {/* Left-center tower with spike */}
      <polygon
        points="51,9 56.5,2 62,9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="51" y="9" width="11" height="42" stroke="currentColor" strokeWidth="2.5" />

      {/* Center dominant tower (tallest) */}
      <rect x="63" y="4" width="13" height="47" stroke="currentColor" strokeWidth="2.8" />

      {/* Right-center tower with spike */}
      <polygon
        points="77,11 81,4 85,11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="77" y="11" width="8" height="40" stroke="currentColor" strokeWidth="2.5" />

      {/* Right medium building */}
      <rect x="86" y="30" width="12" height="21" stroke="currentColor" strokeWidth="2.2" />

      {/* Right narrow building */}
      <rect x="99" y="38" width="8" height="13" stroke="currentColor" strokeWidth="2.2" />

      {/* Far-right tiny building */}
      <rect x="108" y="44" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export default SkylineLogo;
