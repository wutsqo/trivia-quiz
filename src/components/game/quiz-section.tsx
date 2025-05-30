import { Question } from "@/services/interface";
import { FC, useState } from "react";
import he from "he";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import Star15 from "../stars/s15";
import { Button } from "../ui/button";
import { useGameStore } from "@/providers/game-store-provider";

interface Props {
  questions: Question[];
}

export const QuizSection: FC<Props> = ({ questions }) => {
  const { currentQuestionIndex, userScore, answerAndGoToNextQuestion } = useGameStore((state) => state);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const decodedQuestion = he.decode(currentQuestion.question);

  const onOptionClick = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correct_answer;
    if (isCorrect) {
      toast.success("Correct answer! You got 10 points!");
    } else {
      toast.error("Ooops, Wrong answer!");
    }
    setTimeout(() => {
      answerAndGoToNextQuestion({
        prevAnswer: option,
        point: isCorrect ? 10 : 0,
      });
      setSelectedOption(null);
    }, 3000);
  };
  const getButtonVariant = (option: string) => {
    if (selectedOption === null) return "neutral";
    if (option === currentQuestion.correct_answer) return "default";
    if (option === selectedOption && option !== currentQuestion.correct_answer) return "destructive";
    return "neutral";
  };
  return (
    <div className="container max-w-screen-lg mx-auto flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-row w-full items-center gap-8">
          <div className="w-20 shrink-0">
            <div>Score: {userScore}</div>
          </div>
          <div className="w-full">
            <Progress value={currentQuestionIndex * 10 + 10} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col w-full gap-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="relative h-32 w-32 items-center justify-center shrink-0 hidden lg:flex">
              <Star15 color="white" size={96} stroke="black" strokeWidth={4} className="absolute z-0" />
              <div className="relative z-10 text-3xl">{currentQuestionIndex + 1}</div>
            </div>
            <h2 className="text-xl lg:text-2xl w-full">{decodedQuestion}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                className="text-lg break-words whitespace-normal"
                size="xl"
                type="button"
                onClick={() => onOptionClick(option)}
                variant={getButtonVariant(option)}
                disabled={selectedOption !== null}
              >
                {he.decode(option)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
