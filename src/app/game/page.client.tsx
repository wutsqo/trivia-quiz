"use client";

import { FC } from "react";
import { Question } from "./interface";
import { QuizSection } from "@/components/game/quiz-section";
import { useGameStore } from "@/providers/game-store-provider";

interface Props {
  questions: Question[];
}

export const ClientGamePage: FC<Props> = ({ questions }) => {
  const { currentQuestionIndex } = useGameStore((state) => state);
  if (currentQuestionIndex === questions.length) return "summary";
  return <QuizSection questions={questions} />;
};
