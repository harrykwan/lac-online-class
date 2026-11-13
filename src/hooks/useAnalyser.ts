"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Draws an AnalyserNode-driven visual on a canvas every animation frame.
 * The canvas ref is read inside the effect/rAF loop (never during render).
 * Pass `enabled: false` to pause the loop. The caller owns the drawing.
 */
export function useAnalyserLoop(
  analyser: AnalyserNode | null,
  enabled: boolean,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  draw: (freq: Uint8Array, analyser: AnalyserNode, ctx: CanvasRenderingContext2D, w: number, h: number) => void,
) {
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    if (!analyser || !enabled) return;
    let raf = 0;
    const buf = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      const canvas = canvasRef.current;
      const ctx2d = canvas?.getContext("2d");
      if (canvas && ctx2d) {
        analyser.getByteFrequencyData(buf);
        drawRef.current(buf, analyser, ctx2d, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [analyser, enabled, canvasRef]);
}
