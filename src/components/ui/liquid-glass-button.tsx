"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   LiquidButton — SVG displacement-map glass distortion button
   Gold-tinted variant built for Luxus Architectural Glass.
   ───────────────────────────────────────────────────────────────────────── */

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** "gold" (default) | "ghost" | "dark" */
  variant?: "gold" | "ghost" | "dark";
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const filterId = () => `liquid-${Math.random().toString(36).slice(2, 9)}`;

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ children, variant = "gold", className, as = "button", href, target, rel, ...props }, ref) => {
    const id = useRef(filterId()).current;

    const variantClasses = {
      gold: "bg-gold text-primary-foreground hover:bg-gold-light",
      ghost: "bg-white/10 text-foreground border border-gold/30 hover:bg-white/20",
      dark: "bg-primary text-primary-foreground border border-gold/20 hover:border-gold/50",
    };

    const inner = (
      <>
        {/* SVG filter definition */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feComposite in="displaced" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>

        {/* Gold shimmer rim */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(135deg, hsl(38 72% 80% / 0.35) 0%, transparent 50%, hsl(38 72% 44% / 0.20) 100%)",
          }}
          aria-hidden
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </>
    );

    const sharedClass = cn(
      "relative inline-flex items-center justify-center overflow-hidden",
      "font-body text-[11px] tracking-[0.22em] uppercase font-medium",
      "px-10 py-3.5 transition-all duration-300",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
      variantClasses[variant],
      className
    );

    if (as === "a" && href) {
      return (
        <a href={href} target={target} rel={rel} className={sharedClass}>
          {inner}
        </a>
      );
    }

    return (
      <button ref={ref} className={sharedClass} {...props}>
        {inner}
      </button>
    );
  }
);
LiquidButton.displayName = "LiquidButton";

/* ─────────────────────────────────────────────────────────────────────────
   MetalButton — heavier gold variant with animated shimmer sweep
   ───────────────────────────────────────────────────────────────────────── */

interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  ({ children, className, as = "button", href, target, rel, ...props }, ref) => {
    const inner = (
      <>
        {/* Shimmer layer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animationDelay: "0.6s" }}
        />
        {/* Top edge highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent"
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </>
    );

    const sharedClass = cn(
      "relative inline-flex items-center justify-center overflow-hidden",
      "font-body text-[11px] tracking-[0.22em] uppercase font-medium",
      "px-10 py-3.5",
      "gradient-gold text-primary-foreground",
      "hover:opacity-90 hover:shadow-gold-md",
      "transition-all duration-300",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
      className
    );

    if (as === "a" && href) {
      return (
        <a href={href} target={target} rel={rel} className={sharedClass}>
          {inner}
        </a>
      );
    }

    return (
      <button ref={ref} className={sharedClass} {...props}>
        {inner}
      </button>
    );
  }
);
MetalButton.displayName = "MetalButton";
