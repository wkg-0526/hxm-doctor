<template>
  <div class="mains">
    <h2>消息列表 &gt;&gt; 互动消息</h2>
    <notice :listProp="list" @whetherRead="getRead" @authpostGuid="updeatGuid" @page="getpage" />
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
      list: {},
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
    this.doctorFindNews(this.params);
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
    doctorFindNews(params) {
      Api.doctorFindNews({ ...params }).then(res => {
        if (res.status === 200 && res.data) {
          res.data.list.forEach(item => {
            item.time = format(item.time, "YYYY-MM-DD HH:mm:ss");
          });
          this.list = res.data;
        }
      });
    },
    doctorUpdateDoctorNewsWhetherRead(guid) {
      Api.doctorUpdateDoctorNewsWhetherRead({ guid }).then(res => {
        this.doctorFindNews(this.params);
        this.doctorFindUnreadCount();
      });
    },
    updeatGuid(data) {
      if (data.whetherRead === 0) {
        this.doctorUpdateDoctorNewsWhetherRead(data.guid);
        this.doctorFindUnreadCount();
      }
    },
    getpage(data) {
      this.params.page = data;
      this.doctorFindNews(this.params);
      this.doctorFindUnreadCount();
    },
    getRead(data) {
      this.params.whetherRead = data;
      this.doctorFindNews(this.params);
      this.doctorFindUnreadCount();
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