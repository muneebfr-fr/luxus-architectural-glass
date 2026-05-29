"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    THREE: any
  }
}

interface ShaderAnimationProps {
  className?: string
}

/**
 * ShaderAnimation — Three.js GLSL sweep-line shader, gold-toned for Luxus brand.
 * Loads Three.js r89 from CDN (no npm dep). Capped pixel-ratio for mobile perf.
 */
export function ShaderAnimation({ className = "" }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    renderer: any
    animationId: number | null
    resizeHandler: (() => void) | null
  }>({ renderer: null, animationId: null, resizeHandler: null })

  useEffect(() => {
    let scriptEl: HTMLScriptElement | null = null

    const boot = () => {
      if (containerRef.current && window.THREE) initScene()
    }

    if (window.THREE) {
      boot()
    } else {
      scriptEl = document.createElement("script")
      scriptEl.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js"
      scriptEl.onload = boot
      document.head.appendChild(scriptEl)
    }

    return () => {
      if (stateRef.current.animationId != null)
        cancelAnimationFrame(stateRef.current.animationId)
      if (stateRef.current.resizeHandler)
        window.removeEventListener("resize", stateRef.current.resizeHandler)
      if (stateRef.current.renderer) stateRef.current.renderer.dispose()
      if (scriptEl && document.head.contains(scriptEl))
        document.head.removeChild(scriptEl)
    }
  }, [])

  function initScene() {
    if (!containerRef.current || !window.THREE) return
    const THREE = window.THREE
    const container = containerRef.current
    container.innerHTML = ""

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    const geo = new THREE.PlaneBufferGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    /* Fragment shader — same sweep-line logic, re-mapped to warm gold palette */
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float random(in float x)  { return fract(sin(x) * 1e4); }
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 mosaic  = vec2(4.0, 2.0);
        vec2 screen  = vec2(256.0, 256.0);
        uv.x = floor(uv.x * screen.x / mosaic.x) / (screen.x / mosaic.x);
        uv.y = floor(uv.y * screen.y / mosaic.y) / (screen.y / mosaic.y);

        float t         = time * 0.06 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;

        vec3 raw = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            raw[j] += lineWidth * float(i * i)
              / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) - length(uv));
          }
        }

        /* Map raw RGB → warm gold: R≈1.0, G≈0.78, B≈0.10 */
        float lum = raw[0] * 0.55 + raw[1] * 0.30 + raw[2] * 0.15;
        vec3 gold = vec3(
          lum * 1.00 + raw[0] * 0.45,
          lum * 0.76 + raw[1] * 0.18,
          lum * 0.06 + raw[2] * 0.04
        );

        gl_FragColor = vec4(gold, 1.0);
      }
    `

    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geo, mat))

    /* Cap pixel-ratio at 1.5 — saves GPU on high-DPI phones */
    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    const onResize = () => {
      const { width, height } = container.getBoundingClientRect()
      renderer.setSize(width, height)
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
      )
    }
    onResize()
    window.addEventListener("resize", onResize, false)

    stateRef.current.renderer      = renderer
    stateRef.current.resizeHandler = onResize

    const tick = () => {
      stateRef.current.animationId = requestAnimationFrame(tick)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }
    tick()
  }

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
