import Home from "../pages/home/Home";
import MainLayout from "../layouts/MainLayout";
import Quiz from "../pages/quiz/Quiz";
import Scores from "../pages/scores/Scores";

export const HOME_PATH = "/";
export const QUIZ_PATH = "/quiz";
export const SCORE_PATH = "/scores";

export const mainLayout = {
  Layout: MainLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: SCORE_PATH, Component: Scores },
    { path: QUIZ_PATH, Component: Quiz },
  ],
};
