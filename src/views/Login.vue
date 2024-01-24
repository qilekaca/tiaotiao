<template>
  <div>
    <van-tabs style="margin-top: 20px" type="card">
      <van-tab title="登陆">
        <van-form style="margin-top: 20px" @submit="Login">
          <van-cell-group inset>
            <van-field
              v-model="loginUserInfo.loginUsername"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="loginUserInfo.loginPassword"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              登陆
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="注册">
        <van-form style="margin-top: 20px" @submit="Register">
          <van-cell-group inset>
            <van-field
              v-model="registerUserInfo.registerUserName"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请输入正确用户名' }]"
            />
            <van-field
              v-model="registerUserInfo.registerUserPassword"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入密码"
              :rules="[
                {
                  required: true,
                  pattern: checkPassword,
                  message: '长度至少8位且包含字母和数字',
                },
              ]"
            />
            <van-field
              v-model="registerUserInfo.reRegisterUserPassword"
              type="password"
              name="确认密码"
              label="确认密码"
              placeholder="请确认密码"
              :rules="[
                {
                  required: true,
                  validator: validatorMessage,
                  message: '两次输入不一致',
                },
              ]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
    <TabBar />
  </div>
</template>

<script setup>
import TabBar from "@/components/TabBar.vue";
import { reactive } from "vue";
import { login, register } from "@/service/user";
import { showFailToast, showNotify } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const checkPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const loginUserInfo = reactive({
  loginUsername: "",
  loginPassword: "",
});

const registerUserInfo = reactive({
  registerUserName: "",
  registerUserPassword: "",
  reRegisterUserPassword: "",
});

const validatorMessage = (val) => val == registerUserInfo.registerUserPassword;

const Login = async () => {
  const user = {
    username: loginUserInfo.loginUsername,
    password: loginUserInfo.loginPassword,
  };
  const res = await login({ user });
  // res.token
  localStorage.setItem("token", `Bearer ${res.token}`);
  // 显示登陆成功信息并跳转到我的页面
  // 刷新页面
  showNotify({ type: "success", message: "登陆成功" });
  router.replace("/my");
  setTimeout(() => {
    location.reload();
  }, 100);
  console.log("res:", res);
};

const Register = async () => {
  const user = {
    username: registerUserInfo.registerUserName,
    password: registerUserInfo.reRegisterUserPassword,
  };
  const res = await register({ user });
  console.log("res:", res);
};
</script>

<style scoped></style>
