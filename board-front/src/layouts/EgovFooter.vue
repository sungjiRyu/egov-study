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

<style>
.footer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  /* height: 100%; */
  width: 100%;
  border-top: 1px solid #27262642;
}

.footer > .inner {
  display: flex;
  justify-content: center;
  margin-top:30px;
  align-items: center;
  width: 1400px;
  padding: 0 20px;
  gap: 20px;
  height: 100%;
}

.footer > .inner > h1 {
  float: none;
  padding-top: 28px;
}

.footer > .inner > .info {
  float: left;
  padding-top: 44px;
  color: #888;
  font-size: 16px;
  line-height: 26px;
}

.footer > .inner > .right_col {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.a > .w {
  width: 10px;
}
</style>

<script setup></script>
