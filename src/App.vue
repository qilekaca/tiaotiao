<template>
  <router-view />

  <!-- <van-cell title="展示弹出层" is-link @click="showPopup" />
  <van-popup
    :show="showBottom"
    closeable
    safe-area-inset-top
    safe-area-inset-bottom
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <template #default>
      <div>
        <h1>显示登陆页面</h1>
      </div>
    </template>
  </van-popup> -->
</template>

<script setup>
// import { ref } from "vue";
import { RouterView } from "vue-router";

// const show = ref(false);
// const showPopup = () => {
//   show.value = true;
// };

// import { useUserStore } from "./stores";
</script>

<style scoped></style>
