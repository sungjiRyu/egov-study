import { defineStore } from "pinia";
import axios from "axios";
import URL from "src/constants/url";

export const useMainStore = defineStore("board", {
  state: () => ({
    // 상태 초기화
    noticeBoard: [], // 공지사항 목록
    gallaryBoard: [], // 갤러리 목록
  }),

  getters: {},

  action: {
    // mainpage
    async getMainPage() {
      // API 요청
      const response = await axios
        .get("/mainpage")
        .then((response) => {
          // 응답 결과에서 공지사항과 갤러리 목록 추출
          const notiList = response.data.result.notiList || [];
          const galList = response.data.result.galList || [];
          // 상태 업데이트
          this.noticeBoard = notiList;
          this.gallaryBoard = galList;
        })
        .catch((error) => {
          console.error("err response : ", error);
        });
    },
  },
});
