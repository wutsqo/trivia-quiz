import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";
import { difficultyLevels } from "@/lib/trivia";

async function fetchTriviaCategories() {
  const response = await fetch("https://opentdb.com/api_category.php", {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch trivia categories");
  }
  const data = (await response.json()) as {
    trivia_categories: { id: number; name: string }[];
  };
  return data.trivia_categories;
}

export default async function Home() {
  const categories = await fetchTriviaCategories();
  return (
    <div className="p-8 min-h-[100dvh] bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <Card className="container max-w-screen-lg mx-auto">
        <CardHeader>
          <h1 className="text-4xl text-center">
            Welcome to the Trivia Game App
          </h1>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-6 text-center">
          <div className="w-full max-w-md mx-auto flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">Select Difficulty</h2>
              <Select defaultValue={difficultyLevels[0].value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">Select Category</h2>
              <Select defaultValue="any">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="any">Any Category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full max-w-lg mx-auto h-20 text-xl mt-20">
              <Play size={64} />
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
