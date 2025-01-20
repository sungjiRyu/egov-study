<template>
  <div class="mypage-title">
    <span></span>
    <div class="divider"></div>
  </div>
  <SignUpModule></SignUpModule>
</template>

<script setup>
import SignUpModule from '@/components/user/SignUpModule.vue'
import { useRoute } from '@/vue-route'

const route = useRoute()
const type = ref(route.params.boardId)

</script>

<style scoped>
.mypage-title {
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
