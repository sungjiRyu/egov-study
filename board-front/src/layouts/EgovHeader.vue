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
        <template v-if="sessionUser">
          <span>{{ sessionUser }}님이 로그인하셨습니다.</span>
          <q-btn @click="logOutHandler" label="로그아웃" />
        </template>
        <template v-else>
          <q-btn to="/login" label="로그인" />
          <q-btn to="/mypage" label="회원가입" />
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

<style>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  /* width: 100%; */
  border-bottom: 1px solid #27262642;
}

.main-img {
  width: 120%;
}

.menu-list {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 12px;
}

.gnb {
  color: #666;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.25px;
}

.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  max-width: 100%;
}

.gnb {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.user_info {
  display: flex;
  align-items: center;
}

.q-drawer {
  width: 250px;
}

.q-btn {
  margin: 0 5px;
}
</style>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const menuDrawer = ref(false);
const router = useRouter();
const sessionUser = localStorage.getItem("loginUser");

const logOutHandler = async () => {
  await userStore.signOut();
  if (!localStorage.getItem("loginUser")) {
    router.push("/");
  } else {
    alert("로그아웃 실패");
  }
};

const toggleMenu = () => {
  menuDrawer.value = !menuDrawer.value;
};
</script>
