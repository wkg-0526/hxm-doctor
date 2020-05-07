    <!--  -->
    <template>
  <div class="good-wrapper">
    <sendGood :detailData="detailData"></sendGood>

    <!-- 退换货表单 -->
    <div class="change-wrapper" v-if="detailData.refund === 7 && detailData.refundType === '换货'">
      <p class="change-title">退/换货：补发货</p>
      <el-form
        :model="changeForm"
        ref="changeForm"
        class="pt20"
        :rules="changeRules"
        hide-required-asterisk
      >
        <el-form-item label="快递公司:" label-width="75px" prop="express">
          <el-select v-model="changeForm.express" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号:" label-width="75px" prop="courierNumber">
          <el-input
            style="width: 300px"
            v-model.trim="changeForm.courierNumber"
            placeholder="请填写退换货补发快递的运单号…"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="change-wrapper" v-if="detailData.refund === 8 && detailData.refundType === '换货'">
      <p class="change-title">退/换货：补发货</p>
      <div class="pb20 pt20">
        <span class="mr15">快递公司:</span>
        <span style="color: #989898">{{detailData.express}}</span>
      </div>
      <div class="pb20">
        <span class="mr15">快递单号:</span>
        <span style="color: #989898">{{detailData.courierNumber}}</span>
      </div>
    </div>
    <!-- 成功图片 -->
    <div
      class="center"
      v-if="detailData.refund === 8 || detailData.refund === 5 || detailData.refund=== 6"
    >
      <img :src="okUrl" alt class="ok-img" />
    </div>
    <div class="btn-wrapper">
      <el-button @click="onBack">返回</el-button>

      <!-- refund 售后状态 （1申请换货
                        2 申请退货退款3运营同意退货 4.运营同意换货5运营拒绝退货6 运营拒绝换货
      7用户已填写退货快递8 商家确认收货(退款已完成)）-->
      <el-button
        @click="onAgree"
        :disabled="agreeDisabled"
        v-if="detailData.refund === 1 || detailData.refund === 2"
      >同意退换货</el-button>
      <el-button @click="onRefuse" v-if="detailData.refund === 1 || detailData.refund === 2">拒绝</el-button>

      <!-- 确定换货的快递信息 -->
      <el-button @click="onChangeSubmit" v-if="detailData.refund === 7">确定</el-button>

      <!-- <el-button 
                    type="danger" 
                    @click="onDelete" 
                    :disabled="disabled"
                    v-if="detailData.status === 2"
      >删除</el-button>-->
    </div>
    <!-- 拒绝过审 -->
    <el-dialog
      class="grid-body"
      :visible.sync="refuseVisible"
      width="30%"
      @closed="handleClose"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label label-width="0px" style="marginBottom: 0px">
            <el-input
              class="w220"
              v-model.trim="form.refuseReason"
              placeholder="请填写拒绝退货原因…"
              type="textarea"
              :rows="4"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="small">取消</el-button>
        <el-button type="primary" @click="onSubmitdialog" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

    <script>
import Api from "@/api/index.js";
import format from "date-fns/format";
import sendGood from "@/components/order/sendGood.vue";
import okUrl from "@/assets/images/ok.png";
import expressOption from "@/components/express.js";

export default {
  components: {
    sendGood
  },
  data() {
    return {
      okUrl,
      title: "",

      // ======
      options: expressOption,
      disabled: false,
      // 详情数据
      detailData: {},
      orderId: "",
      agreeDisabled: false,
      form: {
        refuseReason: ""
      },
      refuseVisible: false,
      changeForm: {
        express: "",
        courierNumber: ""
      },
      changeRules: {
        express: [
          { required: true, message: "请选择快递公司", trigger: "change" }
        ],
        courierNumber: [
          { required: true, message: "请输入快递单号", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 0 审核中 2 已拒绝
    // detailData.status

    this.orderId = this.$route.query.orderId;

    this.guid = this.$route.query.guid;
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      const { orderId } = this;

      Api.operateFindShopOrderAfterSaleDetail({
        orderId: this.orderId
      })
        .then(res => {
          if (res && res.status === 200) {
            if (res.data.result === 500) {
              this.$message.warning("订单不存在!");
            } else {
              this.detailData = res.data;
            }
          }
        })
        .catch(function(error) {});
    },
    // 点击返回
    onBack() {
      this.$router.push({
        path: "/order/index",
        query: {
          type: "2"
        }
      });
    },
    //
    onAgree() {
      this.$confirm("同意退换货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.isDisabled = true;

          Api["shopOrderAgreeToAfterSale"]({
            orderId: this.detailData.orderId
          })
            .then(res => {
              this.isDisabled = false;
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.getDetailData();
                } else {
                  this.$message({
                    message: "操作失败",
                    type: "warning"
                  });
                }
              }
            })
            .catch(function(error) {
              self.isDisabled = false;
            });
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    onRefuse() {
      this.refuseVisible = true;
    },
    // 弹窗点击确定
    onSubmitdialog() {
      const { detailData } = this;
      let { refuseReason } = this.form;
      let params = {
        refuseReason,
        orderId: detailData.orderId
      };

      Api["shopOrderRefuseSale"](params)
        .then(res => {
          if (res && res.status === 200) {
            if (res.data.result) {
              this.refuseVisible = true;
              this.getDetailData();
            }
          }
        })
        .catch(error => {
          this.refuseVisible = false;
        });
    },
    handleClose() {
      this.refuseVisible = false;
      this.form.refuseReason = "";
      this.$refs.form.resetFields();
    },
    // 删除商品
    onDelete() {
      this.$confirm("是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deleteDoctorShop({
            orderId: this.detailData.orderId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.onBack();
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "删除失败",
                    type: "warning"
                  });
                }
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    // 确认换货
    onChangeSubmit() {
      this.$refs["changeForm"].validate(valid => {
        if (valid) {
          Api.operateConfirmReceivingGoods({
            ...this.changeForm,
            orderId: this.detailData.orderId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.getDetailData();
                  this.$message({
                    message: "操作成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "操作失败",
                    type: "warning"
                  });
                }
              }
            })
            .catch(function(error) {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setData(key, value) {
      this.key = value;
    }
  }
};
</script>

    <style lang='less' scoped>
.good-wrapper {
  width: 812px;
  margin: 50px auto;
  .pb30 {
    padding-bottom: 30px;
  }
  .pb20 {
    padding-bottom: 20px;
  }
  .pt20 {
    padding-top: 20px;
  }

  .mr15 {
    margin-right: 15px;
  }
  .btn-wrapper {
    padding-top: 23px;
    text-align: center;
  }
}
.change-wrapper {
  .change-title {
    padding-top: 20px;
    font-size: 18px;
    border-top: 1px solid #979797;
  }
}
.ok-img {
  display: inline-block;
  width: 100px;
  margin-top: 30px;
}
</style>
