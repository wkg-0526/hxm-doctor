<template>
  <div class="main">
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
        <li
          v-for="(item,index) in listProp.list"
          :key="item.newId"
          @click="item.guid?postRead(item):''"
        >
          <el-row v-if="item.type===1">
            <el-col :span="2">
              <div>
                <el-image
                  style="width: 110px; height: 80px;margin-right:35px;float:left"
                  :src="item.cover?item.cover:require('../../../assets/images/notice.png') "
                  fit="scale-down"
                ></el-image>
                <div class="badge" v-show="item.whetherRead===0"></div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="notice-left">
                <el-row>
                  <el-col>
                    <div>
                      <h4>{{item.title}}</h4>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <div>
                      <div :class="isFlod?'seeNotice':'seeNotice2'" v-html="item.content"></div>

                      <div class="closemsg" @click="open(item)">点击查看</div>
                    </div>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col>
                    <div class="closemsg" @click="dialogRead = true" :style="{margin:'5px 0'}">
                      阅读全文
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </el-col>
                </el-row>-->
                <el-row>
                  <el-col>
                    <span>时间：{{item.time}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="readmsg" v-show="item.whetherRead===1">已读</div>
            </el-col>
          </el-row>
          <el-row v-else-if="item.type===0">
            <el-col :span="2">
              <div>
                <el-image
                  style="width: 110px; height: 80px;margin-right:35px;float:left"
                  :src="item.cover?item.cover:require('../../../assets/images/notice.png') "
                  fit="scale-down"
                ></el-image>
                <div class="badge" v-show="item.whetherRead===0"></div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="notice-left">
                <el-row>
                  <el-col>
                    <div>
                      <h4>{{item.title}}</h4>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div>
                      <span>发布渠道:{{item.channel}}</span>
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <span>发布对象:{{item.publishingObject }}</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div>
                      <div :class="isFlod?'seeNotice':'seeNotice2'" v-html="item.content"></div>

                      <div class="closemsg" v-show="isFlod===true" @click="open(item)">
                        阅读全文
                        <i class="el-icon-arrow-up"></i>
                      </div>
                      <div class="closemsg2" v-show="isFlod===false" @click="close(item)">
                        收起
                        <i class="el-icon-arrow-down"></i>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col>
                    <div class="closemsg" @click="dialogRead = true" :style="{margin:'5px 0'}">
                      阅读全文
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </el-col>
                </el-row>-->
                <el-row>
                  <el-col>
                    <span>时间：{{item.time}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="readmsg" v-show="item.whetherRead===1">已读</div>
            </el-col>
          </el-row>
          <el-row v-else-if="item.guid">
            <el-col :span="2">
              <div>
                <el-image
                  style="width: 110px; height: 80px;margin-right:35px;float:left"
                  :src="item.userHead?item.userHead:require('../../../assets/images/notice.png') "
                  fit="scale-down"
                ></el-image>
                <div class="badge" v-show="item.whetherRead===0"></div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="notice-left">
                <el-row>
                  <el-col>
                    <div>
                      <h4>{{item.userName}}</h4>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div>
                      <p
                        class="seeNotice"
                        @click="goHospitalDetail(item)"
                        :style="{color:item.hospitalId?'rgba(53, 179, 188, 1)':''}"
                      >{{ item.content }}</p>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <span>时间：{{item.time}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="readmsg" v-show="item.whetherRead===1">已读</div>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <div class="footerbody">
      <div class="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="20"
          background
          layout="prev, pager, next, jumper"
          :total="listProp.count"
        ></el-pagination>
      </div>
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
        <el-button type="primary" @click="closeGuid">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogRead"
      center
      width="30%"
      :show-close="false"
      close-on-press-escape
    >
      <div class="container">
        <el-row>
          <el-col :span="5">
            <span>封面:</span>
          </el-col>
          <el-col :span="19">
            <el-avatar :size="60" :src="dialogData.cover"></el-avatar>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>发布渠道:</span>
          </el-col>
          <el-col :span="19">
            <span>{{dialogData.channel}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>发布对象:</span>
          </el-col>
          <el-col :span="19">
            <span>{{dialogData.publishingObject}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>发布时间:</span>
          </el-col>
          <el-col :span="19">
            <span>{{dialogData.time}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>内容:</span>
          </el-col>
          <el-col :span="19">
            <p v-html="dialogData.content"></p>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="affrim(dialogData)">确 定</el-button>
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
  props: ["listProp"],
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
      isFlod: true,
      guidData: {},
      dialogData: {}
    };
  },
  computed: {
    ...mapState({
      noticeData: state => state.noticeData
    })
  },
  created() {
    this.$store.dispatch("setNoticeData", this.unReadCount);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // this.doctorfindSystemNewInfo(val);
      this.$emit("page", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("page", val);
    },

    goHospitalDetail(data) {
      this.guidData = data;
      this.dialogVisible = true;
      this.appFindDoctorHospitalDetail(data.hospitalId);
    },
    appFindDoctorHospitalDetail(hospitalId) {
      Api.appFindDoctorHospitalDetail({ hospitalId }).then(res => {
        if (res.status === 200 && res.data) {
          this.hosDetail = res.data;
        }
      });
    },
    // 已读未读按钮
    btnHandle(index) {
      this.activeIndex = index;
      if (index === 0) {
        this.$emit("num", "");
        this.$emit("whetherRead", "");
      } else if (index === 1) {
        this.$emit("num", 0);
        this.$emit("whetherRead", 1);
      } else {
        this.$emit("num", 1);
        this.$emit("whetherRead", 0);
      }
    },
    open(data) {
      this.dialogRead = true;
      this.dialogData = data;
      console.log(data);
    },

    // 传guid主键
    postRead(data) {
      this.$emit("postGuid", data);
    },
    closeGuid() {
      this.dialogVisible = false;

      this.$emit("authpostGuid", this.guidData);
    },
    affrim(data) {
      this.dialogRead = false;
      if (data.whetherRead === 1) {
        this.$emit("newId", data.newId);
      }
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
    min-height: 640px;
    background: rgba(255, 255, 255, 1);
    padding: 0 34px;
    overflow: hidden;

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
        cursor: pointer;
        .notice-left {
          margin-left: 20px;
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
  .footerbody {
    width: 100%;
    height: 88px;
    background: rgba(255, 255, 255, 1);
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
