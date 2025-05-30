import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { difficultyLevels } from "@/lib/trivia";
import Form from "next/form";
import { StartButton } from "@/components/welcome/start-button";
import { getTriviaCategories } from "@/services";

export default async function Home() {
  const categories = await getTriviaCategories();
  return (
    <div className="p-4">
      <Card className="container max-w-screen-lg mx-auto">
        <CardHeader>
          <h1 className="text-4xl text-center">Welcome to the Trivia Game App</h1>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-6 text-center">
          <Form action="/game">
            <div className="w-full max-w-md mx-auto flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl">Select Difficulty</h2>
                <Select defaultValue={difficultyLevels[0].value} name="difficulty" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick a Difficulty" />
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
                <Select name="category" required defaultValue={categories[0].id.toString()}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <StartButton />
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
