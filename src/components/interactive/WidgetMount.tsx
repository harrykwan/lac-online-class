"use client";

import type { WidgetId } from "@/data/types";
import { RhythmPlayer } from "./RhythmPlayer";
import { RhythmPatternGrid } from "./RhythmPatternGrid";
import { PianoKeyboard } from "./PianoKeyboard";
import { IntervalTrainer } from "./IntervalTrainer";
import { ChordQualityTrainer } from "./ChordQualityTrainer";
import { ScaleExplorer } from "./ScaleExplorer";
import { KeySignatureMatch } from "./KeySignatureMatch";
import { ChordToneTrainer } from "./ChordToneTrainer";
import { EQExplorer } from "./EQExplorer";
import { CompressorVisualizer } from "./CompressorVisualizer";
import { ReverbConceptDemo } from "./ReverbConceptDemo";

/**
 * Mounts an interactive widget by id. Extended as new widgets are built;
 * unknown ids render a dev notice (guards against data typos).
 */
export function WidgetMount({
  id,
  accent,
  className,
}: {
  id: WidgetId;
  accent: string;
  className?: string;
}) {
  switch (id) {
    case "rhythm-player":
      return <RhythmPlayer accent={accent} className={className} />;
    case "rhythm-grid":
      return <RhythmPatternGrid accent={accent} className={className} />;
    case "piano-keyboard":
      return (
        <div className={className}>
          <PianoKeyboard startMidi={48} octaves={3} labels="letters" />
        </div>
      );
    case "interval-trainer":
      return <IntervalTrainer accent={accent} className={className} />;
    case "chord-quality-trainer":
      return <ChordQualityTrainer accent={accent} className={className} />;
    case "scale-explorer":
      return <ScaleExplorer accent={accent} className={className} />;
    case "key-signature-match":
      return <KeySignatureMatch accent={accent} className={className} />;
    case "chord-tone-trainer":
      return <ChordToneTrainer accent={accent} className={className} />;
    case "eq-explorer":
      return <EQExplorer accent={accent} className={className} />;
    case "compressor-visualizer":
      return <CompressorVisualizer accent={accent} className={className} />;
    case "reverb-demo":
      return <ReverbConceptDemo accent={accent} className={className} />;
    default:
      if (process.env.NODE_ENV !== "production") {
        return (
          <p className="pill" role="status">
            Widget 未實作：{id}
          </p>
        );
      }
      return null;
  }
}
