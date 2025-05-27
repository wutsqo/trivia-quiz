import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomizeOptions(options: string[]): string[] {
  return options.sort(() => Math.random() - 0.5);
}
