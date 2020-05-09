import Vue from "vue";
import Router from "vue-router";
import Wrapper from "./views/Wrapper.vue";

// 登录
import Login from "./views/login.vue";
// 用户管理
// import UserUsers from "./views/user/users/index.vue";
// ======手术管理
// import OperationIndex from "./views/operation/index.vue";
// const OperationAdd = () => import("./views/operation/add.vue");
// const OperationDetail = () => import("./views/operation/detail.vue");
// =====内容管理
// 入驻审核
// import DoctorApply from "./views/doctor/apply/index.vue";
// import DoctorApplyDetail from "./views/doctor/applyDetail/index.vue";
// // 邀请入驻
// import DoctorInvite from "./views/doctor/invite/index.vue";
// import DoctorInviteDetail from "./views/doctor/invite/detail.vue";
// const DoctorInviteDetail = () => import("./views/doctor/invite/detail.vue");
// 医生管理
// import DoctorDoctors from "./views/doctor/doctors/index.vue";
// const DoctordoctorsDetail = () => import("./views/doctor/doctors/detail.vue");
// =========资料设置
// import MaterialIndex from "./views/material/index.vue";
// =========财务管理
// import FinancialIndex from "./views/financial/index.vue";
// const FinancialSetAli = () => import("./views/financial/setAli.vue");
// const AliWithdraw = () => import("./views/financial/aliWithdraw.vue");

// =========实地照片
// import PictureIndex from "./views/picture/index.vue";
// 认证处理
// import authIndex from "./views/auth/index.vue";
import authDetail from "./views/auth/detail.vue";

// 认证流程
import renzhengIndex from "./views/renzheng/index.vue";
import resultIndex from "./views/result/index.vue";

// 修改密码
// import modifyPsd from "./views/modifyPsd/index.vue";

