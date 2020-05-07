<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="grid-content reg">注册账号</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
          <el-form-item label="更改注册手机号">
            <el-row>
              <el-col :span="12">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-col>

              <el-col :span="6">
                <el-button type="primary" size="medium" class="btns">确定</el-button>
              </el-col>
            </el-row>

            <p class="yuan">原手机号为：{{formLabelAlign.telePhone}}</p>
          </el-form-item>
          <el-form-item label="分账模式">
            <el-row>
              <el-col :span="8">
                <el-input v-model="formLabelAlign.separat"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="绑定支付宝">
            <el-radio-group v-model="bindStatus">
              <el-radio border :label="bindStatus===1?1:2">{{bindStatus===0?'已绑定支付宝':'绑定支付宝'}}</el-radio>
            </el-radio-group>
            <a v-show="bindStatus===1?false:true" :style="{marginLeft:'10px'}" @click="goAplay">点击绑定</a>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h4>账户级别</h4>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="2">
            <h4>账户余额</h4>
          </el-col>
          <el-col :span="5">
            <div class="account-box">
              <p>账户余额</p>
              <span>{{money}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="medium" class="btn" @click="goDeposit">提现至支付宝</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from "@/api/index.js";
export default {
  name: "information",
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        telePhone: "",
        separat: ""
      },
      radio: 1,
      money: "",
      value: "",
      radio1: "1",
      bindStatus: 0,
      auth_code: "",
      url: ""
    };
  },
  created() {
    this.findDoctorPhone();
    this.findUserMoney();
    this.findUserBindAlipayInfo();

    this.url = location.origin + location.pathname + location.hash;
    this.auth_code = location.search.substring(location.search.indexOf("auth_code")).substring(10);
    if (this.auth_code) {
      this.insertBindAlipayInfo();
    }
  },
  methods: {
    goAplay() {
      // this.number = !this.number;
      location.href =
        "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019091267266365&scope=auth_user&redirect_uri=" +
        this.url;
    },
    goDeposit() {
      this.$router.push({ path: "information/deposit" });
      // this.$confirm("未绑定支付宝，是否要绑定？", "支付宝未绑定", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      //   center: true
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "绑定成功!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "绑定失败"
      //     });
      //   });
    },
    // 查询医生的手机号
    findDoctorPhone() {
      Api.findDoctorPhone().then(res => {
        if (res.data && res.status === 200) {
          this.formLabelAlign.telePhone = res.data.result;
        }
      });
    },
    // 查询医生余额
    findUserMoney() {
      Api.findUserMoney().then(res => {
        if (res.data && res.status === 200) {
          this.money = res.data.result;
        }
      });
    },
    // 查询医生是否绑定支付宝
    findUserBindAlipayInfo() {
      Api.findUserBindAlipayInfo().then(res => {
        if (res.status === 200 && res.data) {
          this.bindStatus = res.data.result;
        }
      });
    },
    // 医生取消绑定支付宝
    deleteUserBindAlipayInfo() {
      Api.deleteUserBindAlipayInfo({
        auth_code: this.auth_code
      }).then(res => {});
    },
    // 医生绑定支付宝
    insertBindAlipayInfo() {
      Api.insertBindAlipayInfo({ auth_code: this.auth_code }).then(res => {});
    },
    changeHandle() {}
  }
};
</script>

<style lang="less" scoped>
.main {
  .reg {
    font-size: 13px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(53, 179, 188, 1);
    line-height: 13px;
    margin: 43px 0 30px 60px;
  }
  .el-form-item {
    margin-left: 60px;
    .el-form-item__label {
      width: 200px;
    }
    .el-input__inner {
      margin-right: 15px;
    }
  }
  .yuan {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
    line-height: 12px;
    margin-top: 10px;
  }
  h4 {
    font-size: 13px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(53, 179, 188, 1);
    line-height: 13px;
    margin-top: 49px;
    margin-left: 60px;
  }
  .account-box {
    margin-left: 25px;
    margin-top: 47px;
    margin-right: 35px;
    width: 263px;
    height: 130px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    border: 1px solid rgba(225, 225, 225, 1);
    text-align: center;
    overflow: hidden;
    p {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(152, 152, 152, 1);
      line-height: 25px;
      margin: 20px 0 18px;
    }
    span {
      font-size: 36px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(53, 179, 188, 1);
      line-height: 42px;
    }
  }
  .btn {
    margin-top: 47px;
    background: rgba(53, 179, 188, 1);
    border: 0;
  }
  .btns {
    background: rgba(53, 179, 188, 1);
    border: 0;
    margin-left: 20px;
  }
  /deep/ .el-radio.is-bordered.is-checked {
    border-color: rgba(53, 179, 188, 1);
  }
  /deep/ .el-radio__input.is-checked + .el-radio__label {
    color: rgba(53, 179, 188, 1);
  }
  /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: rgba(53, 179, 188, 1);
    background: rgba(53, 179, 188, 1);
  }
}
</style>