<template>
  <div class="header">
    <div class="inner">
      <router-link to="/">
        <img
          class="main-img"
          src="@/assets/images/logo_m.png"
          alt="메인이미지"
        />
      </router-link>
      <div class="gnb">
        <q-list class="menu-list">
          <q-item clickable to="/about">
            <q-item-section>사이트소개</q-item-section>
          </q-item>
          <q-item clickable to="/intro">
            <q-item-section>정보마당</q-item-section>
          </q-item>
          <q-item clickable to="/support">
            <q-item-section>고객지원</q-item-section>
          </q-item>
          <q-item clickable to="/inform">
            <q-item-section>알림마당</q-item-section>
          </q-item>
          <q-item v-if="sessionUserSe === 'ADM'" clickable to="/admin">
            <q-item-section>사이트관리</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="user_info">
        <template v-if="userStore.isLogIn">
          <span>{{ userStore.id }}님이 로그인하셨습니다.</span>
          <q-btn @click="logOutHandler" label="로그아웃" />
        </template>
        <template v-else>
          <q-btn to="/login" label="로그인" />
          <q-btn to="/signup" label="회원가입" />
        </template>
      </div>

      <q-btn class="btnAllMenu" icon="menu" @click="toggleMenu" />
    </div>

    <q-drawer v-model="menuDrawer" side="right" overlay>
      <q-list>
        <q-item clickable to="/about">
          <q-item-section>사이트소개</q-item-section>
        </q-item>
        <q-item clickable to="/intro">
          <q-item-section>정보마당</q-item-section>
        </q-item>
        <q-item clickable to="/support">
          <q-item-section>고객지원</q-item-section>
        </q-item>
        <q-item clickable to="/inform">
          <q-item-section>알림마당</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>

<script>
import { ref } from "vue";
import "@/css/header.scss";
import { useUserStore } from "@/stores/user";
import { QBtn, QList, QItem, QItemSection, QDrawer } from "quasar";
import { useRouter } from "vue-router";

export default {
  name: "EgovHeader",
  components: {
    QBtn,
    QList,
    QItem,
    QItemSection,
    QDrawer,
  },
  setup() {
    const userStore = useUserStore();
    const menuDrawer = ref(false);
    const router = useRouter();

    const logOutHandler = () => {
      userStore.logOut();
      router.push("/");
    };

    const toggleMenu = () => {
      menuDrawer.value = !menuDrawer.value;
    };

    return {
      userStore,
      menuDrawer,
      logOutHandler,
      toggleMenu,
    };
  },
};
</script>
