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
          name="boardContent"
          rows="10"
          :value="boardData.nttCn"
          readOnly="readonly"
        ></textarea>
      </div>
      <div class="file-container">
        <dl>
          <dt>첨부파일</dt>
          <dd>
            <span class="file_attach">
              <div v-for="(item, index) in resultFiles" :key="index">
                <a :href="onClickDownFile(item.atchFileId, item.fileSn)" :download="item.orignlFileNm">
                  {{ item.orignlFileNm }}
                </a>
              </div>
            </span>
          </dd>
        </dl>
      </div>
      <div class="btn-box">
        <RouterLink class="boardList-btn btn" :to="`/board/${boardId}`">목록</RouterLink>
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
// DOMAIN_URL
const DOMAIN_URL = process.env.DOMAIN_URL

// boardId 및 nttId
const boardId = router.params.boardId;
let boardType = boardId === 'notice' ? 'BBSMSTR_AAAAAAAAAAAA' : (boardId === 'gallery' ? 'BBSMSTR_BBBBBBBBBBBB' : '');
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

// 첨부파일 목록
const resultFiles = ref([]);

// 파일 다운로드 함수
const onClickDownFile = (atchFileId, fileSn) => {
  return `${DOMAIN_URL}/file?atchFileId=${atchFileId}&fileSn=${fileSn}`
};

// 파일 다운로드 링크
const getBoardDetail = async () => {
  try {
    const response = await api.get(PATH.BOARD_DETAIL(boardType, nttId));
    if (response.data.resultCode === 200) {
      const { boardVO } = response.data.result
      resultFiles.value = response.data.result.resultFiles
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
/* 스타일 설정 */
.container {
  display: flex;
  flex-direction: row;
  padding-top: 50px;
  padding-bottom: 50px;
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

dl {
  display: flex;
  flex-direction: row;
}

.board-article {
  margin-top: 20px;
}

.board-article textarea {
  border: none;
  outline: none;
}

textarea {
  width: 100%;
}

.btn-box {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}

.boardList-btn {
  width: 70px;
  height: 46px;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  line-height: 46px;
  text-align: center;
  background: #169bd5;
}

.file-container {
  border-top: solid 1px grey;
  border-bottom: solid 1px grey;
}
</style>
