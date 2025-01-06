import URL from "@/constants/url";
import api from "@/boot/axios";
import PATH from "@/api/path";

// sign in
export const signInRequest = async (requestBody) => {
  const result = await api
    .post(PATH.LOGIN, requestBody)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (!error.response) return error;
      return error.response;
    });
  return result;
};

// sign out
export const signOutRequeset = async () => {
  const result = await api
    .get(PATH.LOGOUT)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (!error.response) return error;
      return error.response;
    });
  return result;
};

// sign up
export const signUpRequest = async (requestBody) => {
  const result = await api
    .post(PATH.SIGNUP, requestBody)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (!error.response) return null;
      return error.response;
    });
  return result;
};

// board list
export const boardListRequest = async (params) => {
  const result = await api
    .get(PATH.BOARD, { params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (!error.response) return null;
      return error.response;
    });
  return result;
};

// notice, gallery list
export const mainPageRequest = async () => {
  const result = await api
    .get(URL.MAIN_PAGE)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (!error.response) return null;
      return error.response;
    });
  return result;
};
