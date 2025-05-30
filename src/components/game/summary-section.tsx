import { Question } from "@/services/interface";
import { useGameStore } from "@/providers/game-store-provider";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { SummaryAccordion } from "./summary-accordion";

interface Props {
  questions: Question[];
}

export const SummarySection: FC<Props> = ({ questions }) => {
  const { userScore } = useGameStore((state) => state);

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
          <h1 className="text-center text-2xl">Here&apos;s your summary:</h1>
          {questions.map((question, index) => (
            <SummaryAccordion questionIndex={index} key={question.question} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
