import AsyncStorage from "@react-native-async-storage/async-storage";

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "@constants";

export const saveAuthUser = async (data) => {
  try {
    const promises = [
      AsyncStorage.setItem(ACCESS_TOKEN, data.accessToken),
      AsyncStorage.setItem(REFRESH_TOKEN, data.refreshToken),
      AsyncStorage.setItem(USER_ID, data.userId.toString()),
    ];

    await Promise.all(promises);
    return true;
  } catch (error) {
    return false;
  }
};

export const resetAuthStorage = () =>
  AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN, USER_ID]);

export const getAuthUser = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
    const userId = await AsyncStorage.getItem(USER_ID);

    if (!accessToken || !refreshToken || !userId) {
      throw new Error("Access Token, Refresh Token or User Id is null");
    }

    return { accessToken, refreshToken, userId: parseInt(userId, 10) };
  } catch (e) {
    resetAuthStorage();
    return null;
  }
};
