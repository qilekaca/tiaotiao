<template>
  <div>
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      :title="title"
      left-text="返回"
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["title"]);
const title = props.title;

const router = useRouter();

function onClickLeft() {
  router.back();
}
</script>

<style scoped></style>
