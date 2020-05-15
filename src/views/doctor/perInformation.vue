<template>
  <div class="main">
    <h2>医生管理 &gt;&gt; 个人信息</h2>
    <div class="content">
      <el-form label-position="center" label-width="120px" :model="information" :disabled="true">
        <el-row>
          <el-col :span="8">
            <div class="result" v-show="information.status===0?true:false">
              <p>审核状态：审核中</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="result" v-show="information.status===2?true:false">
              <el-row>
                <el-col>
                  <span>审核状态：</span>
                  <span>审核失败</span>
                </el-col>
              </el-row>

              <div class="reason">失败原因：{{information.reason}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="10">
                <el-form-item label="名字">
                  <el-input v-model="information.fullName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="性别">
                  <el-input v-model="information.gender"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="国家">
                  <el-input v-model="information.country"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="职称">
                  <el-input v-model="information.occupationTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="从业时间">
                  <el-input v-model="information.time"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="邮箱">
                  <el-input v-model="information.mailbox"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="手机号">
                  <el-input v-model="information.telephone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="擅长">
                  <el-input
                    v-for="(item,index) in information.beGoodAte"
                    :key="index"
                    :value="item"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <div class="images">
              <img :style="{width:'178px',height:'178px'}" :src="information.portrait" alt />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="医师执业证">
              <img
                :style="{width:'100px',height:'100px'}"
                v-for="(item,index) in information.certificateOfPractice"
                :key="index"
                :src="item"
                alt
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="医师资格证">
              <img
                :style="{width:'100px',height:'100px'}"
                v-for="(item,index) in information.qualifications"
                :key="index"
                :src="item"
                alt
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="案例图">
              <img
                :style="{width:'100px',height:'100px'}"
                v-for="(item,index) in information.caseDiagram"
                :key="index"
                :src="item"
                alt
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="其他证书">
              <img
                :style="{width:'100px',height:'100px'}"
                v-for="(item,index) in information.otherCertificate"
                :key="index"
                :src="item"
                alt
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="个人介绍">
              <img
                :style="{width:'100px',height:'100px'}"
                v-for="(item,index) in information.introduction"
                :key="index"
                :src="item"
                alt
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-row>
      <el-col>
        <div class="edit">
          <el-button
            type="primary"
            @click="edit(information.userId)"
            :disabled="information.status===0?true:false"
          >{{information.status===2?'重新提交审核':'修改个人信息'}}</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from "@/api/index.js";
import format from "date-fns/format";
import { mapState, mapActions, mapGetter } from "vuex";
export default {
  name: "perInformation",
  data() {
    return {
      information: {}
    };
  },
  created() {
    this.findAuthenticationDoctorDeatail();
  },
  methods: {
    findAuthenticationDoctorDeatail() {
      Api.findAuthenticationDoctorDeatail().then(res => {
        if (res.status === 200 && res) {
          this.$store.dispatch("setUserData", res.data);
          this.information = res.data;
          this.information.time = format(this.information.time, "YYYY-MM-DD");
        }
      });
    },
    edit(userId) {
      this.$router.push({
        path: "perInformation/edit",
        query: {
          userId
        }
      });
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
    // color: rgba(53, 179, 188, 1);
    color: rgba(117, 117, 117, 1);
    line-height: 13px;
    margin-bottom: 25px;
    margin-left: 30px;
  }
  .content {
    min-height: 600px;
    background: rgba(255, 255, 255, 1);
    padding: 50px 90px;
    margin: 0 30px;
    border: 1px solid rgba(225, 225, 225, 1);
  }
  .result {
    p {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(117, 117, 117, 1);
      line-height: 20px;
      width: 100%;
      margin-bottom: 50px;
      float: left;
    }
    span {
      font-size: 20px;
      float: left;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(117, 117, 117, 1);
      line-height: 20px;
      margin-bottom: 20px;
      &:nth-of-type(2) {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 0, 0, 1);
        line-height: 20px;
        -webkit-text-stroke: 1px rgba(151, 151, 151, 1);
        text-stroke: 1px rgba(151, 151, 151, 1);
      }
    }
    .reason {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(53, 179, 188, 1);
      line-height: 16px;
      margin-bottom: 50px;
    }
  }
  p {
    float: left;
    width: 56px;
    margin-right: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(170, 170, 170, 1);
    line-height: 14px;
    margin-bottom: 10px;
  }
  span {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(170, 170, 170, 1);
    line-height: 14px;
    margin-right: 15px;
    width: 100px;
    margin-bottom: 20px;
  }
  h3 {
    width: 100px;
    float: left;
    margin-right: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(170, 170, 170, 1);
    line-height: 100px;
    margin-bottom: 20px;
  }
  h4 {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(170, 170, 170, 1);
  }
  img {
    float: left;
    height: 100%;
    width: 100px;
    margin-right: 10px;
  }
  .images {
    img {
      width: 120px;
      height: 100%;
    }
  }
  .edit {
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
    /deep/ .el-button--primary {
      margin: 40px auto;
      color: #fff;
      background-color: rgba(53, 179, 188, 1);
      border-color: rgba(53, 179, 188, 1);
    }
  }
  /deep/ .el-input__inner {
    color: #606266;
  }
}
</style>