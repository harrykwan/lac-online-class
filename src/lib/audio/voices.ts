/**
 * Synth voice recipes — pure synthesis, no samples.
 * Every function takes an explicit AudioContext time so schedulers can
 * look ahead; playback position is unchanged (no transport here).
 */
import { getAudioEngine } from "./AudioEngine";

/** Metronome click. accent 1 = downbeat, 0.5 = beat, 0.25 = subdivision. */
export function playClick(t: number, accent: number, dest?: AudioNode): void {
  const eng = getAudioEngine();
  const ctx = eng.ensure();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const freq = accent >= 1 ? 2000 : accent >= 0.5 ? 1500 : 1000;
  osc.frequency.value = freq;
  osc.type = "sine";
  const peak = accent >= 1 ? 0.5 : accent >= 0.5 ? 0.32 : 0.18;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(peak, t + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  osc.connect(gain).connect(dest ?? eng.masterGain);
  osc.start(t);
  osc.stop(t + 0.06);
}

/** Melodic note: triangle + sine sub, lowpassed, small ADSR. */
export function playNote(
  midi: number,
  t: number,
  dur = 0.5,
  velocity = 0.7,
  dest?: AudioNode,
): void {
  const eng = getAudioEngine();
  const ctx = eng.ensure();
  const freq = eng.midiToFreq(midi);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 3000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(velocity * 0.5, t + 0.008);
  gain.gain.setTargetAtTime(velocity * 0.32, t + 0.01, 0.12);
  gain.gain.setTargetAtTime(0.0001, t + dur, 0.05);
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  const sub = ctx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = freq / 2;
  const subGain = ctx.createGain();
  subGain.gain.value = 0.35;
  osc.connect(filter);
  sub.connect(subGain).connect(filter);
  filter.connect(gain).connect(dest ?? eng.masterGain);
  osc.start(t);
  sub.start(t);
  osc.stop(t + dur + 0.4);
  sub.stop(t + dur + 0.4);
}

/** Block chord with optional short strum. */
export function playChord(
  midis: number[],
  t: number,
  dur = 1.0,
  strumMs = 0,
  dest?: AudioNode,
): void {
  midis.forEach((m, i) => {
    const offset = (strumMs / 1000) * i;
    playNote(m, t + offset, dur, 0.55, dest);
  });
}

export type IntervalMode = "melodic-asc" | "melodic-desc" | "harmonic";

export function playInterval(
  rootMidi: number,
  semitones: number,
  mode: IntervalMode,
  t?: number,
): void {
  const start = t ?? getAudioEngine().now() + 0.02;
  const second = rootMidi + semitones;
  if (mode === "harmonic") {
    playChord([rootMidi, second], start, 1.0);
  } else {
    const notes = mode === "melodic-asc" ? [rootMidi, second] : [second, rootMidi];
    playNote(notes[0], start, 0.45);
    playNote(notes[1], start + 0.55, 0.7);
  }
}

export function playScale(midis: number[], noteDur = 0.35, t?: number): number {
  const start = t ?? getAudioEngine().now() + 0.02;
  midis.forEach((m, i) => playNote(m, start + i * noteDur, noteDur * 0.9));
  return midis.length * noteDur + 0.5;
}

export type DrumKind = "kick" | "snare" | "hatClosed" | "hatOpen" | "ride" | "crash";

export function playDrum(kind: DrumKind, t: number, velocity = 0.9, dest?: AudioNode): void {
  const eng = getAudioEngine();
  const ctx = eng.ensure();
  const out = dest ?? eng.masterGain;

  if (kind === "kick") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.09);
    gain.gain.setValueAtTime(velocity * 0.9, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(gain).connect(out);
    osc.start(t);
    osc.stop(t + 0.3);
    return;
  }

  if (kind === "snare") {
    const burst = eng.burstSource(0.16);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2200;
    bp.Q.value = 0.8;
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(velocity * 0.55, t);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    burst.connect(bp).connect(bg).connect(out);
    burst.start(t);
    const tone = ctx.createOscillator();
    tone.type = "triangle";
    tone.frequency.value = 185;
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(velocity * 0.4, t);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    tone.connect(tg).connect(out);
    tone.start(t);
    tone.stop(t + 0.1);
    return;
  }

  // hats / ride / crash: filtered noise bursts
  const dur = kind === "hatClosed" ? 0.05 : kind === "ride" ? 0.4 : 0.9;
  const freq = kind === "crash" ? 6000 : 9000;
  const burst = eng.burstSource(dur + 0.02);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = freq;
  const g = ctx.createGain();
  const peak = kind === "crash" ? velocity * 0.35 : kind === "ride" ? velocity * 0.18 : velocity * 0.22;
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  burst.connect(hp).connect(g).connect(out);
  burst.start(t);
}
