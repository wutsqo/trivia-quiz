import { randomizeOptions } from "@/lib/utils";
import { APIResponse, Question } from "./interface";

interface GetGameQuestionsParams {
  difficulty?: string;
  category?: string;
}

export async function getGameQuestions({ difficulty, category }: GetGameQuestionsParams): Promise<Question[]> {
  const params = new URLSearchParams();
  params.append("amount", "10");
  params.append("type", "multiple");
  if (difficulty && difficulty !== "any") params.append("difficulty", difficulty);
  if (category && difficulty !== "any") params.append("category", category);
  const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch game questions");
  const jsonResponse = (await response.json()) as APIResponse;
  const question = jsonResponse.results.map((result) => {
    return {
      question: result.question,
      correct_answer: result.correct_answer,
      options: randomizeOptions([...result.incorrect_answers, result.correct_answer]),
    };
  });
  return question;
}
