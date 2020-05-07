<template>
  <div class="main">
    <h2>系统消息</h2>
    <div class="content">
      <h3>消息列表</h3>
      <ul>
        <li v-for="(item, index) in systemNewInfo" :key="index">
          <el-image
            v-if="item.classification === 2"
            style="width: 110px; height: 80px;margin-right:35px;float:left"
            :src="require('../../assets/images/notice.png') "
            fit="scale-down"
          ></el-image>
          <el-image
            v-else-if="item.classification === 1"
            style="width: 110px; height: 80px;margin-right:35px;float:left"
            :src="item.cover"
            fit="scale-down"
          ></el-image>
          <el-image
            v-else
            style="width: 110px; height: 80px;margin-right:35px;float:left"
            :src="item.userHead "
            fit="scale-down"
          ></el-image>
          <div class="notice-left">
            <h4 v-if="item.classification === 3">{{ item.userName }}</h4>
            <h4 v-else-if="item.classification === 1">{{ item.type }}</h4>
            <p
              @click="goHospitalDetail(item)"
              :style="{cursor:item.classification === 3?'pointer':'',color:item.classification === 3?'rgba(53, 179, 188, 1)':''}"
              :class="item.classification === 3?'actives':''"
            >{{ item.content }}</p>
            <span>时间：{{ item.time }}</span>
          </div>
          <div
            class="notice-right"
            :style="{float:'right',marginTop:'-10px'}"
            v-if="item.classification === 3"
          >
            <el-tag type="danger" v-if="item.status==2" effect="dark">已拒绝</el-tag>
            <el-tag type v-else-if="item.status==1" effect="dark">已同意</el-tag>
            <el-tag type="info" v-else effect="dark">未处理</el-tag>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="20"
        background
        layout="prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
    <el-dialog title="入驻邀请详情" :visible.sync="dialogVisible" width="30%" center :show-close="false">
      <div class="container">
        <el-row>
          <el-col :span="5">
            <span>机构头像：</span>
          </el-col>
          <el-col :span="19">
            <el-avatar :size="60" :src="hosDetail.hospitalLog"></el-avatar>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>机构名字：</span>
          </el-col>
          <el-col :span="19">
            <span>{{hosDetail.hospitalName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>机构简介：</span>
          </el-col>
          <el-col :span="19">
            <span>{{hosDetail.introduce}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>入驻国家：</span>
          </el-col>
          <el-col :span="19">
            <span>{{hosDetail.country}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>入驻城市：</span>
          </el-col>
          <el-col :span="19">
            <span>{{hosDetail.city}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>入驻时间：</span>
          </el-col>
          <el-col :span="19">
            <span>{{hosDetail.time}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>入驻地址：</span>
          </el-col>
          <el-col :span="19">
            <span>{{hosDetail.address}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>医院类型：</span>
          </el-col>
          <el-col :span="19">
            <span>{{hosDetail.type}}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/index.js";
import format from "date-fns/format";
import { mapState, mapActions, mapGetter } from "vuex";
export default {
  name: "msgNotice",
  data() {
    return {
      imgUrl: "",
      currentPage4: "",
      systemNewInfo: [],
      dialogVisible: false,
      count: 0,
      hosDetail: {},
      unReadCount: 0
    };
  },
  computed: {
    ...mapState({
      noticeData: state => state.noticeData
    })
  },
  created() {
    this.$store.dispatch("setNoticeData", this.unReadCount);
    this.doctorfindSystemNewInfo(1);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.doctorfindSystemNewInfo(val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.doctorfindSystemNewInfo(val);
    },
    doctorfindSystemNewInfo(page) {
      Api.doctorfindSystemNewInfo({ page }).then(res => {
        console.log(res);
        if (res.status === 200 && res.data) {
          res.data.list.forEach(item => {
            item.time = format(item.time, "YYYY-MM-DD hh:mm:ss");
          });
          this.systemNewInfo = res.data.list;
          this.count = res.data.count;
        }
      });
    },
    goHospitalDetail(data) {
      if (data.classification === 3) {
        this.dialogVisible = true;
        this.appFindDoctorHospitalDetail(data.hospitalId);
      }
    },

    // 系统消息查询机构入驻邀请详情
    appFindDoctorHospitalDetail(hospitalId) {
      Api.appFindDoctorHospitalDetail({ hospitalId }).then(res => {
        if (res.status === 200 && res.data) {
          res.data.time = format(res.data.time, "YYYY-MM-DD");
          this.hosDetail = res.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background: rgba(245, 246, 250, 1);
  border-radius: 13px;
  padding: 0 22px;
  padding-bottom: 29px;
  overflow: hidden;
  h2 {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(117, 117, 117, 1);
    line-height: 14px;
    margin: 25px 0 35px;
  }
  .content {
    width: 100%;
    min-height: 200px;
    background: rgba(255, 255, 255, 1);
    padding: 0 34px;
    overflow: hidden;
    margin-bottom: 18px;
    h3 {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(117, 117, 117, 1);
      line-height: 16px;
      margin-top: 26px;
      margin-bottom: 33px;
    }
    ul {
      padding-bottom: 5px;

      li {
        overflow: hidden;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(237, 237, 243, 1);
        margin-bottom: 20px;
        .notice-left {
          h4 {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(117, 117, 117, 1);
            line-height: 14px;
            margin-top: 9px;
          }
          p {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(170, 170, 170, 1);
            line-height: 14px;
            margin: 10px 0;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(201, 201, 201, 1);
            line-height: 14px;
          }
        }
      }
    }
  }
  actives {
    &:hover {
      color: rgba(53, 179, 188, 1);
    }
  }
  .footer {
    width: 570px;
    margin: 0 auto;
    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
      background: rgba(53, 179, 188, 1);
    }
    // /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
    //   color: rgba(53, 179, 188, 1);
    // }
  }
  .container {
    width: 67%;
    min-height: 200px;
    margin: 0 auto;
    overflow: hidden;
    span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(117, 117, 117, 1);
      line-height: 30px;
      margin-bottom: 15px;
    }
  }
  /deep/ .el-button--primary {
    background-color: rgba(53, 179, 188, 1);
    border-color: rgba(53, 179, 188, 1);
  }
  /deep/ .el-button:active {
    color: #fff;
    border-color: rgba(53, 179, 188);
  }
  /deep/ .el-button:hover {
    color: #fff;
    border-color: rgba(53, 179, 188);
  }
  /deep/.el-button--small.el-button--primary {
    background-color: rgba(53, 179, 188, 1);
    border-color: rgba(53, 179, 188, 1);
  }
  .item {
    width: 100%;
    margin-top: 10px;
    margin-right: 20px;
  }
}
</style>
