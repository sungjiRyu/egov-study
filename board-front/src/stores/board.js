import { defineStore } from 'pinia'
import { api } from '@/boot/axios'
import { PATH } from '@/api/path'

export const useBoardStore = defineStore('board', {
  state: () => ({
    boardList: [], // 게시글 내용
    pageIndex : 1, // 검색할 페이지 번호
    totalPage: 0,  // 총 페이지 수
    searchWrd: '', // 검색어
    searchCnd: 0,   // 검색조건 설정 (0: 제목 1: 내용 2: 사용자명)
    totalCnt: 0,    // 총 게시글 수
    maxPage: 10     // 페이지 사이즈
  }),

  actions: {
    async getBoardList(params) {

      return await api.get(PATH.BOARD, { params }).then((response) => {
        if(response.data.resultCode !== 200) return

        this.searchWrd = params.searchWrd
        this.searchCnd = params.searchCnd
        this.boardList = response.data.result.resultList
        this.currentPage = response.data.result.paginationInfo.currentPageNo
        this.totalPage = response.data.result.paginationInfo.totalPageCount
        this.pageSize = response.data.result.paginationInfo.pageSize
        this.totalCnt = response.data.result.resultCnt
        this.maxPage = response.data.result.paginationInfo.pageSize
      })
    },

    setPageIndex(newPageIndex) {
      this.pageIndex = newPageIndex
    }
  }
})
