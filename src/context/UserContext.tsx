import { ReactNode, createContext } from "react";

import { Difficulty } from "../api/quizApi";
import { useLocalStorage } from "../hooks/useLocalStorage";

type UserContextType = {
  difficulty: Difficulty;
  category: string;
  setCategory: (category: string) => void;
  setDifficulty: (difficulty: string) => void;
};

const UserContext = createContext<UserContextType>({
  difficulty: Difficulty.easy,
  setDifficulty: () => {},
  category: "9",
  setCategory: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>("difficulty", Difficulty.easy);
  const [category, setCategory] = useLocalStorage<string>("category", "9");

  return (
    <UserContext.Provider
      value={{
        difficulty,
        setDifficulty: (difficulty: string) => setDifficulty(difficulty as Difficulty),
        category,
        setCategory,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
