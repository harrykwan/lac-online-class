"use client";

import { useCallback, useEffect, useState } from "react";
import { getAudioEngine } from "@/lib/audio/AudioEngine";

/**
 * Returns a lazily-unlocked audio engine. `unlocked` flips true after the
 * first user gesture so components can show "tap to enable sound" states.
 */
export function useAudioEngine() {
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => {
    const eng = getAudioEngine();
    eng.ensure();
    setUnlocked(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      getAudioEngine().ensure();
      setUnlocked(true);
    };
    window.addEventListener("pointerdown", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return { unlocked, unlock };
}
