<template>
  <div class="child-wrapper">
    <section class="list-wrapper">
      <!-- activeClassification: activeClassification.name === '全部' ? '' : activeClassification.name -->
      <list
        :data="data"
        :filter="filter"
        ref="list"
        :pageSize="7"
        @setTotal="setTotal"
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
                  >提交时间：{{item.paymentTime | date-format('YYYY-MM-DD hh:mm:ss')}}</span>
                </div>
              </div>
              <!-- middle -->

              <div class="item-middle clearfix">
                <img :src="item.focusImg" alt class="item-img" />
                <div class="item-middle-content">
                  <div style="padding-top: 6px;">商品：{{item.title}}</div>
                  <div style="padding-top: 12px;">
                    <span class="pr50">购买数量：{{item.orderNum || '-'}}</span>
                    <span class="pr50">订单价格：{{'¥' + item.paymentMoney || '-'}}</span>
                  </div>
                  <div style="padding-top: 8px;">退换货原因：{{item.refundReason || '-'}}</div>
                </div>
              </div>
            </div>

            <!-- btn -->
            <div style="width: 130px;">
              <!-- refund 售后状态 （1申请换货
2 申请退货退款3运营同意退货 4.运营同意换货5运营拒绝退货6 运营拒绝换货
              7用户已填写退货快递8 商家确认收货(退款已完成)）-->
              <div class="item-btn">
                <div v-if="item.refund === 1 || item.refund === 2">
                  <el-button size="mini" class="yellow" @click.stop="toDetail(item)">待处理</el-button>
                </div>
                <div v-if="item.refund === 3 || item.refund === 4 || item.refund === 7">
                  <el-button size="mini" type="primary" @click.stop="toDetail(item)">处理中</el-button>
                </div>
                <div v-if="item.refund === 8 ||  item.refund === 5 || item.refund === 6">
                  <el-button size="mini" @click.stop="toDetail(item)">已完成</el-button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </list>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import classification from "@/components/classification.js";
import list from "@/components/list.vue";
import Api from "@/api/index.js";
export default {
  name: "home",
  components: {
    list
  },
  props: {
    content: {
      type: String,
      default: ""
    },

    // 1是全部商品，2是举报处理
    type: {
      type: String,
      default: "1"
    },
    time: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: {
        url: "operateFindShopOrderAfterSale",
        list: "array",
        count: "count"
      },
      navIndex: 0
      // navData: classification,
      // filter: {
      //     // activeClassification: ,
      //     // content: this.content
      // },
      // activeClassification: {name: ''}
    };
  },
  computed: {
    filter: function() {
      console.log(this.time, "aaa");
      return {
        // classification: this.activeClassification.name === '全部' ? '' : this.activeClassification.name,
        content: this.content ? this.content : ""
        // time: this.time ? this.time: ''
      };
    }
  },
  methods: {
    // 头部切换
    handleSelect() {},
    // nav切换
    switchTab(item, index) {
      this.navIndex = index;
      this.activeClassification = item;
      this.handleList({
        page: 1
      });
    },
    handleList(obj) {
      this.$nextTick(() => {
        this.$refs.list.getListData(obj);
        this.$emit("setContent");
      });
    },
    toDetail(item) {
      this.$router.push({
        path: "/order/index/sendGoodDetail",
        query: {
          orderId: item.orderId
        }
      });
    },
    setTotal(total) {
      this.$emit("setData", "total", total);
    },
    //
    errorHandler() {
      return true;
    },
    onIgnore(item) {
      this.$confirm("是否忽略该举报?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deletereportDoctorShopInfo({
            shopId: item.shopId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.handleList({
                    init: true
                  });
                  this.$message({
                    message: "忽略成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "忽略失败",
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
    // 删除商品
    onDelete(item) {
      this.$confirm("是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deleteDoctorShop({
            shopId: item.shopId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.handleList({
                    init: true
                  });
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
    }
  }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color: #989898;
.pr50 {
  padding-right: 50px;
}
.menu-bar .el-menu-demo {
  padding-left: 55px;
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
.list-wrapper {
  width: 1068px;
  margin: 0 auto;
  font-size: 13px;
}
.item-left {
  float: left;
  width: 260px;
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
  img {
    float: left;
    width: 86px;
    height: 86px;
  }
  .item-middle-content {
    float: left;
    margin-left: 30px;
  }
}
.item-right {
}

.item-btn {
  display: flex;
  justify-content: space-between;
}
</style>

