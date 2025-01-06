<template>
  <div class="signUp-container">
    <div class="signup-box">
      <div class="title-box">
        <div class="title">회원생성</div>
      </div>
      <form class="signUp-form" @submit.prevent="onSignUp">
        <dl>
          <dt><span>회원ID</span></dt>
          <dd>
            <input type="text" v-model="userId" placeholder="아이디" required />
          </dd>
        </dl>
        <dl>
          <dt><span>회원암호</span></dt>
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
          <dt><span>회원명</span></dt>
          <dd>
            <input type="text" v-model="userNm" placeholder="이름" required />
          </dd>
        </dl>
        <div class="btn-box">
          <button type="submit" class="save-btn">저장</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
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
</style>


<script setup>
import { signUpRequest } from "@/api/apis";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userId = ref("");
const userPw = ref("");
const userNm = ref("");

// 회원가입 request
const onSignUp = async () => {
  try {
    const requestBody = {
      tmplatId: "TMPLAT_MYPAGE_DEFAULT",
      groupId: "GROUP_00000000000001",
      mberSttus: "P",
      checkIdResult: "사용 가능한 아이디입니다",
      mberId: userId.value,
      password: userPw.value,
      mberNm: userNm.value,
    };
    const response = await signUpRequest(requestBody);
    console.log(response);
    if (response.data.resultCode === 200) {
      alert("회원가입 성공");
      router.push("/login");
    } else {
      alert("회원가입 실패");
      console.log(response.data.resultMessage);
    }
  } catch (error) {
    console.error("회원가입 에러:", error);
  }
};
</script>
