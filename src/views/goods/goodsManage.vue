<template>
  <div class="child-wrapper">
    <!-- 搜索区 -->

    <el-form :inline="true" :model="filterForm" class="search-form-wrapper">
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目发布号">
            <el-input v-model="filterForm.shopId" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称">
            <el-input v-model="filterForm.title" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目状态">
            <el-select v-model="filterForm.auditStatus" placeholder="请选择" clearable>
              <template v-for="(val) in auditStatusOption">
                <el-option :label="val.name" :value="val.key" :key="val.key"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="提交时间">
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
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 按钮区 -->
    <div class="btn-wrapper">
      <span style="margin-right: 15px;">总数： {{total}}</span>
      <el-button @click="onExport">数据导出</el-button>
    </div>

    <!-- 分类去 -->
    <div class="nav-wrapper">
      <template v-for="(item, index) in classificationoptions">
        <span
          :key="index"
          :class="{active: navIndex===index} "
          @click="switchTab(item, index)"
        >{{item.name}}</span>
      </template>
    </div>
    <section class="list-wrapper">
      <!-- activeClassification: activeClassification.name === '全部' ? '' : activeClassification.name -->

      <list
        :data="data"
        :gutter="16"
        :filter="filterForm"
        ref="list"
        :pageSize="9"
        @setData="setData"
      >
        <template v-slot:default="{item}">
          <div class="item-wrapper" @click="toDetail(item)">
            <div class="item-top clearfix">
              <div class="item-left">
                <img :src="item.focusImg" alt class="item-img" />
              </div>
              <div class="item-right">
                <h6 class="item-h6">{{item.title}}</h6>
                <div class="item-desc">{{item.classification}}</div>
                <div class="item-price">
                  <span class="item-price-left">¥{{item.price || '-'}}</span>
                  <!-- auditStatus  0审核中1 已通过审核 2已拒绝  3取消申请 -->
                  <span
                    v-if="item.auditStatus == 0"
                    class="item-price-right"
                    style="color: #35b3bc;"
                  >审核中</span>
                  <!-- status 0下架 1上架 -->
                  <span
                    v-if="item.auditStatus == 1"
                    class="item-price-right"
                    style="color: #35b3bc;"
                  >{{item.status == 1 ? '上架' : ''}}{{item.status == 2 ? '待上架' : ''}}{{item.status == 0 ? '已下架' : ''}}</span>
                  <span
                    v-if="item.auditStatus == 2"
                    class="item-price-right"
                    style="color: #35b3bc;"
                  >已拒绝</span>
                  <span
                    v-if="item.auditStatus == 3"
                    class="item-price-right"
                    style="color: #35b3bc;"
                  >取消申请</span>
                </div>
              </div>
            </div>
            <!-- num -->
            <div class="item-num">
              <span class="item-num-span">
                <span style="padding-right: 5px;">项目发布号</span>
                {{item.shopId || 0}}
              </span>
              <span class="item-num-span">
                <span style="padding-right: 5px;">曝光量</span>
                {{item.exposureCount || 0}}
              </span>
            </div>
            <!-- btn -->
            <div class="item-btn">
              <div>
                <!-- status 状态 （0未上架 1已上架） -->
                <!-- auditStatus  0审核中1 已通过审核 2已拒绝 3取消申请 -->

                <el-button
                  size="mini"
                  v-if="item.auditStatus === 1"
                  @click.stop="onLower(item)"
                >{{item.status==1 ? '下架' : ''}}{{item.status==0 ? '上架' : ''}}{{item.status==2 ? '上架' : ''}}</el-button>
                <el-button size="mini" v-if="!item.auditStatus" :disabled="true">审核中</el-button>
                <el-button
                  size="mini"
                  v-if="!item.auditStatus"
                  @click.stop="onCancelApply(item)"
                >取消申请</el-button>
                <el-button size="mini" v-if="item.auditStatus === 2" :disabled="true">已拒绝</el-button>
                <el-button
                  size="mini"
                  v-if="item.auditStatus === 1 || item.auditStatus === 3"
                  @click.stop="onEdit(item)"
                >修改</el-button>

                <div style="display: inline-block;">
                  <el-dropdown
                    placement="bottom-start"
                    @command="handleAction($event,item)"
                    v-if="item.auditStatus === 1 && item.status"
                    class="ml10"
                    trigger="click"
                  >
                    <el-button class="el-dropdown-link action-btn" size="mini" @click.stop>
                      排序
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <template v-for="(item ) in actionColumn">
                        <el-dropdown-item :command="item.id" :key="item.id">{{item.name}}</el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>

                <!-- type 0取消兑换商品 1设置为兑换商品 -->
                <!-- <el-button 
                                    size="mini" 
                @click.stop="onSet(item)">{{item.type ? '取消兑换商品' : '设置为兑换商品'}}</el-button>-->
              </div>
              <!-- 上架状态才有这个操作 -->

              <el-button size="mini" @click.stop="onDelete(item)">删除</el-button>
            </div>
          </div>
        </template>
      </list>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
