<template>
  <div class="signUp-container">
    <div class="signup-box">
      <form class="signUp-form" @submit.prevent="onSubmit">
        <dl>
          <dt><span>이름<span class="required">*</span></span></dt>
          <dd>
            <input
              type="text"
              v-model="name"
              placeholder="이름"
              required
            />
          </dd>
        </dl>
        <dl>
          <dt><span>이메일 <span class="required">*</span></span></dt>
          <dd>
            <input
              type="email"
              v-model="email"
              placeholder="이메일"
              required
            />
          </dd>
        </dl>
        <div class="btn-box">
          <button type="submit" class="save-btn">제출</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PATH } from '@/api/path'
import { api } from '@/boot/axios'
import { useRouter } from 'vue-router'
import { Notify, Dialog } from 'quasar'

const router = useRouter()

const name = ref('')
const email = ref('')

const onSubmit = async () => {
  const requestBody = {
    name: name.value,
    email: email.value,
  }

  await api.post(PATH.FIND_ID, requestBody).then((response) => {
    if (response.status === 200) {
      Dialog.create({
        title: '아이디 찾기 성공',
        message: `회원님의 아이디는 ${response.data.id} 입니다`,
        ok: {
          label: '확인',
          flat: true,
          color: 'primary'
        },
        persistent: true
      })
    }
  })
  .catch((error) => {
  if(error.response.status === 404) {
    Notify.create({ type: 'negative', message: '잘못된 입력값 입니다.', position: 'top' })
  } else {
    console.log("아이디 찾기 오류 :" + error)
  }
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

.required {
  color: red;
  font-size: 20px;
}

.duplicated-error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>

// 아이디 찾기 api 파라미터
// name, email, userSe(=GNR) : 일반회원
