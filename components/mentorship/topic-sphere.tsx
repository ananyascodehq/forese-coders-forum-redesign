"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ICONS } from "./topic-icons";
import { TOPICS } from "./topics";

const DESIGN = 640; // design-time width in px; everything scales from this via --s
const RADIUS = 235;
const CARD_W = 104;
const CARD_H = 144;
const PER_TOPIC = 7;
const N = TOPICS.length * PER_TOPIC;
const BASE_SPEED = 0.012; // degrees per ms, about 30 s per turn

type Card = { i: number; topic: number; variant: number; theta: number; phi: number; tilt: number };

function buildCards(): Card[] {
  // Fibonacci sphere: evenly spread points, each card faces outward.
  return Array.from({ length: N }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / N;
    return {
      i,
      topic: i % TOPICS.length,
      variant: Math.floor(i / TOPICS.length),
      theta: Math.round(((i * 137.508) % 360) * 100) / 100,
      phi: Math.round(((Math.asin(y) * 180) / Math.PI) * 100) / 100, // rounded so server and client markup match
      tilt: ((i * 53) % 17) - 8,
    };
  });
}

const cards = buildCards();

export function TopicSphere() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const [hoverTopic, setHoverTopic] = useState<number | null>(null);

  // Live values read by the animation loop; they never trigger a render.
  const hoverRef = useRef(false);
  const pointer = useRef({ x: 0.5, y: 0.5, inside: false });

  const activeTopic = hoverCard !== null ? cards[hoverCard].topic : hoverTopic;

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const setScale = () => wrap.style.setProperty("--s", String(Math.min(1, wrap.clientWidth / DESIGN)));
    setScale();
    const ro = new ResizeObserver(setScale);
    ro.observe(wrap);

    let rotY = 24;
    let rotX = -10;
    let vel = BASE_SPEED;
    let last = 0;
    let raf = 0;
    let running = false;

    const apply = () => {
      stage.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };
    apply();

    const loop = (t: number) => {
      if (!running) return;
      const dt = last ? Math.min(48, t - last) : 16;
      last = t;
      const p = pointer.current;
      const steer = p.inside ? (p.x - 0.5) * 2 : 0;
      // Hovering a card nearly stops the sphere so it can be read; the pointer's side steers the spin.
      const target = hoverRef.current ? BASE_SPEED * 0.08 : BASE_SPEED + steer * 0.05;
      vel += (target - vel) * 0.07;
      rotY += vel * dt;
      rotX += ((p.inside ? -(p.y - 0.5) * 36 : -10) - rotX) * 0.06;
      apply();
      raf = requestAnimationFrame(loop);
    };

    const setRunning = (v: boolean) => {
      if (reduce || v === running) return;
      running = v;
      last = 0;
      if (v) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting));
    io.observe(wrap);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduce]);

  const active = activeTopic !== null ? TOPICS[activeTopic] : null;

  return (
    <div>
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="relative mx-auto w-full max-w-[640px] select-none"
        style={{ aspectRatio: "1 / 1", perspective: "calc(var(--s, 1) * 1500px)", ["--s" as string]: 1 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          pointer.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, inside: true };
        }}
        onPointerLeave={() => {
          pointer.current.inside = false;
          hoverRef.current = false;
          setHoverCard(null);
        }}
      >
        {/* Soft lime glow behind the sphere */}
        <div
          className="pointer-events-none absolute inset-[12%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(212,255,58,0.12), transparent 65%)" }}
        />

        <div
          ref={stageRef}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {cards.map((c) => {
            const topic = TOPICS[c.topic];
            const { caption, Icon } = ICONS[topic.key][c.variant];
            const hovered = hoverCard === c.i;
            const lit = hovered || activeTopic === c.topic;
            const dim = activeTopic !== null && activeTopic !== c.topic;
            return (
              <div
                key={c.i}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: `calc(var(--s, 1) * ${CARD_W}px)`,
                  height: `calc(var(--s, 1) * ${CARD_H}px)`,
                  marginLeft: `calc(var(--s, 1) * ${-CARD_W / 2}px)`,
                  marginTop: `calc(var(--s, 1) * ${-CARD_H / 2}px)`,
                  transform: `rotateY(${c.theta}deg) rotateX(${-c.phi}deg) translateZ(calc(var(--s, 1) * ${RADIUS}px)) rotateZ(${c.tilt}deg)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-[9%] transition-[transform,opacity,border-color,box-shadow] duration-300 ease-out"
                  style={{
                    background: "linear-gradient(160deg, #1E1E22 0%, #121214 100%)",
                    borderColor: lit ? "rgba(212,255,58,0.75)" : "#2B2B31",
                    boxShadow: lit
                      ? "0 0 32px -6px rgba(212,255,58,0.35), inset 0 1px 0 rgba(255,255,255,0.08)"
                      : "0 12px 30px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
                    transform: hovered ? `translateZ(calc(var(--s, 1) * 70px)) scale(1.12)` : "translateZ(0)",
                    opacity: dim ? 0.22 : 1,
                    backfaceVisibility: "hidden",
                  }}
                  onPointerEnter={() => {
                    hoverRef.current = true;
                    setHoverCard(c.i);
                  }}
                  onPointerLeave={() => {
                    hoverRef.current = false;
                    setHoverCard((h) => (h === c.i ? null : h));
                  }}
                >
                  <span
                    className="font-mono uppercase tracking-[0.18em]"
                    style={{ fontSize: "calc(var(--s, 1) * 10px)", color: lit ? "#D4FF3A" : "#A3A096" }}
                  >
                    {topic.short}
                  </span>
                  <Icon
                    strokeWidth={1.4}
                    className="mx-auto transition-colors duration-300"
                    style={{
                      width: "calc(var(--s, 1) * 46px)",
                      height: "calc(var(--s, 1) * 46px)",
                      color: lit ? "#D4FF3A" : "#F2EFE6",
                    }}
                  />
                  <span
                    className="font-mono uppercase leading-tight tracking-[0.1em]"
                    style={{ fontSize: "calc(var(--s, 1) * 9.5px)", color: "#A3A096" }}
                  >
                    {caption}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic legend. Hovering or focusing one lights up its cards. */}
      <div className="mx-auto mt-6 max-w-3xl">
        <ul className="flex flex-wrap justify-center gap-2">
          {TOPICS.map((t, i) => {
            const on = activeTopic === i;
            return (
              <li key={t.key}>
                <button
                  type="button"
                  onPointerEnter={() => setHoverTopic(i)}
                  onPointerLeave={() => setHoverTopic(null)}
                  onFocus={() => setHoverTopic(i)}
                  onBlur={() => setHoverTopic(null)}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 border px-4 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                    on
                      ? "border-[var(--cf-primary)] bg-[var(--cf-primary)] text-[var(--cf-cta-text)]"
                      : "border-[var(--cf-border)] text-[var(--cf-text)] hover:border-[var(--cf-primary)]/60"
                  }`}
                >
                  <span className={on ? "text-[var(--cf-cta-text)]/60" : "text-[var(--cf-primary)]"}>{t.short}</span>
                  {t.name}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 min-h-14 text-center text-base leading-relaxed text-[var(--cf-text-muted)]" aria-live="polite">
          {active ? active.body : "Move across the sphere to steer it. Hover a card or a topic to focus."}
        </p>
      </div>
    </div>
  );
}
