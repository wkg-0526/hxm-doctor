<template>
  <div class="main">
    <h2>系统消息</h2>
    <div class="content">
      <h3>消息列表</h3>
      <div class="btn">
        <el-button
          v-for="(item,index) in btn"
          :class="activeIndex==index?'btnactive':''"
          :key="index"
          @click="btnHandle(index)"
        >{{item}}</el-button>
      </div>
      <ul>
        <li>
          <el-row>
            <el-col :span="3">
              <div>
                <el-image
                  style="width: 110px; height: 80px;margin-right:35px;float:left"
                  :src="require('../../../assets/images/notice.png') "
                  fit="scale-down"
                ></el-image>
                <div class="badge"></div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="notice-left">
                <el-row>
                  <el-col>
                    <div>
                      <h4>xxxxxxxxxxxx</h4>
                    </div>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col>
                    <div>
                      <p
                        :class="isFlod?'seeNotice':'seeNotice2'"
                      >xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                      <div class="closemsg" v-show="isFlod===true" @click="isFlod=!isFlod">
                        阅读全文
                        <i class="el-icon-arrow-up"></i>
                      </div>
                      <div class="closemsg2" v-show="isFlod===false" @click="isFlod=!isFlod">
                        收起
                        <i class="el-icon-arrow-down"></i>
                      </div>
                    </div>
                  </el-col>
                </el-row>-->
                <el-row>
                  <el-col>
                    <div class="closemsg" @click="dialogRead = true" :style="{margin:'5px 0'}">
                      阅读全文
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <span>时间：xxxxxxxxx</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="readmsg">已读</div>
            </el-col>
          </el-row>
        </li>

        <li v-for="(item, index) in systemNewInfo" :key="index">
          <div v-if="item.classification === 2">
            <el-image
              style="width: 110px; height: 80px;margin-right:35px;float:left"
              :src="require('../../../assets/images/notice.png') "
              fit="scale-down"
            ></el-image>
            <!-- <div class="badge"></div> -->
          </div>
          <div v-else-if="item.classification === 1">
            <el-image
              style="width: 110px; height: 80px;margin-right:35px;float:left"
              :src="item.cover"
              fit="scale-down"
            ></el-image>
            <!-- <div class="badge"></div> -->
          </div>
          <div v-else>
            <el-image
              style="width: 110px; height: 80px;margin-right:35px;float:left"
              :src="item.userHead "
              fit="scale-down"
            ></el-image>
            <!-- <div class="badge"></div> -->
          </div>

          <div class="notice-left">
            <div v-if="item.classification === 3">
              <h4>{{ item.userName }}</h4>
              <!-- <el-tag class="tags" type="danger" v-if="item.status==2" effect="dark">已拒绝</el-tag>
              <el-tag class="tags" type v-else-if="item.status==1" effect="dark">已同意</el-tag>
              <el-tag class="tags" type="warning" v-else effect="dark">未处理</el-tag>-->
            </div>
            <div v-else-if="item.classification === 1">
              <h4>{{ item.type }}</h4>
              <!-- <el-tag class="tags" type="info" effect="dark">已读</el-tag>
              <el-tag class="tags" type="danger" effect="dark">未读</el-tag>-->
            </div>
            <div v-else-if="item.classification ===2">
              <!-- <el-tag class="tags" type="info" effect="dark">已读</el-tag>
              <el-tag class="tags" type="danger" effect="dark">未读</el-tag>-->
            </div>
            <p
              class="seeNotice"
              @click="goHospitalDetail(item)"
              :style="{cursor:item.classification === 3?'pointer':'',color:item.classification === 3?'rgba(53, 179, 188, 1)':''}"
              :class="item.classification === 3?'actives':''"
            >{{ item.content }}</p>
            <span>时间：{{ item.time }}</span>
          </div>
          <!-- <div
            class="notice-right"
            :style="{float:'right',marginTop:'-10px'}"
            v-if="item.classification === 3"
          >
            <el-tag type="danger" v-if="item.status==2" effect="dark">已拒绝</el-tag>
            <el-tag type v-else-if="item.status==1" effect="dark">已同意</el-tag>
            <el-tag type="info" v-else effect="dark">未处理</el-tag>
          </div>-->
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
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogRead"
      center
      width="30%"
      :show-close="false"
      close-on-press-escape
    >
      <p
        class="indent"
      >xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogRead = false">确 定</el-button>
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
      dialogRead: false,
      count: 0,
      hosDetail: {},
      unReadCount: 0,
      btn: ["全部", "已读", "未读"],
      activeIndex: 0,
      isFlod: true
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
    },
    btnHandle(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  // background: rgba(245, 246, 250, 1);
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
        position: relative;
        .notice-left {
          h4 {
            font-size: 14px;
            display: inline-block;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(117, 117, 117, 1);
            line-height: 14px;
            margin-top: 9px;
            margin-right: 30px;
          }
          .tags {
            font-size: 12px;
            color: #fff;
            line-height: 30px;
          }
          .seeNotice {
            display: inline-block;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(170, 170, 170, 1);
            line-height: 14px;
            margin: 10px 0;
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 10px;
            float: left;
          }
          .seeNotice2 {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(170, 170, 170, 1);
            line-height: 14px;
            margin: 10px 0;
            width: 100%;
          }
          .closemsg {
            display: inline-block;

            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(53, 179, 188, 1);
            float: left;
            margin-top: 10px;
            cursor: pointer;
          }
          .closemsg2 {
            display: inline-block;

            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(53, 179, 188, 1);
            float: right;
            margin-top: 10px;
            cursor: pointer;
          }
          span {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(201, 201, 201, 1);
            line-height: 14px;
          }
        }
        .badge {
          width: 14px;
          height: 14px;
          border-radius: 50% 50%;
          background: rgba(246, 77, 81, 1);
          position: absolute;

          left: 108px;
        }
        .readmsg {
          width: 44px;
          height: 20px;
          background: rgba(243, 247, 247, 1);
          border-radius: 2px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(170, 170, 170, 1);
          line-height: 20px;
          text-align: center;
          float: right;
          margin-top: 20px;
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
  // /deep/ .el-button--primary {
  //   background-color: rgba(53, 179, 188, 1);
  //   border-color: rgba(53, 179, 188, 1);
  // }
  // /deep/ .el-button:active {
  //   background-color: rgba(53, 179, 188, 1);
  //   border-color: rgba(53, 179, 188);
  // }
  // /deep/ .el-button:hover {
  //   background-color: rgba(53, 179, 188, 1);
  //   border-color: rgba(53, 179, 188);
  // }
  // /deep/.el-button--small.el-button--primary {
  //   background-color: rgba(53, 179, 188, 1);
  //   border-color: rgba(53, 179, 188, 1);
  // }
  .item {
    width: 100%;
    margin-top: 10px;
    margin-right: 20px;
  }
  .btn {
    border-bottom: 1px solid rgba(237, 237, 243, 1);
    margin-bottom: 15px;
    .btnactive {
      background: rgba(102, 200, 207, 1);
      border: 1px solid rgba(53, 179, 188, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .indent {
    text-indent: 32px;
  }
}
</style>
