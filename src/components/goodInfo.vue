<!--  -->
<template>
  <div class="good-info-wrapper">
    <!-- 标题 -->
    <div class="pb30">
      <div class="good-title">标题</div>

      <p class="f16">{{detailData.title}}</p>
    </div>

    <!-- 分类 -->
    <!-- 服务  美妆  护肤  饰品  女装  百货  食品  电器  母婴  箱包  鞋靴  运动  整形材料 其他 -->
    <div class="good-classification pb30">
      <el-row :gutter="20">
        <el-col :span="12">
          <span style="padding-right: 30px" class="good-title">项目分类</span>
          <span>{{detailData.classification}}</span>
        </el-col>
        <el-col :span="12">
          <span style="padding-right: 30px" class="good-title">产品品牌</span>
          <span>{{detailData.productBrand}}</span>
        </el-col>
      </el-row>
    </div>

    <!-- 医生等级 -->
    <el-row :gutter="20" class="pb10 f16">
      <el-col :span="10">
        <div>
          <span>产品规格：</span>
          <span>{{detailData.productSpecification}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="pb30 f16">
      <el-col :span="12">
        <div>
          <span>医生等级：</span>
          <span>{{detailData.doctorLevel}}</span>
        </div>
      </el-col>
    </el-row>
    <!--  -->
    <div class="good-params pb30">
      <div class="good-title">价格信息：</div>
      <el-row :gutter="20" class="pb10">
        <el-col :span="10">
          <div>
            <span>原价：</span>
            <span>{{detailData.originalPrice}}元</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>售价：</span>
            <span>{{detailData.price}}元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="pb10">
        <el-col :span="10">
          <div>
            <span>麻醉费：</span>
            <span>{{detailData.anesthesiaCost}}元</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>检查费：</span>
            <span>{{detailData.inspectionFee}}元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="pb10">
        <el-col :span="10">
          <div>
            <span>设计费：</span>
            <span>{{detailData.designFee}}元</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>血液费：</span>
            <span>{{detailData.bloodCharge}}元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="pb10" v-if="detailData.custom">
        <el-col :span="24">
          <div>
            <span>{{detailData.custom}}：</span>
            <span>{{detailData.customPrice}}元</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 购买说明 -->
    <div class="pb30 dot-wrapper">
      <div class="good-title">购买说明</div>

      <template v-for="(item, index) in detailData.explain">
        <div :key="index" class="item">{{item}}</div>
      </template>
    </div>

    <!-- 术前须知 -->
    <div class="pb30 dot-wrapper">
      <div class="good-title">术前须知</div>

      <div class="pb10 f16">
        <span>项目时长：</span>
        <span>{{detailData.originalPrice}}</span>
      </div>
      <div class="pb10 f16">
        <span>术前须知：</span>
        <span>{{detailData.notice}}</span>
      </div>
      <div class="pb10 f16">
        <span>是否可使用优惠：</span>
        <span>{{detailData.discount ? "是" : '否'}}</span>
      </div>
      <div class="f16">
        <span>总价：</span>
        <span>{{detailData.sumPrice }}元</span>
      </div>
    </div>

    <!-- 焦点图 -->
    <div class="good-focusImg pb30">
      <div class="good-title">焦点图</div>
      <section
        style="display: inline-block;margin-left: -14px;margin-right: -14px;"
        class="img-wrapper"
      >
        <template v-for="(item,index) in detailData.focusImg">
          <div :key="index" class="img-item-wrapper">
            <img class="img-item" :src="item" alt />
            <i class="el-icon-error img-close-icon pointer" @click="handleRemove(item,index)"></i>
          </div>
        </template>
      </section>
    </div>

    <!-- 详情页 -->
    <div class="good-detail pb30">
      <div class="good-title">图文详情</div>
      <!-- 普通商品 -->
      <div class="good-detail-content" v-html="detailData.detail"></div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js"
import classification from "@/components/goodClassification.js"
import editor from "@/components/editor.vue"
import format from "date-fns/format"

export default {
  components: {
    editor
  },
  props: {
    detailData: {
      type: Object,
      default: {}
    },
    paramName: {
      type: Object,
      default: () => {
        return {
          category: "shopCategory"
        }
      }
    },
    type: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.good-info-wrapper {
  .f16 {
    font-size: 16px;
  }
  .pb30 {
    padding-bottom: 30px;
  }
  .pb20 {
    padding-bottom: 20px;
  }
  .pb10 {
    padding-bottom: 10px;
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

  // upload-wrapper

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
    .discout-item {
      padding-bottom: 30px;
    }
  }
  // 图文详情
  .good-detail-content {
    border: 1px solid rgba(221, 221, 221, 1);
    width: 375px;
    max-height: 600px;
    padding: 12px 20px 12px 20px;
    overflow-y: auto;
  }
  .good-detail-img {
    border: 1px solid rgba(221, 221, 221, 1);
    width: 375px;
    max-height: 600px;
    padding: 12px 20px 12px 20px;
    overflow-y: auto;
    font-size: 0px;
    img {
      display: inline-block;
      width: 100%;
    }
  }
  .good-params {
    font-size: 16px;
  }
  .good-classification {
    font-size: 16px;
  }
  // 额外的费用
  .free-wrapper {
    .left {
      float: left;
    }
    .right {
      font-size: 14px;
      color: #989898;
      float: right;
      height: 28px;
      line-height: 28px;
    }
  }
  // 点点
  .dot-wrapper {
    .item {
      position: relative;
      padding-left: 24px;
      margin-bottom: 17px;
      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #000;
        left: 0px;
        top: 50%;
        margin-top: -4px;
      }
    }
  }
}
</style>
