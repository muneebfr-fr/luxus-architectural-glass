"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
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
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate]       = useState(true);
  const [pulseEffect, setPulseEffect]     = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId]   = useState<number | null>(null);
  const [radius, setRadius]               = useState(200);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef     = useRef<HTMLDivElement>(null);

  /* ── Responsive radius ─────────────────────────────────────────── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setRadius(w < 480 ? 120 : w < 768 ? 165 : 210);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Auto-rotation ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(id);
  }, [autoRotate]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const next: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => { next[+k] = false; });
      next[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const related = timelineData.find((i) => i.id === id)?.relatedIds ?? [];
        const pulse: Record<number, boolean> = {};
        related.forEach((r) => { pulse[r] = true; });
        setPulseEffect(pulse);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return next;
    });
  };

  /* ── Node position in 3-D-like orbit ──────────────────────────── */
  const calcPos = (index: number, total: number) => {
    const angle   = ((index / total) * 360 + rotationAngle) % 360;
    const radian  = (angle * Math.PI) / 180;
    const x       = radius * Math.cos(radian);
    const y       = radius * Math.sin(radian);
    const zIndex  = Math.round(100 + 50 * Math.cos(radian));
    /* Depth fading: back nodes drop to 0.55 instead of 0.35 */
    const opacity = Math.max(0.55, Math.min(1, 0.55 + 0.45 * ((1 + Math.sin(radian)) / 2)));
    /* Back nodes shrink slightly */
    const scale   = Math.max(0.82, Math.min(1, 0.82 + 0.18 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity, scale };
  };

  const isRelatedToActive = (id: number) =>
    activeNodeId != null &&
    (timelineData.find((i) => i.id === activeNodeId)?.relatedIds ?? []).includes(id);

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-primary overflow-hidden relative select-none"
      style={{ minHeight: 580 }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* ── Ambient scene glow ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, hsl(38 72% 44% / 0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Orbit scene ────────────────────────────────────────────── */}
      <div
        className="relative w-full max-w-4xl flex items-center justify-center"
        style={{ height: 560, perspective: "1200px" }}
        ref={orbitRef}
      >

        {/* ── Outer accent ring ──────────────────────────────────── */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  radius * 2 + 96,
            height: radius * 2 + 96,
            border: "1px solid hsl(38 72% 44% / 0.08)",
          }}
        />

        {/* ── Main orbit ring ────────────────────────────────────── */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  radius * 2 + 40,
            height: radius * 2 + 40,
            border: "1px solid hsl(38 72% 44% / 0.35)",
            boxShadow: "0 0 24px hsl(38 72% 44% / 0.12), inset 0 0 24px hsl(38 72% 44% / 0.06)",
          }}
        />

        {/* ── Inner orbit ring ───────────────────────────────────── */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  radius * 2 - 30,
            height: radius * 2 - 30,
            border: "1px solid hsl(38 72% 44% / 0.12)",
          }}
        />

        {/* ── Centre orb ─────────────────────────────────────────── */}
        <div className="absolute z-10 pointer-events-none flex items-center justify-center">
          {/* Outer ambient halo */}
          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: 120,
              height: 120,
              background: "radial-gradient(circle, hsl(38 72% 44% / 0.18) 0%, transparent 70%)",
            }}
          />
          {/* Ping rings */}
          <div className="absolute w-20 h-20 rounded-full border border-gold/30 animate-ping opacity-50" />
          <div
            className="absolute w-28 h-28 rounded-full border border-gold/15 animate-ping opacity-30"
            style={{ animationDelay: "0.7s" }}
          />
          {/* Core orb */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(38 82% 30%) 0%, hsl(38 72% 44%) 50%, hsl(38 58% 60%) 100%)",
              boxShadow: "0 0 32px hsl(38 72% 44% / 0.55), 0 0 64px hsl(38 72% 44% / 0.25), inset 0 1px 0 hsl(38 58% 80% / 0.4)",
            }}
          >
            {/* Inner glass reflection */}
            <div
              className="w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, hsl(38 58% 80% / 0.35) 0%, transparent 60%)",
                border: "1px solid hsl(38 58% 80% / 0.20)",
              }}
            />
          </div>
        </div>

        {/* ── Nodes ──────────────────────────────────────────────── */}
        {timelineData.map((item, index) => {
          const pos        = calcPos(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated  = isRelatedToActive(item.id);
          const isPulsing  = pulseEffect[item.id];
          const Icon       = item.icon;

          /* Halo size grows with energy */
          const haloSize = item.energy * 0.55 + 40;

          return (
            <div
              key={item.id}
              className="absolute transition-all duration-500 cursor-pointer"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${isExpanded ? 1 : pos.scale})`,
                zIndex: isExpanded ? 300 : pos.zIndex,
                opacity: isExpanded ? 1 : pos.opacity,
              }}
              onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
            >
              {/* ── Halo glow ────────────────────────────────── */}
              <div
                aria-hidden
                className={`absolute rounded-full pointer-events-none transition-all duration-500 ${isPulsing ? "animate-pulse" : ""}`}
                style={{
                  background: isExpanded
                    ? `radial-gradient(circle, hsl(38 72% 44% / 0.65) 0%, hsl(38 72% 44% / 0.20) 50%, transparent 70%)`
                    : isRelated
                    ? `radial-gradient(circle, hsl(38 72% 44% / 0.50) 0%, hsl(38 72% 44% / 0.15) 50%, transparent 70%)`
                    : `radial-gradient(circle, hsl(38 72% 44% / 0.30) 0%, transparent 65%)`,
                  width:  haloSize,
                  height: haloSize,
                  left:   -(haloSize - 48) / 2,
                  top:    -(haloSize - 48) / 2,
                }}
              />

              {/* ── Node circle ──────────────────────────────── */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isExpanded
                    ? "linear-gradient(135deg, hsl(38 82% 30%), hsl(38 72% 44%), hsl(38 58% 60%))"
                    : isRelated
                    ? "hsl(38 72% 44% / 0.30)"
                    : "hsl(var(--primary))",
                  border: isExpanded
                    ? "2px solid hsl(38 58% 60%)"
                    : isRelated
                    ? "2px solid hsl(38 72% 44% / 0.80)"
                    : "2px solid hsl(38 72% 44% / 0.50)",
                  boxShadow: isExpanded
                    ? "0 0 20px hsl(38 72% 44% / 0.70), 0 0 40px hsl(38 72% 44% / 0.30), inset 0 1px 0 hsl(38 58% 80% / 0.30)"
                    : isRelated
                    ? "0 0 16px hsl(38 72% 44% / 0.45)"
                    : "0 0 8px hsl(38 72% 44% / 0.20)",
                  transform: isExpanded ? "scale(1.55)" : "scale(1)",
                  color: isExpanded ? "hsl(var(--primary))" : "hsl(38 72% 44%)",
                }}
              >
                <Icon size={16} strokeWidth={isExpanded ? 2 : 1.5} />
              </div>

              {/* ── Label ────────────────────────────────────── */}
              <div
                className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[10px] tracking-[0.22em] uppercase transition-all duration-300 pointer-events-none"
                style={{
                  color: isExpanded
                    ? "hsl(38 72% 44%)"
                    : "hsl(var(--primary-foreground) / 0.75)",
                  textShadow: isExpanded ? "0 0 12px hsl(38 72% 44% / 0.6)" : "none",
                  fontWeight: isExpanded ? 600 : 400,
                }}
              >
                {item.title}
              </div>

              {/* ── Expanded card ────────────────────────────── */}
              {isExpanded && (
                <div
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-60 sm:w-68 overflow-visible z-50"
                  style={{ width: "min(17rem, 90vw)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* connector line */}
                  <div
                    aria-hidden
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3"
                    style={{ background: "hsl(38 72% 44% / 0.6)" }}
                  />

                  <div
                    className="p-5 backdrop-blur-xl"
                    style={{
                      background: "hsl(var(--primary) / 0.95)",
                      border: "1px solid hsl(38 72% 44% / 0.35)",
                      boxShadow: "0 8px 40px hsl(38 72% 44% / 0.20), 0 2px 8px hsl(0 0% 0% / 0.40)",
                    }}
                  >
                    {/* Top edge shimmer */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, hsl(38 72% 44% / 0.60), transparent)",
                      }}
                    />

                    {/* Category badge */}
                    <div className="mb-3">
                      <span
                        className="font-body text-[9px] tracking-[0.20em] uppercase px-2.5 py-1 font-medium"
                        style={{
                          background: "hsl(38 72% 44% / 0.18)",
                          border: "1px solid hsl(38 72% 44% / 0.40)",
                          color: "hsl(38 72% 44%)",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <h3
                      className="font-display font-light text-primary-foreground text-xl mb-0.5 leading-tight"
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-body text-[10px] tracking-[0.14em] mb-3"
                      style={{ color: "hsl(38 72% 44% / 0.75)" }}
                    >
                      {item.date}
                    </p>

                    <div
                      className="w-full h-px mb-4"
                      style={{ background: "hsl(38 72% 44% / 0.20)" }}
                    />

                    <p className="font-body text-[0.75rem] text-primary-foreground/65 font-light leading-[1.72] mb-5">
                      {item.content}
                    </p>

                    <RouterLink
                      to={item.href}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MetalButton as="button" className="w-full py-2.5 justify-center text-[10px]">
                        Visit Page <ArrowRight size={11} />
                      </MetalButton>
                    </RouterLink>

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 pt-3" style={{ borderTop: "1px solid hsl(38 72% 44% / 0.15)" }}>
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
                                style={{ border: "1px solid hsl(38 72% 44% / 0.22)" }}
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

      {/* ── Hint ─────────────────────────────────────────────────── */}
      <p className="pb-6 font-body text-[9px] tracking-[0.28em] uppercase text-primary-foreground/25 pointer-events-none">
        Click a node to explore · Click canvas to resume
      </p>
    </div>
  );
}
