import axios from "axios";
import { Notify, Loading } from "quasar";

// axios header setting
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("jToken");

// axios instance setting
const api = axios.create({
  baseURL: process.env.DOMAIN_URL,
  withCredentials: true,
});

// request interceptor setting
api.interceptors.request.use(
  // success
  (config) => {
    try {
      Loading.show({ delay: 300 });
      return config;
    } catch (error) {
      console.log("[api.interceptors.request] request : " + error);
    }
  },
  // fail
  (error) => {
    Loading.hide();
    return Promise.reject(error);
  }
);

// response interceptor setting
api.interceptors.response.use(
  // success
  (response) => {
    try {
      Loading.hide();
      return response;
    } catch {
      console.log("[api.interceptors.response] response : " + error);
    }
  },
  // fail
  (error) => {
    Loading.hide();
    // timeout error
    const errorStatus =
      error.code == "ECONNABORTED" ? 408 : error.response.status;
    switch (errorStatus) {
      case "400":
        Notify.create(error.response.data);
        break;
      case "403":
        Notify.create("인가된 사용자가 아닙니다.");
        break;
      case "408":
        Notify.create("오류가 발생하였습니다.");
        break;
      case "500":
        Notify.create("서버에서 오류가 발생하였습니다.");
        break;
      case "700":
        Notify.create("삭제 중 내부 오류가 발생했습니다.");
        break;
      case "800":
        Notify.create("저장시 내부 오류가 발생했습니다.");
        break;
      case "900":
        Notify.create("입력값 무결성 오류 입니다.");
        break;
      default:
        Notify.create(`오류가 발생하였습니다. [${error.message}]`);
        break;
    }
  }
);

export default api;
