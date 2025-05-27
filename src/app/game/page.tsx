import { getGameQuestions } from "./services";
import { ClientGamePage } from "./page.client";

type SearchParams = {
  difficulty?: string;
  category?: string;
};

export default async function GamePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const questions = await getGameQuestions(params);

  return (
    <div className="p-4">
      <ClientGamePage questions={questions} />
    </div>
  );
}
