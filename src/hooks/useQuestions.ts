import { Difficulty, fetchQuestions } from "../api/quizApi";

import { useQuery } from "@tanstack/react-query";

export const useQuestions = (difficulty: Difficulty, category: string) => {
  return useQuery(["questions", difficulty], () => fetchQuestions(difficulty, category));
};
