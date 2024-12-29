import URL from "src/constants/url";
import CODE from "src/constants/code";
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
});

// 로그인
export const signInRequest = async (requestBody) => {
  const result = await axios
    .post(URL.LOGIN, requestBody)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody = error.response.data;
      return responseBody;
    });
  return result;
};

// 메인페이지 공지사항, 갤러리 리스트
export const mainPageRequest = async () => {
  const result = await axios
    .get(URL.MAIN_PAGE)
    .then((response) => {
      const responseBody = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody = error.response.data;
      return responseBody;
    });
  return result;
};