// 订单管理
import OrderIndex from "./views/order/index.vue";
// =====美购商品
import GoodsUpload from "./views/goods/goodUpload.vue";
import GoodsManage from "./views/goods/goodsManage.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      hidden: true
    },
    {
      path: "/login",
      name: "登录",
      hidden: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/login.vue")
    },
    {
      path: "/forgetPsd",
      name: "忘记密码",
      hidden: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/forgetPsd/index.vue")
    },
    // code
    {
      path: "/doctor",
      name: "医生管理",
      isPull: true,
      component: Wrapper,
      icon: "iconyisheng1a",
      children: [
        {
          path: "perInformation",
          name: "个人信息",
          component: () => import("./views/doctor/perInformation.vue")
        },
        {
          path: "perInformation/edit",
          name: "个人信息修改",
          component: () => import("./views/doctor/editInfo.vue"),
          hidden: true
        },
        {
          path: "coopOrganization",
          name: "合作机构",
          component: () => import("./views/doctor/CoopOrganization.vue")
        }
        // {
        //   // 当 /user/:id/profile 匹配成功，
        //   // UserProfile 会被渲染在 User 的 <router-view> 中
        //   path: "doctorApply",
        //   name: "入驻审核",
        //   component: DoctorApply,
        // },
        // {
        //   path: "doctors",
        //   name: "医生管理",
        //   component: DoctorDoctors
        // },
        // {
        //   path: "invite",
        //   name: "邀请入驻",
        //   component: DoctorInvite
        // },
        // {
        //   path: "invite/detail",
        //   name: "邀请入驻详情",
        //   component: DoctorInviteDetail,
        //   hidden: true
        // },

        // {
        //   path: "doctors/detail",
        //   name: "医生",
        //   component: DoctordoctorsDetail,
        //   hidden: true
        // },
        // {
        //   // 当 /user/:id/profile 匹配成功，
        //   // UserProfile 会被渲染在 User 的 <router-view> 中
        //   path: "doctorApply/detail",
        //   name: "入驻审核详情",
        //   hidden: true,
        //   component: DoctorApplyDetail
        // }
      ]
    },
    {
      path: "/goods",
      name: "项目管理",
      isPull: true,
      component: Wrapper,
      icon: "icongouwu",
      children: [
        {
          path: "goodsUpload",
          name: "发布项目",
          component: GoodsUpload
        },
        {
          path: "goodsManage/edit",
          name: "商品修改",
          component: GoodsUpload,
          hidden: true
        },
        {
          path: "goodsManage/detail",
          name: "商品详情",
          component: () => import(/* webpackChunkName: "about" */ "./views/goods/goodsDetail.vue"),
          hidden: true
        },
        {
          path: "goodsManage",
          name: "项目管理",
          component: GoodsManage
        }
      ]
    },

    {
      path: "/order",
      name: "订单管理",
      isPull: false,
      component: Wrapper,
      icon: "icondingd",
      children: [
        // {
        // 	path: 'exam',
        // 	name: '商品审核',
        // 	component: ProductsExam
        // },
        {
          path: "index",
          name: "订单",
          component: OrderIndex
        },
        {
          path: "index/detail",
          name: "订单详情",
          component: () => import(/* webpackChunkName: "about" */ "./views/order/indexDetail.vue"),
          hidden: true
        },
        {
          path: "index/sendGoodDetail",
          name: "退换货详情",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/order/sendGoodDetail.vue"),
          hidden: true
        }
      ]
    },
    {
      path: "/accountNumber",
      name: "账号设置",
      isPull: true,
      component: Wrapper,
      icon: "iconyonghgl",
      children: [
        {
          path: "information",
          name: "账号信息",
          component: () => import("./views/accountNumber/information.vue")
        },
        {
          path: "settingPsw",
          name: "设置密码",
          component: () => import("./views/accountNumber/settingPsw.vue")
        },
        {
          path: "information/deposit",
          name: "提现",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/accountNumber/deposit.vue"),
          hidden: true
        }
      ]
    },
    {
      path: "/notice",
      name: "消息",
      isPull: false,
      hidden: true,
      component: Wrapper,
      children: [
        {
          path: "msgNotice",
          hidden: true,
          component: () => import("./views/notice/notice.vue")
        }
      ]
    },
    // {
    //   path: "/financial",
    //   name: "财务管理",
    //   icon: "iconcaiwu",
    //   component: Wrapper,
    //   children: [
    //     {
    //       path: "index",
    //       name: "普通用户管理",
    //       component: FinancialIndex,
    //     },
    //     {
    //       path: "setAli",
    //       name: "设置支付宝",
    //       hidden: true,
    //       component: FinancialSetAli,
    //       // component: () =>
    //       //   import(/* webpackChunkName: "about" */ "./views/auth/detail.vue")
    //     },
    //     {
    //       path: "aliWithdraw",
    //       name: "提现至支付宝",
    //       hidden: true,
    //       component: AliWithdraw,
    //       // component: () =>
    //       //   import(/* webpackChunkName: "about" */ "./views/auth/detail.vue")
    //     },
    //   ],
    // },

    // {
    //   path: "/operation",
    //   name: "机构设置",
    //   isPull: true,
    //   component: Wrapper,
    //   icon: "iconshoushu",
    //   children: [
    //     {
    //       path: "material",
    //       name: "资料设置",
    //       component: MaterialIndex,
    //     },
    //     {
    //       path: "index",
    //       name: "手术室管理",
    //       component: OperationIndex,
    //     },
    //     {
    //       path: "add",
    //       name: "添加手术室",
    //       component: OperationAdd,
    //     },
    //     {
    //       path: "edit",
    //       name: "编辑手术室",
    //       component: OperationAdd,
    //       hidden: true,
    //     },
    //     {
    //       path: "detail",
    //       name: "手术室详情",
    //       component: OperationDetail,
    //       hidden: true,
    //     },
    //   ],
    // },

    // {
    //   path: "/yunying",
    //   name: "运营管理",
    //   icon: "iconcaiwu",
    //   isPull: true,
    //   component: Wrapper,
    //   children: [
    //     {
    //       path: "picture",
    //       name: "实地照片管理",
    //       component: PictureIndex,
    //     },
    //   ],
    // },

    // {
    //   path: "/modifyPsd",
    //   name: "修改密码",
    //   icon: "iconsuo1",
    //   component: modifyPsd,
    // },
    // {
    // path: "/auth",
    // name: "认证处理",
    // icon: "iconrenzheng1",
    // hidden: false,
    // component: Wrapper,
    // children: [
    // {
    //   path: "authIndex",
    //   name: "普通用户管理",
    //   component: authIndex
    // },
    // {
    //   path: "authDetail",
    //   name: "认证详情",
    //   hidden: false,
    //   component: authDetail
    //   // component: () =>
    //   //   import(/* webpackChunkName: "about" */ "./views/auth/detail.vue")
    // }
    // ]
    // },
    {
      path: "/renzheng",
      name: "zhengreng",
      hidden: true,
      component: renzhengIndex
    },
    {
      path: "/result",
      name: "result",
      hidden: true,
      component: resultIndex
    }
  ]
});
