<template>
  <div class="main">
    <div class="content">
      <el-row>
        <el-col>
          <h2>可提现余额</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <h3>{{money}}</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <p>提现至支付宝：</p>
        </el-col>
        <el-col :span="10">
          <span>{{telephone}}</span>
        </el-col>
        <el-col :span="7">
          <img src="../../assets/images/changad.png" @click="upgrading" alt v-show="false" />
          <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-row>
              <el-col>
                <h4>绑定至已有医美邦账户</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="binding">是否同意将支付宝账户与医美邦账户进行绑定？</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
              </el-col>
              <el-col :span="4">
                <div class="avatarName">YYYYYY</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-checkbox v-model="checked">
                  <span class="under">我已阅读、理解并接受</span>
                </el-checkbox>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="closeHandle">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="取消授权" :visible.sync="centerDialogVisible" width="30%" center>
            <el-checkbox v-model="checkeds">
              <span class="cancel">取消授权成功！</span>
            </el-checkbox>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form :label-position="labelPosition" label-width="140px" :model="formLabelAlign">
            <el-row>
              <el-col :span="21">
                <el-form-item label="支付宝账户名称：">
                  <el-input
                    v-model="formLabelAlign.name"
                    :disabled="bool.disabled"
                    placeholder="请输入支付宝账户名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21">
                <el-form-item label="提现金额：">
                  <el-input
                    v-model="formLabelAlign.money"
                    @change="moneyChange"
                    placeholder="提现金额不能少于1元"
                    :disabled="bool.disabled"
                    type="text"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div class="pri">元</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21">
                <el-form-item label="请输入提现密码：">
                  <el-input
                    v-model="formLabelAlign.password"
                    placeholder="请输入提现密码"
                    :disabled="bool.disabled"
                    type
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="3" :style="{marginLeft:'15px'}">
                <el-button type="primary" @click="countDown">{{content}}</el-button>
              </el-col>-->
            </el-row>
            <el-row>
              <!-- <el-col>
                <div class="produce" v-show="bool.verify">短信验证码已发至预留的手机号码上，1分钟内填写有效。</div>
              </el-col>-->
            </el-row>
            <!-- <el-row>
              <el-col>
                <el-checkbox v-model="bool.checked">
                  <div class="checkeds">提现成功短信通知</div>
                </el-checkbox>
              </el-col>
            </el-row>-->
            <el-row>
              <el-col>
                <div class="affirm" v-show="bool.isShow" @click="insertCashWithdrawalInfos">
                  <p>确定</p>
                </div>
                <div class="affirms" v-show="!bool.isShow">
                  <p>确定</p>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
