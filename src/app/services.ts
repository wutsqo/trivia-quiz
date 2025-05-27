interface TriviaCategory {
  id: number;
  name: string;
}

export async function fetchTriviaCategories() {
  const response = await fetch("https://opentdb.com/api_category.php", {
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error("Failed to fetch trivia categories");
  const data = (await response.json()) as { trivia_categories: TriviaCategory[] };
  return data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
}
