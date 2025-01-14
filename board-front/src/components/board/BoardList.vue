<template>
<div class="board-list-page">
  <div class="board-container">
      <table class="board-table">
        <thead>
          <tr class="table-header">
            <th style="width: 5%;">번호</th>
            <th style="width: 50%;">제목</th>
            <th style="width: 15%;">작성자</th>
            <th style="width: 20%;">작성일</th>
            <th style="width: 10%;">조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in boardStore.boardList" :key="index" class='board-item' @click="goToBoardDetail(item.nttId)">
            <td>{{ itemIdxByPage(boardStore.totalCnt, boardStore.pageIndex, boardStore.maxPage, index) }}</td>
            <td class='board-item-title'>{{ item.nttSj }}</td>
            <td>{{ item.frstRegisterNm }}</td>
            <td>{{ item.frstRegisterPnttm }}</td>
            <td>{{ item.inqireCo }}</td>
          </tr>
          <tr v-if="boardStore.boardList.length === 0">
            <td colspan="5" class="no-data">검색 결과가 없습니다</td>
          </tr>
        </tbody>
      </table>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model='currentPage'
          :max= 'totalPage'
          :max-pages='maxPage'
          direction-links
          flat
          color='grey'
          active-color='primary'
          @update:model-value="onPageChange"
        />
    </div>
    </div>
  </div>
</template>

<style scoped>
.board-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
}

.board-table {
  border-collapse: collapse;
  margin-top: 20px;
  border-top: solid 2px black;
}

.table-header th {
  font-size: 16px;
  font-weight: normal;
  height: 60px;
}

.board-table th {
  text-align: center;
  vertical-align: middle;
  border-bottom: solid 1px grey;
}

.board-table td {
  font-size: 14px;
  color: #666;
  border-bottom: solid 1px grey;
}

.board-item-title {
  padding: 12px 15px;
  text-align: left;
}

.board-table td:not(.board-item-title) {
  padding: 12px 15px;
  text-align: center;
}

.board-item {
  text-align: left;
  transition: background-color 0.3s ease;
}

.board-item:hover {
  background-color: #f1f1f1;
}

.board-item td {
  padding: 12px;
  cursor: pointer;
}
</style>

<script setup>
import { computed } from 'vue'
import { useBoardStore } from '@/stores/board'
import { itemIdxByPage } from '@/utils/calc'
import { useRouter } from 'vue-router'

const props = defineProps({
  boardType: {
    type: String,
    required: true
  },
  boardId: {
    type: String,
    required: true
  }
})

const router = useRouter()

// 게시글 store
let boardStore = useBoardStore();

// 페이지 정보
let totalPage = boardStore.totalPage   // 총 페이지 수
let currentPage = boardStore.pageIndex // 현재 페이지
const maxPage = boardStore.maxPage     // 최대(표시할) 페이지 수

// 게시글 상세 페이지 이동 함수
const goToBoardDetail = (nttId) => {
  console.log(nttId)
  console.log()
  router.push(`/board/${props.boardId}/${nttId}`)
}

// 페이지 이동 이벤트 핸들러
const onPageChange = async(newPage) => {
  boardStore.setPageIndex(newPage)

  const params = {
    bbsId: props.boardType,          // 게시판 타입 (BBSMSTR_AAAAAAAAAAAA = 공지사항, BBSMSTR_BBBBBBBBBBBB = 갤러리)
    pageIndex: boardStore.pageIndex, // 조회할 페이지
    searchCnd: boardStore.searchCnd, // 검색타입 (0: 제목, 1: 내용, 2: 작성자)
    searchWrd: boardStore.searchWrd, // 검색어
  }
  await boardStore.getBoardList(params);

};

// boardStore에서 totalPage가 변경되면 totalPage 반영
  totalPage = computed(() => boardStore.totalPage)

// boardStore에서 pageIndex가 변경되면 currentPage 반영
  currentPage = computed(() => boardStore.currentPage)

</script>


