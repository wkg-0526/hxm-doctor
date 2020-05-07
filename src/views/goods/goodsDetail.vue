<!--  -->
<template>
  <div class="good-wrapper">
    <div
      class="pb30"
      style="color:#FF8233;font-size: 16px;"
      v-if="detailData.auditStatus === 2"
    >拒绝理由：{{detailData.reason}}</div>
    <GoodInfo :detailData="detailData"></GoodInfo>
    <div class="btn-wrapper">
      <!-- auditStatus  0审核中1 已通过审核 2已拒绝 3取消申请 -->
      <el-button @click="onBack">返回</el-button>
      <el-button
        @click="onEdit"
        v-if="detailData.auditStatus === 1 || detailData.auditStatus === 3"
      >修改</el-button>
      <el-button v-if="detailData.auditStatus === 1">{{detailData.status ? '下架' : '上架'}}</el-button>
      <el-button type="danger" @click="onDelete" :disabled="disabled">删除</el-button>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
import classification from "@/components/goodClassification.js";
import editor from "@/components/editor.vue";
import format from "date-fns/format";
import GoodInfo from "@/components/goodInfo.vue";

export default {
  components: {
    GoodInfo
  },
  data() {
    return {
      classificationoptions: classification.goodClassification,
      title: "",
      classification: "",
      focusImg: "",

      // ======
      options: [{ name: "满减优惠" }, { name: "折扣优惠" }],
      disabled: false,
      categoryVisible: false,
      // 类目
      shopCategory: [],
      // 商品上传还是商品编辑 add edit
      detailData: {}
    };
  },
  mounted() {
    this.shopId = this.$route.query.shopId;
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      const { shopId } = this;

      Api.findShopDetail({
        shopId
      })
        .then(res => {
          if (res && res.status === 200) {
            if (res.data.result === 500) {
              this.$message.warning("商品不存在!");
            } else {
              let _data = res.data;
              let _classification = _data.classification.split(",");
              let _productBrand = _data.productBrand.split(",");
              _data.classification = _classification[_classification.length - 1];
              _data.productBrand = _productBrand[_productBrand.length - 1];
              this.detailData = _data;
            }
          }
        })
        .catch(function(error) {});
    },
    handleRemove(item, index) {
      this.fileList.splice(index, 1);
    },
    catchData(val) {
      this.detail = val;
      console.log(val, "detail");
    },
    beforeUpload(file) {
      // 'image/png'
      const _type = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!_type.includes(file.type)) {
        this.$message.warning("图片格式错误!");
        return false;
      }

      if (!isLt10M) {
        this.$message.warning("图片大小不能超过 10MB!");
        return false;
      }
      return true;
    },
    handleUploadSuccess(res, file) {
      // console.log(this.fileList,'1111')
      // let _obj = {url: res.url[0]}
      this.fileList.push(res.url[0]);
      //    console.log(this.fileList,'222')
    },
    // 点击返回
    onBack() {
      this.$router.push({
        path: "/goods/goodsManage"
      });
    },
    // 点击修改
    onEdit() {
      this.$router.push({
        path: "/goods/goodsManage/edit",
        query: {
          type: "edit",
          shopId: this.shopId,
          // 入口
          link: "detail"
        }
      });
    },
    // 点击下架
    onLower() {
      let _url = "";
      let _title = "";
      if (this.detailData.status) {
        //点击下架
        _url = "updateShopStatusLower";
        _title = "下架";
      } else {
        //点击上架
        _url = "updateShopStatusUpper";
        _title = "上架";
      }
      this.$confirm(`是否${_title}该商品?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api[_url]({
            shopId: this.detailData.shopId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.$message({
                    message: `${_title}成功`,
                    type: "success"
                  });
                  this.getDetailData();
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
    // 删除商品
    onDelete() {
      this.$confirm("是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deleteShop({
            shopId: this.detailData.shopId
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.onBack();
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
    },
    setData(key, value) {
      this.key = value;
    }
  }
};
</script>

    <style lang='less' scoped>
.good-wrapper {
  width: 812px;
  margin: 50px auto;
  .pb30 {
    padding-bottom: 30px;
  }
  .good-title {
    color: #282828;
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .good-title-desc {
    color: #989898;
    font-size: 14px;
  }

  .add-category {
    height: 48px;
    line-height: 48px;
    color: #ff8233;
    font-size: 16px;
    text-align: center;
    border: 1px solid #ebeef5;
    border-top: none;
  }
  // upload-wrapper
  .upload-wrapper {
    font-size: 0px;
    display: inline-block;
    .el-icon-plus {
      width: 140px;
      height: 140px;
      font-size: 36px;
      color: #979797;
      border: 1px solid #979797;
      border-radius: 6px;
      line-height: 140px;
      margin-left: 14px;
      margin-right: 14px;
    }
  }
  .img-wrapper {
    font-size: 0px;
    .img-item-wrapper {
      position: relative;
      display: inline-block;
      width: 140px;
      margin-left: 14px;
      margin-right: 14px;
      // border-radius: 6px;
      vertical-align: top;
      img {
        display: inline-block;
        width: 100%;
        border-radius: 6px;
      }
      .img-close-icon {
        width: 18px;
        height: 18px;
        position: absolute;
        right: -9px;
        top: -9px;
        font-size: 14px;
      }
    }
  }
  // 、
  .w200 {
    width: 200px;
  }
  .w100 {
    width: 100px;
  }
  .mr15 {
    margin-right: 15px;
  }
  .discout-wrapper {
    padding-top: 28px;
  }
  .btn-wrapper {
    padding-top: 23px;
    text-align: center;
  }
}
</style>
