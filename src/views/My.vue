<template>
  <div>
    <van-cell style="margin-top: 3vh" is-link center to="userinfo">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #icon>
        <van-image
          width="4rem"
          height="4rem"
          fit="cover"
          radius="10"
          :src="user.image"
        />
      </template>
      <template #title>
        <p
          style="
            font-weight: 600;
            font-size: 20px;
            margin-left: 10px;
            color: #323233;
          "
        >
          {{ user.username }}
        </p>
      </template>
    </van-cell>

    <!-- 收藏发布浏览学校 -->
    <van-cell-group style="margin-top: 3vh">
      <van-cell
        icon="friends-o"
        title="学校"
        is-link
        to="school"
        :value="user.school ? user.school : '请选择学校'"
      />
      <van-cell icon="star-o" title="收藏" is-link to="collection" />
      <van-cell icon="bullhorn-o" title="发布过" is-link to="posted" />
      <van-cell
        icon="browsing-history-o"
        title="浏览记录"
        is-link
        to="viewed"
      />
    </van-cell-group>

    <!-- 发布 -->
    <van-row justify="center" style="margin-top: 3vh">
      <van-col span="22">
        <van-button
          type="primary"
          size="large"
          @click="
            () => {
              showBottom = !showBottom;
            }
          "
        >
          发布
        </van-button>
      </van-col>
    </van-row>

    <!-- 选择发布类型 帖子、闲置 -->
    <van-row>
      <van-col>
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
                is-link
                center
                icon="star-o"
                title="发帖子"
                size="large"
                label="分享我的生活"
                :to="{ name: 'post', query: { type: 'post' } }"
              />
              <van-cell
                is-link
                center
                icon="bullhorn-o"
                title="发闲置"
                size="large"
                label="发布闲置宝贝"
                :to="{ name: 'post', query: { type: 'goods' } }"
              />
            </van-cell-group>
          </template>
        </van-popup>
      </van-col>
    </van-row>
    <TabBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser } from "@/service/user";
import TabBar from "@/components/TabBar.vue";

let user = ref({});
const showBottom = ref(false);
const router = useRouter();

// 进入这个页面后获取用户信息
onMounted(async () => {
  const res = await getCurrentUser();
  user.value = res;
  console.log(user);
});
</script>

<style scoped></style>
