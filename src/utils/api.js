import { API_HOST } from "@env";

import axios from "axios";

import { userLogout, userRefreshTokenSuccess } from "@actions";

import { getAuthUser } from "@utils/AsyncStorageUtils";

import { store } from "../redux/store";

export const baseURL = () => API_HOST;

export const axiosClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(undefined, async (error) => {
  if (error?.response?.status === 401 && !error.config.__isRetryRequest) {
    const { accessToken, refreshToken, userId } = await getAuthUser();

    try {
      const { data, status } = await axios.post(
        `${userURL()}/refresh_token`,
        {
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (status === 200) {
        store.dispatch(userRefreshTokenSuccess({ ...data, userId }));

        return axios({
          method: error.config.method,
          url: error.config.url,
          data: error.config.data,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${data.accessToken}`,
          },
          __isRetryRequest: true,
        });
      }
    } catch (error) {
      store.dispatch(userLogout());
    }
  }

  return Promise.reject(error);
});

const DEFAULT_CONFIG = {
  headers: {},
};

export const authorizedPost = async (url, body, config = DEFAULT_CONFIG) => {
  const { accessToken } = await getAuthUser();
  const { headers, ...rest } = config;
  return axiosClient.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + accessToken,
      ...headers,
    },
    ...rest,
  });
};

export const userURL = () => `${baseURL()}/user`;
export const leadURL = () => `${baseURL()}/lead`;
export const ratingURL = () => `${baseURL()}/rating`;
export const feedbackURL = () => `${baseURL()}/feedback`;
export const groupURL = () => `${baseURL()}/group`;
export const chatURL = () => `${baseURL()}/chat`;
export const notificationURL = () => `${baseURL()}/notification`;
export const productURL = () => `${baseURL()}/product`;
export const businessUrl = () => `${baseURL()}/business`;
export const activityURL = () => `${baseURL()}/activity`;
export const assetURL = () => `${baseURL()}/assets`;
export const opportunityURL = () => `${baseURL()}/opportunity`;
export const connectionsUrl = () => `${baseURL()}/connections`;
export const crmURL = () => `${baseURL()}/crm`;
