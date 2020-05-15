<template>
  <div class="renzheng-wrapper">
    <headerLink :isShowLoginBtn="isShowLoginBtn" />
    <div class="step-wrapper">
      <el-steps :active="acitiveStep" simple>
        <el-step title="注册/登录账号"></el-step>
        <el-step title="填写基本资料"></el-step>
        <el-step title="提交资质证明"></el-step>
        <el-step title="提交完成"></el-step>
      </el-steps>
    </div>
    <!-- nav -->
    <div>
      <!-- 第一步 -->
      <div class="tab-wrapper" v-show="acitiveStep === 1 && acitiveTab !== 3">
        <span :class="{active: acitiveTab == 1}" @click="handleClick(1)">注册账号</span>
        <span :class="{active: acitiveTab == 2}" @click="handleClick(2)">已有账号</span>
        <!-- acitiveTab === 3 : 账号还未设置密码 -->
      </div>
      <register v-show="acitiveTab == 1 && acitiveStep === 1" @nextStep="nextStep" />
      <login v-show="acitiveTab == 2 && acitiveStep === 1" @nextStep="nextStep" @nextTab="nextTab" />
      <setPsd
        v-show="acitiveTab == 3 && acitiveStep === 1"
        @nextStep="nextStep"
        @nextTab="nextTab"
      />
      <!-- 第二步 -->
      <!-- <material v-show="acitiveStep === 2" @nextStep="nextStep" @setData="setData" ref="material" /> -->

      <tops v-show="acitiveStep === 2" @nextStep="nextStep" @setData="setData" ref="top" />
      <!-- <top v-show="acitiveStep === 2" @nextStep="nextStep" @setData="setData" ref="top" /> -->
      <!-- 第三步 -->
      <!-- <qualification
        v-show="acitiveStep === 3"
        @nextStep="nextStep"
        @setData="setData"
        ref="qualification"
      />-->
      <doctorCer
        v-show="acitiveStep === 3"
        @nextStep="nextStep"
        @setData="setData"
        ref="doctorCer"
      />
      <!-- <bottom v-show="acitiveStep === 3" @nextStep="nextStep" @setData="setData" ref="doctorCer" /> -->
      <!-- 第四步 -->
      <finish v-show="acitiveStep === 4" @nextStep="nextStep" @setData="setData" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import register from "./component/register";
import login from "./component/login";
import setPsd from "./component/setPsd";
// import material from "./component/material";
// import qualification from "./component/qualification";
import doctorCer from "./component/doctorCer";
import top from "./component/top-copy";
import tops from "./component/top";
import bottom from "./component/bottom";
import headerLink from "./component/header.vue";
import Api from "@/api/index.js";
import { debuglog } from "util";
import finish from "./component/finish.vue";

import format from "date-fns/format";

import cityData from "./component/city.js";

