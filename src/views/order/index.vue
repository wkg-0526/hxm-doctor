<!--
 * @Author: chenamin
 * @LastModifiedBy: chenamin
 * @Date: 2019-12-03 12:39:10
 * @LastEditTime: 2020-03-29 18:04:08
 * @FilePath: /xiaomei-jg/src/views/order/index.vue
 * @Description: 订单查询
 -->

<template>
  <div class="order-wrapper">
    <div class="search-top-wrapper">
      <!-- 搜索区 -->
      <el-form :inline="true" :model="filterForm" class="demo-form-inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input v-model="filterForm.orderNumber" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="filterForm.name" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="订单时间">
              <el-date-picker
                v-model="rangeDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单产品">
              <el-input v-model="filterForm.title" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onExport">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="money-wrapper">
      <span class="mr10">订金总额: {{depositCount}}</span>
      <span class="mr10">尾款总额: {{tailMoneyCount}}</span>
      <span>入账总额: {{totalArrivalCount }}</span>
    </div>
    <div class="tab-wrapper">
      <el-tabs v-model="headerIndex" @tab-click="switchTab" class="menu-tab">
        <el-tab-pane label="全部" name="1">
          <listComp
            key="1"
            ref="listCompRef1"
            :filter="{
                            ...filterForm,
                            status: '0',
                            order: '0'
                        }"
            :data="{
                            url: 'hospitalFindOrderAll',
                            list: 'list',
                            count: 'count'
                        }"
            @setData="setData"
          />
        </el-tab-pane>
        <el-tab-pane label="待预约确认" name="2">
          <listComp
            key="2"
            ref="listCompRef2"
            :filter="{
                            ...filterForm,
                            status: '1',
                            order: '0'
                        }"
            :data="{
                            url: 'hospitalFindOrderAll',
                            list: 'list',
                            count: 'count'
                        }"
            @setData="setData"
          />
        </el-tab-pane>
        <el-tab-pane label="待付尾款" name="3">
          <listComp
            key="3"
            ref="listCompRef3"
            :filter="{
                            ...filterForm,
                            status: '2',
                            order: '0'
                        }"
            :data="{
                            url: 'hospitalFindOrderAll',
                            list: 'list',
                            count: 'count'
                        }"
            type="2"
            @setData="setData"
          />
        </el-tab-pane>
        <el-tab-pane label="已完成订单" name="4">
          <listComp
            key="4"
            ref="listCompRef4"
            :filter="{
                            ...filterForm,
                            status: '3',
                            order: '0'
                        }"
            :data="{
                            url: 'hospitalFindOrderAll',
                            list: 'list',
                            count: 'count'
                        }"
            @setData="setData"
          />
        </el-tab-pane>
        <el-tab-pane label="已退款订单" name="5">
          <listComp
            key="5"
            ref="listCompRef5"
            :filter="{
                            ...filterForm,
                            status: '4',
                            order: '0'
                        }"
            :data="{
                            url: 'hospitalFindOrderAll',
                            list: 'list',
                            count: 'count'
                        }"
            @setData="setData"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import listComp from "./components/productList"
import sendGoodComp from "./components/sendGood"
import searchLink from "@/components/search.vue"
import format from "date-fns/format"
import Api from "@/api/index.js"
export default {
  name: "home",
  components: {
    listComp,
    searchLink,
    sendGoodComp
  },
  data() {
    return {
      // 订单时间
      rangeDate: [],
      // tab
      headerIndex: "1",
      // 搜索表单
      filterForm: {
        orderNumber: "",
        name: "",
        title: "",
        startTime: "",
        endTime: ""
      },
      // 金额数据
      depositCount: 0,
      tailMoneyCount: 0,
      totalArrivalCount: 0
    }
  },
  watch: {
    rangeDate: function(newVal, oldVal) {
      if (newVal !== null) {
        this.filterForm.startTime = format(newVal[0], "YYYY-MM-DD")
        this.filterForm.endTime = format(newVal[1], "YYYY-MM-DD")
      } else {
        this.filterForm.startTime = ""
        this.filterForm.endTime = ""
      }
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.headerIndex = this.$route.query.type
    }
  },
  methods: {
    /**
     * @description: 点击搜索
     * @param {type}
     * @return:
     */

    onSearch(val) {
      this.$refs["listCompRef" + this.headerIndex].handleList({})
    },
    setData(obj) {
      for (var key in obj) {
        this[key] = obj[key]
      }
    },
    // nav切换
    switchTab(item, index) {
      this.$refs["listCompRef" + this.headerIndex].handleList({
        page: 1
      })
    },
    /**
     * @description: 点击数据导出
     * @param {type}
     * @return:
     */
    onExport() {
      const { filterForm, headerIndex } = this

      Api.downloadFile("/doctor/doctorFindOrderAll.json", {
        order: 1, //  0查询数据 1导出数据
        status: Number(headerIndex) - 1,
        ...filterForm
      })
    }
  }
}
</script>
<style lang='less' scoped>
@theme-color: #ff8232;
@text-color: #989898;
.order-wrapper {
  padding-top: 22px;
  min-height: 100vh;
}
.money-wrapper {
  padding: 15px 0 15px 55px;
  line-height: 40px;
  border-bottom: 1px solid #e6e6e6;
}
.search-top-wrapper {
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 58px;
  .search-select {
    position: absolute;
    right: 58px;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
<style lang='less'>
.order-wrapper {
  .tab-wrapper .el-tabs__header {
    background: #fff;
    margin-bottom: 0px;
  }
  .menu-right,
  .menu-select-right {
    position: absolute;
    right: 40px;
    top: 0;
    height: 70px;
    z-index: 3;
  }
  /deep/ .el-button--primary {
    color: #fff;
    background-color: rgba(102, 200, 207, 1);
    border-color: rgba(102, 200, 207, 1);
  }
  /deep/ .el-button--primary:hover {
    color: #fff;
    background-color: rgba(102, 200, 207, 1);
    border-color: rgba(102, 200, 207, 1);
  }
  /deep/ .el-tabs__item.is-active {
    color: rgba(102, 200, 207, 1);
    border-color: rgba(102, 200, 207, 1);
  }
  /deep/ .el-tabs__item.is-active:hover {
    color: rgba(102, 200, 207, 1);
  }
  /deep/ .el-tabs__item:hover {
    color: rgba(102, 200, 207, 1);
  }
  /deep/ .el-tabs__active-bar {
    background-color: rgba(102, 200, 207, 1);
  }
}
</style>



