import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/my",
      name: "My",
      component: () => import("../views/My.vue"),
      // 用户进入我的页面之前判断用户是否登陆
      beforeEnter(to, from, next) {
        let isAuthenticated = false;
        if (localStorage.getItem("token")) isAuthenticated = true;
        if (!isAuthenticated) next({ name: "Login" });
        else next();
      },
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/userinfo",
      name: "UserInfo",
      component: () => import("../views/UserInfo.vue"),
    },
    {
      path: "/updateuserinfo",
      name: "updateuserinfo",
      component: () => import("../views/UpdateUserInfo.vue"),
    },
    {
      path: "/school",
      name: "school",
      component: () => import("../views/School.vue"),
    },
    {
      path: "/post",
      name: "post",
      component: () => import("../views/Post.vue"),
    },
  ],
});

// TODO: 设置路由跳转拦截
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

export default router;
