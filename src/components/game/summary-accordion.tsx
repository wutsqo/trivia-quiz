import { Question } from "@/services/interface";
import { FC } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import he from "he";
import { useGameStore } from "@/providers/game-store-provider";

interface SummaryAccordionProps {
  questionIndex: number;
  question: Question;
}

export const SummaryAccordion: FC<SummaryAccordionProps> = ({ question, questionIndex }) => {
  const userAnswers = useGameStore((state) => state.userAnswers);
  const userAnswer = userAnswers[questionIndex];
  const isCorrect = userAnswer === question.correct_answer;
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`item-${questionIndex}`}>
        <AccordionTrigger className="text-lg font-semibold">{he.decode(question.question)}</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Your answer: {userAnswer}</p>
          <p className="mb-2">Correct answer: {question.correct_answer}</p>
          {!isCorrect && <p className="text-red-500">You missed this question.</p>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
