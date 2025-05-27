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
