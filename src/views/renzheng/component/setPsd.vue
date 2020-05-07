<template>
  <div class="setPsdWrapper">
    <div class="form">
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="100px"
        label-position="left"
      >
        <!-- <el-form-item label="手机号" prop="userPhone">
					<el-input v-model="formData.userPhone" class="input"></el-input>
				</el-form-item>

				<el-form-item label="验证码" prop="regValidate">
					<el-input v-model.trim="formData.regValidate" class="input">
						<template 
							slot="append" 
						><span 
							@click="onSendText"
							class="code-btn"
							:style="{ cursor: disabled ? 'default' : 'pointer'}"
						>{{btnTitle}}</span></template>
					</el-input>
        </el-form-item>-->
        <div class="title">您的账号还没有密码，请设置后继续</div>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="formData.passWord" type="password" class="input"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="qrPassWord">
          <el-input v-model="formData.qrPassWord" type="password" class="input"></el-input>
        </el-form-item>

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
.setPsdWrapper {
  .title {
    font-size: 20px;
    color: #686868;
    margin: 0 auto;
    padding: 55px 0 40px 0;
    text-align: center;
  }
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
.setPsdWrapper .el-input-group__append {
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
        passWord: "",
        qrPassWord: ""
      },
      /* 校验数据 */
      rules: {
        passWord: [{ validator: verifypassWord, trigger: "blur" }],
        qrPassWord: [{ validator: verifyqrPassWord, trigger: "blur" }]
      },
      // 发送验证码按钮
      disabled: false,
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
          Api.updateUserPasswordValidateLogin({
            userPassword: formData.passWord
          }).then(res => {
            console.log(res, "ss");
            this.loginDisabled = false;
            if (res.data.result === 1) {
              this.$message({
                message: "设置成功",
                type: "success"
              });
              this.$emit("nextStep", 2);
              this.loginDisabled = true;
            } else if (res.data.result === 0) {
              this.$message({
                message: "设置失败",
                type: "warning"
              });
            } else if (res.data.result === 500) {
              this.$message({
                message: "登录已失效",
                type: "warning"
              });
              this.$emit("nextTab", 2);
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
    // 图形验证码点击取消
    codeCancel() {
      this.codeVisible = false;
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
