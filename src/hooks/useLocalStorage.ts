import { useEffect, useState } from "react";

export const useLocalStorage = <T extends unknown>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
};
