<template>
  <div>
    <van-tabs sticky shrink offset-top="46" style="margin-top: 10px">
      <van-tab title="评论">
        <van-cell-group style="margin-top: 10px">
          <van-cell v-for="(comment, index) in comments" :key="comment._id">
            <div class="commentWrapper">
              <div class="left">
                <van-image
                  width="30px"
                  height="30px"
                  fit="cover"
                  radius="10px"
                  :src="comment.author.image"
                />
              </div>
              <div class="right">
                <div class="nickName">{{ comment.author.username }}</div>
                <div class="commentContent">
                  <p>{{ comment.content }}</p>
                </div>
                <div class="createTime">
                  {{ formatDate(comment.createdAt) }}
                </div>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { formatDate } from "../utils/common";

const props = defineProps(["comments"]);
</script>

<style scoped>
.commentWrapper {
  display: flex;
}
.left {
  width: 30px;
  height: 30px;
  display: flex;
}
.right {
  flex-grow: 1;
  text-align: left;
  margin-left: 10px;
}

.nickName {
  color: #323233;
  font-weight: 500;
  height: 15px;
  line-height: 15px;
  font-size: 14px;
}
.createTime {
  color: #c8c9cc;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  margin-top: 5px;
}
.commentContent {
  color: #646566;
  margin: 4px 0;
  font-size: 14px;
}
.sub-comment-wrapper {
  background-color: #f2f3f5;
  font-size: 13px;
  width: 100%;
  padding: 0 10px;
  color: #567b95;
}
</style>
