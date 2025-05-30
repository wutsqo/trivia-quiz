import { APIResponse, GetGameQuestionsParams, Question, TriviaCategory } from "./interface";

export function randomizeOptions(options: string[]): string[] {
  return options.sort(() => Math.random() - 0.5);
}

export function convertApiResponseToQuestions(apiResponse: APIResponse): Question[] {
  return apiResponse.results.map((result) => ({
    question: result.question,
    correct_answer: result.correct_answer,
    options: randomizeOptions([...result.incorrect_answers, result.correct_answer]),
  }));
}

export async function getGameQuestions({ difficulty, category }: GetGameQuestionsParams): Promise<Question[]> {
  const params = new URLSearchParams();
  params.append("amount", "10");
  params.append("type", "multiple");
  if (difficulty) params.append("difficulty", difficulty);
  if (category) params.append("category", category);
  const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch game questions");
  const apiResponse = (await response.json()) as APIResponse;
  return convertApiResponseToQuestions(apiResponse);
}

export async function getTriviaCategories() {
  const response = await fetch("https://opentdb.com/api_category.php", {
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error("Failed to fetch trivia categories");
  const data = (await response.json()) as { trivia_categories: TriviaCategory[] };
  return data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
}
