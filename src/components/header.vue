<template>
  <div class="renzheng-header-wrapper">
    <div class="renzheng-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col class="logo-wrapper" :span="12">
          <img src="../assets/images/logo3.png" alt />
          医美邦
        </el-col>
        <el-col :span="6" :style="{textAlign: 'center'}" v-show="isShowLoginBtn">
          <el-button @click="toLogin">返回登录页</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
.renzheng-header-wrapper {
  height: 113px;
  line-height: 113px;
  border-bottom: 1px solid #ddd;
}
.renzheng-header {
  width: 1100px;
  margin: 0 auto;

  .logo-wrapper {
    color: #282828;
    font-size: 18px;
    img {
      width: 50px;
      height: 50px;
      display: inline-block;
      margin-right: 30px;
      border-radius: 4px;
      vertical-align: middle;
    }
  }
}
</style>

<script>
export default {
  created: function() {},
  mounted: function() {
    //console.log(this.$router.path);
  },
  props: ["isShowLoginBtn"],
  data() {
    return {}
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" })
    }
  }
}
</script>
