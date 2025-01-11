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