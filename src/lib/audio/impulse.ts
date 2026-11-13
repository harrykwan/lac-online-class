import { getAudioEngine } from "./AudioEngine";

export type ReverbPreset = "room" | "hall" | "plate";

export const REVERB_PRESETS: Record<
  ReverbPreset,
  { label: string; seconds: number; decay: number; bright: boolean }
> = {
  room: { label: "Room", seconds: 0.6, decay: 2.5, bright: false },
  hall: { label: "Hall", seconds: 2.4, decay: 2.0, bright: false },
  plate: { label: "Plate", seconds: 1.6, decay: 3.5, bright: true },
};

export interface VerbParams { seconds: number; decay: number; bright: boolean }

/** Procedural decaying-noise impulse response — no IR files needed. */
export function buildImpulse(preset: ReverbPreset): AudioBuffer {
  const { seconds, decay, bright } = REVERB_PRESETS[preset];
  return buildCustomImpulse({ seconds, decay, bright });
}

/** Free-parameter IR builder — lets students dial any decay time live. */
export function buildCustomImpulse(params: VerbParams): AudioBuffer {
  const { seconds, decay, bright } = params;
  const eng = getAudioEngine();
  const ctx = eng.ensure();
  const rate = ctx.sampleRate;
  const len = Math.max(1, Math.floor(rate * seconds));
  const buf = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < len; i++) {
      const n = Math.random() * 2 - 1;
      // darken the tail unless plate (bright)
      lp = bright ? n : lp + (n - lp) * 0.35;
      data[i] = lp * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}
