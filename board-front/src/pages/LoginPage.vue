<template>
  <div class="login-page">
    <div class="login-container">
      <h1>sign in</h1>
      <form class="login-form" @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="email">ID</label>
          <input
            type="text"
            id="email"
            v-model="username"
            placeholder="Enter your email"
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="submit-btn">submit</button>
        <div class="signup-link-container">
          <router-link to="/signup" class="sign-up-link"
            >Create account</router-link
          >
        </div>
      </form>
      <div class="social-login">
        <!-- <button class="social-btn kakao">Login with Kakao</button>
        <button class="social-btn naver">Login with Naver</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import "../css/loginPage.scss";
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      // 로그인 입력값 확인
      console.log("email:", this.email);
      console.log("Password:", this.password);
    },
  },
};
</script>
