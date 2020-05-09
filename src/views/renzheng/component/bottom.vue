<!--医生超管 图片上传是二进制形式-->
<template>
  <div class="qualification-box">
    <div class="form form1">
      <el-form ref="form1" :model="formData1" label-width="100px" label-position="left">
        <uploadLink
          :fileList="qualificationsFile"
          fileListName="qualificationsFile"
          :formData="formData1"
          title="医师资格证"
          ref="qualificationsFile"
        />
        <uploadLink
          :fileList="certificateOfPracticeFile"
          fileListName="certificateOfPracticeFile"
          :formData="formData1"
          title="医师执业证"
          ref="certificateOfPracticeFile"
        />
        <uploadLink
          :fileList="otherCertificateFile"
          fileListName="otherCertificateFile"
          :formData="formData1"
          title="其他证明"
          ref="otherCertificateFile"
        />
        <uploadLink
          :fileList="caseDiagramFile"
          fileListName="caseDiagramFile"
          :formData="formData1"
          title="亲自主刀案例"
          ref="caseDiagramFile"
        />
        <uploadLink
          :fileList="introductionFile"
          fileListName="introductionFile"
          :formData="formData1"
          title="个人介绍"
          ref="introductionFile"
          :maxLength="9"
        />
      </el-form>
    </div>
    <div class="form">
      <el-form
        ref="form2"
        :rules="rules2"
        :model="formData2"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="formData2.telephone" class="input" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="电子邮箱" prop="mailbox">
          <el-input v-model="formData2.mailbox" class="input" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="擅长项目" prop="beGoodAte" label-width="100px">
          <el-select
            v-model="formData2.beGoodAte"
            placeholder="请选择"
            class="input w188"
            multiple
            :multiple-limit="1"
            @change="onChange"
          >
            <template v-for="(v,index) in classificationoptions">
              <el-option :label="v.name" :value="v.name" :key="index"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <div class="btnBox">
          <el-button class="button" size="medium" @click="toBack" round>返回上一步</el-button>
          <el-button size="medium" type="primary" @click="submitForm" round :disabled="disabled">下一步</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.qualification-box {
  .qualification-title {
    color: #282828;
    font-size: 20px;
    padding: 55px 0 40px 0;
    text-align: center;
  }
  .form {
    padding-left: 85px;
    .input {
      width: 300px;
    }
  }
  .desc {
    color: #999;
    font-size: 12px;
    padding-top: 15px;
  }
  .form1 {
    width: 670px;
    .input {
      width: 328px;
    }
    .img {
      display: inline-block;
      width: 110px;
      height: 110px;
      border: 1px solid #ddd;
      font-size: 50px;
      color: #ddd;
      text-align: center;
      line-height: 100px;
      border-radius: 4px;
    }
  }
  .qualification-tip {
    width: 100%;
    background: #f5f7f8;
    padding: 15px 27px 0 27px;
    margin-top: 50px;
    height: 436px;
    .title {
      line-height: 16px;
      font-size: 16px;
      color: rgba(40, 40, 40, 1);
      margin-bottom: 18px;
    }
    .text {
      color: #686868;
      padding-bottom: 16px;
    }
  }
}
</style>
<style lang='less'>
.qualification-box .avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
// .qualification-box {
// 	.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
// 		content: '';
// 		margin-right: 0px;
// 	}
// }
</style>


