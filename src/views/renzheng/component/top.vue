<template>
  <div class="top-box">
    <div class="material-tip">请填写下方认证医生所需的资料</div>
    <div class="form">
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="头像" prop="portraitFile">
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
          <el-col :span="12">
            <el-row :gutter="80">
              <el-col :span="24">
                <el-form-item label="姓名" prop="fullName">
                  <el-input v-model="formData.fullName" class="input w188" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
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
              <el-col :span="24">
                <el-form-item label="国家" prop="country">
                  <el-select v-model="formData.country" placeholder="请选择" class="input w188">
                    <el-option label="中国" value="中国"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
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
                class="input"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="手机号码" prop="telephone">
            <el-input v-model="formData.telephone" class="input" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="电子邮箱" prop="mailbox">
            <el-input v-model="formData.mailbox" class="input" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="擅长项目" prop="beGoodAte" label-width="100px">
            <el-select
              v-model="formData.beGoodAte"
              placeholder="请选择"
              class="input w188"
              multiple
              :multiple-limit="3"
              @change="onChange"
            >
              <template v-for="v in goodAtOption">
                <el-option :label="v.name" :value="v.name" :key="v.name"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-row>
        <div class="btnBox">
          <el-button class="button" size="medium" @click="toBack" round>返回上一步</el-button>
          <el-button size="medium" type="primary" @click="submitForm" round>下一步</el-button>
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
    // padding-left: 85px;
    width: 400px;
    margin: 0 auto;
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
import classification from "@/components/goodClassification.js";
export default {
  created: function() {},
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
      goodAtOption: classification.goodAt,
      /* 表单数据 */
      formData: {
        fullName: "",
        time: "",
        country: "中国",
        gender: "",
        occupationTitle: "",
        portraitFile: "",
        beGoodAte: [],
        telephone: "",
        mailbox: ""
      },
      // city: city,
      imgUrl: "",
      /* 校验数据 */
      rules: {
        fullName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        time: [{ required: true, message: "请选择从业时间", trigger: "change" }],
        country: [{ required: true, message: "请选择国家", trigger: "change" }],
        occupationTitle: [{ required: true, message: "请选择职称", trigger: "change" }],
        telephone: [{ required: true, trigger: "blur", validator: verifyPhone }],
        mailbox: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        beGoodAte: [{ required: true, message: "请选择擅长项目", trigger: "change", type: "array" }]
      }
    };
  },
  methods: {
    onChange(e) {
      // console.log(e,'e');
    },
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
            // this.$nextTick(() => {
            //   resolve();
            // });
          } else {
          }
        });
      });
      return p;
    },

    toBack() {
      this.$emit("nextStep", 1);
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
        portraitFile: "",
        beGoodAte: [],
        telephone: "",
        mailbox: ""
      };
      this.imgUrl = "";
      this.$refs["form"].resetFields();
    }
  }
};
</script>