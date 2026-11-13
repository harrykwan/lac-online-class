import type { QuizSet } from "../types";
import { rhythmQuiz } from "./rhythm";
import { theoryQuiz } from "./theory";
import { compositionQuiz } from "./composition";
import { logicProQuiz } from "./logic-pro";
import { arrangementQuiz } from "./arrangement";
import { mixingQuiz } from "./mixing";

export const QUIZ_SETS: Record<string, QuizSet> = {
  rhythm: rhythmQuiz,
  theory: theoryQuiz,
  composition: compositionQuiz,
  "logic-pro": logicProQuiz,
  arrangement: arrangementQuiz,
  mixing: mixingQuiz,
};

export function getQuizSet(id: string): QuizSet | undefined {
  return QUIZ_SETS[id];
}
