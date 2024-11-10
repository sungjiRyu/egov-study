import axios from "axios";
import { API_URL } from "src/constants/apis";

export const signup = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
      name,
    });

    return response.data;
  } catch (error) {
    console.error("회원가입 요청 중 오류 발생:", error);
  }
};
