import { TOKEN_KEY } from "./Constants";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const formatTime = (time: string) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const formatDate = (time: string) => {
  const date = new Date(time);
  return `${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}`;
};
