<template>
  <div class="child-wrapper">
    <section class="list-wrapper">
      <list
        :data="data"
        :filter="filter"
        ref="list"
        :pageSize="5"
        :isTotalNum="true"
        position="column"
      >
        <template v-slot:default="{item}">
          <div class="item-wrapper">
            <div class="item-main clearfix">
              <!-- left -->
              <div class="item-left">
                <div>
                  <img :src="item.userHead" alt class="item-img" />
                  <span class="item-user">{{item.userName}}</span>
                </div>

                <div class="item-num" style="padding-top: 7px;">订单号：{{item.orderNumber}}</div>
                <div class="item-time" style="padding-top: 7px;">
                  <span
                    class="item-price-left"
                  >提交时间：{{item.establishTime | date-format('YYYY-MM-DD hh:mm:ss')}}</span>
                </div>
              </div>
              <!-- middle -->

              <div class="item-middle clearfix">
                <div class="item-middle-img">
                  <img :src="item.focusImg" alt />
                </div>

                <div class="item-middle-content">
                  <div>商品：{{item.title}}</div>
                  <div style="padding-top: 6px;">
                    <!-- <span class="pr50">收件人：{{item.harvestUserName || '-'}}</span> -->
                    <span class="pr20">购买数量：{{item.orderNum || '-'}}</span>
                    <span class="pr20">下单用户：{{item.name || '-'}}</span>
                    <span class="pr20">下单用户手机号：{{item.phone || '-'}}</span>
                  </div>
                  <div style="padding-top: 6px;">
                    <span class="pr20">订金：{{item.paymentMoney ? '¥' + item.paymentMoney : '-'}}</span>
                    <span class="pr20">尾款：{{item.tailMoney ? '¥' + item.tailMoney : '-'}}</span>
                    <span class="pr20">总价：{{item.categoryPrice ? '¥' +item.categoryPrice : '-'}}</span>
                  </div>
                  <div style="padding-top: 6px;">
                    <span>医院备注：{{item.remarks || '-'}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- btn -->
            <div style="width: 190px;">
              <!-- status 0全部 1待预约 2待付尾款 3已完成 4退款订单 -->
              <!-- orderStatus订单状态1代预约 2待付尾款 3已完成  -->

              <!-- 订单状态1代预约 2待完成 3已完成 -->
              <div style="padding-bottom: 20px">
                状态：{{item.orderStatus === 0 ? '全部'
                : item.orderStatus === 1 ?'待预约确认'
                : item.orderStatus === 2 ?'待付尾款'
                : item.orderStatus === 3 ?'已完成'
                : '-'
                }}
              </div>

              <!-- refund售后状态 0无售后 1申请退款中 2同意退款 3拒绝退款 -->
              <!-- 已拒绝的不显示 -->
              <div style="padding-bottom: 20px" v-if="item.refund != 0 && item.refund != 3">
                售后状态：{{item.refund === 1 ? '申请退款中'
                : item.refund === 2 ?'同意退款'
                : '-'
                }}
              </div>
              <!-- 无售后 -->
              <div class="item-btn" v-if="item.refund === 0">
                <!-- <div>
                                    <el-button 
                                        size="mini" 
                                        @click.stop="toDetail(item)">查看</el-button>
                </div>-->

                <el-button
                  class="mr15"
                  size="mini"
                  type="primary"
                  v-if="item.orderStatus === 1"
                  @click.stop="toReserve(item)"
                >预约确认</el-button>
              </div>
              <!-- 有售后 -->
              <div class="item-btn" v-if="item.refund != 0">
                <!-- refund售后状态 0无售后 1申请退款中 2同意退款 3拒绝退款 -->
                <el-button
                  size="mini"
                  v-if="item.refund === 1"
                  @click.stop="toRefuseRefund(item)"
                >拒绝退款</el-button>
                <el-button
                  class="mr15"
                  size="mini"
                  type="primary"
                  v-if="item.refund === 1"
                  @click.stop="toRefund(item)"
                >同意退款</el-button>

                <el-button
                  class="mr15"
                  size="mini"
                  type="primary"
                  v-if="item.refund === 3"
                  @click.stop="toCancelRefund(item)"
                >撤销并同意退款</el-button>
              </div>
            </div>
          </div>
        </template>
      </list>
    </section>
    <!-- 预约弹窗 -->
    <el-dialog
      title="确认预约"
      class="grid-body"
      :visible.sync="aboutVisible"
      width="30%"
      @closed="handleAboutClose"
      :close-on-click-modal="false"
    >
      <el-row>
        <!-- <el-form :model="aboutForm" ref="aboutForm" label-width="100px">
          <el-form-item label="预约时间:" label-width="75px" prop="aboutTime">
            <el-date-picker v-model="aboutForm.aboutTime" type="datetime" placeholder="选择时间"></el-date-picker>
          </el-form-item>
        </el-form>-->
        <el-form>
          <el-form-item label="选择机构:">
            <el-select v-model="value" placeholder="请选择" @change="chang()">
              <el-option
                v-for="item in options"
                :key="item.hospitalId"
                :label="item.hospitalName"
                :value="item.hospitalId"
                @change="chang()"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="机构可预约日期">
            <el-select v-model="date" placeholder="请选择日期" @change="changeTime">
              <el-option
                v-for="(item,index) in dates"
                :disabled="item.isDis?false:true"
                :key="index"
                :label="item.time"
                :value="item.time"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="医院可预约时间">
            <el-select v-model="time" placeholder="请选择时间">
              <el-option
                v-for="(item,index) in times"
                :disabled="item.isDiss?false:true"
                :key="index"
                :label="item.time"
                :value="item.time"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAboutClose" size="small">取消</el-button>
        <el-button type="primary" @click="handleAboutSubmit" size="small">确定</el-button>
      </div>
    </el-dialog>
    <!-- 拒绝 -->
    <el-dialog
      class="grid-body"
      :visible.sync="refuseVisible"
      width="30%"
      @closed="onRefuseCancel"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-form :model="refuseForm" ref="refuseForm" label-width="100px">
          <el-form-item label label-width="0px" style="marginBottom: 0px">
            <el-input
              class="w220"
              v-model.trim="refuseForm.refuseReason"
              placeholder="请填写拒绝原因…"
              type="textarea"
              :rows="4"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onRefuseCancel" size="small">取消</el-button>
        <el-button type="primary" @click="onRefuseSubmit" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import expressOption from "@/components/express.js";
import list from "@/components/list.vue";
import Api from "@/api/index.js";
import format from "date-fns/format";
export default {
  name: "home",
  components: {
    list
  },
  props: {
    filter: {
      type: Object,
      default: () => {}
    },
    content: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: {
        url: "operateDoctorShopAdopt",
        list: "list",
        count: "count"
      }
    },
    // status 0全部 1待预约 2待完成 3已完成 4退款订单
    type: {
      type: String,
      default: "1"
    },

    refund: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      times: [],
      dates: [],
      isDisabled: true,
      radio: "1",
      headerIndex: "1",
      navIndex: 0,
      sendVisible: false,
      date: "",
      time: "",

      // 当前商品
      options: [],
      value: "",
      acitveOrder: {},
      expressOption,
      sendForm: {
        sendExpress: "",
        courierNumber: ""
      },
      sendRules: {
        sendExpress: [{ required: true, message: "请选择快递公司", trigger: "change" }],
        courierNumber: [{ required: true, message: "请输入快递单号", trigger: "blur" }]
      },
      // aboutForm: {
      //   aboutTime: ""
      // },
      aboutVisible: false,
      refuseForm: {
        refuseReason: ""
      },
      refuseVisible: false
    };
  },
  methods: {
    handleList(obj) {
      this.$nextTick(() => {
        this.$refs.list.getListData(obj);
        this.$emit("setContent");
      });
    },
    toDetail(item) {
      this.$router.push({
        path: "/order/index/detail",
        query: {
          orderId: item.orderId
        }
      });
    },
    toSend(item) {
      //    1 待发货2 已发货
      if (item.orderStatus === 2) {
        return;
      }
      this.acitveOrder = item;
      this.sendVisible = true;
    },
    // 设置金额
    setMoney(obj) {
      this.$emit("setData", obj);
    },
    // 待预约确认
    toReserve(item) {
      this.acitveOrder = item;
      this.aboutVisible = true;
      this.DoctorBindHospitalAll();
    },
    // 确认完成
    toFinish(item) {
      this.$confirm("是否确认完成?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.hospitalConfirmCompletionOrder({
            orderId: item.orderId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.$refs.list.getListData();
                  this.$message({
                    message: "确认完成",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "确认失败",
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
    // 同意退款
    toRefund(item) {
      this.$confirm("是否同意退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.hospitalAgreeRefund({
            orderId: item.orderId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.$refs.list.getListData();
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
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    // 撤销并同意
    toCancelRefund(item) {
      this.$confirm("是否撤销并同意退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.hospitalCancelAndAgreeToRefund({
            orderId: item.orderId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.$refs.list.getListData();
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
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    toRefuseRefund(item) {
      this.acitveOrder = item;
      this.refuseVisible = true;
    },
    // 改变日期
    chang() {
      this.findWhetheroperationRoomRecordInfoDate(this.value);
    },
    // 改变时间
    changeTime() {
      this.findWhetheroperationRoomRecordInfo(this.value, this.date);
    },
    // 查询当前医生的机构后一个月是否可预约
    findWhetheroperationRoomRecordInfoDate(hospitalId) {
      Api.findWhetheroperationRoomRecordInfoDate({
        hospitalId: hospitalId
      }).then(res => {
        this.dates = res.data;
        this.dates.forEach(item => {
          item.time = format(item.time, "YYYY-MM-DD");
          if (item.whether === 0) {
            item.isDis = false;
          } else {
            item.isDis = true;
          }
        });
      });
    },
    // 查询医生绑定的医院
    DoctorBindHospitalAll() {
      Api.findDoctorBindHospitalAll().then(res => {
        if (res && res.status === 200) {
          this.options = res.data.list;
        }
      });
    },
    // 查询医院可预约的时间
    findWhetheroperationRoomRecordInfo(hospitalId, date) {
      Api.findWhetheroperationRoomRecordInfo({
        hospitalId,
        date
      }).then(res => {
        Object.keys(res.data).forEach(item => {
          if (res.data[item] === 0) {
            this.times.push({
              time: item,
              whether: res.data[item],
              isDiss: false
            });
          } else {
            this.times.push({
              time: item,
              whether: res.data[item],
              isDiss: true
            });
          }
        });
      });
    },
    // 预约弹窗取消
    handleAboutClose() {
      // this.$refs.aboutForm.resetFields();
      this.aboutVisible = false;
    },
    // 预约弹窗确定
    handleAboutSubmit() {
      // this.$refs["aboutForm"].validate(valid => {
      // if (valid) {
      Api.hospitalUpdateAbout({
        date: this.date,
        orderId: this.acitveOrder.orderId,
        hospitalId: this.value,
        timeSlot: this.time
      })
        .then(res => {
          if (res && res.status === 200) {
            if (res.data.result) {
              this.handleAboutClose();
              this.$refs.list.getListData();
              this.$message({
                message: "预约成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "预约失败",
                type: "warning"
              });
            }
          }
        })
        .catch(function(error) {});
      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
      // });
    },
    // 拒绝弹窗取消
    onRefuseCancel() {
      this.refuseVisible = false;
      this.refuseForm.refuseReason = "";
      this.$refs.refuseForm.resetFields();
    },
    // 拒绝弹窗确定
    onRefuseSubmit() {
      const { acitveOrder } = this;
      let { refuseReason } = this.refuseForm;
      let params = {
        refuseReason,
        orderId: acitveOrder.orderId
      };

      Api["hospitalRefusetorefund"](params)
        .then(res => {
          if (res && res.status === 200) {
            if (res.data.result) {
              this.onRefuseCancel();
              this.$refs.list.getListData();
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
        .catch(error => {});
    },
    //
    errorHandler() {
      return true;
    },
    handleSendClose() {
      // this.acitveOrder = {};
      this.sendVisible = false;
      this.$refs.sendForm.resetFields();
    }
  }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color: #989898;
.mr15 {
  margin-right: 15px;
}
.pr20 {
  padding-right: 20px;
}
.menu-bar .el-menu-demo {
  padding-left: 55px;
}
.list-wrapper {
  width: 1100px;
  margin: 0 auto;
  font-size: 13px;
}
// nav
.nav-wrapper {
  padding: 10px 25px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  span {
    display: inline-block;
    margin-left: 30px;
    line-height: 32px;
    height: 32px;
    cursor: pointer;
  }
  .active {
    color: @theme-color;
  }
}

.item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
  border-top: 1px solid #ddd;
  font-size: 13px;
  color: #686868;
}
.item-wrapper:nth-child(1) {
  border-top: none;
}
.item-left {
  float: left;
  width: 240px;
  img {
    display: inline-block;
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }
  .item-user {
    vertical-align: top;
    display: inline-block;
    line-height: 34px;
    margin-left: 20px;
  }
}
.item-middle {
  float: left;
  .item-middle-img {
    float: left;
    width: 86px;
    font-size: 0;
    img {
      display: inline-block;
      width: 86px;
    }
  }
  .item-middle-content {
    float: left;
    margin-left: 15px;
  }
}
</style>

