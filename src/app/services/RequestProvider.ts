import axios, { AxiosError } from "axios";
import { BASE_URL } from "./APIs";
import { getToken } from "../utils/Helper";
import { toast } from "react-toastify";

export const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(null, async (error) => {
  if (error.response == undefined) {
    error = { ...error, message: "خطای بدون کد" };
  } else {
    switch (error.response.status) {
      case 400:
        error = { ...error, message: "سرویس در دسترس نیست" };
        break;
      case 401:
        error = { ...error, message: "401" };
        break;
      case 404:
        error = { ...error, message: "سرویس یافت نشد" };
        break;
      case 500:
        error = { ...error, message: "500" };
        break;
      default:
        error = { ...error, message: "خطای تعریف  نشده" };
    }
  }
  throw error;
});

//_______________________________________________________________________________________________________________________
/**
 * this function is for GET method
 * @param url
 * @param params
 */
type tGet = <T>(
  url: string,
  params?: Record<string, any> | null,
  token?: string | null
) => Promise<T | null>;

export const get: tGet = async (url, params = null, token = getToken()) => {
  if (token) {
    const trimmedToken = token.trim().replace(/^['"]+|['"]+$/g, "");
    axiosApiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${trimmedToken}`;
  }

  try {
    const { data } = await axiosApiInstance.get(url, {
      params,
      paramsSerializer: { indexes: null },
    });
    return onFulfilledAction(data);
  } catch (error) {
    toast.error((error as AxiosError).message);
    return null;
  }
};
//_______________________________________________________________________________________________________________________
/**
 * this function is for POST method
 * @param url
 * @param body
 * @param params
 */
type tPost = <T>(
  url: string,
  body?: Record<string, any> | null,
  params?: Record<string, any> | null,
  token?: string | null
) => Promise<T | null>;

export const post: tPost = async (
  url,
  body,
  params = null,
  token = getToken()
) => {
  if (token) {
    const trimmedToken = token.trim().replace(/^['"]+|['"]+$/g, "");
    axiosApiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${trimmedToken}`;
  }

  try {
    const { data } = await axiosApiInstance.post(url, body, { params });
    return onFulfilledAction(data);
  } catch (error) {
    toast.error((error as AxiosError).message);
    return null;
  }
};
//_______________________________________________________________________________________________________________________

const onFulfilledAction = (data: any) => {
  if (data.result === "success") {
    toast.success(data.message || "Operation successful!");
  } else if (data.result === "unauthorized" || data.result === "wrong_pass") {
    toast.error(data.message || "An error occurred!");
    return null;
  }

  if (data.token !== undefined) {
    return data.token;
  }

  if (data.username !== undefined) {
    return data.username;
  }

  return data;
};
