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
import { updateUser } from "@/service/user";
import { getSchool } from "@/service/school";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

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
  user.value = userStore.user;
  if (userStore.user.city) {
    const list = await getSchool(userStore.user.city);
    console.log(list);
    schoolList.value = list.data;
  }
});

const setCity = async ({ selectedOptions }) => {
  city.value = selectedOptions[1].text;

  if (city.value != userStore.user.city) {
    const list = await getSchool(city.value);
    console.log(list);
    schoolList.value = list.data;
  }

  if (city.value != userStore.user.city) {
    const userinfo = await updateUser({ user: { city: city.value } });
    userStore.user = userinfo;
    user.value = userStore.user;
    console.log(userStore.user);
  }

  showCity.value = !showCity;
};

const setSchool = async ({ selectedIndexes }) => {
  school.value = schoolList.value[selectedIndexes[0]].school;
  console.log(school.value);

  if (school.value != userStore.user.school) {
    const userinfo = await updateUser({ user: { school: school.value } });
    userStore.user = userinfo;
    user.value = userStore.user;
    console.log(userStore.user);
  }

  showSchool.value = !showSchool;
};
</script>

<style scoped></style>
