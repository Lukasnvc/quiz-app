import axios from "axios";
import { shuffleArray } from "../consts/functions";

export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export type Question = {
  category: any;
  correct_answer: any;
  difficulty: any;
  incorrect_answers: any[];
  question: any;
  type: any;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuestions = async (
  difficulty: string,
  category: string
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple&category=${category}`;
  const response = await axios.get(endpoint);
  const { results } = response.data;

  return results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }));
};
