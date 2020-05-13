<template>
  <div class="qualification-box">
    <div class="qualification-title">请提交医生的资质证明材料</div>
    <div class="form form1">
      <el-form ref="form1" :model="formData1" label-width="100px" label-position="left">
        <!-- <uploadLink
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
        />-->
        <el-row>
          <el-col>
            <el-form-item label="医师执业证">
              <div
                v-for="(item,
                    index) in certificateOfPracticeFile"
                :key="index"
                class="img-item-wrapper"
              >
                <img :style="{ float: 'left' }" class="img-item" :src="item.adress" alt />
                <i
                  class="el-icon-error img-close-icon pointer"
                  @click="delCertificateOfPractice(index)"
                ></i>
              </div>
              <el-upload
                action="/operate/upload.json"
                list-type="picture-card"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleCertificateOfPractice"
                class="upload-wrapper"
                :show-file-list="false"
              >
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
              <div class="desc">请上传应用高清图片，最大3M</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="医师资格证">
              <div
                v-for="(item,
                    index) in qualificationsFile"
                :key="index"
                class="img-item-wrapper"
              >
                <img :style="{ float: 'left' }" class="img-item" :src="item.adress" alt />
                <i class="el-icon-error img-close-icon pointer" @click="delQualifications(index)"></i>
              </div>
              <el-upload
                action="/operate/upload.json"
                list-type="picture-card"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleQualifications"
                class="upload-wrapper"
                :show-file-list="false"
              >
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
              <div class="desc">请上传应用高清图片，最大3M</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="案例图">
              <div
                v-for="(item,
                    index) in caseDiagramFile"
                :key="index"
                class="img-item-wrapper"
              >
                <img :style="{ float: 'left' }" class="img-item" :src="item.adress" alt />
                <i class="el-icon-error img-close-icon pointer" @click="delCaseDiagram(index)"></i>
              </div>
              <el-upload
                action="/operate/upload.json"
                list-type="picture-card"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleCaseDiagram"
                class="upload-wrapper"
                :show-file-list="false"
              >
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
              <div class="desc">请上传应用高清图片，最大3M</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="其他证书">
              <div
                v-for="(item,
                    index) in otherCertificateFile"
                :key="index"
                class="img-item-wrapper"
              >
                <img :style="{ float: 'left' }" class="img-item" :src="item.adress" alt />
                <i class="el-icon-error img-close-icon pointer" @click="delOtherCertificate(index)"></i>
              </div>
              <el-upload
                action="/operate/upload.json"
                list-type="picture-card"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleOtherCertificate"
                class="upload-wrapper"
                :show-file-list="false"
              >
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
              <div class="desc">请上传应用高清图片，最大3M</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="个人介绍">
              <div
                v-for="(item,
                    index) in introductionFile"
                :key="index"
                class="img-item-wrapper"
              >
                <img :style="{ float: 'left' }" class="img-item" :src="item.adress" alt />
                <i class="el-icon-error img-close-icon pointer" @click="delIntroduction(index)"></i>
              </div>
              <el-upload
                action="/operate/upload.json"
                list-type="picture-card"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleIntroduction"
                class="upload-wrapper"
                :show-file-list="false"
              >
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
              <div class="desc">请上传应用高清图片，最大3M</div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="个人介绍">
          <label for="introductionFile">
            <div class="img pointer" v-show="!imgUrl1">+</div>
            <el-image
              style="width: 328px; height: 180px"
              :src="imgUrl1"
              v-show="imgUrl1"
              class="pointer"
            ></el-image>

            <input id="introductionFile" type="file" class="el-upload__input" @change="fileChange1" />
          </label>
        </el-form-item>-->
        <!-- <uploadLink
          :fileList="introductionFile"
          fileListName="introductionFile"
          :formData="formData1"
          title="个人介绍"
          ref="introductionFile"
          :maxLength="9"
        />-->
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
    width: 400px;
    margin: 0 auto;
    .input {
      width: 300px;
    }
    .btnBox {
      padding-bottom: 30px;
      display: flex;
      justify-content: space-between;
    }
    .img-item-wrapper {
      position: relative;
      display: inline-block;
      margin-right: 20px;
      vertical-align: top;
      margin-bottom: 10px;
      img {
        vertical-align: top;
        display: inline-block;
        width: 110px;
      }
      i {
        position: absolute;
        right: -7px;
        top: -7px;
      }
    }
  }
  .desc {
    color: #999;
    font-size: 12px;
    padding-top: 15px;
  }
  .form1 {
    width: 400px;
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
.qualification-box {
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
import uploadLink from "./upload";
// import classification from "@/components/goodClassification.js";
export default {
  components: {
    uploadLink
  },
  created() {
    console.log(this.caseDiagramFile);
  },
  mounted: function() {
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
      // goodAtOption: classification.goodAt,
      /* 表单数据 */
      classificationoptions: [],
      /* 表单数据 */

      formData1: {},
      // formData2: {
      //   beGoodAte: [],
      //   telephone: "",
      //   mailbox: ""
      // },
      // imgUrl1: "",
      // 资格证
      qualificationsFile: [],
      // 执业证
      certificateOfPracticeFile: [],
      // 亲自主刀案例
      caseDiagramFile: [],
      // 个人介绍
      introductionFile: [],
      // 其他证明
      otherCertificateFile: [],
      // rules2: {
      //   telephone: [{ required: true, trigger: "blur", validator: verifyPhone }],
      //   mailbox: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
      //   beGoodAte: [{ required: true, message: "请选择擅长项目", trigger: "change", type: "array" }]
      // },
      disabled: false
    };
  },

  methods: {
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
        // let _pass2 = false;
        this.$refs.form1.validate(valid => {
          if (valid) {
            _pass1 = true;
          } else {
          }
        });
        // this.$refs.form2.validate(valid => {
        //   if (valid) {
        //     _pass2 = true;
        //   } else {
        //   }
        // });
        if (_pass1) {
          this.$emit(
            "setData",
            {
              doctorCerData: {
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
    beforeAvatarUpload(file) {
      const _type = ["image/jpeg", "image/png", "image/jpg", "image/bmp"];
      const isLt10M = file.size / 1024 / 1024 < 3;
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
    // 执业证上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleCertificateOfPractice(res, file) {
      console.log(res);
      this.certificateOfPracticeFile.push({ adress: res.url[0], file: file.raw });
    },
    delCertificateOfPractice(index) {
      this.certificateOfPracticeFile.splice(index, 1);
    },
    // 案例图上传
    handleCaseDiagram(res, file) {
      // console.log(res)
      this.caseDiagramFile.push({ adress: res.url[0], file: file.raw });
    },
    delCaseDiagram(index) {
      this.caseDiagramFile.splice(index, 1);
    },
    // 资格证书上传
    handleQualifications(res, file) {
      console.log(file, this.qualificationsFile);
      this.qualificationsFile.push({ adress: res.url[0], file: file.raw });
    },
    delQualifications(index) {
      this.qualificationsFile.splice(index, 1);
    },
    // 其他证书上传
    handleOtherCertificate(res, file) {
      this.otherCertificateFile.push({ adress: res.url[0], file: file.raw });
    },
    delOtherCertificate(index) {
      this.otherCertificateFile.splice(index, 1);
    },
    // 个人介绍
    handleIntroduction(res, file) {
      this.introductionFile.push({ adress: res.url[0], file: file.raw });
    },
    delIntroduction(index) {
      this.introductionFile.splice(index, 1);
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
      // this.formData2 = {
      //   beGoodAte: [],
      //   telephone: "",
      //   mailbox: ""
      // };
      this.$refs.qualificationsFile.reset();
      this.$refs.certificateOfPracticeFile.reset();
      this.$refs.caseDiagramFile.reset();
      this.$refs.otherCertificateFile.reset();
      this.$refs.introductionFile.reset();
      // this.$refs['form2'].resetFields();
      // this.$refs["form2"].resetFields();
    }
  }
};
</script>