<script>
import uploadLink from "./upload";
import Api from "@/api/index.js";
// import classification from "@/components/goodClassification.js";
export default {
  components: {
    uploadLink
  },
  created: function() {},
  mounted: function() {
    this.getCategory();
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
    let verifyPhone = function(rule, value, callback) {
      let val = value && value.trim();
      if (!val) {
        callback("请输入手机号");
      } else if (!/^1[345678]\d{9}$/.test(val)) {
        callback("手机号格式错误");
      } else {
        callback();
      }
    };

    return {
      classificationoptions: [],
      /* 表单数据 */
      formData1: {},
      formData2: {
        beGoodAte: [],
        telephone: "",
        mailbox: ""
      },
      // 个人介绍
      introductionFile: [],
      // 资格证
      qualificationsFile: [],
      // 执业证
      certificateOfPracticeFile: [],
      // 亲自主刀案例
      caseDiagramFile: [],
      // 其他证明
      otherCertificateFile: [],
      rules2: {
        telephone: [{ required: true, trigger: "blur", validator: verifyPhone }],
        mailbox: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        beGoodAte: [
          {
            required: true,
            message: "请选择擅长项目",
            trigger: "change",
            type: "array"
          }
        ]
      },
      disabled: false
    };
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
          }
        })
        .catch(error => {});
    },
    onChange(e) {
      // console.log(e,'e');
    },

    // 提交表单
    submitForm: function() {
      var p = new Promise((resolve, reject) => {
        if (!this.qualificationsFile || this.qualificationsFile.length === 0) {
          this.$message.warning("请上传医师资格证");
          return;
        }
        if (!this.certificateOfPracticeFile || this.certificateOfPracticeFile.length === 0) {
          this.$message.warning("请上传医师执业证");
          return;
        }
        if (!this.otherCertificateFile || this.otherCertificateFile.length === 0) {
          this.$message.warning("请上传其他证明");
          return;
        }
        if (!this.caseDiagramFile || this.caseDiagramFile.length === 0) {
          this.$message.warning("请上传亲自主刀案例");
          return;
        }
        if (!this.introductionFile || this.introductionFile.length === 0) {
          this.$message.warning("请上传个人介绍");
          return;
        }

        let _pass1 = false;
        let _pass2 = false;
        this.$refs.form1.validate(valid => {
          if (valid) {
            _pass1 = true;
          } else {
          }
        });
        this.$refs.form2.validate(valid => {
          if (valid) {
            _pass2 = true;
          } else {
          }
        });
        if (_pass1 && _pass2) {
          this.$emit(
            "setData",
            {
              doctorCerData: {
                ...this.formData2,
                // 资格证
                qualificationsFile: this.qualificationsFile,
                // 执业证
                certificateOfPracticeFile: this.certificateOfPracticeFile,
                // 亲自主刀案例
                caseDiagramFile: this.caseDiagramFile,
                // 其他证明
                otherCertificateFile: this.otherCertificateFile,
                // 个人介绍
                introductionFile: this.introductionFile
              }
            },
            3
          );

          resolve();
        }
      });
      return p;
    },
    toBack() {
      this.$emit("nextStep", 2);
    },
    setData(key, value) {
      this[key] = value;
    },
    fileChange1(e, fileName, imgUrl) {
      console.log(fileName, "heiheihei");
      const self = this;
      var file = e.target.files[0];
      var formData = new FormData();
      var reader = new FileReader();
      var image = new Image();
      if (file) {
        var type = file.type;
        // alert(e.target);
        if (!/image\/\w+/.test(type)) {
          this.$message.error("上传类型错误!");
          document.getElementById("fileInput").value = "";
        } else if (file.size > 1024 * 1024 * 3) {
          this.$message.error("上传头像图片大小不能超过 3MB!");
          document.getElementById("fileInput").value = "";
        } else {
          self.formData2[fileName] = file;
          // 预览
          reader.onload = (function(file) {
            return function(e) {
              var datainfo = this.result;

              self[imgUrl] = datainfo;
            };
          })(e.target.files[0]);

          reader.readAsDataURL(e.target.files[0]);
        }
      }
    },
    reset() {
      // 资格证
      this.qualificationsFile = [];
      this.certificateOfPracticeFile = [];
      this.caseDiagramFile = [];
      this.introductionFile = [];

      this.formData2 = {
        beGoodAte: [],
        telephone: "",
        mailbox: ""
      };
      this.$refs.qualificationsFile.reset();
      this.$refs.certificateOfPracticeFile.reset();
      this.$refs.caseDiagramFile.reset();
      this.$refs.otherCertificateFile.reset();
      this.$refs.introductionFile.reset();
      // this.$refs['form2'].resetFields();
      this.$refs["form2"].resetFields();
    }
  }
};
</script>
