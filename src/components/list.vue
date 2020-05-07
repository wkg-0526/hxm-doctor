<template>
  <div>
    <div class="list-wrapper-row" v-if="position=== 'row' && listData && listData.length > 0">
      <template v-for="(item, index) in listData">
        <div
          class="list-item"
          :key="index"
          :style="{marginLeft: gutter + 'px',marginRight: gutter + 'px'}"
        >
          <slot :item="item"></slot>
        </div>
      </template>
    </div>
    <div class="list-wrapper-column" v-if="position=== 'column' && listData && listData.length > 0">
      <template v-for="(item) in listData">
        <slot :item="item"></slot>
      </template>
    </div>
    <div class="no-data" v-if="!listData || listData.length === 0">暂无数据</div>

    <div class="paging-wrapper" v-if="listData.length!==0 && !paginationHide">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
export default {
  name: "HelloWorld",
  props: {
    data: Object,
    gutter: Number,
    activeClassification: Object,
    pageSize: {
      type: Number,
      default: 15
    },
    filter: Object,
    // 是否隐藏分页
    paginationHide: {
      type: Boolean,
      default: false
    },
    // 块的排列形式 row水平排列 column 垂直排列
    position: {
      type: String,
      default: "row"
    }
  },
  data() {
    return {
      listData: [
        // {userHead: 'ddd'}
      ],
      page: 1,
      // pageSize: 15,
      total: 0
    };
  },
  mounted() {
    this.getListData();
  },
  methods: {
    //获取列表数据
    getListData() {
      const { page, activeClassification, data, filter } = this;
      let _param = { page, ...filter };
      if (activeClassification) {
        _param = Object.assign(_param, {
          activeClassification:
            activeClassification.name === "全部"
              ? ""
              : activeClassification.name
        });
      }

      Api[data.url](_param)
        .then(response => {
          if (response && response.status === 200) {
            let _data = response.data;
            this.listData = _data[data.list ? data.list : "list"];
            this.total = _data[data.count ? data.count : "count"];
            this.$parent.setData && this.$parent.setData({ total: this.total });
            // 订单设置金额
            this.$parent.setMoney &&
              this.$parent.setMoney({
                depositCount: _data.depositCount,
                tailMoneyCount: _data.tailMoneyCount,
                totalArrivalCount: _data.totalArrivalCount
              });
          }
        })
        .catch(function(error) {});
    },
    handleCurrentChange(value) {
      // pageStart变化
      this.page = value;
      this.getListData();
    },
    // 点击删除
    handleDelete() {
      let self = this;
      // 点击删除确定
      this.$confirm("是否删除该动态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // self.loading = true;
          // ajax({
          //     url:'/literature/deleteLiterature',
          //     type:'post',
          //     data:{
          //         fileCode:row.fileCode
          //     },
          //     success(res){
          //         self.loading = false;
          //         if(res.success){
          //             self.getListData();
          //             self.$message({
          //                 message: "删除成功",
          //                 type: 'success'
          //             });
          //         }else{
          //             self.$message({
          //                 message: res.errorMsg,
          //                 type: 'warning'
          //             });
          //         };
          //     }
          // });
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
    },
    errorHandler() {
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list-wrapper-row {
  display: flex;
  flex-wrap: wrap;
}
.paging-wrapper {
  text-align: center;
  padding: 24px 0;
}
.no-data {
  padding-top: 60px;
  color: #999;
  text-align: center;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgba(102, 200, 207, 1);
  color: #fff;
}
</style>
