"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** "wordmark": glyphs resolve into the CODERS' FORUM wordmark. "compile": glyphs morph by scroll progress. */
  mode: "wordmark" | "compile";
  /** 0..1 scroll progress, read every frame. Only used in compile mode. */
  progressRef?: { current: number };
  className?: string;
};

const CHARS = "{}<>/;01=+*";
const DIM: [number, number, number] = [44, 44, 50]; // muted grey, sits on #0B0B0C
const BRIGHT: [number, number, number] = [212, 255, 58]; // #D4FF3A acid lime
const PUSH_RADIUS = 110;
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/** Target brightness (0..1) for a cell in each of the four "compile" stages. */
function stageValue(stage: number, c: number, r: number, rows: number): number {
  switch (stage) {
    case 0: // Learn: a quiet grid
      return c % 4 === 0 || r % 4 === 0 ? 0.5 : 0.04;
    case 1: {
      // Build: diagonal circuit lines
      const d1 = (c + r) % 6 === 0;
      const d2 = (((c - r) % 9) + 9) % 9 === 0;
      return d1 || d2 ? 0.7 : 0.04;
    }
    case 2: {
      // Compete: a scoreboard of bars
      const bar = Math.floor(c / 3);
      const height = ((bar * 37) % 11) / 10 * 0.8 + 0.1;
      const fromBottom = rows - r;
      return c % 3 !== 2 && fromBottom <= height * rows ? 0.6 : 0.04;
    }
    default: {
      // Mentor: linked nodes
      const node = c % 8 === 0 && r % 8 === 0;
      if (node) return 1;
      return r % 8 === 0 ? 0.3 : 0.04;
    }
  }
}

export function GlyphField({ mode, progressRef, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let cell = 15;
    let cols = 0;
    let rows = 0;
    let level = new Float32Array(0);
    let wordMask = new Float32Array(0);
    let charIdx = new Uint8Array(0);
    let pointer = { x: -9999, y: -9999 };
    let running = false;
    let raf = 0;
    let disposed = false;
    let fam = "sans-serif";

    const buildWordMask = () => {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d");
      if (!o) return;
      const lines = ["CODERS'", "FORUM"];
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = `700 100px ${fam}`;
      const widest = Math.max(...lines.map((l) => o.measureText(l).width));
      let size = (100 * (w * 0.86)) / widest;
      if (size * 0.92 * 2 > h * 0.5) size = (h * 0.5) / 2 / 0.92;
      o.font = `700 ${size}px ${fam}`;
      const lineH = size * 0.92;
      // Sit above centre so the tagline and CTAs below have room.
      lines.forEach((l, i) => o.fillText(l, w / 2, h * 0.4 + (i - 0.5) * lineH));

      // w/h are fractional CSS pixels; the canvas truncates them, so index with its integer size.
      const iw = off.width;
      const ih = off.height;
      const data = o.getImageData(0, 0, iw, ih).data;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = Math.min(iw - 1, Math.floor(c * cell + cell / 2));
          const y = Math.min(ih - 1, Math.floor(r * cell + cell / 2));
          wordMask[r * cols + c] = data[(y * iw + x) * 4 + 3] > 128 ? 1 : 0;
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cell = w < 640 ? 10 : 13;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      const n = cols * rows;
      level = new Float32Array(n);
      wordMask = new Float32Array(n);
      charIdx = new Uint8Array(n);
      for (let i = 0; i < n; i++) charIdx[i] = Math.floor(Math.random() * CHARS.length);

      if (mode === "wordmark") buildWordMask();
      if (reduced) draw(0, true);
    };

    const stageMask = (c: number, r: number) => {
      const p = Math.min(1, Math.max(0, progressRef?.current ?? 0));
      const s = Math.min(p * 3, 2.999);
      const k = Math.floor(s);
      const f = s - k;
      const a = stageValue(k, c, r, rows);
      const b = stageValue(k + 1, c, r, rows);
      return a + (b - a) * f;
    };

    const draw = (t: number, still = false) => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `500 ${cell - 2}px ${MONO}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const cx = c * cell + cell / 2;
          const cy = r * cell + cell / 2;

          const base = mode === "wordmark" ? wordMask[i] : stageMask(c, r);
          // Ambient: a faint, slowly breathing field so the grid never looks dead.
          // Wordmark cells go to full brightness so the name reads clearly; the rest stays quiet.
          // In wordmark mode the background is pushed lower so the name has strong contrast.
          const ambient = mode === "wordmark" ? 0.02 : 0.04;
          let target = base * 1.0 + ambient + (still ? 0 : 0.02 * Math.sin(t * 0.0015 + i * 0.7));

          if (!still && fine && pointer.x > -9000) {
            const dx = cx - pointer.x;
            const dy = cy - pointer.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < PUSH_RADIUS) target = Math.max(target, 1 - d / PUSH_RADIUS);
          }

          level[i] = still ? target : level[i] + (target - level[i]) * 0.14;
          const a = level[i];
          if (a < 0.01) continue;

          // Wordmark: a faint solid fill under the letterforms so the name reads as shapes, not just glyphs.
          const inWord = mode === "wordmark" && wordMask[i] > 0.5;
          if (inWord) {
            // Solid lime letterforms (scaled by level so they fade in) with dark code glyphs on top.
            ctx.fillStyle = `rgba(212,255,58,${Math.min(1, a * 0.95).toFixed(3)})`;
            ctx.fillRect(c * cell, r * cell, cell, cell);
          }

          if (!still && Math.random() < 0.0015) {
            charIdx[i] = Math.floor(Math.random() * CHARS.length);
          }

          if (inWord) {
            ctx.fillStyle = "rgba(11,11,12,0.55)";
            ctx.fillText(CHARS[charIdx[i]], cx, cy);
            continue;
          }

          const R = DIM[0] + (BRIGHT[0] - DIM[0]) * a;
          const G = DIM[1] + (BRIGHT[1] - DIM[1]) * a;
          const B = DIM[2] + (BRIGHT[2] - DIM[2]) * a;
          const alpha = mode === "wordmark" && wordMask[i] > 0.5 ? 1 : 0.3 + 0.7 * a;
          ctx.fillStyle = `rgba(${R | 0},${G | 0},${B | 0},${alpha.toFixed(3)})`;
          ctx.fillText(CHARS[charIdx[i]], cx, cy);
        }
      }
    };

    const loop = (t: number) => {
      if (!running || disposed) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const setRunning = (v: boolean) => {
      if (reduced || v === running) return;
      running = v;
      if (v) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      pointer = inside ? { x: e.clientX - rect.left, y: e.clientY - rect.top } : { x: -9999, y: -9999 };
    };

    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    io.observe(canvas);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    if (fine && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    let cancelled = false;
    document.fonts.ready.then(async () => {
      if (cancelled) return;
      fam = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "sans-serif";
      await document.fonts.load(`700 100px ${fam}`).catch(() => undefined);
      if (cancelled) return;
      resize();
    });

    return () => {
      disposed = true;
      cancelled = true;
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
    // mode is fixed per instance; progressRef is a stable ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
