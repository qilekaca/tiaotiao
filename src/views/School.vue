<template>
  <div>
    <van-nav-bar
      fixed
      placeholder
      left-arrow
      title="学校列表"
      @click-left="onClickLeft"
    />
    <van-cell-group style="margin-top: 20px">
      <van-cell
        title="城市"
        :value="user.city ? user.city : city"
        @click="showCity = !showCity"
      />
      <van-cell
        title="学校"
        :value="user.school ? user.school : school"
        @click="showSchool = !showSchool"
      />
    </van-cell-group>
    <!-- 选择城市 -->
    <van-popup
      :show="showCity"
      position="bottom"
      @click-overlay="showCity = !showCity"
    >
      <van-area
        title="城市"
        :area-list="areaList"
        :columns-num="2"
        @cancel="showCity = !showCity"
        @confirm="setCity"
      />
    </van-popup>

    <!-- 选择学校 -->
    <van-popup
      :show="showSchool"
      position="bottom"
      @click-overlay="showSchool = !showSchool"
    >
      <van-picker
        title="学校"
        :columns="schoolList"
        :columns-field-names="customFieldName"
        @cancel="showSchool = !showSchool"
        @confirm="setSchool"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { areaList } from "@vant/area-data";
import { getCurrentUser, updateUser } from "@/service/user";
import { getSchool } from "@/service/school";

const user = ref({});
const city = ref("请选择");
const school = ref("请选择");
const schoolList = ref([]);
const showCity = ref(false);
const showSchool = ref(false);

const customFieldName = {
  text: "school",
  value: "school",
};

const onClickLeft = () => history.back();

onMounted(async () => {
  // 先获取用户信息
  const userinfo = await getCurrentUser();
  user.value = userinfo;
  if (user.value.city) {
    const list = await getSchool(user.value.city);
    console.log(list);
    schoolList.value = list.data;
  }
  console.log(userinfo);
});

const setCity = async ({ selectedOptions }) => {
  city.value = selectedOptions[1].text;
  // 获取学校列表
  if (city.value != user.value.city) {
    const list = await getSchool(city.value);
    console.log(list);
    schoolList.value = list.data;
  }
  // 更新用户信息
  if (city.value != user.value.city) {
    const userinfo = await updateUser({ user: { city: city.value } });
    user.value = userinfo;
    console.log(userinfo);
  }
  showCity.value = !showCity;
};

const setSchool = async ({ selectedIndexes }) => {
  school.value = schoolList.value[selectedIndexes[0]].school;
  console.log(school.value);
  if (school.value != user.value.school) {
    const userinfo = await updateUser({ user: { school: school.value } });
    console.log(userinfo);
    user.value = userinfo;
  }
  showSchool.value = !showSchool;
};
</script>

<style scoped></style>
