<template>
  <div>
    <van-tabs :active="active" :before-change="beforeChange">
      <van-tab
        v-for="item of itemType"
        :name="item.name"
        :title="item.title"
        :key="item.title"
      >
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
      </van-tab>
    </van-tabs>
    <TabBar />
  </div>
</template>

<script setup>
import { ref, reactive, onActivated } from "vue";
import { showDialog } from "vant";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { getPosts } from "@/service/post";
import { useUserStore } from "../stores/user";
import Card from "@/components/Card.vue";
import TabBar from "@/components/TabBar.vue";
import _ from "lodash";

const active = ref("OutCollegeList");
const userStore = useUserStore();

const itemType = reactive([
  {
    title: "校外",
    name: "OutCollegeList",
  },
  {
    title: "校内",
    name: "InCollegeList",
  },
]);

const school = ref("");
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const router = useRouter();

const onLoad = _.debounce(async () => {
  const getCount = 15;
  console.log("获取数据");

  if (refreshing.value) {
    console.log("下拉刷新");
    list.value = [];
    refreshing.value = false;
  }

  const result =
    active.value == "OutCollegeList"
      ? await getPosts({
          params: { limit: getCount, offset: list.value.length },
        })
      : await getPosts({
          params: {
            limit: getCount,
            offset: list.value.length,
            school: school.value,
          },
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

const beforeChange = async (name) => {
  try {
    const user = userStore.user;
    if (!user.school) {
      // 没选择学校
      showDialog({
        message: "登陆后并选择学校才能查看校内内容哦！！",
        confirmButtonText: "登陆",
      }).then(() => {
        router.replace("/my");
      });
    } else {
      active.value = name;
      list.value = [];
      finished.value = false;
      loading.value = true;
      school.value = user.school;
      await onLoad();
    }
  } catch (error) {
    showDialog({
      message: "登陆后并选择学校才能查看校内内容哦！！",
      confirmButtonText: "登陆",
    }).then(() => {
      router.replace("/login");
    });
  }
};

defineExpose({ onRefresh });
</script>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    if (from.path == "/post") {
      next((vm) => {
        console.log("getPosts");
        vm.onRefresh();
      });
    } else {
      next();
    }
  },
});
</script>

<style scoped></style>
