import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import { getCurrentUser } from "../service/user";

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
      async beforeEnter(to, from, next) {
        let isAuthenticated = false;
        const userStore = useUserStore();
        if (userStore.token) {
          const user = await getCurrentUser();
          if (user) {
            isAuthenticated = true;
          }
        }
        if (!isAuthenticated) {
          userStore.user = {};
          userStore.token = "";
          next({ name: "Login" });
        } else next();
      },
    },
    {
      path: "/home",
      name: "Home",
      meta: { keepAlive: true },
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
    {
      path: "/posted",
      name: "posted",
      component: () => import("../views/Posted.vue"),
    },
    {
      path: "/postinfo/:postid",
      name: "postinfo",
      component: () => import("../views/PostInfo.vue"),
    },
    {
      path: "/collection/:userid",
      name: "Collection",
      component: () => import("../views/Collection.vue"),
    },
  ],
});

// TODO: 设置路由跳转拦截
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

export default router;
