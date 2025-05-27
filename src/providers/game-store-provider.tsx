"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type GameStore, createGameStore } from "@/stores/game-store";

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext = createContext<GameStoreApi | undefined>(undefined);

export interface GameStoreProviderProps {
  children: ReactNode;
}

export const GameStoreProvider = ({ children }: GameStoreProviderProps) => {
  const storeRef = useRef<GameStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = createGameStore();
  return <GameStoreContext.Provider value={storeRef.current}>{children}</GameStoreContext.Provider>;
};

export const useGameStore = <T,>(selector: (state: GameStore) => T): T => {
  const gameStoreContext = useContext(GameStoreContext);
  if (!gameStoreContext) throw new Error("useGameStore must be used within a GameStoreProvider");
  return useStore(gameStoreContext, selector);
};
