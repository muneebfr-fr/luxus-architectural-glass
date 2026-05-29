/**
 * Turns the logo into a grayscale bevel-depth map the shader reads.
 * Reduced MAX_SIZE (320px) and ITERATIONS (80) vs the original (1000px / 300)
 * so it doesn't block the main thread when run in the browser.
 */
export function parseLogoImage(src: string): Promise<ImageData> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const MAX_SIZE = 320;
      const MIN_SIZE = 160;
      let w = img.naturalWidth  || 320;
      let h = img.naturalHeight || 320;

      if (w > MAX_SIZE || h > MAX_SIZE || w < MIN_SIZE || h < MIN_SIZE) {
        if (w >= h) {
          const f = w > MAX_SIZE ? MAX_SIZE / w : MIN_SIZE / w;
          h = Math.round(h * f);
          w = Math.round(w * f);
        } else {
          const f = h > MAX_SIZE ? MAX_SIZE / h : MIN_SIZE / h;
          w = Math.round(w * f);
          h = Math.round(h * f);
        }
      }

      canvas.width  = w;
      canvas.height = h;

      /* Draw original image to extract the shape mask */
      const shapeCanvas = document.createElement("canvas");
      shapeCanvas.width  = w;
      shapeCanvas.height = h;
      const sCtx = shapeCanvas.getContext("2d")!;
      sCtx.drawImage(img, 0, 0, w, h);

      const shapeData = sCtx.getImageData(0, 0, w, h).data;
      const shapeMask = new Uint8Array(w * h);

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i4 = (y * w + x) * 4;
          const r  = shapeData[i4];
          const g  = shapeData[i4 + 1];
          const b  = shapeData[i4 + 2];
          const a  = shapeData[i4 + 3];
          shapeMask[y * w + x] =
            (r === 255 && g === 255 && b === 255 && a === 255) || a === 0 ? 0 : 1;
        }
      }

      const inside = (x: number, y: number) =>
        x >= 0 && x < w && y >= 0 && y < h && shapeMask[y * w + x] === 1;

      /* Boundary mask */
      const boundaryMask = new Uint8Array(w * h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          if (!shapeMask[idx]) continue;
          let boundary = false;
          outer: for (let ny = y - 1; ny <= y + 1; ny++) {
            for (let nx = x - 1; nx <= x + 1; nx++) {
              if (!inside(nx, ny)) { boundary = true; break outer; }
            }
          }
          if (boundary) boundaryMask[idx] = 1;
        }
      }

      /* Poisson solve (reduced iterations for performance) */
      const u    = new Float32Array(w * h);
      const newU = new Float32Array(w * h);
      const C    = 0.01;
      const ITER = 80;

      const getU = (x: number, y: number, arr: Float32Array) => {
        if (x < 0 || x >= w || y < 0 || y >= h) return 0;
        if (!shapeMask[y * w + x]) return 0;
        return arr[y * w + x];
      };

      for (let iter = 0; iter < ITER; iter++) {
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (!shapeMask[idx] || boundaryMask[idx]) { newU[idx] = 0; continue; }
            newU[idx] = (C + getU(x+1,y,u) + getU(x-1,y,u) + getU(x,y+1,u) + getU(x,y-1,u)) / 4;
          }
        }
        u.set(newU);
      }

      /* Normalise + nonlinear remap → output ImageData */
      let maxVal = 0;
      for (let i = 0; i < w * h; i++) if (u[i] > maxVal) maxVal = u[i];

      const alpha = 2.0;
      const out   = ctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          const px  = idx * 4;
          if (!shapeMask[idx]) {
            out.data[px] = out.data[px+1] = out.data[px+2] = 255;
            out.data[px+3] = 255;
          } else {
            const raw      = u[idx] / (maxVal || 1);
            const remapped = Math.pow(raw, alpha);
            const gray     = Math.round(255 * (1 - remapped));
            out.data[px] = out.data[px+1] = out.data[px+2] = gray;
            out.data[px+3] = 255;
          }
        }
      }

      resolve(out);
    };

    img.onerror = () => reject(new Error("Failed to load logo image"));
    img.src = src;
  });
}
