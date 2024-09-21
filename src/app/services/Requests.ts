import { List, ListResponse, Login } from "../model/General";
import { URLs } from "./APIs";
import { get, post } from "./RequestProvider";

export const onLoginRequest = (body: Login) => post<string>(URLs.login, body);
export const onLogoutRequest = () => post<string>(URLs.logout);
export const onGetListRequest = (params: List) => get<ListResponse>(URLs.list, params)
export const onGetInfoRequest = () => get<string>(URLs.username)