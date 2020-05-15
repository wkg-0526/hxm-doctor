<template>
  <div class="main">
    <div class="login-psw">
      <el-row>
        <el-col :span="6">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="登录密码" name="1">
              <el-row>
                <el-col>
                  <el-form :label-position="labelPosition" label-width="100px" :model="loginPsw">
                    <el-form-item label="密码：">
                      <el-input v-model="loginPsw.psw" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                      <el-input v-model="loginPsw.conPsw" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="手机验证码：" v-show="apliyResult===500?false:true">
                      <el-input v-model="loginPsw.validate" placeholder="请输入手机验证码"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14">
                  <span>
                    <el-button class="btn" type="primary" @click="countDowns">{{contents}}</el-button>
                  </span>
                </el-col>
                <el-col :span="8">
                  <span>
                    <el-button type="primary" @click="loginEditPsw">修改密码</el-button>
                  </span>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="支付密码" name="2">
              <el-row>
                <el-col>
                  <el-form :label-position="labelPosition" label-width="100px" :model="alipayPsw">
                    <el-form-item label="密码：">
                      <el-input v-model="alipayPsw.psw" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                      <el-input v-model="alipayPsw.conPsw" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="手机验证码：" v-show="apliyResult===500?false:true">
                      <el-input v-model="alipayPsw.validate" placeholder="请输入手机验证码"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14" :style="{marginBottom:'15px'}">
                  <span class="btn">
                    <el-button type="primary" @click="countDown">{{content}}</el-button>
                  </span>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" v-if="apliyResult===1" @click="aplayPsw">确定</el-button>
                  <el-button
                    type="primary"
                    v-else-if="apliyResult===500"
                    @click="aplayEditPsw"
                  >修改支付密码</el-button>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
