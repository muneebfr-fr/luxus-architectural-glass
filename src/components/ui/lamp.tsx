"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * LampContainer — gold-tinted lamp glow for Luxus Architectural Glass.
 *
 * Replaces the original cyan/slate palette with the site's gold token system
 * and the primary dark-navy background colour (`bg-primary`).
 *
 * Props
 * ─────
 * children        – hero content rendered inside the glow zone
 * className       – extra classes on the outer wrapper
 * contentClassName– extra classes on the children-positioning div
 *                   (default positions: `-translate-y-80`; pass a smaller
 *                   value like `-translate-y-40` for taller content blocks)
 * footerElement   – optional node pinned to `bottom-10` (e.g. scroll cue)
 */
export const LampContainer = ({
  children,
  className,
  contentClassName,
  footerElement,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  footerElement?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-primary z-0",
        className
      )}
    >
      {/* ── Lamp inner layer ─────────────────────────────────────── */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">

        {/* Left conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            "absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]",
            "bg-gradient-conic from-gold via-transparent to-transparent",
            "[--conic-position:from_70deg_at_center_top]"
          )}
        >
          {/* Bottom edge mask */}
          <div className="absolute w-full left-0 bg-primary h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          {/* Left edge mask */}
          <div className="absolute w-40 h-full left-0 bg-primary bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            "absolute inset-auto left-1/2 h-56 w-[30rem]",
            "bg-gradient-conic from-transparent via-transparent to-gold",
            "[--conic-position:from_290deg_at_center_top]"
          )}
        >
          {/* Right edge mask */}
          <div className="absolute w-40 h-full right-0 bg-primary bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          {/* Bottom edge mask */}
          <div className="absolute w-full right-0 bg-primary h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Below-lamp blur wash */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-primary blur-2xl" />
        {/* Subtle frosted-glass depth */}
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Wide gold atmospheric glow */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-gold opacity-25 blur-3xl" />

        {/* Tight gold core glow */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-gold-light opacity-55 blur-2xl"
        />

        {/* Thin horizontal gold line — the "filament" */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-px w-[30rem] -translate-y-[7rem] bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        {/* Top cutoff — hides the top half of the conic gradients */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-primary" />
      </div>
      {/* ── End lamp inner layer ──────────────────────────────────── */}

      {/* ── Children — absolutely positioned so lamp glow shines through ── */}
      <div
        className={cn(
          "absolute inset-0 z-50 flex flex-col items-center justify-center px-5 pt-16",
          contentClassName
        )}
      >
        {children}
      </div>

      {/* ── Footer slot (e.g. scroll indicator) ──────────────────── */}
      {footerElement && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
          {footerElement}
        </div>
      )}
    </div>
  );
};

/** Standalone demo — not used in production, kept for reference. */
export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="mt-8 bg-gradient-to-br from-gold-light to-gold py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}
