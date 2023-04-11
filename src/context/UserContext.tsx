import { ReactNode, createContext, useState } from "react";

import { HOME_PATH } from "../routes/const";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => void;
  handleLogin: (user: User) => void;
  userObject: string;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  handleLogout: () => {},
  handleLogin: () => {},
  userObject: "",
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("userObject", null);
  const [userObject, setUserObject] = useState<User | null>(null);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  if (!userObject) {
    const storage = JSON.parse(localStorage.getItem("userObject") || "{}") as User | null;
    if (storage !== null) {
      setUserObject(storage);
    }
  }

  const handleLogout = () => {
    setUser(null);
    setUserObject(null);
    navigate(HOME_PATH);
  };

  const handleLogin = (user: User) => {
    setUserObject(user);
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
        handleLogout,
        handleLogin,
        userObject: JSON.stringify(userObject),
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
