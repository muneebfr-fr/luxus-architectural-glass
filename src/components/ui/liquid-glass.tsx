"use client";
import React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   GlassFilter — SVG filter that must be rendered once per page
   ───────────────────────────────────────────────────────────────────────── */
export function GlassFilter({ id = "glass-filter" }: { id?: string }) {
  return (
    <svg width="0" height="0" aria-hidden className="absolute pointer-events-none">
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="4"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feComposite in="displaced" in2="SourceGraphic" operator="in" />
          <feSpecularLighting
            in="noise"
            surfaceScale="2"
            specularConstant="0.6"
            specularExponent="20"
            result="specular"
          >
            <fePointLight x="50%" y="-30%" z="120" />
          </feSpecularLighting>
          <feBlend in="displaced" in2="specular" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GlassEffect — frosted glass panel with subtle gold tint
   ───────────────────────────────────────────────────────────────────────── */
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  /** Gold border intensity: "low" | "medium" | "high" */
  border?: "low" | "medium" | "high";
  /** Enable the noise displacement filter (heavier, use sparingly) */
  distort?: boolean;
}

const borderStyles: Record<string, string> = {
  low:    "hsl(38 72% 44% / 0.12)",
  medium: "hsl(38 72% 44% / 0.22)",
  high:   "hsl(38 72% 44% / 0.40)",
};

export function GlassEffect({
  children,
  className,
  border = "medium",
  distort = false,
}: GlassEffectProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "backdrop-blur-md bg-white/[0.04]",
        className
      )}
      style={{
        border: `1px solid ${borderStyles[border]}`,
        boxShadow: `inset 0 1px 0 hsl(38 72% 80% / 0.12), 0 4px 24px hsl(38 72% 44% / 0.06)`,
        ...(distort ? { filter: "url(#glass-filter)" } : {}),
      }}
    >
      {/* Top-edge shimmer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(38 72% 80% / 0.35), transparent)",
        }}
      />
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GlassCard — convenience card variant
   ───────────────────────────────────────────────────────────────────────── */
export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GlassEffect
      border="medium"
      className={cn("p-8 bg-card/60", className)}
    >
      {children}
    </GlassEffect>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GlassDock — horizontal pill dock (e.g. stat bar)
   ───────────────────────────────────────────────────────────────────────── */
export function GlassDock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-6 px-8 py-4",
        "backdrop-blur-lg bg-primary/40",
        "rounded-full",
        className
      )}
      style={{
        border: "1px solid hsl(38 72% 44% / 0.22)",
        boxShadow: "0 8px 32px hsl(38 72% 44% / 0.10), inset 0 1px 0 hsl(38 72% 80% / 0.12)",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GlassButton — inline glass-style button/link (lighter than MetalButton)
   ───────────────────────────────────────────────────────────────────────── */
interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Render as <a> anchor */
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function GlassButton({
  children,
  className,
  onClick,
  as = "button",
  href,
  target,
  rel,
}: GlassButtonProps) {
  const sharedClass = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "font-body text-[11px] tracking-[0.22em] uppercase font-medium",
    "px-8 py-3",
    "backdrop-blur-md text-gold",
    "transition-all duration-300",
    "hover:bg-gold/10",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
    className
  );

  const sharedStyle: React.CSSProperties = {
    border: "1px solid hsl(38 72% 44% / 0.35)",
    boxShadow: "inset 0 1px 0 hsl(38 72% 80% / 0.15)",
  };

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(38 72% 80% / 0.30), transparent)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (as === "a" && href) {
    return (
      <a href={href} target={target} rel={rel} className={sharedClass} style={sharedStyle}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={sharedClass} style={sharedStyle}>
      {inner}
    </button>
  );
}
