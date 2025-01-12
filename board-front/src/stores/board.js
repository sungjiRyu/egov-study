import { defineStore } from 'pinia'
import { api } from '@/boot/axios'
import { PATH } from '@/api/path'

export const useBoardStore = defineStore('board', {
  state: () => ({
    bbsId: '',
    boardList: [],
    pageIndex : 1,
    totalPage: 0,
    bbsId: '',
    searchWrd: '',
    sarchCnd: 0,
  }),

  actions: {
    async getBoardList(params) {
      return await api.get(PATH.BOARD, { params }).then((response) => {
        if(response.data.resultCode !== 200) return

        this.boardList = response.data.result.resultList
        this.currentPage = response.data.result.paginationInfo.currentPageNo
        this.totalPage = response.data.result.paginationInfo.totalPageCount
        this.pageSize = response.data.result.paginationInfo.pageSize
      })
    }
  }
})
