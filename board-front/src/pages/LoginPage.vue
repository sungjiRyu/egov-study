<template>
  <div class="login-page">
    <div class="login-container">
      <h1>로그인</h1>
      <form class="login-form" @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="email">ID</label>
          <input
            type="text"
            id="email"
            v-model="username"
            placeholder="ID"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit" class="submit-btn">submit</button>
        <div class="signup-link-container">
          <router-link to="/signup" class="sign-up-link">회원가입</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import "@/css/loginPage.scss";

export default {
  name: "LoginPage",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const username = ref("");
    const password = ref("");

    const onSubmit = async () => {
      const requestBody = {
        userSe: "USR",
        id: username.value,
        password: password.value,
      };

      await userStore.signInRequest(requestBody);

      if (userStore.isLogIn) {
        alert("로그인 성공");
        router.push("/");
      } else {
        alert("로그인 실패");
      }
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
</script>
