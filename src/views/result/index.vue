<template>
  <div class="result-wrapper">
    <headerLink :isShowLoginBtn="true" />
    <auditing v-if="type == '0'" />
    <refuse v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import auditing from "./component/auditing";
import refuse from "./component/refuse";
import headerLink from "../renzheng/component/header";
import Api from "../../api/index";

//
export default {
  name: "login",
  components: {
    auditing,
    refuse,
    headerLink
  },
  data() {
    return {
      // 登录6 审核中，登录7 已拒绝
      type: ""
    };
  },
  mounted() {
    this.type = this.$route.query.type;
    this.getDetail();
  },
  methods: {
    //
    getDetail() {
      Api.findHospitalDetail().then(res => {
        console.log(res);
        this.type = res.data.status;
      });
    },
    // 跳转到认证页面
    toRenZheng() {
      this.$router.push({ path: "/renzheng" });
    }
  }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color: #989898;
.login-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-main {
  position: absolute;
  width: 860px;
  height: 512px;
  background: #fff;
  left: 50%;
  top: 50%;
  margin-left: -449px;
  margin-top: -256px;
  // background: url("../assets/images/main-bg.png");
  // background-size: cover;
}

.extra-btn {
  padding-top: 20px;
  color: #fff;
}
</style>

