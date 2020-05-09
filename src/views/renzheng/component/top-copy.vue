<template>
  <div class="top-box">
    <div class="form">
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="12" class="form-left">
            <el-row :gutter="80">
              <el-col :span="12">
                <el-form-item label="姓名" prop="fullName">
                  <el-input v-model="formData.fullName" class="input w188" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" prop="gender" label-width="100px">
                  <el-select v-model="formData.gender" placeholder="请选择" class="input w188">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    <el-option label="不选择" value="不选择"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="80" class="top-item">
              <el-col :span="12">
                <el-form-item label="国家" prop="country">
                  <el-select v-model="formData.country" placeholder="请选择" class="input w188">
                    <el-option label="中国" value="中国"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="选择职称" prop="occupationTitle">
                  <el-select
                    v-model="formData.occupationTitle"
                    placeholder="请选择"
                    class="input w188"
                  >
                    <el-option label="医生" value="医生"></el-option>
                    <el-option label="主治医师" value="主治医师"></el-option>
                    <el-option label="副主任" value="副主任"></el-option>
                    <el-option label="主任医师" value="主任医师"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="从业时间" prop="time">
              <el-date-picker
                v-model="formData.time"
                type="date"
                placeholder="请选择"
                class="input w300"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-right">
            <el-form-item label prop="portraitFile" label-width="0px">
              <label for="fileInput">
                <el-avatar :size="100" class="avartar pointer" v-show="!imgUrl" shape="square">点击上传</el-avatar>
                <el-avatar
                  :size="100"
                  :src="imgUrl"
                  fit="contain"
                  v-show="imgUrl"
                  class="pointer"
                  shape="square"
                ></el-avatar>
                <input id="fileInput" type="file" class="el-upload__input" @change="fileChange" />
              </label>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btnBox">
          <el-button class="button" size="medium" @click="toBack" round>返回上一步</el-button>
          <el-button size="medium" type="primary" @click="submitForm" round :disabled="disabled">下一步</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-box {
  padding-top: 26px;
  .material-tip {
    color: #282828;
    font-size: 20px;
    padding: 55px 0 40px 0;
    text-align: center;
  }
  .form-left {
    width: 664px;
  }
  .form-right {
    width: calc(~"100% - 664px");
    padding-left: 25px;
  }
  .form {
    padding-left: 85px;
    .input {
      width: 300px;
    }
    .input.w188 {
      width: 188px;
    }
    .btnBox {
      padding-bottom: 30px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
<style lang="less">
.top-box {
  .el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "";
    margin-right: 0px;
  }
}
</style>

<script>
// import city from '../component/city.js';
import Api from "@/api/index.js";
export default {
  created: function() {},
  mounted: function() {
    // this.getCooperationModeOption();
    //console.log(this.$router.path);
  },
  data() {
    let _this = this;
    let verifylogin = function(rule, value, callback) {
      let val = value && value.trim();
      if (!val) {
        callback("请输入用户名");
      } else {
        callback();
      }
    };
    let verifyaccount = function(rule, value, callback) {
      let val = value && value.trim();
      if (!val) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    let verifyjiGou = function(rule, value, callback) {
      let val = value && value.trim();
      if (!val) {
        callback("请选择机构");
      } else {
        callback();
      }
    };

    return {
      /* 表单数据 */
      formData: {
        fullName: "",
        time: "",
        country: "中国",
        gender: "",
        occupationTitle: "",
        portraitFile: "",
        cooperationModeId: ""
      },
      // city: city,
      imgUrl: "",
      /* 校验数据 */
      rules: {
        fullName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        time: [{ required: true, message: "请选择从业时间", trigger: "change" }],
        country: [{ required: true, message: "请选择国家", trigger: "change" }],
        occupationTitle: [{ required: true, message: "请选择职称", trigger: "change" }]
      },
      // 获取平台合作模式
      cooperationModeOption: []
    };
  },
  methods: {
    /**
     * @description: 获取平台合作模式
     * @param {type}
     * @return:
     */
    // getCooperationModeOption() {
    //   Api.findCooperationModeAll({})
    //     .then(res => {
    //       if (res && res.data) {
    //         this.cooperationModeOption = res.data;
    //       }
    //     })
    //     .catch(error => {});
    // },
    // 提交表单
    submitForm: function() {
      var p = new Promise((resolve, reject) => {
        if (!this.imgUrl) {
          this.$message.warning("请上传头像");
          return;
        }
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit("setData", { topData: this.formData });
            this.$emit("nextStep", 3);
            this.$nextTick(() => {
              resolve();
            });
          } else {
          }
        });
      });
      return p;
    },
    toBack() {
      this.$emit("nextStep", 2);
    },
    fileChange(e) {
      const self = this;
      var file = e.target.files[0];
      var formData = new FormData();
      var reader = new FileReader();
      var image = new Image();
      if (file) {
        var type = file.type;
        // alert(e.target);
        if (!/image\/\w+/.test(type)) {
          this.$message.warning("上传类型错误!");
          document.getElementById("fileInput").value = "";
        } else if (file.size > 1024 * 1024 * 3) {
          this.$message.warning("上传图片大小不能超过 3MB!");
          document.getElementById("fileInput").value = "";
        } else {
          console.log(file, "file");
          self.formData.portraitFile = file;
          // 预览
          reader.onload = (function(file) {
            return function(e) {
              var datainfo = this.result;
              // $("#IDcardShow").css({
              // 	"background": "url(" + datainfo + ") center center no-repeat",
              // 	"background-size": "cover"
              // });
              self.imgUrl = datainfo;
            };
          })(e.target.files[0]);

          reader.readAsDataURL(e.target.files[0]);
        }
      }
    },
    // 上传的通用方法
    updateFile: function(data, fileList, type, verify, file) {
      if (data.success) {
        let verifyArr = [];
        fileList.map((v, k) => {
          let nameArr = v.name.split(".");
          let name = nameArr[nameArr.length - 1];
          let arr = verify;
          if (arr.indexOf(name) !== -1) {
            verifyArr.push(v);
          }
        });
        this.formData[type] = verifyArr;
        // 重新校验数据
        this.$refs.ruleForm.validateField(type);
      } else {
        // 如果格式存在问题
        this.formData[type] = Object.assign([], this.formData[type]);
      }
      // 解决 同一文件不能多次上传
      // $('[type="file"]').val('');

      // this.$parent.setLoading(false);
    },
    reset() {
      this.formData = {
        fullName: "",
        time: "",
        country: "中国",
        portraitFile: ""
      };
      this.imgUrl = "";
      this.$refs["form"].resetFields();
    }
  }
};
</script>