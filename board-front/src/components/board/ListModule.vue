<template>
  <div class="board-container">
    <h1 class="board-title">게시글 목록</h1>
    <table class="board-table">
      <!-- 테이블 헤더 -->
      <thead>
        <tr class="table-header">
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <!-- 테이블 바디 -->
      <tbody>
        <tr v-for="(item, index) in boardList" :key="index" class="board-item">
          <td>{{ item.nttId }}</td>
          <td>{{ item.nttSj }}</td>
          <td>{{ item.frstRegisterNm }}</td>
          <td>{{ item.frstRegisterPnttm }}</td>
          <td>{{ item.inqireCo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { boardListRequest } from "@/api/apis";

// 게시글 목록 요청 api
const boardList = ref(null);

const getBoardList = async () => {
  try {
    const params = {
      bbsId: "BBSMSTR_BBBBBBBBBBBB",
      pageIndex: 1,
      searchCnd: 0,
      searchWrd: "",
    };
    const response = await boardListRequest(params);
    if (response && response.data.resultCode === 200) {
      boardList.value = response.data.result.resultList;
    } else {
      console.error("게시글 목록 불러오기 실패", response.resultMessage);
    }
  } catch (error) {
    console.error("err:", error);
  }
};

onMounted(() => {
  getBoardList();
});
</script>

<style scoped>
.board-container {
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.board-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.board-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table-header {
  text-align: left;
  font-size: 16px;
}

.board-table th,
.board-table td {
  padding: 12px 15px;
  text-align: left;
}

.board-item {
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
