<template>
  <div>
    <van-tabs :active="active" :before-change="beforeChange">
      <van-tab
        v-for="item of itemType"
        :name="item.name"
        :title="item.title"
        :key="item.title"
      >
        <h1 v-for="post in list" :key="post">{{ post }}</h1>
        <!-- <Card></Card> -->
      </van-tab>
    </van-tabs>
    <TabBar />
    <!-- <van-uploader v-model="fileList" multiple :max-count="3" /> -->
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getPostsOutCollege } from "@/service/post";
import Card from "@/components/Card.vue";
import TabBar from "@/components/TabBar.vue";
import { uploadImage } from "@/service/post";

const active = ref("OutCollegeList");

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

const list = ref([]);
const fileList = ref([]);

// const afterRead = async (file) => {
//   const res = await uploadImage({
//     data: file.content,
//     contentType: file.file.type,
//   });
//   console.log(res);
// };

const beforeChange = async (name) => {
  console.log(name);
  active.value = name;
  //   list.value = [];
  if (name === "OutCollegeList") {
    const res = await getPostsOutCollege();
    console.log(res);
  } else {
    list.value = [1, 2, 3];
  }
};
</script>

<style scoped></style>
