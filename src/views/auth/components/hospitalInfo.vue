<template>
  <div class="auth-detail-hospital">
    <div class="hospital-title">所在医院（{{value.hospitalList ? value.hospitalList.length : 0}}):</div>
    <template v-for="(item, index) in value.hospitalList">
      <div class="hospital-item" :key="index">
        <el-avatar :size="48" :src="item.hospitalLog" @error="errorHandler">
          <el-avatar icon="el-icon-user-solid" style="fontSize: 20px;"></el-avatar>
        </el-avatar>
        <div style="marginLeft: 40px;">
          <div class="hospital-name">{{item.hospitalName}}</div>
          <!-- <div class="top-time">申请时间：{{value.empowerTime | date-format('YYYY-MM-DD')}}</div> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

import Api from "@/api/index.js";

export default {
  name: "auth",
  components: {},
  props: {
    value: Object
  },
  data() {
    return {
      type: "",
      id: "",
      detailData: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    errorHandler() {
      return true;
    }
  }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color: #989898;
.hospital-title {
  padding-bottom: 20px;
}
.hospital-item {
  display: flex;
  padding-bottom: 40px;
}
.top {
  display: flex;
}
.hospital-name {
  padding-top: 8px;
  // font-size: 13px;
  color: #3e3e3e;
}
.top-time {
  padding-top: 16px;
  color: #989898;
}
.person-ul {
  padding-top: 16px;
  li {
    width: 33%;
    float: left;
    padding-bottom: 14px;
  }
}
</style>