export default {
  name: "deposit",
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        money: "",
        password: ""
      },
      bool: {
        checked: false,
        isShow: false,
        verify: false,
        disabled: false
      },
      content: "发送验证码",
      totalTime: 59,
      canClick: true,
      dialogVisible: false,
      checked: false,
      centerDialogVisible: false,
      checkeds: true,
      money: "",
      telephone: "",
      url: ""
    };
  },
  created() {
    this.findUserMoney();
    this.findDoctorPhone();
    this.url = location.origin + location.pathname + location.hash;
  },
  updated() {
    this.changeAffirm();
  },
  methods: {
    // 查询医生余额
    findUserMoney() {
      Api.findUserMoney().then(res => {
        if (res.data && res.status === 200) {
          this.money = res.data.result;
        }
      });
    },
    // 医生提现
    insertCashWithdrawalInfos() {
      Api.insertCashWithdrawalInfos({
        jine: this.formLabelAlign.money,
        name: this.formLabelAlign.name,
        password: this.formLabelAlign.password
      }).then(res => {
        if (res.status === 200 && res.data) {
          switch (res.data.result) {
            case 1:
              this.$message({
                showClose: true,
                message: "提现成功",
                type: "success"
              });
              break;
            case 500:
              this.$message({
                showClose: true,
                message: "余额不足",
                type: "warning"
              });
              break;
            case 501:
              // this.$message({
              //   showClose: true,
              //   message: "用户未绑定支付宝",
              //   type: "warning"
              // });
              this.$confirm("用户未绑定支付宝，是否去绑定?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  location.href =
                    "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019091267266365&scope=auth_user&redirect_uri=" +
                    this.url;
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消绑定"
                  });
                });
              break;
            case 502:
              this.$message({
                showClose: true,
                message: "提现密码错误",
                type: "warning"
              });
              break;
            case 503:
              this.$message({
                showClose: true,
                message: "医生本月已提现",
                type: "warning"
              });
              break;
            case 504:
              this.$message({
                showClose: true,
                message: "提现密码输入错误3次一小时后在输入",
                type: "warning"
              });
              this.disabled = true;
              break;
            case 505:
              this.$message({
                showClose: true,
                message: "提现密码未设置",
                type: "warning"
              });
              break;
            default:
              this.$message({
                showClose: true,
                message: "支付宝账号和姓名不匹配，请确认姓名是否正确",
                type: "error"
              });
              break;
          }
        }
      });
    },
    // 查询医生的手机号
    findDoctorPhone() {
      Api.findDoctorPhone().then(res => {
        if (res.data && res.status === 200) {
          this.telephone = res.data.result;
        }
      });
    },
    // 点击确认
    changeAffirm() {
      if (
        this.formLabelAlign.name !== "" &&
        this.formLabelAlign.money !== "" &&
        this.formLabelAlign.password !== ""
      ) {
        this.bool.isShow = true;
      } else {
        this.bool.isShow = false;
      }
    },
    // 改变金额
    moneyChange() {
      let reg = new RegExp(/^\d{1,}$/);
      if (!reg.test(this.formLabelAlign.money)) {
        this.$message.error("请输入数字");
        this.formLabelAlign.money = "";
      } else if (this.formLabelAlign.money < 1) {
        this.formLabelAlign.money = 1;
      }
    },
    // 更改账号
    upgrading() {
      this.dialogVisible = true;
    },
    // 关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.centerDialogVisible = true;
        })
        .catch(_ => {});
    },
    closeHandle() {
      this.dialogVisible = false;
      this.centerDialogVisible = true;
    },
    // 定时器验证码
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      // this.bool.verify = true;
      this.canClick = false;
      this.content = this.totalTime + "s后重新发送";
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
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 0 auto;
  text-align: left;
  overflow: hidden;

  .content {
    margin: 0 auto;
    width: 450px;

    h2 {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(152, 152, 152, 1);
      line-height: 25px;
      margin-top: 65px;
      text-align: center;
    }
    h3 {
      font-size: 36px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(53, 179, 188, 1);
      line-height: 42px;
      margin-top: 12px;
      margin-bottom: 51px;
      text-align: center;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(117, 117, 117, 1);
      line-height: 34px;
    }
    img {
      margin-bottom: 14px;
    }
    span {
      text-align: left;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      line-height: 34px;
    }
    .pri {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(152, 152, 152, 1);
      line-height: 40px;
      margin-right: 7px;
      text-align: center;
    }
    .time {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(117, 117, 117, 1);
      line-height: 40px;
      text-align: center;
    }
    .input {
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      line-height: 14px;
    }
    .produce {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      line-height: 17px;
      margin-top: -15px;
      margin-bottom: 33px;
    }
    .checkeds {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(117, 117, 117, 1);
      line-height: 20px;
      margin-bottom: 79px;
    }
    .affirm {
      cursor: pointer;
      width: 121px;
      height: 30px;
      background: rgba(53, 179, 188, 1);
      border-radius: 2px;
      text-align: center;
      margin: 0 auto;
      p {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
      }
    }
    .affirms {
      cursor: not-allowed;
      width: 121px;
      height: 30px;
      background: rgba(225, 225, 225, 1);
      border-radius: 15px;
      text-align: center;
      margin: 0 auto;
      p {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
      }
    }
    .el-button--primary {
      background-color: rgba(53, 179, 188, 1);
      border-color: rgba(53, 179, 188, 1);
    }
    h4 {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(117, 117, 117, 1);
      line-height: 18px;
      margin-bottom: 15px;
    }
    .binding {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      line-height: 14px;
      margin-bottom: 15px;
    }
    .avatarName {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(40, 40, 40, 1);
      line-height: 44px;
      margin-bottom: 20px;
    }
    /deep/ .el-checkbox__inner {
      border-radius: 50%;
    }
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: rgba(53, 179, 188, 1);
      border-color: rgba(53, 179, 188, 1);
    }
    /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: #dcdfe6;
    }
    .cancel {
      color: rgba(117, 117, 117, 1);
    }
  }
}
</style>