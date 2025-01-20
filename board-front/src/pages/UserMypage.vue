<template>
    <div class="signUp-container">
        <div class="mypage-title">
            <span>마이페이지</span>
        <div class="divider"></div>
        </div>
      <div class="signup-box">
        <form class="signUp-form">
          <dl>
            <dt><span>회원ID <span class="required">*</span></span></dt>
            <dd>
              <input
                type="text"
                v-model="mberId"
                placeholder="아이디"
                required
              />
            </dd>
          </dl>
          <dl>
            <dt><span>회원암호 <span class="required">*</span></span></dt>
            <dd>
              <input
                type="password"
                v-model="password"
                placeholder="비밀번호"
                required
              />
            </dd>
          </dl>
          <dl>
            <dt><span>회원명 <span class="required">*</span></span></dt>
            <dd>
              <input
                type="text"
                v-model="mberNm"
                placeholder="이름"
                required
              />
            </dd>
          </dl>
          <div class="btn-box">
            <button type="button" class="save-btn" @click="onUpdateUserInfo">수정</button>
            <button type="button"  class="delete-account-btn" @click="onDeleteUser">탈퇴</button>
          </div>
        </form>
      </div>
    </div>
  </template>

<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { PATH } from '@/api/path'
import { api } from '@/boot/axios'
import { Notify, Dialog } from 'quasar'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const mberId = ref(userStore.loginUserInfo.id)
const mberNm = ref(userStore.loginUserInfo.name)
const password = ref('')
const uniqId = userStore.loginUserInfo.uniqId

// 회원정보 수정
const onUpdateUserInfo = () => {
  Dialog.create({
    title: '회원 정보 수정',
    message: '회원정보 수정시 다시 로그인해야 합니다.',
    cancel: true,
    persistent: true,
    ok: {
      push: true,
      label: '수정'
    },
    cancel: {
      push: true,
      color: 'grey',
      label: '취소'
    }
  }).onOk(() =>{
    const requestBody = {
    mberId: mberId.value,
    mberNm: mberNm.value,
    password: password.value,
    uniqId: uniqId
  }
    api.post(PATH.UPDATE_USERINFO, requestBody).then((response) => {
      if (response.data.resultCode === 200) {
        Notify.create({ type: 'positive', message: '회원정보 수정 성공', position: 'top' })
        userStore.signOut(router)
      }
    })
    .catch((error) => {
      console.log('회원정보 수정 오류 : ' + error)
    })
  })
}

// 회원 탈퇴
const onDeleteUser = () => {
  Dialog.create({
    title: '회원 탈퇴',
    message: '정말 탈퇴하시겠습니까?',
    cancel: true,
    persistent: true,
    ok: {
      push: true,
      color: 'negative',
      label: '탈퇴'
    },
    cancel: {
      push: true,
      color: 'grey',
      label: '취소'
    }
  }).onOk(() => {
    // 확인을 선택시
    const requestBody = {
      uniqId: uniqId,
      password: ''
    }
    api.post(PATH.DELETE_USER, requestBody ).then((response) => {
      if (response.data.resultCode === 200) {
        Notify.create({ type: 'positive', message: '회원탈퇴가 완료되었습니다.', position: 'top' })
        userStore.signOut(router)  // 로그아웃 처리
      }
    })
    .catch((error) => {
      console.log('회원탈퇴 오류 : ' + error)
      Notify.create({ type: 'negative', message: '회원탈퇴 중 오류가 발생했습니다.', position: 'top' })
    })
  })
}

</script>

<style scoped>

  .signUp-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .signup-box {
    margin-top: 50px;
  }
  
  .signUp-form {
    width: 1200px;
    border-top: 2px solid #222;
  }
  
  .signUp-form > dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #dde2e5;
    height: 100px;
    margin: 0;
  }
  
  .signUp-form > dl > dt {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 15%;
    height: 100%;
    text-align: right;
    background-color: #f5f6f7;
  }
  
  .signUp-form > dl > dt > span {
    margin-left: 20px;
  }
  
  .signUp-form > dl > dd {
    width: 85%;
    text-align: right;
    margin-right: 10px;
  }
  
  .signUp-form > dl > dd > input {
    width: 100%;
    height: 46px;
    padding: 0 20px;
    border: 1px solid #dde2e5;
    border-radius: 5px;
    color: #222;
    font-size: 16px;
    background: #fff;
  }
  
  .btn-box {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
    width: 200px;
  }
  
  .save-btn {
    width: 100px;
    height: 46px;
    border: none;
    border-radius: 5px;
    color: #005b82;
    font-size: 16px;
    line-height: 46px;
    text-align: center;
    background: #daedf5;
  }

  .delete-account-btn {
    width: 100px;
    height: 46px;
    border: none;
    border-radius: 5px;
    color: #005b82;
    font-size: 16px;
    line-height: 46px;
    text-align: center;
    background: #daedf5;
  }
  
  .title-box {
    display: flex;
    justify-content: left;
    margin-bottom: 20px;
  }
  
  .title {
    font-size: 30px;
    font-weight: 700;
  }
  
  /* .signUp-form > dl > dd > input:invalid {
    border-color: red;
    background-color: #ffe6e6;
  } */
  
  /* .signUp-form > dl > dd > input:focus:invalid {
    outline-color: red;
  } */
  
  .required {
    color: red;
    font-size: 20px;
  }
  
  .duplicated-error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }

  .mypage-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 100px 0 0 0;
  font-size: 48px;
  font-weight: bold;  
}
.divider {
  width: 80%;
  height: 2px;
  background: #0465be;
}
</style>