<template>
    <div class="signUp-container">
        <div class="mypage-title">
            <span>마이페이지</span>
        <div class="divider"></div>
        </div>
      <div class="signup-box">
        <form class="signUp-form" @submit.prevent="onModify">
          <dl>
            <dt><span>회원ID <span class="required">*</span></span></dt>
            <dd>
              <input
                type="text"
                v-model="userId"
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
                v-model="userPw"
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
                v-model="userNm"
                placeholder="이름"
                required
              />
            </dd>
          </dl>
          <div class="btn-box">
            <button type="submit" class="save-btn">수정</button>
            <button type="button"  class="delete-account-btn">탈퇴</button>
          </div>
        </form>
      </div>
    </div>
  </template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const userId = userStore.loginUserInfo.id
const userNm = userStore.loginUserInfo.name

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