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
          <tr v-for="(item, index) in boardStore.boardList" :key="index" class='board-item'>
            <td>{{ item.nttId }}</td>
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
}

.board-table {  
  border-collapse: collapse;
  margin-top: 20px;
}

.board-table th {
  text-align: center;
  font-size: 16px;
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
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.board-item:hover {
  background-color: #f1f1f1;
}

.board-table td {
  font-size: 14px;
}

.board-table th {
  font-size: 16px;
  font-weight: bold;
}

.board-item td {
  padding: 12px;
}

.board-table,
.board-table th,
.board-table td {
  border: none;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore();

// pagination params
const totalPage = ref(boardStore.totalPage)   // 총 페이지 수
const currentPage = ref(boardStore.pageIndex) // 현재 페이지
const maxPage = 10;                           // 최대(표시할) 페이지 수

// get BoardList
const boardList = async () => {
  const params = {
    bbsId: "BBSMSTR_BBBBBBBBBBBB",
    pageIndex: currentPage.value, // 현재 페이지로 설정
    searchCnd: 0,
    searchWrd: "",
  }

  await boardStore.getBoardList(params);

  totalPage.value = boardStore.totalPage;
  currentPage.value = boardStore.pageIndex;
}

onMounted(() => {
  boardList()
})
</script>


