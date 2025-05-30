import { createStore } from "zustand/vanilla";

export type UserAnswer = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
};

export type GameState = {
  currentQuestionIndex: number;
  userScore: number;
  userAnswers: UserAnswer[];
};

export type GameActions = {
  answerAndGoToNextQuestion: (userAnswer: UserAnswer) => void;
  reset: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitialState: GameState = {
  currentQuestionIndex: 0,
  userScore: 0,
  userAnswers: [],
};

export const createGameStore = (initialState: GameState = defaultInitialState) => {
  return createStore<GameStore>()((set) => ({
    ...initialState,
    answerAndGoToNextQuestion: (userAnswer) => {
      const point = userAnswer.correctAnswer === userAnswer.selectedAnswer ? 10 : 0;
      set((state) => ({
        userAnswers: [...state.userAnswers, userAnswer],
        userScore: state.userScore + point,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      }));
    },
    reset: () =>
      set(() => ({
        userAnswers: [],
        userScore: 0,
        currentQuestionIndex: 0,
      })),
  }));
};
