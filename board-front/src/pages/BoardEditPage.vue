<template>
  <div class="board-edit-container">
    <div class="left-col">
      <SideNav />
    </div>
    <div class="right-col">
      <div class="title">
        <div class="title-top">
          <h1>{{ boardName }}</h1>
          <div class="divider"></div>
        </div>
        <h2>등록</h2>
      </div>
      <table>
        <tr>
          <th>제목</th>
          <td>
            <input class="input-title" v-model="title" />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
             <Editor
              v-bind:api-key="API_KEY"
              v-model="content"
              :init="{
                plugins: 'lists link image table code help wordcount'}"
              />
          </td>
        </tr>
        <tr>
          <th>첨부파일</th>
          <td>
             <input type="file" ref="fileInput" @change="onFileChange" multiple />
          </td>
        </tr>
      </table>
      <div class="btn-box">
        <button class="save-btn btn" @click="onSave">저장</button>
        <button class="list-btn btn" @click="toBoardList">목록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import { useRoute, useRouter } from 'vue-router'
import SideNav from '@/components/board/SideNav.vue'
import { PATH } from '@/api/path'
import { Notify } from 'quasar'
import { api } from '@/boot/axios'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const boardId = route.params.boardId;
let boardName = boardId === 'notice' ? '공지사항' : boardId === 'gallery' ? '갤러리' : ''
let boardType = boardId === 'notice' ? 'BBSMSTR_AAAAAAAAAAAA' : (boardId === 'gallery' ? 'BBSMSTR_BBBBBBBBBBBB' : '');

const title = ref('')
const content = ref('')
// 파일을 저장할 변수
const files = ref([])

// TinyMCE api key
const API_KEY = process.env.TINYMCE_API_KEY

// click list button
const toBoardList = (() => {
  router.push(`/board/${boardId}`)
})

// file upload button
const onFileChange = (event) => {
  files.value = event.target.files;
}

// click save button
const onSave = async () => {

  // 서버에 전송할 FormData 세팅
  const formData = new FormData();
  formData.append("bbsId", boardType);
  formData.append("nttSj", title.value);
  formData.append("nttCn", content.value);

  // 파일들이 있을 경우, FormData에 추가
  for (let i = 0; i < files.value.length; i++) {
    formData.append("files", files.value[i]);
  }

  // boardEdit request
  try {
    const response = await api.post(PATH.BOARD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // multipart/form-data 헤더 설정
      }
    });
    if (response.data.resultCode === 200) {
      Notify.create({ type: 'positive', message: '게시글이 등록되었습니다.', position: 'top' })
      route.push(router.push(`/board/${boardId}`))
    } else {
      console.error('게시물 등록 오류:', response.data.resultMessage)
    }
  } catch (error) {
    console.error('서버오류:', error)
  }
}
</script>


<style scoped>
.board-edit-container {
  display: flex;
  flex-direction: row;
}

.title-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-col {
  margin: 40px 100px 0px 380px;
}

.right-col {
  width: 800px;
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

.title h2 {
  font-size: 20px;
  font-weight: bold;
}

.btn-box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #dcdcdc;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
}

table tr:first-child {
  border-top: 2px solid black;
}

table tr {
  border-bottom: 1px solid #f2f2f2;
}

textarea {
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  box-sizing: border-box;
}

.file-upload-btn {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.file-upload-btn:hover {
  background-color: #0056b3;
}

.save-btn,
.list-btn {
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

.save-btn {
  color: white;
  border: none;
}

.list-btn {
  border: none;
}

.list-btn:hover {
  background-color: #0056b3;
}
</style>

