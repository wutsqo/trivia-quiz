import { Question } from "@/app/game/interface";
import { useGameStore } from "@/providers/game-store-provider";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import he from "he";

interface Props {
  questions: Question[];
}

export const SummarySection: FC<Props> = ({ questions }) => {
  const { userScore, userAnswers } = useGameStore((state) => state);

  return (
    <div className="container max-w-screen-lg mx-auto flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col w-full gap-4">
          <h1 className="text-center text-2xl">Congratulations! Your score is</h1>
          <h2 className="text-center text-5xl font-bold">{userScore}</h2>
          <p className="text-center text-lg">
            You answered {userScore / 10} out of {questions.length} questions correctly.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col w-full gap-4">
          <h1 className="text-center text-2xl">Here`&apos;s your summary:</h1>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct_answer;
            return (
              <Accordion type="single" collapsible className="w-full" key={index}>
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">{he.decode(question.question)}</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Your answer: {userAnswer}</p>
                    <p className="mb-2">Correct answer: {question.correct_answer}</p>
                    {!isCorrect && <p className="text-red-500">You missed this question.</p>}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
