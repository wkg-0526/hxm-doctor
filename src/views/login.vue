<template>
  <div class="login-wrapper">
    <div class="login-main">
      <div class="login-left">
        <div class="login-left-main">
          <div>
            <img src="../assets/images/logo3.png" alt="logo" />
          </div>
          <div class="title">医美邦</div>
          <div class="text">医生后台登录入口</div>
        </div>
      </div>
      <div class="login-right">
        <div class="title">医生账号密码登录</div>
        <div class="login-form">
          <el-form labelPosition="top" :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="userAccount">
              <el-input
                :class="['login-input',loginForm.userAccount.length > 0 && 'login-input-white']"
                placeholder="请输入账号"
                :maxlength="m20"
                v-model="loginForm.userAccount"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
              <el-input
                class="login-input"
                @keyup.enter="submitForm"
                placeholder="请输入密码"
                type="password"
                :maxlength="m14"
                v-model="loginForm.userPassword"
                clearable
              />
            </el-form-item>
          </el-form>
          <div class="login-btn">
            <el-button :disabled="disabled" class="footer-btn" @click="submitForm" round>登录</el-button>
          </div>
          <el-row class="extra-btn">
            <!-- <el-col :span="12">
              <span class="link" @click="toForgetPsd">忘记密码?</span>
            </el-col>-->
            <el-col :span="24" :style="{textAlign: 'right'}">
              <span class="link" @click="toRenZheng">认证入口</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapState, mapActions, mapGetter } from "vuex";
import Api from "../api/index.js";
import BgUrl from "@/assets/images/bg.png";
export default {
  name: "login",
  components: {
    // HelloWorld
  },
  data() {
    // 校验用户名
    let verifyUserName = function(rule, value, callback) {
      let val = value;
      if (!val) {
        callback("请输入用户名");
      } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/.test(val)) {
        // callback('用户名仅支持2-20位中英文、数字和下划线  ');
        callback();
      } else {
        callback();
      }
    };
    // 校验密码
    let verifyPassWord = function(rule, value, callback) {
      let val = value;
      if (!val) {
        callback("请输入密码");
      } else if (!/^[a-zA-Z0-9_!@#$%^&*()_+]{6,14}$/.test(val)) {
        callback();
        // callback('密码仅支持6-14位大小写字母，数字和标点符号');
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userAccount: "",
        userPassword: ""
      },
      BgUrl: BgUrl,
      m14: 14,
      m20: 20,
      rules: {
        userName: [{ required: true, validator: verifyUserName, trigger: "blur" }],
        passWord: [{ required: true, validator: verifyPassWord, trigger: "blur" }]
      },
      disabled: false
    };
  },
  computed: {
    ...mapState({
      noticeData: state => state.noticeData
    })
  },
  methods: {
    submitForm: function() {
      Api.findAuthenticationDoctorDeatail().then(res => {
        if (res.status === 200 && res) {
          localStorage.setItem("url", res.data.portrait);
          localStorage.setItem("username", res.data.fullName);
        }
      });
      let self = this;
      this.$refs.loginForm.validate(valid => {
        // 通过校验
        if (valid) {
          this.disabled = true;
          const { userAccount, userPassword } = this.loginForm;

          let params = {
            userPhone: userAccount.trim(),
            userPassword: userPassword.trim()
          };
          Api.login(params)
            .then(res => {
              console.log(res);
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
                // this.$router.push({path: "/home"});
                // 申请中 - 6
                if (res.data.result === 1) {
                  this.$router.push({ path: "/doctor/perInformation" });
                  // 未认证为机构 - 4
                  this.doctorFindUnreadCount();
                }
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
        } else {
          return false;
        }
      });
    },
    // 重置 表单
    reset: function() {
      this.$refs.loginForm.resetFields();
    },
    // 跳转到认证页面
    toRenZheng() {
      this.$router.push({ path: "/renzheng" });
    },
    // 跳转到忘记密码页面
    toForgetPsd() {
      this.$router.push({ path: "/forgetPsd" });
    },
    // 医生的未读消息数量
    doctorFindUnreadCount() {
      Api.doctorFindUnreadCount().then(res => {
        if (res.data) {
          if (res.status === 200) {
            this.$store.dispatch("setNoticeData", res.data.unReadCount);
          }
        }
      });
    }
  }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color: #989898;
.login-wrapper {
  min-height: 100vh;
  background: url("../assets/images/bg.png");
  background-size: cover;
  background-position: bottom center;
}
.login-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 510px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(250, 217, 97, 1) 0%, rgba(247, 107, 28, 1) 100%);
  .title {
    font-weight: bold;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    padding-top: 50px;
  }
}

.login-left-main {
  text-align: center;
  img {
    display: inline-block;
    width: 140px;
    height: 140px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .title {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
  }
  .text {
    font-size: 16px;
    color: #ccc;
  }
}
.login-main {
  position: absolute;
  width: 860px;
  height: 512px;
  background: #fff;
  left: 50%;
  top: 50%;
  margin-left: -449px;
  margin-top: -256px;
  // background: url("../assets/images/main-bg.png");
  // background-size: cover;
}
.login-form {
  position: absolute;
  right: 122px;
  top: 204px;
  width: 266px;
  .login-input {
    .el-input__inner {
      border-radius: 20px;
    }
  }
}
.login-btn {
  width: 100%;
  .footer-btn {
    width: 100%;
    background: #fdf3ea;
    color: #ff8232;
    // border-radius: 20px;
  }
}
.extra-btn {
  padding-top: 20px;
  color: #fff;
}
</style>
<style lang='less'>
.login-form {
  .login-input {
    .el-input__inner {
      border: none;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.7);
    }
    .el-input__inner::-ms-input-placeholder {
      text-align: center;
    }
    .el-input__inner::-webkit-input-placeholder {
      text-align: center;
    }
  }
  .login-input-white {
    input.el-input__inner {
      background: #fff;
    }
  }
}
</style>

