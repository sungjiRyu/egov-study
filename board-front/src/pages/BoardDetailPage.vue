<template>
  <div class="container">
    <div class="left-col">
      <sideNav />  
    </div>
    <div class="right-col">
      <div class="title">
        <h1>{{ boardData.bbsNm }}</h1>
        <div class="divider"></div>
      </div>
      <div class="board-view-top">
        <div class="board-title">{{ boardData.nttSj }}</div>
        <div class="info">
          <dl>
            <dt>작성자</dt>
            <dd>{{ boardData.frstRegisterNm }}</dd>
          </dl>
          <dl>
            <dt>작성일</dt>
            <dd>{{ boardData.frstRegisterPnttm }}</dd>
          </dl>
          <dl>
            <dt>조회수</dt>
            <dd>{{ boardData.inqireCo }}</dd>
          </dl>
        </div>
      </div>

      <div class="board-article">
        <textarea
          name=""
          rows="10"
          :value="boardData.nttCn"
          readOnly="readonly"></textarea>
      </div>
      
      <div class="btn-box">
        <RouterLink class="boardList-btn" :to="`/board/${boardId}`">목록</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import sideNav from '@/components/board/SideNav.vue';
import { useRoute } from 'vue-router';
import { api } from '@/boot/axios';
import { PATH } from '@/api/path';

// router
const router = useRoute();

// boardId
const boardId = router.params.boardId;
// boardType setting
// const updateBoardType = () => {
//   boardType.value = boardId === 'notice' ? 'BBSMSTR_AAAAAAAAAAAA' : (boardId === 'gallery' ? 'BBSMSTR_BBBBBBBBBBBB' : '');
// }
let boardType = boardId === 'notice' ? 'BBSMSTR_AAAAAAAAAAAA' : (boardId === 'gallery' ? 'BBSMSTR_BBBBBBBBBBBB' : '');
// nttId
const nttId = router.params.nttId;

// 게시물 데이터 상태 관리
const boardData = ref({
  bbsNm: '',
  nttSj: '',
  frstRegisterNm: '',
  frstRegisterPnttm: '',
  inqireCo: 0,
  nttCn: '',
});

// getBoardDetail request
const getBoardDetail = async () => {
  try {
    const response = await api.get(PATH.BOARD_DETAIL(boardType, nttId));
    if (response.data.resultCode === 200) {
      const { boardVO } = response.data.result;
      boardData.value = {
        bbsNm: boardVO.bbsNm,
        nttSj: boardVO.nttSj,
        frstRegisterNm: boardVO.frstRegisterNm,
        frstRegisterPnttm: boardVO.frstRegisterPnttm,
        inqireCo: boardVO.inqireCo,
        nttCn: boardVO.nttCn,
      };
    } else {
      console.error('Error Get board details:', response.data.resultMessage);
    }
  } catch (error) {
    console.error('Error Get board details:', error);
  }
};

onMounted(() => {
  getBoardDetail();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding-top: 50px;
}

.left-col {
  margin: 40px 100px 0px 380px;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0px;
  text-align: center;
  height: 70px;
}

.divider {
  width: 70px;
  height: 2px;
  background: #0465be;
  margin-top: 0px;
}

.board-view-top {
  border-top: solid 2px black;
  margin-top: 50px;
}

.board-title {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px grey;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
}

.info {
  display: flex;
  gap: 150px;
  border-bottom: solid 1px grey;
}

.info dl {
  display: flex;
}

.board-article {
  margin-top: 20px;
}

textarea {
  width: 100%;
}

.btn-box {
  display: flex;
  justify-content: right;
}

.boardList-btn {
  width: 70px;
  height: 46px;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  line-height: 46px;
  text-align: center;
  background: #169bd5
}
</style>
