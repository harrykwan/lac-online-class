"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioEngine } from "@/lib/audio/AudioEngine";

export interface SchedulerOptions {
  bpm: number;
  /** 16th steps per bar (beatsPerBar * 4). */
  stepsPerBar: number;
  swing?: boolean;
  /** 0.5 (straight) … 0.7; default 0.66 = triplet swing. */
  swingRatio?: number;
  /** Total bars to play before auto-stopping; default loops forever. */
  bars?: number;
  /** Called at schedule time with the in-bar 16th step index + precise AudioContext time. */
  playStep(step: number, time: number): void;
}

interface QueuedStep {
  step: number;
  time: number;
  generation: number;
}

const LOOKAHEAD_S = 0.12;
const TICK_MS = 25;

/**
 * Look-ahead rhythm scheduler. Schedules audio precisely with the Web Audio
 * clock; a rAF loop syncs `currentStep` state to the audible position for
 * LED/visual feedback. Swing shifts the 8th-note offbeat (sub 2) to
 * `swingRatio` of a beat, and 16th positions scale proportionally.
 */
export function useRhythmScheduler() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const queueRef = useRef<QueuedStep[]>([]);
  const genRef = useRef(0);
  const nextStepRef = useRef(0);
  const nextTimeRef = useRef(0);
  const optsRef = useRef<SchedulerOptions | null>(null);

  const stop = useCallback(() => {
    genRef.current += 1;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    queueRef.current = [];
    optsRef.current = null;
    setIsPlaying(false);
    setCurrentStep(-1);
  }, []);

  const start = useCallback(
    (opts: SchedulerOptions) => {
      stop();
      const eng = getAudioEngine();
      const ctx = eng.ensure();
      const generation = ++genRef.current;

      optsRef.current = opts;
      nextStepRef.current = 0;
      nextTimeRef.current = ctx.currentTime + 0.06;
      setIsPlaying(true);

      const swing = opts.swing ?? false;
      const ratio = opts.swingRatio ?? 0.66;
      const beatDur = 60 / opts.bpm;

      // Time delta from each 16th step to the next, so swing positions
      // accumulate correctly without tracking absolute bar starts.
      const deltaAfter = (sub: number): number => {
        if (!swing) return beatDur / 4;
        if (sub === 0) return (ratio / 2) * beatDur; // beat → swung "and"
        if (sub === 1) return (0.5 - ratio / 2) * beatDur; // → beat's mid
        if (sub === 2) return (0.5 - ratio / 2) * beatDur; // "and" → swung mid
        return (ratio / 2) * beatDur; // mid → next beat
      };

      const schedule = () => {
        const o = optsRef.current;
        if (!o) return;
        const now = ctx.currentTime;
        while (nextTimeRef.current < now + LOOKAHEAD_S) {
          const step = nextStepRef.current;
          const totalSteps = o.stepsPerBar * (o.bars ?? Infinity);
          if (step >= totalSteps) {
            stop();
            return;
          }
          const inBar = step % o.stepsPerBar;
          o.playStep(inBar, nextTimeRef.current);
          queueRef.current.push({
            step: inBar,
            time: nextTimeRef.current,
            generation,
          });
          nextTimeRef.current += deltaAfter(inBar % 4);
          nextStepRef.current = step + 1;
        }
      };

      intervalRef.current = setInterval(schedule, TICK_MS);
      schedule();

      const tick = () => {
        if (genRef.current !== generation) return;
        const now = ctx.currentTime;
        const queue = queueRef.current;
        while (queue.length > 0 && queue[0].time <= now) {
          setCurrentStep(queue.shift()!.step);
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [stop],
  );

  useEffect(() => stop, [stop]);

  return { isPlaying, currentStep, start, stop };
}
