"use client";
import React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   Shared props for both button variants
   ───────────────────────────────────────────────────────────────────────── */
interface BaseProps {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

/* ─────────────────────────────────────────────────────────────────────────
   GoldGlassButton  (primary CTA)
   ─────────────────────────────────────────────────────────────────────────
   Real liquid glass:
   • backdrop-blur + semi-transparent gold  → frosted glass body
   • inset box-shadows                      → glass-edge refraction lines
   • outer glow                             → gold bloom
   • top gradient band                      → specular highlight (glass catches light)
   • animated shimmer sweep                 → liquid movement
   • animated float gradient                → subtle internal refraction
   ───────────────────────────────────────────────────────────────────────── */

interface GoldGlassButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {}

export const GoldGlassButton = React.forwardRef<HTMLButtonElement, GoldGlassButtonProps>(
  ({ children, className, as = "button", href, target, rel, ...props }, ref) => {

    const inner = (
      <>
        {/* ── Moving internal refraction layer ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(115deg, hsl(38 58% 90%/0.18) 0%, transparent 40%, hsl(38 72% 44%/0.12) 80%, transparent 100%)",
            animation: "float-up 4s ease-in-out infinite",
          }}
        />

        {/* ── Shimmer sweep ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full"
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, hsl(38 58% 90%/0.30) 50%, transparent 80%)",
            animation: "shimmer 3.2s infinite",
          }}
        />

        {/* ── Top specular band (light hitting glass) ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: "42%",
            background: "linear-gradient(to bottom, hsl(38 58% 92%/0.28) 0%, transparent 100%)",
          }}
        />

        {/* ── Bottom shadow band ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "28%",
            background: "linear-gradient(to top, hsl(38 82% 18%/0.25) 0%, transparent 100%)",
          }}
        />

        {/* ── Text ── */}
        <span className="relative z-10 flex items-center gap-2 font-body text-[11px] tracking-[0.22em] uppercase font-medium">
          {children}
        </span>
      </>
    );

    const style: React.CSSProperties = {
      backdropFilter:       "blur(12px) saturate(160%)",
      WebkitBackdropFilter: "blur(12px) saturate(160%)",
      background:
        "linear-gradient(135deg, hsl(38 72% 48%/0.92) 0%, hsl(38 82% 34%/0.95) 50%, hsl(38 72% 44%/0.90) 100%)",
      border: "1px solid hsl(38 58% 70%/0.55)",
      boxShadow: [
        "inset 0  1px 0 hsl(38 58% 92%/0.50)",  /* top glass edge */
        "inset 0 -1px 0 hsl(38 82% 18%/0.35)",  /* bottom glass edge */
        "inset 1px 0 hsl(38 58% 80%/0.15)",     /* left refraction */
        "0 0 24px hsl(38 72% 44%/0.50)",         /* gold bloom */
        "0 4px 24px hsl(38 72% 44%/0.30)",       /* mid glow */
        "0 12px 40px hsl(38 72% 44%/0.15)",      /* far bloom */
      ].join(", "),
      color: "hsl(0 0% 100% / 0.95)",
    };

    const sharedClass = cn(
      "relative inline-flex items-center justify-center overflow-hidden",
      "px-10 py-3.5 transition-all duration-300",
      "hover:scale-[1.02] hover:shadow-gold-md",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
      "active:scale-[0.98]",
      className
    );

    if (as === "a" && href) {
      return (
        <a href={href} target={target} rel={rel} className={sharedClass} style={style}>
          {inner}
        </a>
      );
    }

    return (
      <button ref={ref} className={sharedClass} style={style} {...props}>
        {inner}
      </button>
    );
  }
);
GoldGlassButton.displayName = "GoldGlassButton";

/* ─────────────────────────────────────────────────────────────────────────
   ClearGlassButton  (secondary CTA / ghost)
   ─────────────────────────────────────────────────────────────────────────
   Frosted clear glass with gold tint — shows background through the blur.
   ───────────────────────────────────────────────────────────────────────── */

interface ClearGlassButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {}

export const ClearGlassButton = React.forwardRef<HTMLButtonElement, ClearGlassButtonProps>(
  ({ children, className, as = "button", href, target, rel, ...props }, ref) => {

    const inner = (
      <>
        {/* Moving refraction */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(115deg, hsl(38 72% 44%/0.14) 0%, transparent 50%)",
          }}
        />

        {/* Shimmer sweep */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full"
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, hsl(38 58% 80%/0.18) 50%, transparent 80%)",
            animation: "shimmer 4s infinite",
            animationDelay: "1s",
          }}
        />

        {/* Top specular */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: "38%",
            background: "linear-gradient(to bottom, hsl(38 58% 88%/0.18) 0%, transparent 100%)",
          }}
        />

        <span className="relative z-10 flex items-center gap-2 font-body text-[11px] tracking-[0.22em] uppercase font-medium">
          {children}
        </span>
      </>
    );

    const style: React.CSSProperties = {
      backdropFilter:       "blur(16px) saturate(180%)",
      WebkitBackdropFilter: "blur(16px) saturate(180%)",
      background: "hsl(38 72% 44%/0.08)",
      border: "1px solid hsl(38 72% 44%/0.45)",
      boxShadow: [
        "inset 0  1px 0 hsl(38 58% 88%/0.22)",
        "inset 0 -1px 0 hsl(38 72% 20%/0.15)",
        "0 0 16px hsl(38 72% 44%/0.12)",
        "0 4px 20px hsl(38 72% 44%/0.08)",
      ].join(", "),
      color: "hsl(38 72% 58%)",
    };

    const sharedClass = cn(
      "group relative inline-flex items-center justify-center overflow-hidden",
      "px-10 py-3.5 transition-all duration-300",
      "hover:bg-[hsl(38_72%_44%/0.16)] hover:border-gold/65 hover:text-gold",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
      "active:scale-[0.98]",
      className
    );

    if (as === "a" && href) {
      return (
        <a href={href} target={target} rel={rel} className={sharedClass} style={style}>
          {inner}
        </a>
      );
    }

    return (
      <button ref={ref} className={sharedClass} style={style} {...props}>
        {inner}
      </button>
    );
  }
);
ClearGlassButton.displayName = "ClearGlassButton";

/* ─────────────────────────────────────────────────────────────────────────
   Legacy aliases — keep MetalButton name working so existing imports
   don't break. MetalButton → GoldGlassButton.
   ───────────────────────────────────────────────────────────────────────── */
export const MetalButton  = GoldGlassButton;
export const LiquidButton = GoldGlassButton;
