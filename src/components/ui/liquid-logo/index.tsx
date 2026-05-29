"use client";
import { useEffect, useRef, useState } from "react";
import { LiquidCanvas } from "./canvas";
import type { ShaderParams } from "./canvas";
import { parseLogoImage } from "./parse-logo-image";
import logoSrc from "@/assets/logo.png";

/* Good default params for the Luxus logo — calm, golden, readable */
const DEFAULT_PARAMS: ShaderParams = {
  patternScale: 2.8,
  refraction:   0.018,
  edge:         0.42,
  patternBlur:  0.006,
  liquid:       0.07,
  speed:        0.28,
};

interface LiquidLogoProps {
  /** Display size in px (rendered as a square) */
  size?: number;
  params?: Partial<ShaderParams>;
  className?: string;
}

export function LiquidLogo({ size = 96, params, className = "" }: LiquidLogoProps) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [ready, setReady]         = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    /* Defer the heavy Poisson bevel solve one tick so the page paints first */
    const id = setTimeout(() => {
      parseLogoImage(logoSrc)
        .then((data) => {
          setImageData(data);
          setReady(true);
        })
        .catch(console.error);
    }, 80);

    return () => clearTimeout(id);
  }, []);

  const mergedParams: ShaderParams = { ...DEFAULT_PARAMS, ...params };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      {/* Static fallback shown while the shader boots up */}
      <img
        src={logoSrc}
        alt="Luxus Architectural Glass"
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
        style={{ opacity: ready ? 0 : 1 }}
        aria-hidden={ready}
      />

      {/* WebGL liquid shader — fades in once imageData is ready */}
      {imageData && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <LiquidCanvas imageData={imageData} params={mergedParams} />
        </div>
      )}
    </div>
  );
}
