<template>
  <div>
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      title="详细信息"
      left-text="返回"
      @click-left="onClickLeft"
    />
    <van-row justify="center">
      <van-col span="22">
        <!-- 头像、昵称、创建时间 -->
        <van-row style="margin-top: 10px">
          <van-col span="3">
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
          <van-col span="18">
            <van-skeleton title :row="2" :loading="loading">
              <p style="font-weight: 600; color: #323233">
                {{ postinfo.author.username }}
              </p>
              <p style="color: #969799; font-size: 10px">
                {{ formatDate(postinfo.createdAt) }}
              </p>
            </van-skeleton>
          </van-col>
          <van-col span="3">
            <van-tag
              v-if="postinfo.type == 'goods'"
              type="primary"
              size="medium"
              >转卖</van-tag
            >
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

        <van-row v-if="postinfo.type == 'goods'">
          <van-col
            span="24"
            style="text-align: right; color: #ee0a24; font-weight: 600"
          >
            ¥<span style="font-size: 16px">
              {{ postinfo.price }}
            </span>
          </van-col>
        </van-row>

        <!-- 数据展示 -->
        <van-row
          class="van-hairline--bottom van-hairline--top"
          style="margin-top: 10px"
        >
          <van-skeleton title :loading="loading">
            <van-col span="8" class="view-bar">
              <van-icon name="eye-o" size="large" />
              <p>{{ postinfo.viewCount }}</p>
            </van-col>
            <van-col span="8" class="view-bar">
              <van-icon name="star-o" size="large" />
              <p>{{ postinfo.favouritesCount }}</p>
            </van-col>
            <van-col span="8" class="view-bar">
              <van-icon name="comment-o" size="large" />
              <p>{{ postinfo.commentsCount }}</p>
            </van-col>
          </van-skeleton>
        </van-row>
      </van-col>
    </van-row>
    <!-- 评论列表 -->
    <CommentList v-if="commentList?.length" :comments="commentList" />

    <!-- 操作栏 -->
    <van-row class="van-hairline--bottom van-hairline--top handle-bar">
      <van-col
        span="12"
        class="handle-barn-item"
        style="border-right: 1px solid #dcdee0"
        @click="handleCollection(postinfo._id)"
      >
        <van-icon
          v-if="checkIfCollection"
          name="star"
          color="#1989fa"
          size="large"
        />
        <van-icon v-else name="star-o" size="large" />
        <p style="margin-left: 5px">收藏</p>
      </van-col>
      <van-col span="12" class="handle-barn-item" @click="handleComment">
        <van-icon name="comment-o" size="large" />
        <p style="margin-left: 5px">评论</p>
      </van-col>
    </van-row>
    <!-- 输入框 -->
    <van-popup
      :show="showInput"
      position="bottom"
      :style="{ height: keyBoardHeight }"
      @click-overlay="onClickOverlay"
    >
      <van-sticky position="top">
        <van-field
          v-model="commentContent"
          rows="2"
          autosize
          type="textarea"
          label-align="center"
          ref="input"
          class="commentWrapper"
          :placeholder="placeholder"
        >
          <template #extra>
            <div class="commentvan-button" v-show="commentContent">
              <van-button size="mini" type="primary" @click="postComment">
                发送
              </van-button>
            </div>
          </template>
        </van-field>
      </van-sticky>
    </van-popup>
    <!-- 占位 -->
    <div style="height: 80px"></div>
  </div>
</template>

<script setup>
import { showImagePreview, showConfirmDialog } from "vant";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, nextTick, watch } from "vue";
import { getPost } from "../service/post";
import { formatDate } from "../utils/common";
import { getCurrentUser, addCollection } from "../service/user";
import CommentList from "../components/CommentList.vue";
import { useUserStore } from "../stores/user";
import {
  getPostComment,
  createPostComment,
  deletePostComment,
} from "../service/post";

const route = useRoute();
const router = useRouter();
const postinfo = ref({});
const loading = ref(true);
const commentList = ref([]);
const commentContent = ref("");
const placeholder = ref("请输入评论");
const showInput = ref(false);
const keyBoardHeight = ref();
const input = ref(null);
const checkIfCollection = ref(false);
const userStore = useUserStore();

const onClickLeft = () => history.back();

onMounted(async () => {
  try {
    if (userStore.token) {
      getCurrentUser()
        .then((user) => {
          if (user) {
            userStore.user = user;
            checkIfCollection.value = user.collections.includes(
              route.params.postid
            );
          }
        })
        .catch((err) => {
          checkIfCollection.value = false;
        });
    }
    postinfo.value = await getPost(route.params.postid);
    const { comments } = await getPostComment(route.params.postid);
    commentList.value = comments;
  } catch (err) {
    console.log(err);
  }
  loading.value = false;
});

watch(
  () => commentContent.value,
  () => {
    // 每次增加一行的高度
    keyBoardHeight.value =
      window.innerHeight -
      window.visualViewport.height +
      input.value.$el.clientHeight +
      24 +
      "px";
    console.log(keyBoardHeight.value);
  }
);

const onClickOverlay = () => {
  // 清空输入框
  commentContent.value = "";
  placeholder.value = "请输入评论";
  showInput.value = !showInput.value;
};

const handleComment = async () => {
  try {
    await getCurrentUser();
    placeholder.value = "请输入评论";
    showInput.value = !showInput.value;
    // 获取更新之后的DOM
    await nextTick();
    input.value.focus();
    keyBoardHeight.value =
      window.innerHeight -
      window.visualViewport.height +
      input.value.$el.clientHeight +
      24 +
      "px";
    console.log(keyBoardHeight.value);
  } catch (error) {
    showConfirmDialog({
      message: "登陆后才能评论哦！！",
      confirmButtonText: "登陆",
    }).then(() => {
      router.replace("/login");
    });
  }
};

const handleCollection = async (postid) => {
  try {
    const res = await addCollection(postid);
    checkIfCollection.value = !res.checkIfCollection;
    postinfo.value = await getPost(route.params.postid);
    console.log(res);
  } catch (error) {
    showConfirmDialog({
      message: "登陆后才能收藏哦！！",
      confirmButtonText: "登陆",
    }).then(() => {
      router.replace("/login");
    });
  }
};

const postComment = async () => {
  const { comments } = await createPostComment(route.params.postid, {
    content: commentContent.value,
  });
  postinfo.value = await getPost(route.params.postid);
  console.log(comments);
  commentList.value = comments;
  showInput.value = !showInput.value;
  commentContent.value = "";
};
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
.commentvan-button {
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
