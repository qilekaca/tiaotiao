<template>
  <div>
    <van-row justify="center">
      <van-col span="22" class="cardWrapper">
        <!-- 创建者配置 -->
        <van-row
          justify="center"
          class="van-hairline--bottom"
          v-if="$route.path == '/posted'"
          @click="$emit('handlePost', post._id)"
        >
          <van-col span="22" style="height: 30px" class="delete-wrapper">
            <div>
              <van-icon name="eye-o" />
              <van-icon name="closed-eye" />
              公开、仅自己可见、仅校内可见
            </div>
            <div>
              <van-icon name="arrow-down" />
            </div>
          </van-col>
        </van-row>

        <van-row justify="center" @click="toPostInfo">
          <van-col span="22" style="margin-top: 10px; margin-bottom: 10px">
            <!-- 第一行 头像 昵称 时间 -->
            <van-row>
              <van-col span="3">
                <van-image
                  width="2.5rem"
                  height="2.5rem"
                  fit="cover"
                  radius="10"
                  :src="post.author.image"
                />
              </van-col>
              <van-col span="18">
                <p style="font-weight: 600; margin-left: 10px">
                  {{ post.author.username }}
                </p>
                <p
                  style="margin-left: 10px; van-color: #808695; font-size: 10px"
                >
                  {{ formatDate(post.createdAt) }}
                </p>
              </van-col>
              <van-col span="3">
                <van-tag
                  v-if="post.type == 'goods'"
                  type="primary"
                  size="medium"
                  >转卖</van-tag
                >
              </van-col>
            </van-row>
            <!-- 第二行 内容 图片 -->
            <van-row>
              <van-col span="24" style="margin-top: 5px">
                <p>{{ post.content }}</p>
              </van-col>
              <!-- TODO: 后期根据图片的数量设置单独的显示模式单张模式和多张模式，现统一使用三张模式 -->
              <van-col
                span="24"
                v-if="post.images.length"
                style="margin-top: 10px"
              >
                <van-space wrap :size="3">
                  <van-image
                    v-for="(imageUrl, index) in post.images"
                    lazy-load
                    width="27.2vw"
                    height="27.2vw"
                    position="center"
                    fit="cover"
                    :id="imageUrl"
                    :src="imageUrl"
                    @click.stop="
                      showImagePreview({
                        images: post.images,
                        startPosition: index,
                      })
                    "
                  />
                </van-space>
              </van-col>
            </van-row>
            <van-row v-if="post.type == 'goods'">
              <van-col
                span="24"
                style="text-align: right; color: #ee0a24; font-weight: 600"
              >
                ¥<span style="font-size: 16px">
                  {{ post.price }}
                </span>
              </van-col>
            </van-row>
            <!-- 第三行 点赞 浏览 评论 -->
            <van-row
              style="
                margin-top: 12px;
                text-align: center;
                van-color: #808695;
                font-size: 10px;
              "
            >
              <van-col span="8">
                <van-icon name="eye-o" />{{ post.viewCount }}
              </van-col>
              <van-col span="8">
                <van-icon name="star-o" />{{ post.favouritesCount }}
              </van-col>
              <van-col span="8">
                <van-icon name="comment-o" />{{ post.commentsCount }}
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script setup>
import { showImagePreview } from "vant";
import { useRouter } from "vue-router";
import { formatDate } from "../utils/common";

const props = defineProps(["post"]);
const router = useRouter();

const toPostInfo = () => {
  router.push({ path: `/postinfo/${props.post._id}` });
};
</script>

<style scoped>
.cardWrapper {
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
}
.delete-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.delete-icon {
  color: #e14d2a;
}
</style>
