import { User } from "../consts/types/types";
import axios from "axios";

export const BASE_URL = "https://testapi.io/api/Novickas/resource/userStorage";

export const registerUser = (user: User) => {
  return axios.post(BASE_URL, user).then((response) => response.data);
};

export const getUsers = () => {
  return axios.get(BASE_URL).then((response) => response.data);
};
