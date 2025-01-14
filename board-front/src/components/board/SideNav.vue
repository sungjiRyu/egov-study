<template>
  <div className='sideNav-container'>
    <div className='inner-box'>
      <h2>알림마당</h2>
      <ul className='list'>
        <li>
          <RouterLink class="link" to="/board/notice">공지사항</RouterLink>
        </li>
        <li>
          <RouterLink class="link" to="/board/gallery">사이트갤러리</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sideNav-container{
  width: 260px;
}

.inner-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 20px;
  border: 1px solid #dde2e5;
  border-radius: 10px;
}

.inner-box h2 {
  color: #222;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 4px solid #dde2e5;
  padding-left: 30px;
}

.list {
  padding: 26px 30px 27px 30px;
}

.list li {
  font-size: 18px;
  margin-bottom: 40px;
  color: #666;
}
</style>

<script setup>
</script>
