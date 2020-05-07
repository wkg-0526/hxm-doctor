<template>
  <div id="app">
    <template v-if="path === 'default'">
      <div>
        <!--  -->
        <div class="container-logo-wrapper">
          <div class="conteainer-logo">
            <img :src="logoImg" alt="医美邦" />
            <div class="logo-text">
              <p>医美邦</p>
              <p class="f12">医生后台管理中心</p>
            </div>
          </div>
          <div></div>

          <div class="conteainer-logo-user">
            <el-badge
              :value="noticeData"
              :hidden="noticeData===0?true:false"
              class="item"
              @click="goNotice"
            >
              <i class="el-icon-bell" :style="{fontSize:'20px',color:'#fff'}" @click="goNotice"></i>
            </el-badge>

            <el-avatar :src="userData.portrait" :size="44" :style="{marginLeft:'34px'}"></el-avatar>
            <span>{{userData.fullName}}</span>
          </div>
        </div>
        <el-container class="container-wrap">
          <div class="container-aside">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              router
              :default-openeds="openeds"
              text-color="#989898"
            >
              <template v-for="(item,index) in routesData" v-if="!item.hidden">
                <!-- 有children -->
                <el-submenu :index="index+''" :key="index" v-if="item.isPull">
                  <template slot="title">
                    <span class="icon-wrapper">
                      <i :class="item.icon + ' iconfont'"></i>
                    </span>

                    <span :style="{paddingLeft: '15px'}">{{item.name}}</span>
                  </template>
                  <el-menu-item
                    v-for="child in item.children"
                    :index="item.path + '/' + child.path"
                    v-if="!child.hidden"
                    :key="child.name"
                  >
                    <span class="dot">{{child.name}}</span>
                  </el-menu-item>
                </el-submenu>

                <el-menu-item
                  :index="item.path + '/' + item.children[0].path"
                  :key="index"
                  v-if="!item.isPull && item.children && item.children.length > 0"
                  :class="$route.path.split('/').indexOf(item.path.replace('/','')) > -1 ? 'is-active' : ''"
                >
                  <template>
                    <span class="icon-wrapper">
                      <span :class="item.icon + ' iconfont'"></span>
                    </span>
                    <span slot="title" :style="{paddingLeft: '15px'}">{{item.name}}</span>
                  </template>
                </el-menu-item>
                <el-menu-item
                  :index="item.path"
                  :key="index"
                  v-if="(!item.isPull && !item.children) || (!item.isPull && item.children && item.children.length === 0)"
                  :class="$route.path === item.path ? 'is-active' : ''"
                >
                  <template>
                    <span class="icon-wrapper">
                      <i :class="item.icon + ' iconfont'"></i>
                    </span>
                    <span slot="title" :style="{paddingLeft: '15px'}">{{item.name}}</span>
                  </template>
                </el-menu-item>
              </template>

              <el-menu-item @click="loginOut" style="color: rgb(152, 152, 152);">
                <template>
                  <span class="icon-wrapper">
                    <i :class="'iconguanji iconfont'"></i>
                  </span>

                  <span slot="title" :style="{paddingLeft: '15px'}">退出登录</span>
                </template>
              </el-menu-item>
            </el-menu>
          </div>
          <el-main class="container-main">
            <!-- <el-header class="app-header">
					   <div class="user-wrapper">
						   <el-dropdown trigger="click" @command="command">
								<span class="el-dropdown-link">
									<span>{{userName}}</span>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="xgmm">修改密码</el-dropdown-item>
									<el-dropdown-item command="tc">退出</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						   
					   </div>
            </el-header>-->
            <div class="app-main">
              <router-view />
            </div>
          </el-main>
        </el-container>
      </div>
    </template>
    <!-- 登陆页面 -->
    <template v-else-if="path === 'login' || 'full'">
      <router-view />
    </template>
  </div>
</template>


