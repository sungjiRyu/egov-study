<template>
  <div class="footer">
    <div class="inner">
      <h1>
        <router-link to="/">
          <img src="@/assets/images/logo_footer_w.png" alt="로고" />
        </router-link>
      </h1>

      <div class="info">
        <p>
          대표문의메일 : egovframeexample@gmail.com
          <span class="m_hide">|</span>
          <br class="m_show" />
          대표전화 : 0000-0000 (000-0000-0000)
          <br />
          호환성확인 : 000-0000-0000 | 교육문의 : 0000-0000-0000
        </p>
        <p class="copy">
          Copyright © 2021 Ministry Of The Interior And Safety. All Rights
          Reserved.
        </p>
      </div>

      <div class="right_col">
        <router-link to="/">
          <img src="@/assets/images/banner_w_01.png" alt="배너이미지" />
        </router-link>
        <router-link to="/">
          <img src="@/assets/images/banner_w_02.png" alt="배너이미지" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { QImg } from "quasar";
import "@/css/footer.scss";

import logoFooterImg from "@/assets/images/logo_footer_w.png";
import logoFooterImgMobile from "@/assets/images/logo_footer_m.png";
import bannerImg_01 from "@/assets/images/banner_w_01.png";
import bannerImgMobile_01 from "@/assets/images/banner_m_01.png";
import bannerImg_02 from "@/assets/images/banner_w_02.png";
import bannerImgMobile_02 from "@/assets/images/banner_m_02.png";

import "@/css/footer.scss";

export default defineComponent({
  name: "EgovFooter",
  setup() {
    return {
      logoFooterImg,
      logoFooterImgMobile,
      bannerImg_01,
      bannerImgMobile_01,
      bannerImg_02,
      bannerImgMobile_02,
    };
  },
});
</script>
