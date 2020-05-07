<template>
  <div class="loginWrapper">
    <div class="form">
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="formData.userPhone" class="input"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="regValidate">
          <el-input v-model.trim="formData.regValidate" class="input">
            <template slot="append">
              <span
                @click="onSendText"
                class="code-btn"
                :style="{ cursor: disabled ? 'default' : 'pointer'}"
              >{{btnTitle}}</span>
            </template>
          </el-input>
        </el-form-item>

        <!-- <el-form-item label="密码" prop="passWord">
					<el-input v-model="formData.passWord" type="password" class="input"></el-input>
				</el-form-item>

				<el-form-item label="确认密码" prop="qrPassWord">
					<el-input v-model="formData.qrPassWord" type="password" class="input"></el-input>
        </el-form-item>-->
        <codeModal
          :visible="codeVisible"
          @codeSubmit="codeSubmit"
          @codeCancel="codeCancel"
          ref="codeModal"
        ></codeModal>

        <div class="btnBox">
          <el-button
            type="primary"
            @click="submitForm"
            round
            size="medium"
            :disabled="loginDisabled"
          >下一步</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.loginWrapper {
  .form {
    width: 400px;
    margin: 0 auto;
    // margin-top: 200px;
    .input {
      width: 300px;
    }
    .btnBox {
      display: flex;
      justify-content: center;
      padding-bottom: 30px;
    }
    .code-btn {
      display: inline-block;
      padding: 0 20px;
    }
    .code-img {
      display: block;
      padding: 0;
      height: 36px;
    }
  }
}
</style>
<style lang='less'>
.loginWrapper .el-input-group__append {
  padding: 0;
}
</style>

<script>
import Api from "@/api/index.js";
import codeModal from "./code.vue";
export default {
  created: function() {},
  mounted: function() {
    //console.log(this.$router.path);
  },
  components: {
    codeModal
  },
  data() {
    let _this = this;

    let verifyReg = function(rule, value, callback) {
      let val = value && value.trim();
      if (!val) {
        callback("请输入验证码");
      } else {
        callback();
      }
    };
    let verifyCode = function(rule, value, callback) {
      let val = value && value.trim();
      if (!val) {
        callback("请输入图形验证码");
      } else {
        callback();
      }
    };

    let verifyPhone = function(rule, value, callback) {
      let val = value && value.trim();
      if (!val) {
        callback("请输入手机号");
      } else if (!/^1[345678]\d{9}$/.test(val)) {
        callback("手机号格式错误");
      } else {
        callback();
      }
    };

    let verifypassWord = function(rule, value, callback) {
      let val = value && value.trim();
      if (val === "") {
        callback(new Error("请输入密码"));
      } else if (!/[a-zA-Z_0-9]{5,17}$/.test(val)) {
        callback("密码长度在6~18之间，只能包含字符、数字和下划线");
      } else if (val !== _this.formData.qrPassWord) {
        callback();
      } else if (val === _this.formData.qrPassWord) {
        // 主动校验
        _this.$refs.form.validateField("qrPassWord");
        callback();
      } else {
        callback();
      }
    };
    let verifyqrPassWord = function(rule, value, callback) {
      let val = value && value.trim();
      if (val === "") {
        callback(new Error("请再次输入密码"));
      } else if (val !== _this.formData.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      /* 表单数据 */
      formData: {
        userPhone: "",
        regValidate: "",
        passWord: "",
        qrPassWord: "",
        code: ""
      },
      /* 校验数据 */
      rules: {
        userPhone: [{ validator: verifyPhone, trigger: "blur" }],
        regValidate: [{ validator: verifyReg, trigger: "blur" }],
        passWord: [{ validator: verifypassWord, trigger: "blur" }],
        qrPassWord: [{ validator: verifyqrPassWord, trigger: "blur" }]
      },
      // 倒计时时间
      time: 120,
      // 发送验证码按钮
      disabled: false,
      btnTitle: "发送验证码",
      // 图形验证码链接
      regUrl: "",
      // 登录按钮防重复
      loginDisabled: false,
      codeVisible: false
    };
  },
  methods: {
    // 提交表单
    submitForm: function() {
      // this.$emit('nextStep', 2)
      this.$refs.form.validate(valid => {
        if (valid) {
          const { formData } = this;
          this.loginDisabled = true;
          Api.logValidates({
            validate: formData.regValidate,
            userPhone: formData.userPhone
          }).then(res => {
            this.loginDisabled = false;
            if (res.data.result === 1) {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              this.$emit("nextStep", 2);
              this.loginDisabled = true;
            } else if (res.data.result === 2) {
              // this.$message({
              // 	message: '密码未设置',
              // 	type: 'warning'
              // });
              this.$emit("nextTab", 3);
            } else if (res.data.result === 0) {
              this.$message({
                message: "手机号未注册",
                type: "warning"
              });
            } else if (res.data.result === 500) {
              this.$message({
                message: "验证码错误",
                type: "warning"
              });
            }
          });
        } else {
        }
      });
    },
    // 点击发送验证码
    onSendText() {
      if (this.disabled) {
        return;
      }
      // 校验
      this.$refs.form.validateField("userPhone", error => {
        if (!error) {
          this.codeVisible = true;
        }
      });
    },
    // 获取图形验证码
    getImgCode() {
      this.regUrl = "/validateCode.json?" + Math.random();
    },
    // 图形验证码点击取消
    codeCancel() {
      this.codeVisible = false;
    },
    // 图形验证码点击确定
    codeSubmit(url) {
      const { formData } = this;
      var p = new Promise((resolve, reject) => {
        Api.loginSendValidate({
          code: url,
          userPhone: formData.userPhone
        }).then(res => {
          if (res.data.result === 1) {
            // 执行倒计时
            this.validateBtn();
            this.$refs.codeModal.codeCancel();
            resolve();
          } else if (res.data.result === 0) {
            this.$message({
              message: "验证码发送失败",
              type: "warning"
            });
            this.$refs.codeModal.getImgCode();
          } else if (res.data.result === 500) {
            this.$refs.codeModal.getImgCode();
            this.$message({
              message: "图形验证码错误",
              type: "warning"
            });
          }
        });
      });
      return p;
    },
    // 发送验证码
    sendCode() {
      const { formData } = this;
      Api.loginSendValidate({
        code: formData.code,
        userPhone: formData.userPhone
      }).then(res => {
        if (res.data.result === 1) {
          // 执行倒计时
          this.validateBtn();
        } else if (res.data.result === 0) {
          this.$message({
            message: "验证码发送失败",
            type: "warning"
          });
        } else if (res.data.result === 500) {
          this.$message({
            message: "图形验证码错误",
            type: "warning"
          });
        }
      });
    },
    validateBtn() {
      //倒计时
      let time = this.time;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.btnTitle = "发送验证码";
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    }
  }
};
</script>
