<template>
  <div class="main">
    <el-row>
      <el-col>
        <h2>医生管理 &gt;&gt; 修改个人信息</h2>
      </el-col>
    </el-row>
    <h3>修改医生信息</h3>
    <div class="content">
      <el-row>
        <el-col :span="16">
          <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
            <el-row>
              <el-col :span="11">
                <el-form-item label="姓名">
                  <el-input v-model="formLabelAlign.fullName" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别">
                  <el-select v-model="formLabelAlign.gender" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in sex"
                      :key="index"
                      :label="item.label"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="国家">
                  <el-input v-model="formLabelAlign.country" placeholder="请输入国家"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="职称">
                  <!-- <el-input v-model="formLabelAlign.occupationTitle" placeholder="请输入职称"></el-input> -->
                  <el-select v-model="formLabelAlign.occupationTitle" placeholder="请选择职称">
                    <el-option
                      v-for="(item, index) in doctors"
                      :key="index"
                      :label="item.label"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="手机号">
                  <el-input
                    v-model="formLabelAlign.telephone"
                    placeholder="请输入手机号"
                    oninput="this.value=this.value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="擅长">
                  <el-select v-model="formLabelAlign.beGoodAte[0]" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.label"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="邮箱">
                  <el-input
                    v-model="formLabelAlign.mailbox"
                    placeholder="请输入邮箱"
                    oninput="this.value=this.value.replace(/[^\d.]/g,'');"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="从业时间">
                  <el-date-picker v-model="formLabelAlign.time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form :label-position="labelPosition" label-width="0" :model="portraitFile">
            <el-form-item label>
              <input
                type="file"
                name="image"
                accept="image/*"
                id="fileInput"
                @change="onchangeImgFun"
                class="header-upload-btn user-header-com"
              />
              <img
                v-if="imgUrl"
                :style="{width:'178px',height:'178px'}"
                :src="imgUrl"
                alt
                class="user-header-img user-header-com"
              />
              <i v-else slot="default" class="el-icon-camera"></i>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-row>
          <el-col>
            <el-form-item label="医师执业证">
              <img
                :style="{ float: 'left' }"
                width="100px"
                height="100px"
                v-for="(item,
                    index) in formLabelAlign.certificateOfPractice"
                :key="index"
                :src="item"
                @click="delCertificateOfPractice(index)"
                alt
              />

              <el-upload
                v-show="formLabelAlign.certificateOfPractice.length>2?false:true"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="医师资格证">
              <div v-for="(item, index) in formLabelAlign.qualifications" :key="index">
                <img
                  :style="{ float: 'left' }"
                  width="100px"
                  height="100px"
                  :src="item"
                  alt
                  @click="delQualifications(index)"
                />
              </div>

              <el-upload
                v-show="formLabelAlign.qualifications.length>2?false:true"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="案例图">
              <img
                :style="{ float: 'left' }"
                width="100px"
                height="100px"
                v-for="(item, index) in formLabelAlign.caseDiagram"
                :key="index"
                :src="item"
                @click="delCaseDiagram(index)"
                alt
              />
              <el-upload
                v-show="formLabelAlign.caseDiagram.length>2?false:true"
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
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="其他证书">
              <img
                :style="{ float: 'left' }"
                width="100px"
                height="100px"
                v-for="(item, index) in formLabelAlign.otherCertificate"
                :key="index"
                :src="item"
                @click="delOtherCertificate(index)"
                alt
              />
              <el-upload
                v-show="formLabelAlign.otherCertificate.length>2?false:true"
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
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="个人介绍">
              <div v-for="(item, index) in formLabelAlign.introduction" :key="index">
                <img
                  :style="{ float: 'left' }"
                  width="100px"
                  height="100px"
                  :src="item"
                  alt
                  @click="delIntroduction(index)"
                />
              </div>

              <el-upload
                action="/operate/upload.json"
                list-type="picture-card"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleIntroduction"
                class="upload-wrapper"
                :show-file-list="false"
                v-show="formLabelAlign.introduction.length < 9"
              >
                <i
                  slot="default"
                  class="el-icon-plus"
                  v-show="formLabelAlign.introduction.length < 9"
                ></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="editor">
      <div class="edit">
        <div class="sendInfo">
          <el-button type="primary" @click="sendInfo">提交审核</el-button>
          <el-button @click="goBack">取消</el-button>
        </div>
        <div class="sendInfo"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
