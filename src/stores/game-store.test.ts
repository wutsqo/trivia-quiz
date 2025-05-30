import { createGameStore, defaultInitialState } from "./game-store";

describe("GameStore", () => {
  let store: ReturnType<typeof createGameStore>;

  beforeEach(() => {
    store = createGameStore();
  });

  test("should initialize with default state", () => {
    expect(store.getState()).toEqual({
      ...defaultInitialState,
      answerAndGoToNextQuestion: expect.any(Function),
    });
  });

  test("should initialize with custom state", () => {
    const customState = {
      currentQuestionIndex: 2,
      userScore: 10,
      userAnswers: ["a", "b"],
    };
    store = createGameStore(customState);
    expect(store.getState()).toEqual({
      ...customState,
      answerAndGoToNextQuestion: expect.any(Function),
    });
  });

  test("answerAndGoToNextQuestion should update state correctly", () => {
    store.getState().answerAndGoToNextQuestion({ prevAnswer: "test", point: 1 });

    expect(store.getState()).toEqual({
      currentQuestionIndex: 1,
      userScore: 1,
      userAnswers: ["test"],
      answerAndGoToNextQuestion: expect.any(Function),
    });
  });

  test("answerAndGoToNextQuestion should work with default point value", () => {
    store.getState().answerAndGoToNextQuestion({ prevAnswer: "test" });

    expect(store.getState()).toEqual({
      currentQuestionIndex: 1,
      userScore: 0,
      userAnswers: ["test"],
      answerAndGoToNextQuestion: expect.any(Function),
    });
  });

  test("answerAndGoToNextQuestion should accumulate multiple answers", () => {
    const state = store.getState();
    state.answerAndGoToNextQuestion({ prevAnswer: "answer1", point: 1 });
    state.answerAndGoToNextQuestion({ prevAnswer: "answer2", point: 2 });

    expect(store.getState()).toEqual({
      currentQuestionIndex: 2,
      userScore: 3,
      userAnswers: ["answer1", "answer2"],
      answerAndGoToNextQuestion: expect.any(Function),
    });
  });
});
