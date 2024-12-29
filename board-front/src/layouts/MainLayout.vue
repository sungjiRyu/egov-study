<template>
  <q-layout>
    <EgovHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <EgovFooter />
</template>

<script>
import EgovHeader from "@/layouts/EgovHeader.vue";
import EgovFooter from "@/layouts/EgovFooter.vue";

export default {
  name: "MainLayout",
  components: {
    EgovHeader,
    EgovFooter,
  },
};
</script>
