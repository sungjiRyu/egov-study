<template>
  <q-page-container>
    <q-page class="container P_MAIN">
      <div class="c_wrap">
        <div class="colbox">
          <div class="left_col">
            <q-img
              class="main-img"
              :src="simpleMainImg"
              alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다."
            />
          </div>
          <div class="right_col">
            <div class="mini_board">
              <div class="tab-box">
                <q-tabs v-model="tab" class="tab">
                  <q-tab name="공지사항" label="공지사항" />
                  <q-tab name="갤러리" label="갤러리" />
                </q-tabs>
                <q-btn :to="{ path: '/board' }" label="더보기" class="more" />
              </div>
              <div class="list">
                <div v-show="tab === '공지사항'" class="notice">
                  <h2 class="blind">공지사항</h2>
                  <ul>
                    <li v-for="item in noticeListTag" :key="item.key">
                      <q-btn
                        :to="{
                          path: '/inform-notice-detail',
                          state: { nttId: item.nttId, bbsId: item.bbsId },
                        }"
                        :label="item.nttSj"
                        class="link"
                      />
                      <span>{{ item.frstRegisterPnttm }}</span>
                    </li>
                  </ul>
                </div>

                <div v-show="tab === '갤러리'" class="gallary">
                  <h2 class="blind">갤러리</h2>
                  <ul>
                    <li v-for="item in gallaryListTag" :key="item.key">
                      <q-btn
                        :to="{
                          path: '/inform-gallery-detail',
                          state: { nttId: item.nttId, bbsId: item.bbsId },
                        }"
                        :label="item.nttSj"
                        class="link"
                      />
                      <span>{{ item.frstRegisterPnttm }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="banner">
              <q-btn
                :to="{ path: '/support-download' }"
                label="자료실"
                class="bn1"
              >
                <span>다양한 자료를<br />다운로드 받으실 수 있습니다.</span>
              </q-btn>
              <q-btn
                :to="{ path: '/about' }"
                label="표준프레임워크센터"
                class="bn2"
              >
                <span
                  >표준프레임워크센터의<br />약도 등의 정보를 제공합니다.</span
                >
              </q-btn>
            </div>
          </div>
        </div>

        <div class="banner_bot">
          <div class="b1">
            <div class="image-box">
              <img src="@/assets/images/ico_bn01.png" alt="주요사업 소개" />
            </div>
            <div class="text-box">
              <h2>주요사업 소개</h2>
              <span>
                표준프레임워크가 제공하는<br />주요 사업을 소개합니다.
              </span>
            </div>
            <RouterLink class="link" to="/intro-works">
              <img src="@/assets/images/ico_more.png" />
              자세히 보기
            </RouterLink>
          </div>

          <div class="b2">
            <div class="image-box">
              <img src="@/assets/images/ico_bn02.png" alt="대표서비스 소개" />
            </div>
            <div class="text-box">
              <h2>대표서비스 소개</h2>
              <span>
                표준프레임워크 실행환경의<br />서비스 그룹에서 제공하는<br />대표서비스입니다.
              </span>
            </div>
            <RouterLink class="link" to="/intro-service">
              <img src="@/assets/images/ico_more.png" />
              자세히 보기
            </RouterLink>
          </div>

          <div class="b3">
            <div class="image-box">
              <img src="@/assets/images/ico_bn03.png" alt="서비스 신청" />
            </div>
            <div class="text-box">
              <h2>서비스 신청</h2>
              <span>
                표준프레임워크 경량환경<br />홈페이지의 다양한 서비스를<br />신청하실수있습니다.
              </span>
            </div>
            <RouterLink class="link" to="/support-apply">
              <img src="@/assets/images/ico_more.png" />
              자세히 보기
            </RouterLink>
          </div>

          <div class="b4">
            <div class="image-box">
              <img src="@/assets/images/ico_bn04.png" alt="일정 현황" />
            </div>
            <div class="text-box">
              <h2>일정 현황</h2>
              <span>
                표준프레임워크 경량환경<br />홈페이지의 전체적인 일정<br />현황을조회하실
                수 있습니다.
              </span>
            </div>
            <RouterLink class="link" to="/inform">
              <img src="@/assets/images/ico_more.png" />
              자세히 보기
            </RouterLink>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f7fc;
  min-height: calc(100vh - 300px);
}

.P_MAIN {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
}

