<template>
  <div class="ali-withdraw-wrapper">
    <div class="account">
      <div>可提现余额</div>
      <div class="orange acount-num">{{topData.money}}</div>
    </div>
    <div class="form">
      <el-form ref="form" :rules="rules" :model="formData" label-position="left">
        <el-form-item label="提现至支付宝：" label-width="120px">
          <span class="grey" style="padding-right: 20px;">{{topData.aliAccount}}</span>
          <el-button round size="mini" @click="toSet">更换账号</el-button>
        </el-form-item>

        <el-form-item label="提现金额：" prop="jine" label-width="85px">
          <el-input-number
            v-model="formData.jine"
            class="input"
            style="width: 269px;"
            placeholder="请输入"
            :min="0"
            :precision="2"
            :max="topData.money"
            :controls="false"
          ></el-input-number>
          <span class="grey" style="padding-left: 10px;">元</span>
        </el-form-item>

        <el-form-item label="请输入短信验证码：" prop="updateValidate" label-width="140px">
          <el-input v-model.trim="formData.updateValidate" class="input" style="width: 214px;">
            <template slot="append">
              <span
                @click="onSendText"
                class="code-btn"
                :style="{ cursor: disabled ? 'default' : 'pointer'}"
              >{{btnTitle}}</span>
            </template>
          </el-input>
        </el-form-item>

        <div class="grey f12">短信验证码已发至预留的手机号码上，1分钟内填写有效。</div>

        <div class="btnBox">
          <el-button
            type="primary"
            @click="submitForm"
            round
            size="medium"
            :disabled="loginDisabled"
          >确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ali-withdraw-wrapper {
  .grey {
    color: #989898;
  }
  .orange {
    color: #35b3bc;
  }
  .f12 {
    font-size: 12px;
  }
  .account {
    width: 500px;
    margin: 0 auto;
    padding-top: 100px;
    > div {
      margin-left: 140px;
    }
    .acount-num {
      font-size: 36px;
      padding-top: 12px;
      font-weight: bold;
    }
  }

  .form {
    width: 500px;
    margin: 0 auto;
    margin-top: 50px;
    .input {
      width: 300px;
    }
    .btnBox {
      padding-top: 70px;
      margin-left: 140px;
      padding-bottom: 30px;
    }
    .code-btn {
      display: inline-block;
      padding: 0 20px;
    }
  }
}
</style>
<style lang='less'>
.ali-withdraw-wrapper .el-input-group__append {
  padding: 0;
}
</style>

<script>
import Api from "@/api/index.js";
export default {
  created: function() {},
  mounted: function() {
    this.getTop();
    // this.getPhone();
  },
  components: {},
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

    let verifyMoney = function(rule, value, callback) {
      let val = value;
      if (!val) {
        callback("请输入提现金额");
      } else if (val < 0.1) {
        callback("单笔最低转账金额0.1元");
      } else {
        callback();
      }
    };

    return {
      /* 表单数据 */
      formData: {
        jine: 0,
        updateValidate: ""
      },
      /* 校验数据 */
      rules: {
        jine: [{ validator: verifyMoney, trigger: "blur" }],
        updateValidate: [{ validator: verifyReg, trigger: "blur" }]
      },
      // 倒计时时间
      time: 60,
      // 发送验证码按钮
      disabled: false,
      btnTitle: "发送验证码",
      // 图形验证码链接
      // 登录按钮防重复
      loginDisabled: false,
      topData: {},
      phone: ""
    };
  },
  methods: {
    toSet() {
      this.$router.push({
        path: "/financial/setAli",
        query: {
          isUpdate: true,
          link: "withDraw"
        }
      });
    },
    NumberCheck(num) {
      var str = num;
      var len1 = str.substr(0, 1);
      var len2 = str.substr(1, 1);
      //如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 == 0 && len2 != ".") {
        str = str.substr(1, 1);
      }
      //第一位不能是.
      if (len1 == ".") {
        str = "";
      }
      //限制只能输入一个小数点
      if (str.indexOf(".") != -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") != -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }
      //正则替换，保留数字和小数点
      str = str.replace(/[^\d^\.]+/g, "");
      //如果需要保留小数点后两位，则用下面公式
      str = str.replace(/\.\d\d$/, "");
      return str;
    },
    // 提交表单
    submitForm: function() {
      // this.$emit('nextStep', 2)
      this.$refs.form.validate(valid => {
        if (valid) {
          const { formData } = this;
          this.loginDisabled = true;
          Api.cashwithdrawal({
            updateValidate: formData.updateValidate,
            jine: formData.jine
          }).then(res => {
            this.loginDisabled = false;

            if (res.data.result === 1) {
              // 执行倒计时
              this.$message({
                message: "提现成功",
                type: "success"
              });
              this.$router.push({
                path: "/financial/index"
              });
            } else if (res.data.result === 500) {
              this.$message({
                message: "验证码错误",
                type: "warning"
              });
            } else if (res.data.result === 503) {
              this.$message({
                message: "余额不足",
                type: "warning"
              });
            } else if (res.data.result === 504) {
              this.$message({
                message: "未绑定支付宝账户",
                type: "warning"
              });
            } else {
              this.$message({
                message: res.data.result,
                type: "warning"
              });
            }
          });
        } else {
        }
      });
    },

    getTop() {
      Api.hospitalGrossIncome({})
        .then(res => {
          if (res && res.data) {
            let _data = res.data;
            _data.money = parseFloat(_data.money);

            this.topData = _data;
          }
        })
        .catch(error => {});
    },
    // 点击发送验证码
    onSendText() {
      console.log(this.disabled, "111");
      if (this.disabled) {
        return;
      }
      Api.cashwithdrawalUpdateValidate({}).then(res => {
        if (res.data.result === 1) {
          // 执行倒计时
          this.validateBtn();
        } else if (res.data.result === 0) {
          this.$message({
            message: "手机号不存在",
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
