import { createStore } from "zustand/vanilla";

export type GameState = {
  currentQuestionIndex: number;
  userScore: number;
  userAnswers: string[];
};

export type GameActions = {
  answerAndGoToNextQuestion: (args: { prevAnswer: string; point?: number }) => void;
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
    answerAndGoToNextQuestion: ({ prevAnswer, point = 0 }) =>
      set((state) => ({
        userAnswers: [...state.userAnswers, prevAnswer],
        userScore: state.userScore + point,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      })),
  }));
};
