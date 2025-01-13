import { AUTH_TOKEN_KEY } from "@/constants";

export const getSessionStorage = (key: string) => {
  try {
    return JSON.parse(sessionStorage.getItem(key) || "{}");
  } catch (error) {
    return null;
  }
};

export const setSessionStorage = (key: string, value: any) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const generateGradientFromToken = () => {
  try {
    const token = getSessionStorage(AUTH_TOKEN_KEY);
    const hash = [...token].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const color1 = `#${((hash * 12345) % 0xffffff).toString(16).padStart(6, '0')}`;
    const color2 = `#${((hash * 67890) % 0xffffff).toString(16).padStart(6, '0')}`;

    const direction = (hash % 360) + 'deg';

    return `linear-gradient(${direction}, ${color1}, ${color2})`;
  } catch (e) {
    return "#000000";
  }
}
