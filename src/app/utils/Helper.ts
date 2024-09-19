import { TOKEN_KEY } from "./Constants";

export const getToken = () => localStorage.getItem(TOKEN_KEY);