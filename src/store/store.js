import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户信息
    userData: {},
    // 消息通知
    noticeData: 0
  },
  mutations: {
    SETUSERDATA(state, payload) {
      // localDb.set('isRem',payload)
      state.userData = payload;
    },
    SETNOTICEDATA(state, payload) {
      console.log(payload);
      state.noticeData = payload;
    }
  },
  actions: {
    setUserData(context, payload) {
      context.commit("SETUSERDATA", payload);
    },
    setNoticeData(context, payload) {
      context.commit("SETNOTICEDATA", payload);
    }
  }
});
