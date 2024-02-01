<template>
  <div>
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      title="发布"
      @click-left="onClickLeft"
    />
    <van-form style="margin-top: 10px" @submit="submit">
      <van-cell-group inset>
        <!-- 内容 -->
        <van-field
          autosize
          name="content"
          v-model="content"
          type="textarea"
          :placeholder="placeholder"
          :border="false"
          :rules="[{ required: true, message: '请输入内容' }]"
        ></van-field>
        <!-- 图片 -->
        <van-field name="uploader">
          <template #input>
            <van-uploader
              v-model="fileList"
              preview-size="25vw"
              multiple
              :max-count="3"
              :after-read="afterRead"
              :before-delete="beforeDelete"
            />
          </template>
        </van-field>
        <!-- 价格 -->
        <van-field
          v-if="route.query.type == 'goods'"
          name="price"
          v-model="price"
          type="number"
          label="价格"
          placeholder="请输入价格"
          left-icon="gold-coin-o"
          input-align="right"
          :rules="[{ required: true, message: '请输入价格' }]"
        ></van-field>
      </van-cell-group>
      <!-- 发布 -->
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showLoadingToast, closeToast } from "vant";
import { getCurrentUser } from "../service/user";
import { uploadImage, deleteImage } from "../service/file";
import { createPost } from "../service/post";

const user = ref({});
const placeholder = ref("");
const price = ref();
const fileList = ref([]);
const content = ref("");
const route = useRoute();
const router = useRouter();

const onClickLeft = () => history.back();

onMounted(async () => {
  if (route.query.type == "goods") {
    placeholder.value = "买家都关心品牌型号、入手渠道、转手原因...";
  } else {
    placeholder.value = "描述一下有什么好玩的";
  }
  const userinfo = await getCurrentUser();
  user.value = userinfo;
});

const afterRead = async (file) => {
  if (Array.isArray(file)) {
    file.map(async (file) => {
      file.status = "uploading";
      const res = await uploadImage({ file });
      console.log(res);
      if (res.err) {
        file.status = "failed";
      }
      file.status = "done";
      file.objectUrl = `https://${res.data.Location}`;
    });
  } else {
    file.status = "uploading";
    const res = await uploadImage({ file });
    console.log(res);
    if (res.err) {
      file.status = "failed";
    }
    file.status = "done";
    file.objectUrl = `https://${res.data.Location}`;
  }
};

const beforeDelete = async (file) => {
  const res = await deleteImage(file.objectUrl.split("/")[3]);
  if (!res.err) {
    console.log("删除成功");
    return true;
  } else {
    console.log("删除失败");
    return false;
  }
};

const submit = async (form) => {
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: "上传中",
  });

  const post = {
    type: route.query.type,
    content: form.content,
    price: form.price ? form.price : 0,
  };

  if (fileList.value.length) {
    post.images = fileList.value.map((file) => file.objectUrl);
  }

  const res = await createPost({ post });

  console.log(res);

  closeToast();
  router.replace("/home");
};
</script>

<style scoped></style>
