import { create } from "zustand";

interface GameState {
  currentQuestionIndex: number;
  userScore: number;
  goToNextQuestion: (withPoint?: number) => void;
}

export const useGameStore = create<GameState>()((set) => ({
  currentQuestionIndex: 0,
  userScore: 0,
  goToNextQuestion: (withPoint = 0) =>
    set((state) => ({
      userScore: state.userScore + withPoint,
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),
}));
