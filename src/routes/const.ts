import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MainLayout from "../layouts/MainLayout";
import Quiz from "../pages/quiz/Quiz";
import Register from "../pages/register/Register";
import Scores from "../pages/scores/Scores";

export const HOME_PATH = "/";
export const QUIZ_PATH = "/quiz";
export const SCORE_PATH = "/scores";
export const REGISTER_PATH = "/register";
export const LOGIN_PATH = "/login";

export const mainLayout = {
  Layout: MainLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: SCORE_PATH, Component: Scores },
    { path: REGISTER_PATH, Component: Register },
    { path: LOGIN_PATH, Component: Login },
    { path: QUIZ_PATH, Component: Quiz },
  ],
};

export const authLayout = {
  Layout: AuthLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: SCORE_PATH, Component: Scores },
    { path: REGISTER_PATH, Component: Register },
    { path: LOGIN_PATH, Component: Login },
  ],
};
