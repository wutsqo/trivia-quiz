import { render, screen } from "@testing-library/react";
import { GameStoreProvider, GameStoreContext } from "./game-store-provider";
import { useContext } from "react";

jest.mock("@/stores/game-store", () => ({
  createGameStore: jest.fn(() => ({
    getState: () => ({ testValue: "test" }),
    subscribe: jest.fn(),
  })),
}));

describe("GameStoreProvider", () => {
  it("renders children correctly", () => {
    render(
      <GameStoreProvider>
        <div data-testid="child">Child Component</div>
      </GameStoreProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("provides store context to children", () => {
    const TestComponent = () => {
      const context = useContext(GameStoreContext);
      return context ? <div>Has Context</div> : <div>No Context</div>;
    };

    render(
      <GameStoreProvider>
        <TestComponent />
      </GameStoreProvider>
    );
    expect(screen.getByText("Has Context")).toBeInTheDocument();
  });
});