.P_MAIN .colbox > * {
  float: left;
}

.P_MAIN::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 360px;
  background: #fff;
}

.c_wrap {
  width: 1400px;
  margin: 0 auto;
  padding: 0 50px;
}

.P_MAIN > .c_wrap > .colbox > .left_col {
  width: 620px;
  margin-right: 60px;
  padding-top: 30px;
}

.colbox > .left_col > .main-img {
  max-width: 100%;
  border-radius: 38px;
  box-shadow: 8px 8px 13px #ccc;
}

.P_MAIN .colbox .right_col {
  width: 620px;
  padding-top: 25px;
}

.q-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 헤더 */
q-header {
  background-color: #2d3e50;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  text-align: center;
}

q-footer {
  background-color: #2d3e50;
  color: white;
  padding: 10px 20px;
  text-align: center;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

/* 페이지 콘텐츠 */
.q-page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.c_wrap {
  gap: 20px;
}

.colbox {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.left_col {
  flex: 1;
  max-width: 60%;
}

.right_col {
  flex: 1;
  max-width: 35%;
}

/* 이미지 */
q-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 38px;
  box-shadow: 8px 8px 13px #ccc;
}

/* 미니 보드 */
.mini_board {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tab-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.q-tab {
  flex: 1;
  background-color: #eeeeee;
  border-radius: 4px;
  padding: 10px 20px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: transparent;
}

.q-tab__label {
  display: block;
  position: relative;
  padding-bottom: 12px;
  color: #ccc;
  font-size: 30px;
  font-weight: 700;
}

.q-tab--active .q-tab__label {
  color: black;
}

.q-tab__indicator {
  height: 6px;
  background-color: #000;
}

.q-tabs__content {
  display: flex;
  justify-content: space-between;
}

/* 리스트 */
.list {
  margin-top: 10px;
}

.notice ul,
.gallary ul {
  padding: 0;
  list-style-type: none;
}

.notice li,
.gallary li {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.notice span,
.gallary span {
  font-size: 12px;
  color: #888;
}

.more {
  margin-bottom: 20px;
  background-color: transparent;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s;
}

.banner {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.banner .q-btn {
  background-color: #3498db;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  width: 45%;
  transition: background-color 0.3s;
}

.banner .q-btn:hover {
  background-color: #2980b9;
}

.banner .q-btn span {
  display: block;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}

/* 하단 배너 */
.banner_bot {
  margin-top: 30px;
  display: flex;
  gap: 20px;
  height: 400px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.banner_bot > div {
  display: flex;
  flex-direction: column;
}

.banner_bot .q-btn {
  color: white;
  font-size: 26px;
  font-weight: 700;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  transition: background-color 0.3s;
}

.banner_bot > div > .image-box {
  padding: 40px;
}

.banner_bot > div {
  float: left;
  width: 310px;
  height: 480px;
  padding: 0 30px;
  border-radius: 30px;
  text-align: center;
  background: #fff;
}

.banner_bot > div > .text-box {
  height: 180px;
  padding-top: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.banner_bot > div > .text-box > h2 {
  color: #000;
  font-size: 26px;
  font-weight: 700;
}

.banner_bot > div > .text-box > span {
  margin-top: 23px;
  color: #666;
  font-size: 20px;
  line-height: 30px;
}

.banner_bot > div > .link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  gap: 10px;
}

.banner_bot > div > a {
  height: 70px;
  color: #666;
  font-size: 20px;
  line-height: 70px;
}

.banner_bot > div > .btn-box > img {
  content: "";
  width: 20px;
  height: 20px;
  margin-right: 9px;
  vertical-align: -2px;
}

.banner_bot .q-btn span {
  font-size: 12px;
  line-height: 1.4;
  font-weight: 500;
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .colbox {
    flex-direction: column;
  }

  .left_col,
  .right_col {
    max-width: 100%;
  }

  .banner,
  .banner_bot {
    flex-direction: column;
  }

  .banner .q-btn,
  .banner_bot .q-btn {
    width: 100%;
  }
}
</style>

<script setup>
import { ref } from "vue";
import simpleMainImg from "@/assets/images/img_simple_main.png";
import { RouterLink, useRouter } from "vue-router";

// 공지사항 리스트
const noticeBoard = ref([]);
// 갤러리 리스트
const gallaryBoard = ref([]);
const tab = ref("공지사항");
const router = useRouter();
</script>
