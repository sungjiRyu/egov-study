<template>
  <div class="board-page-container">
    <div class=board-page-header>
      <h1 class="board-title">갤러리</h1>
      <div class="divider"></div>
    </div>
    <div class="board-page-body">
      <SearchModule></SearchModule>
      <BoardList></BoardList>
    </div>
  </div>
</template>

<style scoped>
.board-page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.board-page-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.board-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0px;
  text-align: center;
}
.divider {
  width:70px;
  height: 2px;
  background: #0465be;
  margin-top: 0px;
}
</style>

<script setup>
import BoardList from "@/components/board/ListModule.vue";
import SearchModule from "@/components/board/searchModule.vue";
</script>