export default {
  name: "home",
  components: {
    register,
    // material,
    // qualification,
    headerLink,
    finish,
    login,
    setPsd,
    bottom,
    tops,
    doctorCer,
    top
  },
  data() {
    return {
      headerIndex: "1",
      navIndex: 0,
      acitiveTab: 1,
      acitiveStep: 1,
      topData: {},
      doctorCerData: {},
      detailData: {},
      type: "add"
    };
  },
  computed: {
    isShowLoginBtn() {
      if (this.acitiveStep === 1 || this.acitiveStep === 4) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if (this.$route.query.type === "edit") {
      this.type = this.$route.query.type;
      this.getInitData();
    }

    if (this.$route.query.acitiveStep) {
      this.acitiveStep = Number(this.$route.query.acitiveStep);
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.acitiveStep) {
        this.acitiveStep = this.$route.query.acitiveStep;
      }
    }
  },
  methods: {
    // 头部切换
    handleSelect() {},
    // nav切换
    handleClick(item, index) {
      this.acitiveTab = item;
    },
    // 下一步
    nextStep(step) {
      console.log(step);
      this.acitiveStep = step;
    },
    // 下一个tab
    nextTab(tab) {
      this.acitiveTab = tab;
    },
    // 拒绝后获取初始数据
    getInitData() {
      Api.findHospitalDetail({})
        .then(res => {
          console.log(res.data, 123);
          if (res && res.status === 200) {
            // console.log(res.data);
            this.detailData = res.data;
            const {
              fullName,
              gender,
              country,
              occupationTitle,
              time,
              portrait,
              telephone,
              mailbox,
              // 执业证
              certificateOfPractice,
              // 个人介绍
              introduction,
              // 案例
              caseDiagram,
              // 营业执照
              qualifications,
              // 机构许可证
              otherCertificate,
              beGoodAte
            } = res.data;
            let _time = format(time, "YYYY-MM-DD");

            let obj1 = {
              fullName,
              gender,
              country,
              occupationTitle,
              time,
              portrait,
              time: _time,
              telephone,
              mailbox,
              beGoodAte
              // imgUrl:hospitalLog
            };
            let obj2 = {
              introduction,
              caseDiagram,

              qualifications,
              certificateOfPractice,
              otherCertificate
            };
            this.$refs.top.formData = obj1;
            this.$refs.top.imgUrl = portrait;
            this.$refs.doctorCer.formData1 = obj2;
            // console.log(this.$refs.doctorCer.caseDiagramFile);
            // 案例
            caseDiagram.forEach((item, index) => {
              this.$refs.doctorCer.caseDiagramFile.push({ adress: item });
            });
            introduction.forEach((item, index) => {
              this.$refs.doctorCer.introductionFile.push({ adress: item });
            });
            qualifications.forEach((item, index) => {
              this.$refs.doctorCer.qualificationsFile.push({ adress: item });
            });
            certificateOfPractice.forEach((item, index) => {
              this.$refs.doctorCer.certificateOfPracticeFile.push({ adress: item });
            });
            otherCertificate.forEach((item, index) => {
              this.$refs.doctorCer.otherCertificateFile.push({ adress: item });
            });
          }
        })
        .catch(error => {});
    },

    login() {
      let param = {};
      Api.hospitalLogin(params)
        .then(res => {
          this.disabled = false;
          if (res && res.data && res.data.result) {
            // 设置token
            // let _user = {
            // 	isRem: _remember_me,
            // 	token: res['headers']['x-auth-token'],
            // 	userAccount: res.data.sub
            // }
            // this.$store.dispatch('setToken', _user)
            // this.$store.dispatch('setUser', _user)
            // this.$store.dispatch('setIsRem',_remember_me)
            // this.$store.dispatch('setAuthorties',res.data.authorities)
            this.$router.push({ path: "/home" });
            // if(localStorage.getItem('uid') !== null){
            // 	localStorage.removeItem('uid');
            // }
            // localStorage.setItem('uid',res.data.uid);
          } else {
            this.$message({
              message: "登录失败",
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.disabled = false;
        });
    },
    onSubmit() {
      console.log(this.doctorCerData);
      let obj = {};
      obj.certificateOfPractice = [];
      this.doctorCerData.certificateOfPracticeFile.forEach(item => {
        obj.certificateOfPractice.push(item.adress);
      });
      obj.caseDiagram = [];
      this.doctorCerData.caseDiagramFile.forEach(item => {
        obj.caseDiagram.push(item.adress);
      });
      obj.introduction = [];
      this.doctorCerData.introductionFile.forEach(item => {
        obj.introduction.push(item.adress);
      });
      obj.otherCertificate = [];
      this.doctorCerData.otherCertificateFile.forEach(item => {
        obj.otherCertificate.push(item.adress);
      });
      obj.qualifications = [];
      this.doctorCerData.qualificationsFile.forEach(item => {
        obj.qualifications.push(item.adress);
      });

      let obj2 = {};
      obj2.certificateOfPracticeFile = [];
      this.doctorCerData.certificateOfPracticeFile.forEach(item => {
        obj2.certificateOfPracticeFile.push(item.file);
      });
      obj2.caseDiagramFile = [];
      this.doctorCerData.caseDiagramFile.forEach(item => {
        obj2.caseDiagramFile.push(item.file);
      });
      obj2.introductionFile = [];
      this.doctorCerData.introductionFile.forEach(item => {
        obj2.introductionFile.push(item.file);
      });
      obj2.otherCertificateFile = [];
      this.doctorCerData.otherCertificateFile.forEach(item => {
        obj2.otherCertificateFile.push(item.file);
      });
      obj2.qualificationsFile = [];
      this.doctorCerData.qualificationsFile.forEach(item => {
        obj2.qualificationsFile.push(item.file);
      });
      // obj2.certificateOfPracticeFile = this.doctorCerData.certificateOfPracticeFile.file;
      // obj2.caseDiagramFile = this.doctorCerData.caseDiagramFile.file;
      // obj2.introductionFile = this.doctorCerData.introductionFile.file;
      // obj2.otherCertificateFile = this.doctorCerData.otherCertificateFile.file;
      // obj2.qualificationsFile = this.doctorCerData.qualificationsFile.file;
      let params = {
        ...this.topData,
        ...obj
      };
      let paramsObj = {
        ...this.topData,
        ...obj2
      };
      console.log(paramsObj);
      // 处理数据
      let arr = [];
      let files = [
        "certificateOfPracticeFile",
        "qualificationsFile",
        "caseDiagramFile",
        "otherCertificateFile",
        "introductionFile"
      ];
      for (let p in paramsObj) {
        if (files.includes(p)) {
          paramsObj[p].forEach(val => {
            arr.push({ [p]: val });
          });
        } else {
          arr.push({ [p]: paramsObj[p] });
        }
      }
      // params.city = params.city[params.city.length - 1];

      console.log(params, arr);
      this.$refs.doctorCer.disabled = true;
      if (this.type === "edit") {
        Api.updateHospital(params)
          .then(res => {
            this.$refs.doctorCer.disabled = false;
            console.log(res, "res");
            if (res && res.data && res.data.result === 500) {
              this.$message({
                message: "不能重复认证",
                type: "warning"
              });
              return;
            }
            if (res && res.data && res.data.result) {
              this.$router.push({
                path: "/renzheng",
                query: {
                  acitiveStep: 4
                }
              });
              // this.acitiveStep = 4;
              this.$message({
                message: "申请成功",
                type: "success"
              });
            }
          })
          .catch(error => {
            this.disabled = false;
          });
      } else {
        Api.insertAuthenticationHospital(arr)
          .then(res => {
            this.$refs.doctorCer.disabled = false;
            console.log(res, "res");
            if (res && res.data && res.data.result === 500) {
              this.$message({
                message: "不能重复认证",
                type: "warning"
              });
              return;
            }
            if (res && res.data && res.data.result) {
              this.acitiveStep = 4;
              this.$message({
                message: "申请成功",
                type: "success"
              });
            }
          })
          .catch(error => {
            this.disabled = false;
          });
      }
    },
    insertAuth() {},
    setData(obj, type) {
      for (let i in obj) {
        this[i] = obj[i];
      }
      if (type === 3) {
        this.onSubmit();
      }
      console.log(this, "hhh");
    }
    // insertAuthenticationHospital
  }
};
</script>
<style lang='less' scoped>
.step-wrapper {
  width: 1000px;
  margin: 0 auto;
  padding-top: 45px;
}

.tab-wrapper {
  width: 400px;
  margin: 0 auto;
  padding: 55px 0 40px 0;
  color: #282828;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  > span {
    color: #686868;
    cursor: pointer;
    display: inline-block;
  }
  .active {
    position: relative;
    &::before {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      height: 4px;
      background: rgba(102, 200, 207, 1);
      content: "";
    }
  }
}
</style>