// import classification from "@/components/goodClassification.js";
import list from "@/components/list.vue";
import searchLink from "@/components/search.vue";
export default {
  name: "home",
  components: {
    list,
    searchLink
  },
  data() {
    return {
      rangeDate: [],
      headerIndex: "1",
      navIndex: 0,
      classificationoptions: [],
      data: {
        url: "findhospitalShopInfoUserId"
      },
      // 搜索表单
      filterForm: {
        shopId: "",
        title: "",
        classification: "",
        auditStatus: "", // 0审核中 1审核拒绝 2上架 3下架 status =0查询 1导出
        startTime: "",
        endTime: "",
        status: 0
      },
      // 项目状态选项
      auditStatusOption: [
        { key: 0, name: "审核中" },
        { key: 1, name: "审核拒绝" },
        { key: 2, name: "上架" },
        { key: 3, name: "下架" }
      ],
      // 总数
      total: 0,
      // 排序操作 status 0上移 1下移 2置顶
      actionColumn: [
        { id: "0", name: "上移" },
        { id: "1", name: "下移" },
        { id: "2", name: "置顶" }
      ]
    };
  },
  watch: {
    rangeDate: function(newVal, oldVal) {
      if (newVal !== null) {
        this.filterForm.startTime = format(newVal[0], "YYYY-MM-DD");
        this.filterForm.endTime = format(newVal[1], "YYYY-MM-DD");
      } else {
        this.filterForm.startTime = "";
        this.filterForm.endTime = "";
      }
    }
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    /**
     * @description: 获取类目
     * @param {type}
     * @return:
     */
    getCategory() {
      Api.findSystemCategory({})
        .then(res => {
          console.log(res);
          if (res && res.status === 200) {
            let _classificationoptions = res.data.category.map(v => {
              return {
                key: v,
                name: v
              };
            });
            _classificationoptions.unshift({
              key: "",
              name: "全部"
            });
            this.classificationoptions = _classificationoptions;
            console.log(this.classificationoptions);
          }
        })
        .catch(error => {});
    },
    /**
     * @description: 类型切换
     * @param {type}
     * @return:
     */

    switchTab(item, index) {
      this.navIndex = index;
      const { filterForm } = this;
      filterForm.classification = item.key;
      this.handleList({
        page: 1
      });
    },
    /**
     * @description: 子组件设置父组件的数据
     * @param {type}
     * @return:
     */

    setData(obj) {
      for (let i in obj) {
        this[i] = obj[i];
      }
    },
    // 排序操作
    handleAction(command, item) {
      Api.updateHospitalShopMove({
        status: command,
        shopId: item.shopId
      })
        .then(res => {
          if (res && res.status === 200) {
            if (!res.data.result) {
            } else {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.handleList({});
            }
          }
        })
        .catch(function(error) {});
    },

    handleList(obj) {
      this.$nextTick(() => {
        this.$refs.list.getListData(obj);
      });
    },
    toDetail(item) {
      this.$router.push({
        path: "/goods/goodsManage/detail",
        query: {
          shopId: item.shopId
        }
      });
    },
    // 点击搜索
    onSearch(val) {
      this.content = val;
      this.handleList({});
    },
    // 状态变化
    statusChange(val) {
      this.status = val;
      this.handleList({
        page: 1
      });
    },
    // 点击下架
    onLower(item) {
      console.log(item.status);
      let _title = "";
      let _status = 0;
      if (item.status !== 0 && item.status !== 2) {
        //点击下架
        _title = "下架";
      } else {
        //点击上架
        _title = "上架";
        _status = 1;
      }
      this.$confirm(`是否${_title}该商品?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "updeatBtn"
      })
        .then(() => {
          // status 0下架 1上架
          Api["updateHospitalShopShelfState"]({
            shopId: item.shopId,
            status: _status
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.$message({
                    message: `${_title}成功`,
                    type: "success"
                  });
                  this.$refs.list.getListData();
                } else {
                  this.$message({
                    message: `${_title}失败`,
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
    // 是否设置成兑换商品
    onSet(item) {
      let _title = "";
      let _type = 0;
      if (item.type) {
        //取消
        _title = "取消";
      } else {
        //设置
        _title = "设置为";
        _type = 1;
      }
      this.$confirm(`是否${_title}兑换商品?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api["updateShopType"]({
            shopId: item.shopId,
            type: _type
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.$message({
                    message: `操作成功`,
                    type: "success"
                  });
                  this.$refs.list.getListData();
                } else {
                  this.$message({
                    message: `操作失败`,
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
    onEdit(item) {
      this.$router.push({
        path: "/goods/goodsManage/edit",
        query: {
          type: "edit",
          shopId: item.shopId,
          link: "manage"
        }
      });
    },
    /**
     * @description: 取消申请
     * @param {type}
     * @return:
     */
    onCancelApply(item) {
      this.$confirm("是否取消申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.hospitalWithdrawShop({
            shopId: item.shopId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.handleList({
                    page: 1
                  });
                  this.$message({
                    message: "取消成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "取消失败",
                    type: "warning"
                  });
                }
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    },
    // 删除商品
    onDelete(item) {
      this.$confirm("是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deleteHospitalShop({
            shopId: item.shopId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.handleList({
                    page: 1
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
        .catch(() => {});
    },
    /**
     * @description: 点击数据导出
     * @param {type}
     * @return:
     */

    onExport() {
      const { filterForm } = this;

      Api.downloadFile("/doctor/findDoctorCustomizelShopInfoUserId.json", {
        // page,
        ...filterForm,
        status: 1 //  0查询数据 1导出数据
      });
    }
  }
};
</script>


<style lang='less' scoped>
@theme-color: #35b3bc;
@text-color: #989898;
.ml10 {
  margin-left: 10px;
}
.menu-bar .el-menu-demo {
  padding-left: 55px;
}
.search-top-wrapper {
  height: 68px;
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
// nav
.nav-wrapper {
  width: 1120px;
  margin: 0 auto;
  padding: 20px 0 20px;
  background: #fff;
  span {
    display: inline-block;
    margin-right: 30px;
    line-height: 32px;
    height: 32px;
    cursor: pointer;
  }
  .active {
    color: @theme-color;
  }
}

.item-wrapper {
  width: 352px;
  // height: 218px;
  padding: 14px;
  background: #fff;
  margin-bottom: 24px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ddd;
}
.item-top {
  padding-bottom: 14px;
}
.list-wrapper {
  width: 1152px;
  margin: 0 auto;
  font-size: 13px;
}
.item-left {
  float: left;
  position: relative;
  text-align: center;
  color: #fff;
  .item-img {
    display: inline-block;
    width: 125px;
    height: 125px;
    margin-right: 12px;
  }
  .item-time {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 7px;
    font-size: 12px;
  }
}
.item-right {
  border-left: none;
  float: left;
  width: calc(~"100% - 137px");
  .item-h6 {
    font-size: 16px;
    padding-bottom: 6px;
    line-height: 22px;
    font-weight: normal;
  }
  .item-desc {
    font-size: 14px;
    color: #989898;
    padding-bottom: 6px;
  }
  .item-price {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: normal;
    color: #282828;
  }
  .item-price-right {
  }
}
.item-num {
  padding-bottom: 16px;
  .item-num-span {
    display: inline-block;
    width: 50%;
    color: #686868;
  }
}
.item-btn {
  display: flex;
  justify-content: space-between;
}
// 搜索区
.search-form-wrapper {
  width: 1120px;
  margin: 20px auto 0px;
}
// 按钮区
.btn-wrapper {
  text-align: right;
  width: 1120px;
  margin: 0 auto;
}

.el-button--primary:hover {
  color: #fff;
  background-color: rgba(102, 200, 207);
  border-color: rgba(102, 200, 207);
}
/deep/ .el-button:active {
  color: rgba(102, 200, 207);
  border-color: rgba(102, 200, 207);
}
.el-button:focus,
.el-button:hover {
  color: rgb(241, 241, 255) !important;
  border-color: rgba(102, 200, 207) !important;
  background-color: rgba(102, 200, 207);
}
.el-button--primary {
  color: #fff;
  background-color: rgba(102, 200, 207, 1) !important;
  border-color: rgba(102, 200, 207, 1) !important;
}
.el-message-box__btns .el-button--primary {
  color: #fff;
  background-color: rgba(102, 200, 207, 1) !important;
  border-color: rgba(102, 200, 207, 1) !important;
}
.updeatBtn {
  color: #fff;
  background-color: rgba(102, 200, 207, 1) !important;
  border-color: rgba(102, 200, 207, 1) !important;
}
</style>

