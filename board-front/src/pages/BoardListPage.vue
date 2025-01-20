<template>
  <div class="board-page-container">
    <div class="left-col">
      <SideNav/>
    </div>
    <div class="right-col">
    <div class=board-page-header>
      <h1 v-if="boardId === 'notice'" class="board-title">공지사항</h1>
      <h1 v-if="boardId === 'gallery'" class="board-title">갤러리</h1>
      <div class="divider"></div>
    </div>
    <div class="board-page-body">
      <Search :boardType='boardType'/>
      <div class="edit-btn-box">
        <q-btn v-if="userStore.isLogin" :to="`/board/${boardId}/mode/create`" label="등록" />
      </div>
      <BoardList :boardType='boardType' :boardId='boardId'/>
    </div>
    </div>
  </div>
</template>

<style scoped>
.board-page-container {
  display: flex;
  flex-direction: row;
}

.board-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0px;
  text-align: center;
  height: 70px;
}

.board-page-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.board-page-body {
  width : 100%
}

.divider {
  width:70px;
  height: 2px;
  background: #0465be;
  margin-top: 0px;
}

.left-col {
  margin: 40px 100px 0px 380px
}

.edit-btn-box {
  display: flex;
  justify-content: right;
}
</style>

<script setup>
import BoardList from "@/components/board/BoardList.vue"
import Search from "@/components/board/SearchForm.vue"
import SideNav from "@/components/board/SideNav.vue"
import { useBoardStore } from "@/stores/board"
import { useUserStore } from "@/stores/user"
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"

const boardStore = useBoardStore()
const userStore = useUserStore()
const route = useRoute()

// boardId 가져오기
const boardId = ref(route.params.boardId)
// boardId에 따라 boardType을 설정
let boardType = ref('')
const updateBoardType = () => {
  boardType.value = boardId.value === 'notice' ? 'BBSMSTR_AAAAAAAAAAAA' : (boardId.value === 'gallery' ? 'BBSMSTR_BBBBBBBBBBBB' : '')
}

// get BoardList
const boardList = async () => {
  const params = {
    bbsId: boardType.value,           // 게시판 타입 (BBSMSTR_AAAAAAAAAAAA = 공지사항, BBSMSTR_BBBBBBBBBBBB = 갤러리)
    pageIndex: boardStore.pageIndex,  // 조회할 페이지
    searchCnd: boardStore.searchCnd,  // 검색타입 (0: 제목, 1: 내용, 2: 작성자)
    searchWrd: boardStore.searchWrd,  // 검색어
  }

  await boardStore.getBoardList(params);
}

onMounted(() => {
  updateBoardType()
  boardList()
})

// boardId가 변경될 때마다 boardType과 boardList를 갱신
watch(() => boardId, (newBoardId) => {
  boardStore.searchWrd = ''
  boardId.value = newBoardId
  updateBoardType()
  boardList()
});
</script>
