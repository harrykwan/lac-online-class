/**
 * Singleton Web Audio engine.
 *
 * The AudioContext is created lazily inside `ensure()`, which must only be
 * called from user-gesture handlers or effects — never at module scope —
 * so SSR/hydration and autoplay policy are both satisfied.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;

  ensure(): AudioContext {
    if (typeof window === "undefined") {
      throw new Error("AudioEngine is browser-only");
    }
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.8;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  get masterGain(): GainNode {
    this.ensure();
    return this.master!;
  }

  /** Shared looping white-noise buffer (2 s) used by EQ/compressor demos. */
  noiseSource(): AudioBufferSourceNode {
    const ctx = this.ensure();
    if (!this.noiseBuf) {
      const len = ctx.sampleRate * 2;
      this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    return src;
  }

  /** One-shot non-looping noise buffer source of `seconds` length. */
  burstSource(seconds: number): AudioBufferSourceNode {
    const ctx = this.ensure();
    const len = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    return src;
  }

  midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  now(): number {
    return this.ensure().currentTime;
  }
}

let engine: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  engine ??= new AudioEngine();
  return engine;
}