<script>
import logoImg from "@/assets/images/logo3.png";
import { deepCopy } from "./util/utils.js";
import Api from "@/api/index.js";
import { mapState, mapActions, mapGetter } from "vuex";
export default {
  name: "App",
  data() {
    return {
      // 默认打开的左侧菜单
      username: "",
      url: "",
      openeds: [],
      path: "default",
      logoImg: logoImg,
      routesData: [],
      unReadCount: 0
      // userName: ''
    };
  },
  computed: {
    ...mapState({
      userData: state => state.userData,
      noticeData: state => state.noticeData
    })
    // userName () {
    // 	return this.$store.state.userName
    // }
  },
  created() {
    console.log(this.noticeData, 11);
    this.url = localStorage.getItem("url");
    this.username = localStorage.getItem("username");
  },
  updated: function() {
    /* 判断显示的组件 */
    let path = this.$route.path;
    if (path === "/login" || path === "/") {
      this.path = "login";
    } else if (path === "/renzheng" || path === "/result" || path === "/forgetPsd") {
      this.path = "full";
    } else {
      this.path = "default";
      // this.doctorFindUnreadCount();
    }
    this.setAdminMenu();
  },
  mounted() {
    this.setAdminMenu();
    // this.doctorFindUnreadCount();
    const openeds = [];
    for (let i = 0; i < this.$router.options.routes.length; i++) {
      if (this.$route.path.indexOf(this.$router.options.routes[i].path) > -1) {
        openeds.push(i + "");
        break;
      }
      if (openeds.length > 0) {
        break;
      }
    }
    this.openeds = openeds;

    this.getUserInfo();
    // console.log(this.$router);
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      Api["findAuthenticationDoctorDeatail"]({})
        .then(res => {
          if (res && res.status === 200) {
            if (res.data) {
              this.$store.dispatch("setUserData", res.data);
            }
          }
        })
        .catch(function(error) {
          this.$message({
            message: "退出失败",
            type: "warning"
          });
        });
    },
    setAdminMenu() {
      this.routesData = this.$router.options.routes;
      // console.log(this.routesData)
    },
    deepCopy(p, c) {
      var c = c || {};
      for (var i in p) {
        if (typeof p[i] === "object" && p[i] !== null) {
          c[i] = p[i].constructor === Array ? [] : {};
          this.deepCopy(p[i], c[i]);
        } else {
          c[i] = p[i];
        }
      }
      return c;
    },
    // 菜单点击
    command(key) {
      if (key === "tc") {
        this.tc();
      } else if (key === "xgmm") {
        this.xgmm();
      }
    },
    // 点击退出
    tc() {
      // localDb.clear('3')
      this.$router.push({ path: "/login" });
    },
    // 修改密码
    xgmm() {
      this.$router.push({ path: "/resetPassword" });
    },
    // 退出登录
    loginOut() {
      localStorage.removeItem("url");
      localStorage.removeItem("username");
      let self = this;
      this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api["exit"]({})
            .then(res => {
              if (res && res.status === 200) {
                this.$router.push({
                  path: "/"
                });
                this.$message({
                  message: "退出成功",
                  type: "success"
                });
              }
            })
            .catch(function(error) {
              this.$message({
                message: "退出失败",
                type: "warning"
              });
            });
        })
        .catch(() => {});
    },
    // 跳转到消息通知页面
    goNotice() {
      this.$router.push({ path: "/notice/msgNotice" });
    }
  }
};
</script>

<style lang='less' scoped>
@theme-color: #35b3bc;
@text-color: #989898;
.f12 {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
}
.container-main {
  max-height: 100vh;
  position: relative;
}
// 右侧内容
.app-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.el-main {
  padding: 0px;
}
.container-logo-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(left, rgba(102, 200, 207, 1), rgba(102, 200, 207, 1));
  background: -ms-linear-gradient(left, rgba(102, 200, 207, 1), rgba(102, 200, 207, 1));
  background: -webkit-linear-gradient(left, rgba(102, 200, 207, 1), rgba(102, 200, 207, 1));
  background: -moz-linear-gradient(left, rgba(102, 200, 207, 1), rgba(102, 200, 207, 1));

  padding-left: 30px;
  border-bottom: 1px solid #e6e6e6;
  height: 96px;
  // background: #f0f2f5;
  .logo-text {
    flex: 1;
    margin-left: 10px;
    color: rgba(255, 255, 255, 1);
  }
  .conteainer-logo {
    display: flex;
    width: 400px;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
  }
  .conteainer-logo-user {
    margin-right: 100px;
    span {
      vertical-align: top;
      display: inline-block;
      line-height: 44px;
      color: rgba(255, 255, 255, 1);
      margin-left: 12px;
    }
  }
}

.container-aside {
  color: @text-color;
  font-size: 16px;
  max-height: calc(~"100vh -96px");
  overflow: auto;
  img {
    width: 36px;
    height: 42px;
    margin-right: 12px;
    margin-left: 30px;
  }
}
.el-menu-vertical-demo {
  .is-active {
    outline: 0;
    color: @theme-color;
    > .dot::before {
      background: @theme-color;
    }
  }
  .dot {
    position: relative;
    margin-left: 15px;
  }
  .dot::before {
    content: "";
    position: absolute;
    left: -10px;
    top: 50%;
    margin-top: -3px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #989898;
  }
}
.el-menu-vertical-demo {
  height: calc(100vh - 96px);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}
.el-badge {
  margin-top: 15px;
  cursor: pointer;
  .el-icon-bell {
    margin-right: 5px;
  }
}
</style>

