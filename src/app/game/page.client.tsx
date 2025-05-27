"use client";

import { useGameStore } from "@/lib/game-store";
import { FC } from "react";
import { Question } from "./interface";
import { QuizSection } from "@/components/game/quiz-section";

interface Props {
  questions: Question[];
}

export const ClientGamePage: FC<Props> = ({ questions }) => {
  const { currentQuestionIndex } = useGameStore();
  if (currentQuestionIndex === questions.length) return "summary";
  return <QuizSection questions={questions} />;
};
