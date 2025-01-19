<template>
  <q-layout>
    <EgovHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
    <EgovFooter />
  </q-layout>
</template>
<script setup>
import EgovHeader from "@/layouts/EgovHeader.vue";
import EgovFooter from "@/layouts/EgovFooter.vue";
</script>