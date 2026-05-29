"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MetalButton } from "@/components/ui/liquid-glass-button";

export interface OrbitalItem {
  id: number;
  title: string;
  category: string;
  date: string;
  content: string;
  icon: React.ElementType;
  relatedIds: number[];
  energy: number;
  href: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: OrbitalItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId]     = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate]     = useState(true);
  const [pulsingIds, setPulsingIds]     = useState<Set<number>>(new Set());
  const [radius, setRadius]             = useState(220);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate     = useNavigate();

  /* ── Responsive radius ─────────────────────────────────────────── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setRadius(w < 480 ? 130 : w < 768 ? 180 : 230);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Auto-rotation ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(
      () => setRotationAngle((prev) => Number(((prev + 0.22) % 360).toFixed(3))),
      50
    );
    return () => clearInterval(id);
  }, [autoRotate]);

  /* ── Position helper ───────────────────────────────────────────── */
  const calcPos = (index: number, total: number) => {
    const angle  = ((index / total) * 360 + rotationAngle) % 360;
    const rad    = (angle * Math.PI) / 180;
    const x      = radius * Math.cos(rad);
    const y      = radius * Math.sin(rad);
    const zIndex = Math.round(100 + 50 * Math.cos(rad));
    /* depth: back nodes fade to 0.60 (was 0.35 originally) */
    const opacity = Math.max(0.60, Math.min(1, 0.60 + 0.40 * ((1 + Math.sin(rad)) / 2)));
    const scale   = Math.max(0.85, Math.min(1, 0.85 + 0.15 * ((1 + Math.sin(rad)) / 2)));
    return { x, y, zIndex, opacity, scale, rad };
  };

  /* ── Toggle a node ─────────────────────────────────────────────── */
  const toggleItem = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setAutoRotate(true);
      setPulsingIds(new Set());
    } else {
      setExpandedId(id);
      setAutoRotate(false);
      const related = timelineData.find((i) => i.id === id)?.relatedIds ?? [];
      setPulsingIds(new Set(related));
    }
  };

  /* ── Navigate + scroll top ─────────────────────────────────────── */
  const visitPage = (href: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(href);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
      setPulsingIds(new Set());
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center bg-primary overflow-visible relative select-none"
      style={{ minHeight: 620 }}
      onClick={handleBackdrop}
    >
      {/* ── Ambient centre glow ────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, hsl(38 72% 44% / 0.13) 0%, transparent 68%)",
        }}
      />

      {/* ── Orbit scene ────────────────────────────────────────────── */}
      <div
        className="relative w-full max-w-4xl flex items-center justify-center"
        style={{ height: 600, perspective: "1200px" }}
      >

        {/* ── Decorative rings ───────────────────────────────────── */}
        {/* outer faint ring */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: radius * 2 + 110,
            height: radius * 2 + 110,
            border: "1px solid hsl(38 72% 44% / 0.07)",
          }}
        />
        {/* main orbit ring */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: radius * 2 + 48,
            height: radius * 2 + 48,
            border: "1px solid hsl(38 72% 44% / 0.40)",
            boxShadow:
              "0 0 28px hsl(38 72% 44% / 0.14), inset 0 0 28px hsl(38 72% 44% / 0.07)",
          }}
        />
        {/* inner guide ring */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: radius * 2 - 24,
            height: radius * 2 - 24,
            border: "1px solid hsl(38 72% 44% / 0.10)",
          }}
        />

        {/* ── Centre orb ─────────────────────────────────────────── */}
        <div className="absolute z-10 pointer-events-none flex items-center justify-center">
          {/* ambient halo */}
          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: 130, height: 130,
              background: "radial-gradient(circle, hsl(38 72% 44% / 0.20) 0%, transparent 70%)",
            }}
          />
          <div className="absolute w-20 h-20 rounded-full border border-gold/35 animate-ping opacity-55" />
          <div
            className="absolute w-28 h-28 rounded-full border border-gold/18 animate-ping opacity-35"
            style={{ animationDelay: "0.75s" }}
          />
          {/* core */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, hsl(38 82% 28%) 0%, hsl(38 72% 44%) 55%, hsl(38 58% 62%) 100%)",
              boxShadow:
                "0 0 36px hsl(38 72% 44% / 0.60), 0 0 72px hsl(38 72% 44% / 0.28), inset 0 1px 0 hsl(38 58% 80% / 0.45)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 33% 33%, hsl(38 58% 82% / 0.38) 0%, transparent 60%)",
                border: "1px solid hsl(38 58% 80% / 0.22)",
              }}
            />
          </div>
        </div>

        {/* ── Nodes ──────────────────────────────────────────────── */}
        {timelineData.map((item, index) => {
          const pos        = calcPos(index, timelineData.length);
          const isExpanded = expandedId === item.id;
          const isRelated  = !isExpanded && pulsingIds.has(item.id);
          const Icon       = item.icon;

          /* Card appears above the node when it's in the bottom arc (pos.y > 0) */
          const cardAbove  = pos.y > 0;
          const haloSize   = item.energy * 0.60 + 48;

          return (
            <div
              key={item.id}
              className="absolute transition-all duration-500 cursor-pointer"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${isExpanded ? 1 : pos.scale})`,
                zIndex: isExpanded ? 400 : pos.zIndex,
                opacity: isExpanded ? 1 : pos.opacity,
              }}
              onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
            >
              {/* ── Halo ──────────────────────────────────────── */}
              <div
                aria-hidden
                className={`absolute rounded-full pointer-events-none transition-all duration-500 ${isRelated ? "animate-pulse" : ""}`}
                style={{
                  width:  haloSize,
                  height: haloSize,
                  left:   -(haloSize - 52) / 2,
                  top:    -(haloSize - 52) / 2,
                  background: isExpanded
                    ? "radial-gradient(circle, hsl(38 72% 44% / 0.70) 0%, hsl(38 72% 44% / 0.22) 50%, transparent 70%)"
                    : isRelated
                    ? "radial-gradient(circle, hsl(38 72% 44% / 0.55) 0%, hsl(38 72% 44% / 0.15) 55%, transparent 72%)"
                    : "radial-gradient(circle, hsl(38 72% 44% / 0.38) 0%, hsl(38 72% 44% / 0.08) 60%, transparent 78%)",
                }}
              />

              {/* ── Node circle ───────────────────────────────── */}
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isExpanded
                    ? "linear-gradient(135deg, hsl(38 82% 28%), hsl(38 72% 44%), hsl(38 58% 62%))"
                    : isRelated
                    ? "hsl(38 72% 44% / 0.28)"
                    : "hsl(var(--primary))",
                  border: isExpanded
                    ? "2px solid hsl(38 58% 65%)"
                    : isRelated
                    ? "2px solid hsl(38 72% 44% / 0.85)"
                    : "2px solid hsl(38 72% 44% / 0.65)",
                  boxShadow: isExpanded
                    ? "0 0 24px hsl(38 72% 44% / 0.75), 0 0 48px hsl(38 72% 44% / 0.35), inset 0 1px 0 hsl(38 58% 80% / 0.35)"
                    : isRelated
                    ? "0 0 18px hsl(38 72% 44% / 0.55)"
                    : "0 0 12px hsl(38 72% 44% / 0.30), inset 0 1px 0 hsl(38 58% 80% / 0.10)",
                  transform: isExpanded ? "scale(1.50)" : "scale(1)",
                  color: isExpanded
                    ? "hsl(var(--primary))"
                    : "hsl(38 72% 56%)",   /* brighter than before */
                }}
              >
                <Icon size={17} strokeWidth={isExpanded ? 2 : 1.75} />
              </div>

              {/* ── Label ─────────────────────────────────────── */}
              <div
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[10px] tracking-[0.22em] uppercase transition-all duration-300 pointer-events-none"
                style={{
                  top: "calc(100% + 10px)",
                  color: isExpanded
                    ? "hsl(38 72% 55%)"
                    : "hsl(var(--primary-foreground) / 0.80)",
                  textShadow: isExpanded ? "0 0 14px hsl(38 72% 44% / 0.65)" : "none",
                  fontWeight: isExpanded ? 600 : 400,
                }}
              >
                {item.title}
              </div>

              {/* ── Expanded card ─────────────────────────────── */}
              {isExpanded && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-50 overflow-visible"
                  style={{
                    width: "min(17rem, 88vw)",
                    /* flip: above node when bottom-arc, below when top-arc */
                    ...(cardAbove
                      ? { bottom: "calc(100% + 18px)" }
                      : { top:    "calc(100% + 18px)" }),
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* connector line */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 w-px"
                    style={{
                      height: 14,
                      background: "hsl(38 72% 44% / 0.65)",
                      ...(cardAbove ? { top: "100%" } : { bottom: "100%" }),
                    }}
                  />

                  <div
                    className="p-5 backdrop-blur-xl"
                    style={{
                      background: "hsl(var(--primary) / 0.96)",
                      border: "1px solid hsl(38 72% 44% / 0.40)",
                      boxShadow:
                        "0 8px 48px hsl(38 72% 44% / 0.22), 0 2px 10px hsl(0 0% 0% / 0.45)",
                    }}
                  >
                    {/* top-edge shimmer */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg,transparent,hsl(38 72% 44%/0.65),transparent)",
                      }}
                    />

                    {/* badge */}
                    <span
                      className="inline-block font-body text-[9px] tracking-[0.20em] uppercase px-2.5 py-1 font-medium mb-3"
                      style={{
                        background: "hsl(38 72% 44% / 0.18)",
                        border: "1px solid hsl(38 72% 44% / 0.42)",
                        color: "hsl(38 72% 55%)",
                      }}
                    >
                      {item.category}
                    </span>

                    <h3 className="font-display font-light text-primary-foreground text-xl leading-tight mb-0.5">
                      {item.title}
                    </h3>
                    <p
                      className="font-body text-[10px] tracking-[0.14em] mb-3"
                      style={{ color: "hsl(38 72% 55% / 0.80)" }}
                    >
                      {item.date}
                    </p>

                    <div className="w-full h-px mb-4" style={{ background: "hsl(38 72% 44% / 0.22)" }} />

                    <p className="font-body text-[0.75rem] text-primary-foreground/65 font-light leading-[1.72] mb-5">
                      {item.content}
                    </p>

                    {/* Visit Page — navigates to top */}
                    <button
                      type="button"
                      onClick={(e) => visitPage(item.href, e)}
                      className="w-full"
                    >
                      <MetalButton as="button" className="w-full py-2.5 justify-center text-[10px] pointer-events-none">
                        Visit Page <ArrowRight size={11} />
                      </MetalButton>
                    </button>

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div
                        className="mt-4 pt-3"
                        style={{ borderTop: "1px solid hsl(38 72% 44% / 0.16)" }}
                      >
                        <p className="font-body text-[9px] tracking-[0.22em] uppercase text-primary-foreground/35 mb-2">
                          Related
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.relatedIds.map((relId) => {
                            const rel = timelineData.find((i) => i.id === relId);
                            return (
                              <button
                                key={relId}
                                type="button"
                                className="font-body text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 text-primary-foreground/55 hover:text-gold transition-colors duration-200"
                                style={{ border: "1px solid hsl(38 72% 44% / 0.25)" }}
                                onClick={(e) => { e.stopPropagation(); toggleItem(relId); }}
                              >
                                {rel?.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Hint ───────────────────────────────────────────────────── */}
      <p className="pb-6 font-body text-[9px] tracking-[0.28em] uppercase text-primary-foreground/22 pointer-events-none">
        Click a node · Click canvas to resume rotation
      </p>
    </div>
  );
}
