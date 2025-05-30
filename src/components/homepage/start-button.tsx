"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useGameStore } from "@/providers/game-store-provider";

export function StartButton() {
  const status = useFormStatus();
  const resetUserState = useGameStore((state) => state.reset);

  return (
    <Button className="w-full max-w-lg mx-auto text-xl" type="submit" size={"lg"} onClick={() => resetUserState()}>
      {status.pending ? (
        <>
          <LoaderCircle className="animate-spin" />
          Starting
        </>
      ) : (
        <>
          <Play />
          Start Game!
        </>
      )}
    </Button>
  );
}
