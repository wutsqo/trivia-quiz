import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { difficultyLevels } from "@/lib/trivia";
import Form from "next/form";
import { StartButton } from "@/components/homepage/start-button";
import { getTriviaCategories } from "@/services";

export default async function Home() {
  const categories = await getTriviaCategories();
  return (
    <div className="container mx-auto p-4 flex gap-8 min-h-screen max-w-screen-xl">
      <div className="w-full flex flex-col justify-center text-center lg:text-left gap-2">
        <h2 className="text-3xl">Welcome to</h2>
        <h1 className="text-5xl lg:text-6xl">The Trivia Game App</h1>
        <p className="text-xl mt-6">Answer 10 questions and let&apos;s see how many you get it right!</p>
      </div>
      <div className="flex items-center justify-center shrink-0 w-full max-w-md">
        <Card className="w-full">
          <CardContent className="flex flex-col gap-8 text-center py-6">
            <Form action="/game" className="flex flex-col gap-8">
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
              <div className="flex flex-col gap-2 mb-8">
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
