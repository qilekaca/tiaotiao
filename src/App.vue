<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-if="route.meta.keepAlive" :is="Component" />
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" />
  </router-view>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";

const route = useRoute();

console.log(route);
</script>

<style scoped></style>
