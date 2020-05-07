<template>
  <div class="content">
    <h1>合作机构</h1>
    <div class="containter">
      <div class="coopOra-header">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合作时间">
                <div class="block">
                  <el-date-picker
                    v-model="formLabelAlign.cooppTimes"
                    type="datetimerange"
                    :default-time="['12:00:00']"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="success" @click="search">开始搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row>
        <el-col>
          <div class="select">
            <div class="select-item">
              <el-select v-model="formLabelAlign.order" placeholder="按时间排序" @change="doctorOrder">
                <el-option
                  v-for="item in formLabelAlign.timeSort"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <ul>
        <li v-for="item in doctorList" :key="item.hospitalId">
          <el-row>
            <el-col>
              <el-row>
                <el-col :span="6">
                  <el-avatar :src="item.hospitalLog"></el-avatar>
                </el-col>
                <el-col :span="14">
                  <el-row>
                    <el-col>
                      <p>医院名称：{{item.hospitalName}}</p>
                    </el-col>
                    <el-col>
                      <p>城市：{{item.city}}</p>
                    </el-col>
                    <el-col>
                      <h3>合作状态：</h3>
                      <span v-if="item.type===0">审核中</span>
                      <span v-else>合作中</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button
                v-show="item.type===1?true:false"
                type="primary"
                @click="doctorAgree(item.hospitalId)"
              >接受合作</el-button>
              <el-button v-show="item.type===1?true:false" @click="doctorRefu(item.hospitalId)">拒绝合作</el-button>
              <el-button
                v-show="item.type===1?false:true"
                class="plainBtn"
                @click="delHospital(item.hospitalId)"
              >解除合作</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
import format from "date-fns/format";
export default {
  name: "CoopOrganization",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        coopValue: "",
        cooppTimes: "",
        timeSort: [
          {
            label: "时间正序",
            value: "0"
          },
          {
            label: "时间倒序",
            value: "1"
          }
        ],
        order: ""
      },
      doctorList: [],
      count: ""
    };
  },
  created() {
    this.DoctorFindAllBindHospital({ page: 1 });
  },
  methods: {
    // 查询医生合作机构
    DoctorFindAllBindHospital(params) {
      Api.DoctorFindAllBindHospital({ ...params }).then(res => {
        if (res.status === 200 && res.data.list) {
          this.doctorList = res.data.list;
        }
      });
    },
    delHospital(hospitalId) {
      // this.delOpen(hospitalId);
      this.deleteDoctorHospitalIds(hospitalId);
    },
    // 医生解除合作
    deleteDoctorHospitalIds(hospitalId) {
      Api.deleteDoctorHospitalIds({ hospitalId }).then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 1) {
            this.$message({
              type: "success",
              message: "解除成功!"
            });
            this.DoctorFindAllBindHospital({ page: 1 });
          } else if (res.data.result === 0) {
            this.$message({
              type: "info",
              message: "解除失败!"
            });

            this.DoctorFindAllBindHospital({ page: 1 });
          } else {
            this.$message({
              type: "error",
              message: "未登录"
            });
          }
        }
      });
    },
    // 医生同意
    doctorAgree(hospitalId) {
      this.insertDoctorAgreeHospitals(hospitalId);
    },
    insertDoctorAgreeHospitals(hospitalId) {
      Api.insertDoctorAgreeHospitals(hospitalId).then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 1) {
            this.$message({
              type: "success",
              message: "加入成功!"
            });
            this.DoctorFindAllBindHospital(1);
          } else if (res.data.result === 0) {
            this.$message({
              type: "info",
              message: "加入失败!"
            });

            this.DoctorFindAllBindHospital({ page: 1 });
          } else {
            this.$message({
              type: "error",
              message: "未登录"
            });
          }
        }
      });
    },
    // 医生拒绝机构
    doctorRefu(hospitalId) {
      this.insertDoctorRefuseHospitals(hospitalId);
    },
    insertDoctorRefuseHospitals(hospitalId) {
      Api.insertDoctorRefuseHospitals(hospitalId).then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.result === 1) {
            this.$message({
              type: "success",
              message: "已拒绝!"
            });
            this.DoctorFindAllBindHospital(1);
          } else if (res.data.result === 0) {
            this.$message({
              type: "info",
              message: "拒绝失败!"
            });

            this.DoctorFindAllBindHospital(1);
          } else {
            this.$message({
              type: "error",
              message: "未登录"
            });
          }
        }
      });
    },
    // 排序
    doctorOrder(e) {
      this.DoctorFindAllBindHospital({ page: 1, order: e });
    },
    // 搜索
    search() {
      let timeArr = [];
      this.formLabelAlign.cooppTimes.forEach(item => {
        timeArr.push(format(item, "YYYY-MM-DD"));
      });
      let timeObj = {};
      timeObj.startTime = timeArr[0];
      timeObj.endTime = timeArr[1];
      let params = {
        page: 1,
        startTime: timeObj.startTime,
        endTime: timeObj.endTime
      };
      this.DoctorFindAllBindHospital(params);
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;

  padding: 30px 16%;
  background: rgba(245, 246, 250, 1);
  h1 {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(117, 117, 117, 1);
    line-height: 14px;
    margin-bottom: 25px;
  }
  .containter {
    min-height: 200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 13px;
    padding: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    .coopOra-header {
      height: 80px;
      background: rgba(243, 247, 247, 1);
      border-radius: 2px;
      border: 1px solid rgba(225, 225, 225, 1);
      margin: 20px;
      /deep/ .el-form-item {
        margin: 25px 0;
        /deep/ .el-select {
          margin-right: 20px;
        }
      }
      /deep/ .el-button--success {
        color: #fff;
        background: rgba(53, 179, 188, 1);
        border-color: rgba(53, 179, 188, 1);
        margin-top: 25px;
      }
    }
  }
  .select {
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .select-item {
      float: right;
      width: 120px;
      margin-left: 87%;
    }
  }
  ul {
    li {
      width: 320px;
      padding: 30px 49px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin: 20px;
      float: left;
      /deep/ .el-avatar {
        width: 61px;
        height: 61px;
      }
      p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(152, 152, 152, 1);
        line-height: 14px;
        margin-bottom: 7px;
        margin-left: 15px;
      }
      h3 {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(152, 152, 152, 1);
        line-height: 14px;
        float: left;
        margin-bottom: 24px;
        margin-left: 15px;
      }
      span {
        float: left;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(53, 179, 188, 1);
        line-height: 14px;
        &:nth-of-type(2) {
          color: rgba(152, 152, 152, 1);
        }
      }
      /deep/ .el-button--primary {
        color: #fff;
        background-color: rgba(53, 179, 188, 1);
        border-color: rgba(53, 179, 188, 1);
        margin-right: 10px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
      }
      /deep/ .el-button--default {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(117, 117, 117, 1);
      }
      /deep/ .el-button:active {
        border-color: rgba(53, 179, 188, 1);
      }
      .plainBtn {
        border: 1px solid rgba(53, 179, 188, 1);
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(53, 179, 188, 1);
        line-height: 14px;
        margin-left: 56px;
      }
    }
  }
}
</style>