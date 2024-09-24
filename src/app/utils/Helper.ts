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

export const calculateFlightDuration = (
  srcTime: string,
  dstTime: string
): string => {
  const diffInMs = new Date(dstTime).getTime() - new Date(srcTime).getTime();
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}min`;
};
