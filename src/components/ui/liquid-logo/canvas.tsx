"use client";
import { useEffect, useRef, useState } from "react";
import { liquidFragSource } from "./liquid-frag";

const vertexShaderSource = `#version 300 es
precision mediump float;
in vec2 a_position;
out vec2 vUv;
void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
}` as const;

export type ShaderParams = {
  patternScale: number;
  refraction:   number;
  edge:         number;
  patternBlur:  number;
  liquid:       number;
  speed:        number;
};

export function LiquidCanvas({
  imageData,
  params,
}: {
  imageData: ImageData;
  params:    ShaderParams;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gl, setGl]             = useState<WebGL2RenderingContext | null>(null);
  const [uniforms, setUniforms] = useState<Record<string, WebGLUniformLocation>>({});
  const totalTime   = useRef(0);
  const lastTime    = useRef(0);
  const paramsRef   = useRef(params);
  paramsRef.current = params;

  /* ── Init shader once ─────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl     = canvas?.getContext("webgl2", { antialias: true, alpha: true });
    if (!canvas || !gl) return;

    const createShader = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = createShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = createShader(liquidFragSource,   gl.FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    if (!vs || !fs) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }

    const uniformMap: Record<string, WebGLUniformLocation> = {};
    const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const name = gl.getActiveUniform(prog, i)?.name;
      if (name) uniformMap[name] = gl.getUniformLocation(prog, name)!;
    }
    setUniforms(uniformMap);

    const verts  = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const vbuf   = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.useProgram(prog);
    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    setGl(gl);
  }, []);

  /* ── Push uniforms ────────────────────────────────────────── */
  useEffect(() => {
    if (!gl || !Object.keys(uniforms).length) return;
    const p = paramsRef.current;
    gl.uniform1f(uniforms.u_edge,         p.edge);
    gl.uniform1f(uniforms.u_patternBlur,  p.patternBlur);
    gl.uniform1f(uniforms.u_time,         0);
    gl.uniform1f(uniforms.u_patternScale, p.patternScale);
    gl.uniform1f(uniforms.u_refraction,   p.refraction);
    gl.uniform1f(uniforms.u_liquid,       p.liquid);
  }, [gl, uniforms, params]);

  /* ── Render loop ──────────────────────────────────────────── */
  useEffect(() => {
    if (!gl || !Object.keys(uniforms).length) return;
    let raf: number;
    const render = (now: number) => {
      totalTime.current += (now - lastTime.current) * paramsRef.current.speed;
      lastTime.current   = now;
      gl.uniform1f(uniforms.u_time, totalTime.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    lastTime.current = performance.now();
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [gl, uniforms]);

  /* ── Resize canvas ────────────────────────────────────────── */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !gl || !Object.keys(uniforms).length) return;
    const resize = () => {
      const side = 400;
      el.width = el.height = side * devicePixelRatio;
      gl.viewport(0, 0, side * devicePixelRatio, side * devicePixelRatio);
      gl.uniform1f(uniforms.u_ratio,     1);
      gl.uniform1f(uniforms.u_img_ratio, imageData.width / imageData.height);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [gl, uniforms, imageData]);

  /* ── Upload texture ───────────────────────────────────────── */
  useEffect(() => {
    if (!gl || !Object.keys(uniforms).length) return;
    const tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, imageData.width, imageData.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imageData.data);
    gl.uniform1i(uniforms.u_image_texture, 0);
    return () => gl.deleteTexture(tex);
  }, [gl, uniforms, imageData]);

  return <canvas ref={canvasRef} className="block h-full w-full object-contain" />;
}
