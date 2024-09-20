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
 * @param showNotif
 */
type tGet = <T>(
  url: string,
  params?: Record<string, any> | null,
  showNotif?: boolean,
  token?: string | null,
  resultCodeAction?: (s: string) => void
) => Promise<T | null>;

export const get: tGet = async (
  url,
  params = null,
  showNotif = false,
  token = getToken(),
  resultCodeAction
) => {
  if (token) {
    axiosApiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  try {
    const { data } = await axiosApiInstance.get(url, {
      params,
      paramsSerializer: { indexes: null },
    });
    return onFulfilledAction(showNotif, data, resultCodeAction);
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
 * @param showNotif
 */
type tPost = <T>(
  url: string,
  body?: Record<string, any> | null,
  params?: Record<string, any> | null,
  showNotif?: boolean,
  token?: string | null
) => Promise<T | null>;

export const post: tPost = async (
  url,
  body,
  params = null,
  showNotif = false,
  token = getToken()
) => {
  if (token) {
    axiosApiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  try {
    const { data } = await axiosApiInstance.post(url, body, { params });
    return onFulfilledAction(showNotif, data);
  } catch (error) {
    toast.error((error as AxiosError).message);
    return null;
  }
};
//_______________________________________________________________________________________________________________________

const onFulfilledAction = (
  showNotif: boolean,
  data: any,
  resultCodeAction?: (v: string) => void
) => {
  if (resultCodeAction) {
    resultCodeAction(data.result);
  }

  if (showNotif && data.result === "success") {
    toast.success(data.message || "Operation successful!");
  } else if (data.result !== "success") {
    toast.error(data.message || "An error occurred!");
    return null;
  }

  if (data.token !== undefined) {
    return data.token;
  }

  return data.value.value;
};
