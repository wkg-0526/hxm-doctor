<!--  -->
<template>
  <div class="good-wrapper">
    <!-- 标题 -->
    <div class="pb30">
      <div class="good-title">项目标题(项目名称)</div>
      <el-input
        type="textarea"
        placeholder="请填写带有关键词的项目名称"
        v-model.trim="title"
        maxlength="40"
        show-word-limit
      ></el-input>
    </div>

    <!-- 分类 -->
    <div class="good-classification pb30">
      <el-row :gutter="20">
        <el-col :span="12">
          <span style="padding-right: 30px" class="good-title">项目分类</span>
          <!-- <el-select 
                        v-model="classification" 
                        placeholder="请选择"
                        @change='classificationChange'
                    >
                        <el-option
                            v-for="item in classificationoptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
          </el-select>-->
          <el-cascader
            ref="cateCascader"
            clearable
            v-model="classification"
            :props="cateProps"
            :show-all-levels="false"
            @change="handleCateChange"
          ></el-cascader>
        </el-col>
        <el-col :span="12">
          <span style="padding-right: 15px" class="good-title">项目材料品牌</span>
          <el-cascader
            ref="projectCascader"
            clearable
            v-model="productBrand"
            :props="productProps"
            :show-all-levels="false"
          ></el-cascader>
          <!-- <el-input style="width: 250px" v-model="productBrand" clearable placeholder="请输入"></el-input> -->
        </el-col>
      </el-row>
    </div>

    <!-- 产品规格 医生等级 -->

    <div class="pb30 hidden">
      <el-form
        :model="levelForm"
        ref="levelForm"
        class="pt20 left"
        :rules="levelFormRules"
        hide-required-asterisk
      >
        <el-form-item label="项目材料规格:" label-width="100px" prop="productSpecification">
          <el-input
            style="width: 220px"
            v-model.trim="levelForm.productSpecification"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 价格信息 -->
    <div class="good-params pb30">
      <div class="good-title">价格信息：</div>
      <el-form
        :model="paramForm"
        ref="paramForm"
        class="pt20"
        :rules="paramRules"
        hide-required-asterisk
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="系统价:" label-width="75px" prop="originalPrice">
              <el-input
                style="width: 280px"
                v-model.trim="paramForm.originalPrice"
                clearable
                placeholder="系统指导价100元起"
                readonly
              >
                <template slot="append">元（RMB）</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售价:" label-width="75px" prop="price">
              <el-input
                style="width: 280px"
                v-model.trim="paramForm.price"
                clearable
                oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                placeholder="医美邦上的卖价"
                :disabled="paramForm.markup===0?false:true"
              >
                <template slot="append">元（RMB）</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="麻醉费:" label-width="75px" prop="anesthesiaCost">
              <el-input
                style="width: 280px"
                placeholder="请输入麻醉费"
                v-model.trim="paramForm.anesthesiaCost"
                oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                clearable
              >
                <template slot="append">元（RMB）</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查费:" label-width="75px" prop="inspectionFee">
              <el-input
                style="width: 280px"
                placeholder="请输入检查费"
                v-model.trim="paramForm.inspectionFee"
                oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                clearable
              >
                <template slot="append">元（RMB）</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设计费:" label-width="75px" prop="designFee">
              <el-input
                style="width: 280px"
                placeholder="请输入设计费"
                v-model.trim="paramForm.designFee"
                oninput="this.value=this.value.replace(/[^\d.]/g,'')"
                clearable
              >
                <template slot="append">元（RMB）</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="输液费:" label-width="75px" prop="bloodCharge">
              <el-input
                style="width: 280px"
                placeholder="请输入输液费"
                v-model.trim="paramForm.bloodCharge"
                oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                clearable
              >
                <template slot="append">元（RMB）</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="75px" prop="customPrice">
              <span
                style="color: #35b3bc;"
                class="pointer"
                slot="label"
                @click="onCustom"
              >{{custom || "自定义"}}:</span>
              <el-input
                style="width: 280px"
                placeholder="请输入自定义价格"
                v-model.trim="paramForm.customPrice"
                oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                clearable
              >
                <template slot="append">元（RMB）</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 购买说明 -->
    <div class="explain-wrapper pb30">
      <div class="good-title">购买说明：</div>
      <template v-for="(item,index) in explain">
        <div :key="index" style="padding-bottom: 7px;">
          <el-input v-model="explain[index]" class="explain-input" maxlength="20"></el-input>
          <el-button @click.prevent="onDelete(item,index)">删除</el-button>
        </div>
      </template>

      <div class="add-category">
        <span class="pointer" @click="addCategory">
          <i class="el-icon-circle-plus-outline" style="margin-right: 12px;"></i>
          增加一条购买说明
        </span>
      </div>
    </div>

    <!-- 术前须知 -->
    <div class="pb30">
      <div class="good-title">术前须知：</div>
      <el-form
        :model="beforeOpForm"
        ref="beforeOpForm"
        class="pt20"
        :rules="beforeOpFormRules"
        hide-required-asterisk
      >
        <el-form-item label="项目时长:" label-width="120px" prop="duration">
          <el-input
            style="width: 250px"
            v-model.trim="beforeOpForm.duration"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="术前须知:" label-width="120px" prop="notice">
          <el-input
            type="textarea"
            placeholder="请输入术前须知"
            v-model.trim="beforeOpForm.notice"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- discount 是否可使用优惠 0否 1有 -->

        <el-form-item label="是否参加平台活动:" label-width="130px" prop="discount">
          <el-radio-group v-model="beforeOpForm.discount">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <!-- 焦点图 -->
    <div class="good-focusImg pb30">
      <div class="pb30">
        <span style="padding-right: 30px" class="good-title">焦点图（头图）</span>
        <span class="good-title-desc">请上传750x750像素的图片，第一张为封面，最多五张</span>
      </div>

      <section
        style="display: inline-block;margin-left: -14px;margin-right: -14px;"
        class="img-wrapper"
      >
        <template v-for="(item,index) in fileList">
          <div :key="index" class="img-item-wrapper">
            <img class="img-item" :src="item" alt />
            <i class="el-icon-error img-close-icon pointer" @click="handleRemove(item,index)"></i>
          </div>
        </template>

        <el-upload
          action="/operate/upload.json"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-success="handleUploadSuccess"
          class="upload-wrapper"
          :show-file-list="false"
        >
          <i slot="default" class="el-icon-plus" v-show="fileList.length < 5"></i>
        </el-upload>
      </section>
    </div>

    <!-- 详情页 -->
    <div class="good-detail pb30">
      <div class="pb30">
        <span style="padding-right: 30px" class="good-title">详情页</span>
        <span class="good-title-desc">请上传宽度为706像素的图片</span>
      </div>

      <editor :catchData="catchData" :content="detail"></editor>
    </div>

    <div class="btn-wrapper">
      <el-button @click="onBack" v-if="link">取消</el-button>
      <el-button type="primary" @click="onSubmit" :disabled="disabled">发布</el-button>
    </div>

    <!-- 修改自定义名称弹窗 -->
    <AddCostom
      ref="addCostom"
      :show="addCostomShow"
      @handleModalSubmit="handleModalSubmit"
      @handleModalCancel="handleModalCancel"
    ></AddCostom>
  </div>
