"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Play } from "lucide-react";
import { Button } from "../ui/button";

export function StartButton() {
  const status = useFormStatus();

  return (
    <Button
      className="w-full max-w-lg mx-auto h-16 text-xl mt-20"
      type="submit"
    >
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
