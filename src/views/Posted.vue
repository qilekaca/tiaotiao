<template>
  <div>
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      title="发布过"
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
        <Card
          v-for="post in list"
          :key="post._id"
          :post="post"
          @handle-post="handlePost"
        />
      </van-list>
    </van-pull-refresh>
    <!-- 操作栏 -->
    <van-popup
      :show="showBottom"
      :style="{ height: '50%' }"
      closeable
      round
      safe-area-inset-top
      safe-area-inset-bottom
      position="bottom"
      @click-close-icon="showBottom = !showBottom"
      @click-overlay="showBottom = !showBottom"
    >
      <template #default>
        <van-cell-group style="margin-top: 50px">
          <van-cell
            center
            icon="closed-eye"
            title="仅自己可见"
            @click="viewMe"
          />
          <van-cell
            center
            icon="eye-o"
            title="仅校内可见"
            @click="viewCollege"
          />
          <van-cell
            style="color: #ee0a24"
            center
            icon="delete-o"
            title="删除"
            @click="handleDeletePost"
          />
        </van-cell-group>
      </template>
    </van-popup>
  </div>
</template>

<script setup>
import { getPosts, deletePost } from "../service/post";
import { showLoadingToast, closeToast } from "vant";
import Card from "../components/Card.vue";
import { ref } from "vue";
import _ from "lodash";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const showBottom = ref(false);
const postid = ref("");

const onClickLeft = () => history.back();

const onLoad = _.debounce(async () => {
  const getCount = 10;
  console.log("获取数据");

  if (refreshing.value) {
    console.log("下拉刷新");
    list.value = [];
    refreshing.value = false;
  }

  const user = userStore.user;

  const result = await getPosts({
    params: { limit: getCount, offset: list.value.length, author: user._id },
  });

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

const handlePost = (id) => {
  showBottom.value = !showBottom.value;
  postid.value = id;
};

const handleDeletePost = async () => {
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: "删除中",
  });
  const res = await deletePost(postid.value);
  console.log(res);
  closeToast();
  showBottom.value = !showBottom.value;
  await onRefresh();
};

const viewMe = () => {};

const viewCollege = () => {};
</script>

<style scoped></style>
