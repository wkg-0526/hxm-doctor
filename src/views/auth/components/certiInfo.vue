<template>
  <div class="auth-detail-certi">
    <div class="certi-title">证书资料：</div>
    <!-- 执业证 -->
    <div class="certi-title-sub">执业证:</div>
    <div class="certi-item-wrapper clearfix">
      <template v-for="(item, index) in value.certificateOfPractice">
        <div class="certi-item" :key="index">
          <el-image style="width: 320px; height: 180px" :src="item" fit="fill"></el-image>
        </div>
      </template>
    </div>
    <!-- 资格证 -->
    <div class="certi-title-sub">资格证:</div>
    <div class="certi-item-wrapper clearfix">
      <template v-for="(item, index) in value.qualifications">
        <div class="certi-item" :key="index">
          <el-image style="width: 320px; height: 180px" :src="item" fit="fill"></el-image>
        </div>
      </template>
    </div>
    <!-- 案例 -->
    <div class="certi-title-sub">案例:</div>
    <div class="certi-item-wrapper clearfix">
      <template v-for="(item, index) in value.caseDiagram">
        <div class="certi-item" :key="index">
          <el-image style="width: 320px; height: 180px" :src="item" fit="fill"></el-image>
        </div>
      </template>
    </div>
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
.certi-title {
  // padding-bottom: 20px;
}
.certi-title-sub {
  padding-top: 20px;
}
.certi-item {
  margin-right: 30px;
  margin-top: 20px;
  float: left;
}
.hospital-name {
  padding-top: 8px;
  // font-size: 13px;
  color: #3e3e3e;
}
</style>
