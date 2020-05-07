<!--  -->
<template>
  <div class="financial-wrapper">
    <div class="financial-account block-wrapper">
      <div class="top-item-ali">
        <span class="mr10">支付宝账户</span>
        <span style="padding: 0 22px;color: #989898;" v-if="isUpdate">{{ aliData.aliAccount}}</span>
        <el-button round size="mini" @click="toSet">
          {{
          isUpdate ? '更换账号' : '绑定账号'}}
        </el-button>
      </div>
      <div v-if="isUpdate">
        <el-button round size="mini" @click="toWithdraw" type="primary">提现至支付宝</el-button>
      </div>
    </div>
    <section class="top-wrapper block-wrapper">
      <div class="top-item mr10">
        <div class="top-item-title">账户余额</div>
        <div class="top-item-num" style="color:#35b3bc">{{topData.money}}</div>
      </div>

      <div class="top-item mr10 top-item-big">
        <div class="top-item-title">总收入</div>
        <div class="top-item-num">{{topData.grossIncome}}</div>
      </div>

      <div class="top-item">
        <div class="top-item-title">本月收入</div>
        <div class="top-item-num" style="color:#35b3bc">{{topData.thisMonthGrossIncome}}</div>
      </div>
    </section>

    <!-- 月订单量  -->
    <section class="order-wrapper block-wrapper">
      <!-- 上面部分 -->
      <div class="title-wrapper clearfix">
        <div class="title-left">
          <img :src="increaseUrl" alt />
          <span class="title-left-text">月收入</span>
        </div>
        <div class="title-right">
          <img
            :src="shangyinianUrl"
            alt
            class="title-left-arrow mr22 pointer"
            @click="toYear('left')"
          />
          <el-dropdown class="title-drop pointer" @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link">{{thisYear}}年</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in yearOption" :key="item" :command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <img
            :src="xiayinianUrl"
            alt
            class="title-right-arrow ml22 pointer"
            @click="toYear('right')"
          />
        </div>
      </div>
      <LineLink :option="lineOption" :height="280" ref="lineLink" id="lineLink"></LineLink>
    </section>
  </div>
</template>

<script>
import Api from "@/api/index.js";

import LineLink from "@/components/echart/index.vue";
import {
  lineOption,
  histogramOption
} from "@/components/echart/indexOption.js";
import nianlingUrl from "@/assets/images/nianling.png";
import increaseUrl from "@/assets/images/increase.png";
import shangyinianUrl from "@/assets/images/shangyinian.png";
import xiayinianUrl from "@/assets/images/xiayinian.png";
export default {
  components: {
    LineLink
  },
  data() {
    return {
      nianlingUrl,
      increaseUrl,
      shangyinianUrl,
      xiayinianUrl,
      topData: {},
      orderData: {},
      ageData: {},
      lineOption,
      histogramOption,
      dropData: [],
      thisYear: 2020,
      yearOption: [],
      isUpdate: false,
      aliData: {}
    };
  },
  mounted() {
    this.getYearData();
    this.getTop();

    this.getOrder();
    // 查看是否绑定
    this.getAliData();
  },

  methods: {
    getAliData() {
      Api.findHospitalBindAccountInfo({})
        .then(res => {
          if (res && res.data) {
            // 未绑定
            if (res.data.result === 500) {
              this.isUpdate = false;
            } else {
              this.aliData = {
                aliAccount: res.data.aliAccount,
                name: res.data.name
              };
              this.isUpdate = true;
            }
          }
        })
        .catch(error => {
          this.disabled = false;
        });
    },

    getYearData() {
      let endYear = new Date().getFullYear();
      let startYear = new Date().getFullYear() - 50;
      let arr = [];
      for (var i = startYear; i <= endYear; i++) {
        arr.unshift(i);
      }
      this.thisYear = endYear;
      this.yearOption = arr;
    },
    getTop() {
      Api.hospitalGrossIncome({})
        .then(res => {
          if (res && res.data) {
            this.topData = res.data;
          }
        })
        .catch(error => {});
    },

    getOrder() {
      const self = this;
      Api.findHospitalThisYearGrossIncome({
        year: this.thisYear
      })
        .then(res => {
          if (res && res.data) {
            let _data = res.data.list.map(v => v.count);
            let _dataMonth = res.data.list.map(v => v.month + "月");
            this.lineOption.series[0].data = _data;
            this.lineOption.xAxis.data = _dataMonth;
            this.$nextTick(function() {
              self.$refs.lineLink && self.$refs.lineLink.initPie();
            });
            this.orderData = res.data;
          }
        })
        .catch(error => {
          this.disabled = false;
        });
    },
    // 跳转到设置支付宝
    toSet() {
      this.$router.push({
        path: "/financial/setAli",
        query: { isUpdate: this.isUpdate }
      });
    },
    // 跳转到提现至支付宝
    toWithdraw() {
      this.$router.push({
        path: "/financial/aliWithdraw"
      });
    },
    handleCommand(command) {
      this.thisYear = command;
      this.getOrder();
    },
    toYear(type) {
      if (type === "left") {
        if (this.thisYear === this.yearOption[this.yearOption.length - 1]) {
          return;
        }
        this.thisYear = this.thisYear - 1;
      } else if (type === "right") {
        if (this.thisYear === this.yearOption[0]) {
          return;
        }
        this.thisYear = this.thisYear + 1;
      }
      this.getOrder();
    }
  }
};
</script>

<style lang='less' scoped>
.financial-wrapper {
  // background: #F5F7F8;
  padding-bottom: 10px;
  min-height: calc(~"100vh - 96px");
}
.block-wrapper {
  width: 864px;
  margin: 0 auto 23px;
}
.financial-account {
  padding-top: 70px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
// 头部统计
.top-wrapper {
  padding-top: 40px;
  display: flex;
  .mr10 {
    margin-right: 20px;
  }

  .top-item {
    border-radius: 8px;
    border: 1px solid rgba(221, 221, 221, 1);
    flex: 1;
    padding: 20px 0px 25px 0px;
    border-radius: 4px;
    background: #fff;
    img {
      display: inline-block;
      width: 15px;
      height: 16px;
    }
    .top-item-title {
      font-size: 18px;
      text-align: center;
      color: #989898;
      vertical-align: top;
    }
    .top-item-num {
      text-align: center;
      padding-top: 25px;
      font-weight: bold;
      font-size: 36px;
      line-height: 32px;
    }
    .top-item-ali {
      margin-top: 8px;
      text-align: center;
    }
    .top-item-ali-btn {
      margin-top: 28px;
      text-align: center;
    }
  }
  .top-item-big {
    width: 302px;
  }
}

.order-wrapper {
  background: #fff;
}
.title-wrapper {
  padding: 17px 20px 0px 20px;
  img {
    position: relative;
    top: 2px;
  }
  .title-left-text {
    padding-left: 10px;
  }
  .title-left {
    float: left;
  }
  .title-right {
    float: right;
  }
}
.mr22 {
  margin-right: 22px;
}
.ml22 {
  margin-left: 22px;
}
</style>
<style lang='less'>
ul.el-dropdown-menu {
  max-height: 300px;
  overflow: auto;
}
</style>
