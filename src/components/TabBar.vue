<template>
  <div>
    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <!-- 此处跳转时判断用户是否登陆，未登陆跳转至登陆页面 -->
      <van-tabbar-item replace to="/my" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup></script>

<style scoped></style>
