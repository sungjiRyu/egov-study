<template>
  <q-page-container>
    <q-page class="container P_MAIN">
      <div class="c_wrap">
        <div class="colbox">
          <div class="left_col">
            <q-img
              class="main-img"
              :src="simpleMainIng"
              alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다."
            />
          </div>
          <div class="right_col">
            <div class="mini_board">
              <q-tabs v-model="tab" class="tab">
                <q-tab name="공지사항" label="공지사항" />
                <q-tab name="갤러리" label="갤러리" />
              </q-tabs>
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
                  <q-btn
                    :to="{ path: '/inform-notice' }"
                    label="더보기"
                    class="more"
                  />
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
                  <q-btn
                    :to="{ path: '/inform-gallery' }"
                    label="더보기"
                    class="more"
                  />
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

<script>
import { defineComponent, onMounted, ref } from "vue";
import "@/css/mainPage.scss";
import simpleMainIng from "@/assets/images/img_simple_main.png";
import { RouterLink, useRouter } from "vue-router";

export default defineComponent({
  name: "EgovMain",
  setup() {
    // 공지사항 리스트
    const noticeBoard = ref([]);
    // 갤러리 리스트
    const gallaryBoard = ref([]);
    const tab = ref("공지사항");
    const router = useRouter();

    // api.onMounted(() => {
    //   initPage();
    //   retrieveList();
    // });

    return {
      simpleMainIng,
      tab,
      // noticeListTag: store.noticeListTag,
      // gallaryListTag: store.gallaryListTag,
    };
  },
});
</script>

<style scoped>
/* 스타일은 Quasar와 함께 제공되는 스타일 클래스를 사용할 수 있습니다. */
</style>
