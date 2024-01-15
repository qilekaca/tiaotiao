import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

// export const useUserStore = defineStore("user", {
//   state: () => {
//     return {
//       userInfo: {
//         uid: "",
//         loginType: "",
//         openid: "",
//         wxOpenId: "",
//         wxPublicId: "",
//         unionId: "",
//         qqMiniOpenId: "",
//         email: "",
//         hasPassword: false,
//         customUserId: "",
//         nickName: "",
//         gender: "",
//         avatarUrl: "",
//         phone: "",
//         username: "",
//         location: { country: "", province: "", city: "" },
//       },
//     };
//   },

//   actions: {
//     setUserInfo(userInfo) {
//       this.userInfo = userInfo;
//     },
//   },
// });

// export const useViewedStore = defineStore("viewed", {
//   persist: true,
//   state: () => {
//     return {
//       viewedList: [],
//     };
//   },

//   actions: {
//     addViewed(post) {
//       if (this.viewedList.some((e) => e._id === post._id)) {
//         console.log("存在历史记录");
//       } else {
//         console.log("不在历史记录");
//         this.viewedList.unshift(post);
//       }
//     },
//   },
// });
