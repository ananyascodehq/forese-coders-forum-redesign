"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/media";

const VERTEX = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uMouse;
  varying float vCrest;
  varying float vFade;
  varying float vSeed;

  void main() {
    vec3 p = position;

    // Three slow, overlapping waves make a silk-like surface.
    float h =
      sin(p.x * 0.55 + uTime * 0.45) * 0.55 +
      sin(p.z * 0.70 - uTime * 0.38 + p.x * 0.25) * 0.45 +
      sin((p.x + p.z) * 0.35 + uTime * 0.30) * 0.50;

    // A soft ripple spreads out from the pointer.
    float d = distance(p.xz, uMouse.xz);
    h += sin(d * 2.4 - uTime * 3.0) * exp(-d * 0.8) * 0.35;

    p.y = h;
    vCrest = smoothstep(0.1, 1.3, h);
    vSeed = aSeed;
    // Far rows fade into the dark so the field has depth instead of a hard edge.
    vFade = smoothstep(-13.0, -2.0, p.z);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min(uSize * (0.7 + 0.6 * fract(aSeed * 9.0)) / -mv.z, 4.5) * uPixelRatio;
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vCrest;
  varying float vFade;
  varying float vSeed;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.05, r);

    vec3 dim = vec3(0.20, 0.27, 0.08);
    vec3 lime = vec3(0.78, 0.95, 0.25);
    vec3 col = mix(dim, lime, vCrest);
    float alpha = soft * (0.19 + 0.5 * vCrest + 0.08 * vSeed) * vFade;
    gl_FragColor = vec4(col, alpha);
  }
`;

/**
 * A field of lime particles that flows like silk behind the hero text. Three.js is loaded on demand,
 * so it only costs bytes on pages that mount this. All motion runs in a vertex shader (no per-particle JS).
 * It pauses off screen and in hidden tabs, renders a single still frame under reduced motion,
 * and silently renders nothing if WebGL is unavailable.
 */
export function WovenCanvas({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // No WebGL: the section's dark background still looks fine.
      }

      const reduced = prefersReducedMotion();
      const fine = hasFinePointer();
      const small = host.clientWidth < 768;
      const COLS = small ? 120 : 240;
      const ROWS = small ? 70 : 120;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);

      renderer.setPixelRatio(pixelRatio);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.set(0, 2.6, 6);
      camera.lookAt(0, 0, -3);

      // A flat grid of points; the shader lifts it into waves.
      const positions = new Float32Array(COLS * ROWS * 3);
      const seeds = new Float32Array(COLS * ROWS);
      let n = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          positions[n * 3] = (c / (COLS - 1) - 0.5) * 24 + (Math.random() - 0.5) * 0.08;
          positions[n * 3 + 1] = 0;
          positions[n * 3 + 2] = 5 - (r / (ROWS - 1)) * 18 + (Math.random() - 0.5) * 0.08;
          seeds[n] = Math.random();
          n++;
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 26 },
          uPixelRatio: { value: pixelRatio },
          uMouse: { value: new THREE.Vector3(999, 0, 999) },
        },
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Pointer position on the wave plane (y = 0), smoothed so the ripple follows softly.
      const target = new THREE.Vector3(999, 0, 999);
      const mouse = material.uniforms.uMouse.value as InstanceType<typeof THREE.Vector3>;
      const ray = new THREE.Vector3();
      let rect = host.getBoundingClientRect();

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (w < 1 || h < 1) return;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        rect = host.getBoundingClientRect();
        if (reduced) renderer.render(scene, camera);
      };

      const onPointer = (e: PointerEvent) => {
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        if (Math.abs(nx) > 1 || Math.abs(ny) > 1) {
          target.set(999, 0, 999);
          return;
        }
        ray.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
        if (ray.y >= -0.01) {
          target.set(999, 0, 999);
          return;
        }
        const t = -camera.position.y / ray.y;
        target.set(camera.position.x + ray.x * t, 0, camera.position.z + ray.z * t);
      };
      const invalidateRect = () => {
        rect = host.getBoundingClientRect();
      };

      let raf = 0;
      let running = false;
      let inView = false;
      const t0 = performance.now();

      const frame = () => {
        if (!running) return;
        material.uniforms.uTime.value = (performance.now() - t0) / 1000;
        mouse.lerp(target, 0.08);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };
      const sync = () => {
        const want = inView && !document.hidden && !reduced;
        if (want === running) return;
        running = want;
        if (running) raf = requestAnimationFrame(frame);
        else cancelAnimationFrame(raf);
      };

      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
      });
      io.observe(host);
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      document.addEventListener("visibilitychange", sync);
      if (fine && !reduced) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("scroll", invalidateRect, { passive: true });
      }
      resize();

      cleanup = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", sync);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", invalidateRect);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      if (disposed) cleanup();
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
