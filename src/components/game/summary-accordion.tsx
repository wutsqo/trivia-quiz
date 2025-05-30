import { FC } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import he from "he";
import { useGameStore } from "@/providers/game-store-provider";
import { cn } from "@/lib/utils";

interface SummaryAccordionProps {
  questionIndex: number;
}

export const SummaryAccordion: FC<SummaryAccordionProps> = ({ questionIndex }) => {
  const userAnswers = useGameStore((state) => state.userAnswers);
  const userAnswer = userAnswers[questionIndex];
  const isCorrect = userAnswer.correctAnswer === userAnswer.selectedAnswer;
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`item-${questionIndex}`}>
        <AccordionTrigger className={cn("text-lg font-semibold", !isCorrect && "bg-red-300")}>
          {he.decode(userAnswer.question)}
        </AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Your answer: {userAnswer.selectedAnswer}</p>
          <p className="mb-2">Correct answer: {userAnswer.correctAnswer}</p>
          {!isCorrect && <p className="text-red-500">You missed this question.</p>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
