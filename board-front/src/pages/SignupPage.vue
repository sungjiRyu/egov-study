<template>
  <div class="login-page">
    <div class="login-container">
      <h1>회원가입</h1>
      <form class="login-form" @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="email">ID</label>
          <input type="text" id="email" v-model="email" placeholder="ID" />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="password"
          />
        </div>

        <div class="input-group">
          <label for="name">Name</label>
          <input type="name" id="name" v-model="name" placeholder="name" />
        </div>

        <button type="submit" class="submit-btn">submit</button>
        <div class="signup-link-container">
          <router-link to="/login" class="sign-up-link">로그인</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      email: "",
      password: "",
      name: "",
    };
  },
  methods: {
    // 회원가입 request
    async onSubmit() {
      console.log("email:", this.email);
      console.log("Password:", this.password);
      console.log("Name:", this.name);
      try {
        const response = await signup(this.email, this.password, this.name);

        if (response.data.success) {
          console.log("회원가입 성공:", response.data.message);
          this.$router.push("/");
        } else {
          console.log("회원가입 실패:", response.data.message);
        }
      } catch (error) {
        console.error("회원가입 요청 중 오류 발생:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    },
  },
};
</script>