export default {
  name: "settingPsw",
  data() {
    return {
      labelPosition: "left",
      loginPsw: {
        psw: "",
        conPsw: "",
        validate: ""
      },
      alipayPsw: {
        psw: "",
        conPsw: "",
        validate: ""
      },
      apliyResult: 1,
      activeName: "1",
      content: "发送验证码",
      totalTime: 59,
      canClick: true,
      contents: "发送验证码",
      totalTimes: 59,
      canClicks: true
    };
  },
  created() {
    this.findUserPresentationPassword();
  },
  methods: {
    // 查询医生是否设置了提现密码
    findUserPresentationPassword() {
      Api.findUserPresentationPassword().then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 0) {
            this.$message({
              showClose: true,
              message: "未设置支付密码,请设置支付密码",
              type: "warning"
            });
          } else if (res.data.result === 1) {
            this.$message({
              showClose: true,
              message: "已设置支付密码",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "未登录",
              type: "error"
            });
          }
        }
      });
    },
    // 医生第一次设置提现密码
    insertUserPresentationPassword(password) {
      Api.insertUserPresentationPassword({ password }).then(res => {
        if (res.status === 200 && res.data) {
          this.apliyResult = res.data.result;
          if (res.data.result === 1) {
            this.$message({
              showClose: true,
              message: "密码设置成功",
              type: "success"
            });
          } else if (res.data.result === 500) {
            this.$message({
              showClose: true,
              message: "已设置支付密码",
              type: "warning"
            });
          } else {
            this.$message({
              showClose: true,
              message: "未登录",
              type: "error"
            });
          }
        }
      });
    },
    // 设置支付密码确定
    aplayPsw() {
      var reg = new RegExp(/^\d{6}$/);
      if (!reg.test(this.alipayPsw.psw) && !reg.test(this.alipayPsw.conPsw)) {
        this.$message({
          showClose: true,
          message: "请输入六位数字",
          type: "error"
        });
        this.alipayPsw.psw = "";
        if (this.alipayPsw.psw !== this.alipayPsw.conPsw) {
          this.alipayPsw.conPsw = "";
        } else {
          this.alipayPsw.conPsw = "";
        }
      } else {
        if (this.alipayPsw.psw === this.alipayPsw.conPsw) {
          this.insertUserPresentationPassword(this.alipayPsw.conPsw);
        }
      }
    },
    // 医生修改提现密码发送验证码
    presentationPasswordSendValidate() {
      Api.presentationPasswordSendValidate().then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 1) {
            this.$message({
              showClose: true,
              message: "发送成功",
              type: "success"
            });
          }
        }
      });
    },
    // 支付定时器验证码
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      // this.bool.verify = true;
      this.canClick = false;
      this.content = this.totalTime + "s后重新发送";
      this.presentationPasswordSendValidate();
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重新发送验证码";
          this.totalTime = 59;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    // 医生修改提现密码
    updateUserPresentationPassword(password, validate) {
      Api.updateUserPresentationPassword({ validate, password }).then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 1) {
            this.$message({
              showClose: true,
              message: "提现密码修改成功",
              type: "success"
            });
          } else if (res.data.result === 500) {
            this.$message({
              showClose: true,
              message: "验证码错误",
              type: "warning"
            });
          }
        }
      });
    },
    // 修改支付密码
    aplayEditPsw() {
      var reg = new RegExp(/^\d{6}$/);
      if (!reg.test(this.alipayPsw.psw) && !reg.test(this.alipayPsw.conPsw)) {
        this.$message({
          showClose: true,
          message: "请输入六位数字",
          type: "error"
        });
        this.alipayPsw.psw = "";
        if (this.alipayPsw.psw !== this.alipayPsw.conPsw) {
          this.alipayPsw.conPsw = "";
        } else {
          this.alipayPsw.conPsw = "";
        }
      } else {
        if (this.alipayPsw.psw === this.alipayPsw.conPsw && this.alipayPsw.validate) {
          this.updateUserPresentationPassword(this.alipayPsw.conPsw, this.alipayPsw.validate);
        }
      }
    },
    // 医生修改密码发送验证码
    updatePwdSendphonevalidate() {
      Api.updatePwdSendphonevalidate().then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 1) {
            this.$message({
              showClose: true,
              message: "发送成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "未登录",
              type: "error"
            });
          }
        }
      });
    },
    // 登录定时器验证码
    countDowns() {
      console.log(111);
      if (!this.canClicks) return; //改动的是这两行代码
      // this.bool.verify = true;
      this.canClicks = false;
      this.contents = this.totalTimes + "s后重新发送";
      this.updatePwdSendphonevalidate();
      let clock = window.setInterval(() => {
        this.totalTimes--;
        this.contents = this.totalTimes + "s后重新发送";
        if (this.totalTimes < 0) {
          window.clearInterval(clock);
          this.contents = "重新发送验证码";
          this.totalTimes = 59;
          this.canClicks = true; //这里重新开启
        }
      }, 1000);
    },
    // 医生短信验证修改登录密码
    updateUserPasswordValidate(userPassword, validate) {
      Api.updateUserPasswordValidate({
        userPassword,
        validate
      }).then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 1) {
            // this.$message({
            //   showClose: true,
            //   message: "修改成功",
            //   type: "success"
            // });
            this.$alert("密码修改成功,请重新登录", {
              confirmButtonText: "确定",
              center: true,
              callback: action => {
                this.$router.push({ path: "/login" });
              }
            });
          } else if (res.data.result === 500) {
            this.$message({
              showClose: true,
              message: "验证码错误",
              type: "warning"
            });
          }
        }
      });
    },
    // 修改登录密码
    loginEditPsw() {
      var reg = new RegExp(/[a-zA-Z_0-9]{5,20}$/);
      if (!reg.test(this.loginPsw.psw) && !reg.test(this.loginPsw.conPsw)) {
        this.$message({
          showClose: true,
          message: "请输入5-20位数字",
          type: "error"
        });
        this.loginPsw.psw = "";
        if (this.loginPsw.psw !== this.loginPsw.conPsw) {
          this.loginPsw.conPsw = "";
        } else {
          this.loginPsw.conPsw = "";
        }
      } else {
        if (this.loginPsw.psw === this.loginPsw.conPsw && this.loginPsw.validate) {
          this.updateUserPasswordValidate(this.loginPsw.conPsw, this.loginPsw.validate);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background: rgba(245, 246, 250, 1);
  .login-psw {
    height: 500px;
    background: rgba(255, 255, 255, 1);
    padding: 40px 0 0 60px;

    h2 {
    }
    .btn {
      margin-left: 100px;
      margin-right: 20px;
    }
    .el-button--primary {
      color: #fff;
      background-color: rgba(53, 179, 188, 1);
      border-color: rgba(53, 179, 188, 1);
    }
  }
}
</style>