<template>
  <div>
    <van-row
      align="center"
      justify="space-around"
      style="margin-top: 3vh; background-van-color: #fff; height: 100px"
      @click="
        () => {
          router.push('/userinfo');
        }
      "
    >
      <van-col span="4" offset="1">
        <van-image
          width="4rem"
          height="4rem"
          fit="cover"
          radius="10"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </van-col>
      <van-col span="18">
        <van-cell
          title="asdfasdf"
          style="font-weight: 600; font-size: 16px"
          :border="false"
          is-link
        />
      </van-col>
    </van-row>

    <!-- 收藏发布浏览学校 -->
    <van-cell-group style="margin-top: 3vh">
      <van-cell
        icon="description"
        title="学校"
        is-link
        to="van-college"
        value="
          请选择学校
        "
      />
      <van-cell icon="star-o" title="收藏" is-link to="van-collection" />
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
import { ref } from "vue";
import TabBar from "@/components/TabBar.vue";

const showBottom = ref(false);
</script>

<style scoped></style>
