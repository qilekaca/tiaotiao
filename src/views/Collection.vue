<template>
  <!-- nav-bar -->
  <van-nav-bar
    fixed
    placeholder
    left-arrow
    title="详细信息"
    left-text="返回"
    @click-left="onClickLeft"
  />
  <!-- list -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      :loading="loading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多了"
    >
      <Card v-for="post in list" :key="post._id" :post="post" />
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import Card from "../components/Card.vue";
import { getPosts } from "../service/post";
import { useRoute } from "vue-router";
import { ref } from "vue";
import _ from "lodash";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const route = useRoute();

const onClickLeft = () => history.back();

const onLoad = _.debounce(async () => {
  const getCount = 10;
  console.log("获取数据");

  if (refreshing.value) {
    console.log("下拉刷新");
    list.value = [];
    refreshing.value = false;
  }

  const result = await getPosts(route.params.userid);

  console.log(result);
  list.value = list.value.concat(result.posts);
  console.log(list.value);
  loading.value = false;

  if (result.posts.length < getCount) {
    console.log("加载完成");
    finished.value = true;
  }
}, 100);

const onRefresh = async () => {
  finished.value = false;
  loading.value = true;
  list.value = [];
  await onLoad();
};
</script>

<style scoped></style>
