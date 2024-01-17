<template>
  <div>
    <van-nav-bar
      title="详细信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-row justify="center">
      <van-col span="22">
        <!-- 头像、昵称、创建时间 -->
        <van-row style="margin-top: 10px">
          <van-col>
            <van-skeleton avatar :loading="loading">
              <van-image
                width="2.5rem"
                height="2.5rem"
                fit="cover"
                radius="10"
                :src="postinfo.author.image"
              />
            </van-skeleton>
          </van-col>
          <van-col>
            <van-skeleton title :row="2" :loading="loading">
              <p style="font-weight: 600; margin-left: 10px; color: #323233">
                {{ postinfo.author.username }}
              </p>
              <p style="margin-left: 10px; color: #969799; font-size: 10px">
                {{ postinfo.createdAt }}
              </p>
            </van-skeleton>
          </van-col>
        </van-row>

        <!-- 内容 -->
        <van-skeleton title :row="3" :loading="loading">
          <p style="margin-top: 10px; color: #646566">{{ postinfo.content }}</p>
        </van-skeleton>

        <!-- 图片 -->
        <div style="margin-top: 10px" v-if="postinfo?.images?.length">
          <van-space wrap :size="3">
            <van-image
              v-for="(imageUrl, index) in postinfo.images"
              lazy-load
              width="29.75vw"
              height="29.75vw"
              position="center"
              fit="cover"
              :id="imageUrl"
              :src="imageUrl"
              @click.stop="
                showImagePreview({
                  images: postinfo.images,
                  startPosition: index,
                })
              "
            />
          </van-space>
        </div>

        <!-- 数据展示 -->
        <van-row
          class="van-hairline--bottom van-hairline--top"
          style="margin-top: 10px"
        >
          <van-skeleton title :loading="loading">
            <van-col span="8" class="view-bar">
              <van-icon name="eye-o" size="large" />
              <p>{{ postinfo.favoritesCount }}</p>
            </van-col>
            <van-col span="8" class="view-bar">
              <van-icon name="star-o" size="large" />
              <p>{{ postinfo.favoritesCount }}</p>
            </van-col>
            <van-col span="8" class="view-bar">
              <van-icon name="comment-o" size="large" />
              <p>{{ postinfo.favoritesCount }}</p>
            </van-col>
          </van-skeleton>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script setup>
import { showImagePreview } from "vant";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getPost } from "../service/post";

// route.params.postid
const route = useRoute();
const postinfo = ref({});
const loading = ref(true);

const onClickLeft = () => history.back();

onMounted(async () => {
  try {
    const post = await getPost(route.params.postid);
    postinfo.value = post;
    console.log(post);
    // console.log("获取post详情");
    // const params = { postid: route.query.id };
    // const { result } = await callFunction("posts", "getPostByID", params);
    // commentList.value = await getPostComment(route.query.id);
    // postinfo.value = result.data[0];
    // viewedStore.addViewed(postinfo.value);
  } catch (err) {
    console.log(err);
  }
  loading.value = false;
});
</script>

<style scoped>
.view-bar {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #808695;
  font-size: 10px;
}
.view-bar > p {
  margin-left: 5px;
}
.handle-bar {
  height: 40px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #808695;
  font-size: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f8f9;
}
.commentWrapper {
  padding: 10px 16px;
}
.commentButton {
  display: flex;
  align-items: end;
}
.handle-barn-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
