<template>
  <div class="title">
    <p>{{ titleName }} 찾기</p>
    <div class="divider"></div>
  </div>
  <FindIdModule v-if="type === 'id'" />
  <FindPwdModule v-if="type === 'pwd'" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import FindIdModule from '@/components/auth/FindeIdModule.vue';
import FindPwdModule from '@/components/auth/FindPwdModule.vue';

const route = useRoute();
let type = route.params.type;
let titleName = type === 'id' ? '아이디' : (type === 'pwd' ? '비밀번호' : '');
</script>

<style scoped>
.title {
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
