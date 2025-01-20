<template>
  <div class="signUp-container">
    <div class="signup-box">
      <form class="signUp-form" @submit.prevent="onSubmit">
        <dl>
          <dt><span>아이디 <span class="required">*</span></span></dt>
          <dd>
            <input
              type="text"
              v-model="id"
              placeholder="아이디"
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
        <dl>
          <dt><span>비밀번호 찾기 힌트<span class="required">*</span></span></dt>
          <dd>
            <select v-model="passwordHint" required>
              <option disabled value="">힌트를 선택해주세요</option>
              <option value="1">애완동물의 이름은 무엇인가요?</option>
              <option value="2">어머니의 본명은 무엇인가요?</option>
              <option value="3">초등학교 이름은 무엇인가요?</option>
            </select>
          </dd>
        </dl>
        <dl>
          <dt><span>비밀번호 찾기 정답<span class="required">*</span></span></dt>
          <dd>
            <input
              type="text"
              v-model="passwordCnsr"
              placeholder="정답"
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
import { api } from '@/boot/axios'
import { PATH } from '@/api/path'
import { Notify, Dialog } from 'quasar'

const id = ref('')
const email = ref('')
const passwordHint = ref('')
const passwordCnsr = ref('')

const onSubmit = async () => {
  // 비밀번호 힌트를 선택하지 않았을 때 경고 메시지 표시
  const requestBody = {
    id: id.value,
    email: email.value,
    passwordHint: passwordHint.value,
    passwordCnsr: passwordCnsr.value
  }

  await api.post(PATH.FIND_PWD, requestBody).then((response) => {
    if (response.status === 200) {
      Dialog.create({
        title: '임시비밀번호 발급 성공',
        message: `회원님의 임시비밀번호는 ${response.data.password} 입니다`,
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
    console.log("비밀번호 찾기 오류 :" + error)
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

.btn-box {
  margin-top: 20px;
  width: 100px;
}

.save-btn {
  width: 100%;
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