import format from "date-fns/format";
export default {
  name: "ediInfo",
  data() {
    return {
      http: "http://1669260du6.iok.la",
      labelPosition: "left",
      sex: ["男", "女", "不选择"],
      doctors: ["主治医生"],
      imgUrl: "",
      formLabelAlign: {
        fullName: "",
        gender: "",
        country: "",
        occupationTitle: "",
        telephone: "",
        mailbox: "",
        beGoodAte: [],
        time: "",
        certificateOfPractice: [],
        caseDiagram: [],
        otherCertificate: [],
        introduction: [],
        qualifications: []
      },
      options: [],
      dialogVisible: false,
      portraitFile: {
        portrait: ""
      }
    };
  },
  created() {
    this.findAuthenticationDoctorDeatail();
    this.findSystemCategory();
  },
  methods: {
    // 获取信息
    findAuthenticationDoctorDeatail() {
      Api.findAuthenticationDoctorDeatail().then(res => {
        this.formLabelAlign = res.data;
        this.imgUrl = res.data.portrait;
      });
    },
    // 头像上传
    // handleAvatarPortraitFile(res, file, fileList) {
    //   console.log(fileList);
    //   this.portraitFile.portrait = res.url[0];
    // },
    onchangeImgFun(e) {
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
          self.portraitFile.portrait = file;
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
    beforeAvatarUpload(file) {
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
    // 执业证上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleCertificateOfPractice(res, file) {
      this.formLabelAlign.certificateOfPractice.push(res.url[0]);
    },
    delCertificateOfPractice(index) {
      this.formLabelAlign.certificateOfPractice.splice(index, 1);
    },
    // 案例图上传
    handleCaseDiagram(res, file) {
      this.formLabelAlign.caseDiagram.push(res.url[0]);
    },
    delCaseDiagram(index) {
      this.formLabelAlign.caseDiagram.splice(index, 1);
    },
    // 资格证书上传
    handleQualifications(res, file) {
      this.formLabelAlign.qualifications.push(res.url[0]);
    },
    delQualifications(index) {
      this.formLabelAlign.qualifications.splice(index, 1);
    },
    // 其他证书上传
    handleOtherCertificate(res, file) {
      this.formLabelAlign.otherCertificate.push(res.url[0]);
    },
    delOtherCertificate(index) {
      this.formLabelAlign.otherCertificate.splice(index, 1);
    },
    // 个人介绍
    handleIntroduction(res, file) {
      this.formLabelAlign.introduction.push(res.url[0]);
    },
    delIntroduction(index) {
      this.formLabelAlign.introduction.splice(index, 1);
    },
    // 分类项目
    findSystemCategory() {
      Api.findSystemCategory().then(res => {
        this.options = res.data.category;
      });
    },
    // 修改
    sendInfo() {
      console.log(22);
      let time = format(this.formLabelAlign.time, "YYYY-MM-DD");

      let params = {};
      if (this.portraitFile.portrait) {
        params = {
          fullName: this.formLabelAlign.fullName,
          gender: this.formLabelAlign.gender,
          country: this.formLabelAlign.country,
          occupationTitle: this.formLabelAlign.occupationTitle,
          telephone: this.formLabelAlign.telephone,
          mailbox: this.formLabelAlign.mailbox,
          beGoodAte: this.formLabelAlign.beGoodAte,
          time,
          portraitFile: this.portraitFile.portrait,
          certificateOfPractice: this.formLabelAlign.certificateOfPractice,
          caseDiagram: this.formLabelAlign.caseDiagram,
          otherCertificate: this.formLabelAlign.otherCertificate,
          introduction: this.formLabelAlign.introduction,
          qualifications: this.formLabelAlign.qualifications
        };
      } else {
        params = {
          fullName: this.formLabelAlign.fullName,
          gender: this.formLabelAlign.gender,
          country: this.formLabelAlign.country,
          occupationTitle: this.formLabelAlign.occupationTitle,
          telephone: this.formLabelAlign.telephone,
          mailbox: this.formLabelAlign.mailbox,
          beGoodAte: this.formLabelAlign.beGoodAte,
          time,
          certificateOfPractice: this.formLabelAlign.certificateOfPractice,
          caseDiagram: this.formLabelAlign.caseDiagram,
          otherCertificate: this.formLabelAlign.otherCertificate,
          introduction: this.formLabelAlign.introduction,
          qualifications: this.formLabelAlign.qualifications
        };
      }

      Api.updateDoctor({ ...params }).then(res => {
        if (res.status === 200 && res.data) {
          this.$router.push({ path: "/doctor/perInformation" });
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding-top: 35px;
  background: rgba(245, 246, 250, 1);
  border-radius: 13px;
  overflow: hidden;
  h2 {
    font-size: 13px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(117, 117, 117, 1);
    line-height: 13px;
    margin-bottom: 32px;
    margin-left: 30px;
  }
  h3 {
    height: 60px;
    background: rgba(243, 247, 247, 1);
    border: 1px solid rgba(225, 225, 225, 1);
    border-bottom: 0;
    margin: 0 30px;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(40, 40, 40, 1);
  }
  .content {
    margin: 0 30px;
    min-height: 600px;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(225, 225, 225, 1);
    padding: 50px 90px;

    .sendInfo {
      margin-bottom: 30px;
      margin-top: 30px;
      margin-left: 230px;
    }
  }

  .el-form-item {
    margin-right: 50px;
  }
  /deep/ .avatar-uploader .el-upload {
    border: 1px solid rgba(53, 179, 188, 1);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: rgba(53, 179, 188, 1);
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .eidt {
    /deep/ .el-button--primary {
      color: #fff;
      background-color: rgba(53, 179, 188, 1);
      border-color: rgba(53, 179, 188, 1);
    }
  }
  /deep/ .el-button--primary {
    color: #fff;
    background-color: rgba(53, 179, 188, 1);
    border-color: rgba(53, 179, 188, 1);
  }
  /deep/ .el-upload--picture-card {
    height: 100px;
    width: 100px;
    line-height: 100px;
  }
  img {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  /deep/ .el-upload--picture-card:hover,
  .el-upload:focus {
    border-color: rgba(53, 179, 188, 1);
    color: rgba(53, 179, 188, 1);
  }
  .user-header {
    position: relative;
    display: inline-block;
  }
  .user-header-com {
    width: 144px;
    height: 144px;
    display: inline-block;
  }
  .header-upload-btn {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
  }
  .tip {
    font-size: 14px;
    color: #666;
  }
  /* error是用于错误提示 */
  .error {
    font-size: 12px;
    color: tomato;
    margin-left: 10px;
  }
  .editor {
    width: 100%;
    background: #fff;
    height: 105px;
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0 auto;
    margin-top: 90px;
    cursor: pointer;
    .edit {
      width: 30%;
      margin: 40px auto;
      .el-button--primary {
        margin-right: 70px;
        margin-top: 40px;
      }
    }
  }
}
</style>
