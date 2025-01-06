<template>
  <div class="mypage-title">회원가입</div>
  <div class="divider"></div>
  <SignUpModule></SignUpModule>
</template>
<script setup>
import SignUpModule from "@/components/user/SignUpModule.vue";
</script>

<style>
.mypage-title {
  margin: 100px 0 0 350px;
  font-size: 48px;
  font-weight: bold;
}
.divider {
  margin-left: 350px;
  margin-top: 20px;
  margin-bottom: 20px;
  left: 0;
  bottom: 0;
  width: 30px;
  height: 2px;
  background: #0465be;
}
</style>
