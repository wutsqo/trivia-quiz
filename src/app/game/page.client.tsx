"use client";

import { FC } from "react";
import { Question } from "./interface";
import { QuizSection } from "@/components/game/quiz-section";
import { useGameStore } from "@/providers/game-store-provider";
import { SummarySection } from "@/components/game/summary-section";

interface Props {
  questions: Question[];
}

export const ClientGamePage: FC<Props> = ({ questions }) => {
  const { currentQuestionIndex } = useGameStore((state) => state);
  if (currentQuestionIndex === questions.length) return <SummarySection questions={questions} />;
  return <QuizSection questions={questions} />;
};
