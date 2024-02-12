<template>
  <div>
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group style="margin-top: 20px">
      <van-cell
        title="头像"
        is-link
        center
        :to="{ name: 'updateuserinfo', query: { type: 'avatar' } }"
      >
        <template #value>
          <VanImage
            width="3rem"
            height="3rem"
            fit="cover"
            radius="10"
            :src="user.image"
          />
        </template>
      </van-cell>
      <van-cell
        title="用户名"
        :value="user.username"
        is-link
        :to="{ name: 'updateuserinfo', query: { type: 'username' } }"
      />
    </van-cell-group>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";

const user = ref({});
const userStore = useUserStore();

onMounted(() => {
  user.value = userStore.user;
});

const onClickLeft = () => history.back();
</script>

<style scoped></style>
