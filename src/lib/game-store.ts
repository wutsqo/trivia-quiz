import { create } from "zustand";

interface GameState {
  currentQuestionIndex: number;
  userScore: number;
  userAnswers: string[];
  goToNextQuestion: (args: { prevAnswer: string; point?: number }) => void;
}

export const useGameStore = create<GameState>()((set) => ({
  currentQuestionIndex: 0,
  userScore: 0,
  userAnswers: [],
  goToNextQuestion: ({ prevAnswer, point = 0 }) =>
    set((state) => ({
      userAnswers: [...state.userAnswers, prevAnswer],
      userScore: state.userScore + point,
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),
}));
