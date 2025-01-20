<template>
  <div class="location">
  </div>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <p>
          전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.<br />
          로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.
        </p>
      </div>
      <q-card class="login-card">
        <q-form class="login-form" @submit.prevent="onSignInButtonClickHandler">
          <div class="login-form-top">
            <div class="form-header">
              <div class="input-box">
                <input
                  type="text"
                  id="id"
                  v-model="username"
                  placeholder="아이디"
                  required
                />
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="비밀번호"
                  required
                />
              </div>
              <q-btn
                type="submit"
                color="primary"
                label="login"
                class="login-button"
              />
          </div>
          </div>
          <div class="login-form-bottom">
            <RouterLink class="link" to="/find/id">id 찾기</RouterLink>
            <div>|</div>
            <RouterLink class="link" to="/find/pwd">pwd 찾기</RouterLink>
          </div>
        </q-form>
      </q-card>
      <div class="login-footer">
        <div>
          <div class="text-box">
            <div>▪</div>
            <p>
              비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서
              사용하실<br />
              수 있습니다.
            </p>
          </div>
          <div class="text-box">
            <div>▪</div>
            <p>
              쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우,
              도용되기<br />
              쉬우므로 주기적으로 변경하셔서 사용하는 것이 좋습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.location{
  margin-top: 20px;
}
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.location {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
}

.login-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.login-header > h1 {
  color: #222;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -2px;
  line-height: 48px;
  text-align: center;
}

.login-header > p {
  color: #666;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}

.login-card {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 680px;
  height: 200px;
  border-radius: 25px;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.login-form-top {
  display: flex;
}

.login-form-bottom {
  margin-right: 85px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
}

.form-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.input-box > input {
  border: none;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.login-button {
  height: 100%;
  width: 100%;
}

.saveId-checkbox {
  margin-left: 170px;
}

.login-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.text-box {
  display: flex;
  gap: 10px;
  padding-left: 15px;
  color: #666;
  font-size: 16px;
  line-height: 26px;
}

.link:hover{
  text-decoration: underline;
}
</style>

<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const username = ref("")
const password = ref("")

// event handler: 로그인 버튼 클릭 이벤트
const onSignInButtonClickHandler = () => {
  const requestBody = {
    userSe: "USR",
    id: username.value,
    password: password.value,
  }
  userStore.signIn(requestBody, router)
  }
</script>
