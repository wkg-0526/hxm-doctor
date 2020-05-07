<template>
  <div class="renzheng-wrapper">
    <div v-show="status === 1">
      <!-- 第二步 -->
      <material @setData="setData" ref="material" />
      <!-- 第三步 -->
      <qualification @setData="setData" ref="qualification" />
      <div class="renzhengBtnBox">
        <el-button @click="handleBack">返回</el-button>
        <el-button type="primary" @click="submitForm" :disabled="disabled">保存设置</el-button>
      </div>
      <!-- <div class="renzhengBtnBox">
                <el-button 
                    class="button yellow"
                    size="medium"
                    type="primary" 
                    @click="submitForm"
                    :disabled="disabled"
                ></el-button>
      </div>-->
      <!-- 第四步 -->
    </div>
    <div>
      <!-- status 0申请中 2拒绝 3已降级为普通用户不能进行操作（修改、撤销） -->
      <!-- 审核中 -->
      <auditing v-if="status=== 0"></auditing>
      <!-- 已拒绝 -->
      <refuse v-if="status=== 2" :data="detailData" link="material" @resetMaterial="resetMaterial"></refuse>
      <!-- 已降级 -->
      <downgrade v-if="status=== 3"></downgrade>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import material from "./component/material";
import qualification from "./component/qualification";
import Api from "@/api/index.js";
import finish from "./component/finish.vue";
import format from "date-fns/format";
import cityData from "./component/city.js";
import auditing from "@/components/result/auditing";
import refuse from "@/components/result/refuse";
import downgrade from "@/components/result/downgrade";

export default {
  name: "home",
  components: {
    material,
    qualification,
    finish,
    auditing,
    refuse,
    downgrade
  },
  data() {
    return {
      materialData: {},
      qualificationData: {},
      detailData: {},
      type: "edit",
      disabled: false,
      finishData: {
        // hospitalLog: "http://hxm-1259538451.file.myqcloud.com/hxm/hospitalLog/0/20191108232044822655675.png",
        // hospitalName: "11",
        // pwd: "123456",
        // result: 2,
        // userAccount: "20191108232045001063",
      },
      // status 0申请中 2拒绝 3已降级为普通用户不能进行操作（修改、撤销）
      status: 1
    };
  },
  created() {
    // this.type = this.$route.query.type;
    this.getInitData();

    if (this.$route.query.acitiveStep) {
      this.acitiveStep = Number(this.$route.query.acitiveStep);
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.acitiveStep) {
        this.acitiveStep = this.$route.query.acitiveStep;
      }
    }
  },
  methods: {
    // 拒绝后获取初始数据
    getInitData(callback) {
      Api.appFindHospitalDetailAuthentication({})
        .then(res => {
          if (res && res.data && res.data.result === 500) {
            this.$message({
              message: "机构不存在",
              type: "warning"
            });
            return;
          }

          if (res && res.status === 200) {
            // console.log(res.data);
            this.status = res.data.status;

            this.detailData = res.data;
            const {
              hospitalName,
              time,
              country,
              address,
              type,
              introduce,
              hospitalLog,
              city,

              businessLicenseName,
              creditCode,
              legalPerson,
              legalPersonIdNumber,
              legalPersonPhone,
              fullName,
              telePhone,
              mailbox,
              position,

              // 营业执照
              businessLicense,
              // 机构许可证
              institutionalLicense
            } = res.data;
            let _time = format(time, "YYYY-MM-DD");

            // 城市回填
            let _arr = [];
            for (let obj of cityData) {
              for (let o of obj.children) {
                if (o.value === city) {
                  // console.log(obj.value,city)
                  _arr.push(obj.value);
                  _arr.push(city);
                  break;
                }
              }
            }

            let obj1 = {
              hospitalName,
              time: _time,
              country,
              address,
              type,
              introduce,
              city: _arr
              // imgUrl:hospitalLog
            };
            let obj2 = {
              businessLicenseName,
              creditCode
            };

            let obj3 = {
              legalPerson,
              legalPersonIdNumber,
              legalPersonPhone,
              fullName,
              telePhone,
              mailbox,
              position
            };

            this.$refs.material.formData = obj1;
            this.$refs.material.imgUrl = hospitalLog;

            this.$refs.qualification.formData1 = obj2;
            this.$refs.qualification.formData2 = obj3;

            this.$refs.qualification.imgUrl1 = businessLicense;
            this.$refs.qualification.imgUrl2 = institutionalLicense;

            callback && callback();
          }
        })
        .catch(error => {});
    },
    onSubmit() {
      let params = {
        ...this.materialData,
        ...this.qualificationData
      };
      // 处理数据
      params.city = params.city[params.city.length - 1];
      //
      this.disabled = true;

      Api.updateHospitalAuthentication(params)
        .then(res => {
          this.disabled = false;
          console.log(res, "res");
          if (res && res.data && !res.data.result) {
            this.$message({
              message: "更新失败",
              type: "warning"
            });
            return;
          }
          if (res && res.data && res.data.result === 500) {
            this.$message({
              message: "不能重复认证",
              type: "warning"
            });
            return;
          }

          if (res && res.data && res.data.result) {
            // this.type='finish';
            this.getInitData(() => {
              this.$message({
                message: "申请成功",
                type: "success"
              });
            });
          }
        })
        .catch(error => {
          this.disabled = false;
        });
    },
    submitForm() {
      // this.$refs.material.submitForm();
      Promise.all([this.$refs.qualification.submitForm(), this.$refs.material.submitForm()]).then(
        () => {
          this.onSubmit();
        }
      );
    },
    resetMaterial() {
      this.getInitData(() => {
        this.status = 1;
      });
    },
    setData(obj) {
      for (let i in obj) {
        this[i] = obj[i];
      }
    },
    handleBack() {
      this.getInitData(() => {
        this.$message({
          message: "已返回",
          type: "success"
        });
      });
    },
    toBack() {
      this.type = "edit";

      this.$refs.material.reset();
      this.$refs.qualification.reset();

      this.materialData = {};
      this.qualificationData = {};
      this.finishData = {};
    }
  }
};
</script>
<style lang='less' scoped>
.step-wrapper {
  width: 1000px;
  margin: 0 auto;
  padding-top: 45px;
}

.tab-wrapper {
  width: 400px;
  margin: 0 auto;
  padding: 55px 0 40px 0;
  color: #282828;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  > span {
    color: #686868;
    cursor: pointer;
    display: inline-block;
  }
  .active {
    position: relative;
    &::before {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      height: 4px;
      background: #ffd533;
      content: "";
    }
  }
}
.renzhengBtnBox {
  padding-bottom: 30px;
  text-align: center;
}
</style>
<style lang='less'>
.renzhengBtnBox {
  button.el-button {
  }
}
</style>



