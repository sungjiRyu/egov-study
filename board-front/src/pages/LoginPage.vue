<template>
   <div class="mypage-title">
    <span>로그인</span>
    <div class="divider"></div>
  </div>
  <LoginModule></LoginModule>
</template>

<style>
.loginPage-title {
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
  width: 10%;
  height: 2px;
  background: #0465be;
}
</style>

<script setup>
import LoginModule from "@/components/auth/LoginModule.vue";
</script>

