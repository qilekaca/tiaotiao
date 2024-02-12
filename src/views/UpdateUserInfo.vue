<template>
  <div>
    <van-nav-bar
      :title="title"
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right v-if="route.query.type == 'avatar'">
        <van-uploader :after-read="afterRead">
          <van-button size="small" type="primary">上传图片</van-button>
        </van-uploader>
      </template>
      <template #right v-if="route.query.type == 'username'">
        <van-button type="primary" size="small" @click="setUsername">
          完成
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 修改头像 -->
    <van-image
      style="margin-top: 50px"
      width="100vw"
      fit="cover"
      :src="user.image"
      v-if="route.query.type == 'avatar'"
    />
    <!-- 修改用户名 -->
    <van-cell-group
      inset
      style="margin-top: 20px"
      v-if="route.query.type == 'username'"
    >
      <van-field v-model="username" placeholder="请输入用户名" />
    </van-cell-group>
  </div>
</template>

<script setup>
import { showLoadingToast, closeToast } from "vant";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { updateUser } from "@/service/user";
import { uploadImage } from "@/service/file";
import { showFailToast } from "vant";
import { useUserStore } from "../stores/user";

const onClickLeft = () => history.back();

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const title = ref("");
const username = ref("");
const user = ref({});

// 根据路由判断在哪里来的
onMounted(async () => {
  if (route.query.type == "avatar") {
    title.value = "个人头像";
  } else {
    title.value = "设置名字";
  }
  user.value = userStore.user;
});

const afterRead = async (file) => {
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: "上传中",
  });

  try {
    // TODO:上传新头像后删除旧头像
    const res = await uploadImage({ file });
    const user = await updateUser({
      user: {
        image: `https://${res.data.Location}`,
      },
    });

    userStore.user = user;
    router.replace("/my");
    console.log(user);
  } catch (error) {
    console.log(error);
  }

  closeToast();
};

const setUsername = async () => {
  try {
    const user = await updateUser({
      user: {
        username: username.value,
      },
    });

    userStore.user = user;
    router.replace("/my");
    console.log(user);
  } catch (error) {
    console.log(error);
    showFailToast(error.msg);
  }
};
</script>

<style scoped></style>
