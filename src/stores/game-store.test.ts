import { createGameStore } from "./game-store";

describe("GameStore", () => {
  let store: ReturnType<typeof createGameStore>;

  beforeEach(() => {
    store = createGameStore();
  });

  test("answering one correct question", () => {
    const userAnswer = {
      correctAnswer: "Kucing",
      question: "Yang benar kucing",
      selectedAnswer: "Kucing",
    };
    store.getState().answerAndGoToNextQuestion(userAnswer);

    expect(store.getState().currentQuestionIndex).toEqual(1);
    expect(store.getState().userAnswers).toEqual([userAnswer]);
    expect(store.getState().userScore).toEqual(10);
  });

  test("answering one correct and one false question", () => {
    const state = store.getState();
    const userAnswer1 = {
      correctAnswer: "Kucing",
      question: "Yang ini benar",
      selectedAnswer: "Kucing",
    };
    const userAnswer2 = {
      correctAnswer: "Kucing",
      question: "Yang ini salah",
      selectedAnswer: "Anjing",
    };
    state.answerAndGoToNextQuestion(userAnswer1);
    state.answerAndGoToNextQuestion(userAnswer2);

    expect(store.getState().currentQuestionIndex).toEqual(2);
    expect(store.getState().userAnswers).toEqual([userAnswer1, userAnswer2]);
    expect(store.getState().userScore).toEqual(10);
  });
});
