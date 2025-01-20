<template>
  <div class="signUp-container">
    <div class="signup-box">
      <div class="title-box">
        <!-- <div class="title">회원생성</div> -->
      </div>
      <form class="signUp-form" @submit.prevent="onSignUpButtonClickHandler">
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
          <button type="submit" class="save-btn">저장</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signUp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
</style>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { api } from '@/boot/axios'
import { PATH } from '@/api/path'

const router = useRouter()
const userId = ref('')
const userPw = ref('')
const userNm = ref('')
const email = ref('')
const passwordHint = ref('')
const passwordCnsr = ref('')

let isDuplicated = false

// event handler: 회원가입 버튼 클릭 이벤트 처리(회원가입)
const onSignUpButtonClickHandler = async () => {
  // id duplicate check
    const response = await api.get(PATH.CHECK_DUPLICTE_ID(userId.value))

    if (response.data.resultCode === 200 && response.data.result.usedCnt > 0) {
        Notify.create({ type: 'negative', message: '사용할 수 없는 아이디 입니다.', position: 'top' })
        return
      }

    const requestBody = {
      tmplatId: "TMPLAT_MYPAGE_DEFAULT",
      groupId: "GROUP_00000000000001",
      mberSttus: "P",
      checkIdResult: "사용 가능한 아이디입니다",
      mberId: userId.value,
      password: userPw.value,
      mberNm: userNm.value,
      mberEmailAdres: email.value,
      passwordHint: passwordHint.value,
      passwordCnsr: passwordCnsr.value,
    };

    // signup request
    await api.post(PATH.SIGNUP, requestBody)
    .then((response) => {
      if (response.data.resultCode === 200) {
        Notify.create({ type: 'positive', message: '회원가입에 성공했습니다.', position: 'top' })
        router.push('/login')
      }
    })
};
</script>
