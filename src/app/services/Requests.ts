import { Login } from "../model/General";
import { URLs } from "./APIs";
import { post } from "./RequestProvider";

export const onLoginRequest = (body: Login) => post<string>(URLs.login, body);
