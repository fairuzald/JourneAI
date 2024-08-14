import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

interface User {
  email: string;
  fullName: string;
  token: string;
  expiresAt: string;
}

const USER_KEY = "user_data";

export const saveUserData = async (user: User) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserData = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUserData = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

export const isTokenExpired = (expiresAt: string): boolean => {
  return dayjs().isAfter(dayjs(expiresAt));
};