</template>

<script>
import Api from "@/api/index.js";
// import classification from "@/components/goodClassification.js";
import editor from "@/components/editor.vue";
import format from "date-fns/format";
import AddCostom from "./components/addCostom.vue";
import imgSize from "@/util/imgSize";

let id = 0;

export default {
  components: {
    editor,
    AddCostom
  },
  data() {
    return {
      // 分类
      classification: "",
      // 分类选项
      classificationoptions: [],
      // 标题
      title: "",
      // 品牌选项
      productBrandOption: [],
      // 品牌
      productBrand: "",
      focusImg: "",
      detail: "",
      fileList: [],
      // ======
      // 医生等级
      doctorLevelOptions: [
        { value: "主任医师", label: "主任医师" },
        { value: "副主任医师", label: "副主任医师" },
        { value: "主治医师", label: "主治医师" },
        { value: "医师", label: "医师" }
      ],
      disabled: false,
      categoryVisible: false,
      // 商品上传还是商品编辑 add edit
      type: "add",
      // 入口
      link: "",
      // 价格信息
      paramForm: {
        originalPrice: "",
        price: "",
        anesthesiaCost: "",
        inspectionFee: "",
        designFee: "",
        bloodCharge: "",
        customPrice: "",
        markup: 0
      },
      // 价格信息规则
      paramRules: {
        originalPrice: [{ required: true, message: "系统指导价100起", trigger: "blur" }],
        price: [{ required: true, message: "请输入售价", trigger: "blur" }],
        anesthesiaCost: [{ required: true, message: "请输入麻醉费", trigger: "blur" }],
        inspectionFee: [{ required: true, message: "请输入检查费", trigger: "blur" }],
        designFee: [{ required: true, message: "请输入设计费", trigger: "blur" }],
        bloodCharge: [{ required: true, message: "请输入输液费", trigger: "blur" }],
        customPrice: [{ required: false, message: "请输入自定义金额", trigger: "blur" }]
      },
      // 术前须知
      beforeOpForm: {
        notice: "",
        duration: "",
        discount: ""
      },
      beforeOpFormRules: {
        duration: [{ required: true, message: "请输入项目时长", trigger: "blur" }],
        notice: [{ required: true, message: "请输入术前须知", trigger: "change" }],
        duration: [{ required: true, message: "请选择是否可使用优惠", trigger: "change" }]
      },
      // 医生等级
      levelForm: {
        productSpecification: "",
        doctorLevel: ""
      },
      levelFormRules: {
        productSpecification: [{ required: true, message: "请输入产品规格", trigger: "blur" }],
        doctorLevel: [{ required: true, message: "请输入医生等级", trigger: "change" }]
      },
      // 说明
      explain: [""],
      // 自定义名称
      custom: "",
      // 自定义名称弹窗
      addCostomShow: false,
      // 项目分类的props
      cateProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          console.log(level, "level");
          // 查询所有的一级
          if (level === 0) {
            Api["findSystemCategory"]({})
              .then(res => {
                if (res && res.status === 200) {
                  let nodes = res.data.category.map(v => {
                    return {
                      label: v,
                      value: v,
                      leaf: false
                    };
                  });
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }
              })
              .catch(function(error) {});
          } else if (level === 1) {
            Api["findSystemCategoryTwo"]({
              category: node.data.value
            })
              .then(res => {
                if (res && res.status === 200) {
                  let nodes = res.data.categoryTwo.map(v => {
                    return {
                      label: v,
                      value: v,
                      leaf: false
                    };
                  });
                  console.log(nodes, "nodes");
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }
              })
              .catch(function(error) {});
            console.log(node, "node");
          } else if (level === 2) {
            Api["findDoctorCustomizedClassificationAll"]({
              classification: node.data.value
            })
              .then(res => {
                if (res && res.status === 200) {
                  let nodes = res.data.list.map(v => {
                    return {
                      label: v.title,
                      value: v.title,
                      leaf: true,
                      item: v
                    };
                  });
                  console.log(nodes, "nodes");
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }
              })
              .catch(function(error) {});
            console.log(node, "node");
          } else {
            resolve({});
          }
          // setTimeout(() => {
          // const nodes = Array.from({ length: level + 1 })
          //     .map(item => ({
          //         value: ++id,
          //         label: `选项${id}`,

          //     }));
          // console.log(nodes,'nodes')
          // // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          // resolve(nodes);
          // }, 1000);
        }
      },
      // 产品品牌
      productProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          console.log(level, "level");
          // 查询所有的一级
          if (level === 0) {
            Api["findHospitalCategory"]({})
              .then(res => {
                if (res && res.status === 200) {
                  let nodes = res.data.category.map(v => {
                    return {
                      label: v,
                      value: v,
                      leaf: false
                    };
                  });
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }
              })
              .catch(function(error) {});
          } else if (level === 1) {
            Api["findHospitalCategoryProductBrand"]({
              category: node.data.value
            })
              .then(res => {
                if (res && res.status === 200) {
                  let nodes = res.data.hospitalCategoryInfo.map(v => {
                    return {
                      label: v.productBrand,
                      value: v.productBrand,
                      leaf: true,
                      item: v
                    };
                  });
                  console.log(nodes, "nodes");
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }
              })
              .catch(function(error) {});
            console.log(node, "node");
          } else {
            resolve({});
          }
        }
      }
    };
  },
  created() {
    this.shopId = this.$route.query.shopId;
    this.type = this.$route.query.type;
    this.link = this.$route.query.link;

    // 获取项目分类
    // this.getCategory();
    if (this.type === "edit") {
      this.getDetailData();
    }
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
              return;
            }

            const {
              classification,
              productBrand,
              detail,
              explain,
              title,
              focusImg,
              custom,

              // paramForm
              originalPrice,
              price,
              anesthesiaCost,
              inspectionFee,
              designFee,
              bloodCharge,
              customPrice,

              // beforeOpForm
              notice,
              duration,
              discount,
              // levelForm
              productSpecification,
              doctorLevel
            } = res.data;

            this.title = title;
            this.classification = classification.split(",");
            this.productBrand = productBrand;
            this.custom = custom;
            this.detail = detail;
            this.explain = explain;
            this.fileList = focusImg;

            this.paramForm = {
              originalPrice,
              price,
              anesthesiaCost,
              inspectionFee,
              designFee,
              bloodCharge,
              customPrice
            };
            this.beforeOpForm = {
              notice,
              duration,
              discount
            };

            this.levelForm = {
              productSpecification,
              doctorLevel
            };

            console.log(this.discountForm, "hjdsljkd");

            // this.detailData = res.data;
          }
        })
        .catch(function(error) {});
    },
    /**
     * @description: 获取项目分类
     * @param {type}
     * @return:
     */
    getCategory() {
      Api.findHospitalCategory({})
        .then(res => {
          if (res && res.status === 200) {
            this.classificationoptions = res.data.category.map(v => {
              return {
                name: v
              };
            });
            console.log(this.classificationoptions, "2222");
          }
        })
        .catch(error => {});
    },
    /**
     * @description: 点击编辑自定义
     * @param {type}
     * @return:
     */
    onCustom() {
      this.addCostomShow = true;
      this.$refs.addCostom.form = {
        custom: this.custom
      };
    },
    /**
     * @description: 弹窗点击确定
     * @param {type}
     * @return:
     */

    handleModalSubmit(formData) {
      this.custom = formData.custom;
      this.addCostomShow = false;
    },
    /**
     * @description: 弹窗点击取消
     * @param {type}
     * @return:
     */

    handleModalCancel() {
      this.addCostomShow = false;
    },
    handleRemove(item, index) {
      this.fileList.splice(index, 1);
    },
    /**
     * @description: 项目分类切换 设置原价
     * @param val{String} 选中的分类
     * @return:
     */

    handleCateChange(val, item) {
      console.log(this);
      const { paramForm } = this;
      let node = this.$refs.cateCascader.getCheckedNodes();
      console.log(node[0].data.item, 123);
      paramForm.originalPrice = node[0].data.item.price;
      paramForm.markup = node[0].data.item.markup;

      this.paramForm = paramForm;
    },
    catchData(val) {
      this.detail = val;
    },
    beforeUpload(file) {
      // 'image/png'
      // const isSize = imgSize(file);
      const _type = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!_type.includes(file.type)) {
        this.$message.warning("图片格式错误!");
        return false;
      }

      if (!isLt10M) {
        this.$message.warning("图片大小不能超过 10MB!");
        console.log(1);
        return false;
      }
      // const isSize = new Promise(function(resolve, reject) {
      //   let width = 400;
      //   let height = 400;
      //   let _URL = window.URL || window.webkitURL;
      //   let img = new Image();
      //   img.onload = function() {
      //     let valid = img.width == width && img.height == height;
      //     valid ? resolve() : reject();
      //   };
      //   img.src = _URL.createObjectURL(file);
      // }).then(
      //   () => {
      //     return file;
      //   },
      //   () => {
      //     this.$message.error("请上传400x400像素的图片!");
      //     return Promise.reject();
      //   }
      // );
      return true;
    },
    handleUploadSuccess(res, file) {
      console.log(res.url);
      if (res.url === "尺寸不正确") {
        this.$message.warning("尺寸不正确");
        return;
      }

      this.fileList.push(res.url);
      //    console.log(this.fileList,'222')
    },
    onBack() {
      // 从详情页跳转过来
      if (this.link === "detail") {
        //
        this.$router.push({
          path: "/goods/goodsManage/detail",
          query: {
            shopId: this.shopId,
            // 入口
            link: "detail"
          }
        });
      } else if (this.link === "manage") {
        this.$router.push({
          path: "/goods/goodsManage",
          query: {}
        });
      }
    },
    // 点击发布
    onSubmit() {
      if (this.isValidate()) {
        let params = {
          title: this.title,
          detail: this.detail,
          classification: this.classification.join(","),
          productBrand: this.productBrand,
          explain: this.explain,
          file: this.fileList,
          custom: this.custom,
          ...this.beforeOpForm,
          ...this.levelForm,
          ...this.paramForm
        };

        console.log(params, "11111");
        this.disabled = true;
        if (this.type === "edit") {
          Api.updateHospitalShopInfo({ ...params, shopId: this.shopId })
            .then(res => {
              this.disabled = false;
              if (res && res.data && res.data.result === 500) {
                this.$message({
                  message: "内容字数超过限制",
                  type: "warning"
                });
                return;
              }
              if (res && res.data && res.data.result === 0) {
                this.$message({
                  message: "修改失败",
                  type: "warning"
                });
                return;
              }
              if (res && res.data && res.data.result) {
                this.$router.push({
                  path: "/goods/goodsManage",
                  query: {
                    // acitiveStep: 4,
                  }
                });
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
              }
            })
            .catch(error => {
              this.disabled = false;
            });
        } else {
          Api.insertHospitalShopInfo(params)
            .then(res => {
              this.disabled = false;
              if (res && res.data && res.data.result === 500) {
                this.$message({
                  message: "内容字数超过限制",
                  type: "warning"
                });
                return;
              }
              if (res && res.data && res.data.result) {
                this.$router.push({
                  path: "/goods/goodsManage",
                  query: {
                    // acitiveStep: 4,
                  }
                });
                this.$message({
                  message: "发布成功",
                  type: "success"
                });
              }
            })
            .catch(error => {
              this.disabled = false;
            });
        }
      }
    },
    /**
     * @description: 校验
     * @param {type}
     * @return:
     */
    isValidate() {
      // type 长度
      let _bool = true;
      // 为空判断
      let arr = [
        { title: "请输入标题", value: "title" },
        { title: "请选择项目分类", value: "classification" },
        { title: "请选择产品品牌", value: "productBrand" },
        { title: "请输入购买说明", value: "explain", type: "length" },
        { title: "请上传焦点图", value: "fileList", type: "length" },
        { title: "请输入详情", value: "detail" }
      ];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].type && arr[i].type === "length") {
          console.log(this[arr[i].value], arr[i].title, "dd");

          if (
            !this[arr[i].value] ||
            this[arr[i].value].length === 0 ||
            this[arr[i].value].filter(v => v).length === 0
          ) {
            this.$message.warning(arr[i].title);
            return false;
          }
        } else if (!this[arr[i].value]) {
          this.$message.warning(arr[i].title);
          return false;
        }
      }

      this.$refs["paramForm"].validate(valid => {
        if (valid) {
          // 如果输入了自定义金额，就需要输入自定义名称
          if (this.paramForm.customPrice && !this.custom) {
            this.$message.warning("请输入自定义名称");
            _bool = false;
          }
        } else {
          _bool = false;
        }
      });

      this.$refs["beforeOpForm"].validate(valid => {
        if (valid) {
        } else {
          _bool = false;
        }
      });

      this.$refs["levelForm"].validate(valid => {
        if (valid) {
        } else {
          _bool = false;
        }
      });

      if (_bool) {
        return true;
      } else {
        return false;
      }
    },
    addCategory() {
      this.explain.push("");
    },
    setData(key, value) {
      this.key = value;
    },
    // 类目删除
    onDelete(item, index) {
      this.explain.splice(index);
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
  .hidden {
    overflow: hidden;
    .left {
      float: right;
      margin-right: 42px;
    }
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
    color: #35b3bc;
    font-size: 16px;
    text-align: center;
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

  .w100 {
    width: 100px;
  }
  .mr15 {
    margin-right: 15px;
  }
  .mr10 {
    margin-right: 10px;
  }
  .discout-wrapper {
    padding-top: 28px;
  }
  .btn-wrapper {
    padding-top: 53px;
    text-align: center;
    /deep/ .el-button--primary {
      color: #fff;
      background-color: rgba(102, 200, 207, 1);
      border-color: rgba(102, 200, 207, 1);
    }
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
  .explain-wrapper {
    .explain-input {
      width: calc(~"100% - 80px");
      margin-right: 10px;
    }
  }
}
</style>
