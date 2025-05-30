import { getGameQuestions } from ".";

describe("questions service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getGameQuestions", () => {
    it("should fetch and convert questions successfully", async () => {
      const mockApiResponse = {
        results: [
          {
            question: "Test question?",
            correct_answer: "Correct",
            incorrect_answers: ["Wrong1", "Wrong2", "Wrong3"],
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      const result = await getGameQuestions({ difficulty: "easy", category: "9" });

      expect(global.fetch).toHaveBeenCalledWith(
        "https://opentdb.com/api.php?amount=10&type=multiple&difficulty=easy&category=9"
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        question: "Test question?",
        correct_answer: "Correct",
      });
      expect(result[0].options).toHaveLength(4);
    });

    it("should handle API errors", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getGameQuestions({})).rejects.toThrow("Failed to fetch game questions");
    });

    it("should work without optional parameters", async () => {
      const mockApiResponse = { results: [] };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      await getGameQuestions({});

      expect(global.fetch).toHaveBeenCalledWith("https://opentdb.com/api.php?amount=10&type=multiple");
    });
  });
});
