<template>
  <div class="mains">
    <h2>消息列表 &gt;&gt; 认证消息</h2>
    <notice :listProp="list" @whetherRead="getRead" @page="getpage" @postGuid="updeatGuid" />
  </div>
</template>

<script>
import notice from "./components/notice";
import Api from "@/api/index.js";
import format from "date-fns/format";
import { mapState } from "vuex";
export default {
  name: "authNotice",
  components: {
    notice
  },
  data() {
    return {
      list: [],
      params: { page: 1 },
      unReadCount: {}
    };
  },
  computed: {
    ...mapState({
      noticeData: state => state.noticeData
    })
  },
  created() {
    this.doctorFindauthenticationNews(this.params);
    this.doctorFindUnreadCount();
  },
  methods: {
    doctorFindUnreadCount() {
      Api.doctorFindUnreadCount().then(res => {
        if (res.data && res.status === 200) {
          this.$store.dispatch("setNoticeData", res.data);
        }
      });
    },
    // 查询医生系统认证消息
    doctorFindauthenticationNews(params) {
      Api.doctorFindauthenticationNews({ ...params }).then(res => {
        if (res.data && res.status === 200) {
          res.data.list.forEach(item => {
            item.time = format(item.time, "YYYY-MM-DD HH:mm:ss");
          });
          this.list = res.data;
        }
      });
    },
    // 医生认证消息改为已读
    doctorUpdateUserNewsWhetherRead(guid) {
      Api.doctorUpdateUserNewsWhetherRead({ guid }).then(res => {
        if (res.data && res.status === 200) {
          this.doctorFindauthenticationNews(this.params);
          this.doctorFindUnreadCount();
        }
      });
    },
    getRead(data) {
      this.params.whetherRead = data;
      this.doctorFindauthenticationNews(this.params);
      this.doctorFindUnreadCount();
    },
    getpage(data) {
      this.params.page = data;
      this.doctorFindauthenticationNews(this.params);
      this.doctorFindUnreadCount();
    },
    updeatGuid(data) {
      if (data.whetherRead === 0) {
        this.doctorUpdateUserNewsWhetherRead(data.guid);
        this.doctorFindUnreadCount();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mains {
  background: rgba(245, 246, 250, 1);
  border-radius: 13px;
  padding: 35px 22px;
  h2 {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(117, 117, 117, 1);
    margin-left: 22px;
    margin-bottom: 25px;
  }
}
</style>