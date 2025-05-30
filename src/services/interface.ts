export interface GetGameQuestionsParams {
  difficulty?: string;
  category?: string;
}

export interface APIResponse {
  response_code: number;
  results: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export interface Question {
  question: string;
  correct_answer: string;
  options: string[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}