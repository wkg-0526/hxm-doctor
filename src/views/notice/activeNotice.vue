<template>
  <div class="mains">
    <h2>消息列表 &gt;&gt; 活动消息</h2>
    <notice :listProp="list" @num="getRead" @newId="getId" @page="getpage" />
  </div>
</template>

<script>
import notice from "./components/notice";
import Api from "@/api/index.js";
export default {
  name: "activeNotice",
  components: {
    notice
  },
  data() {
    return {
      list: {},
      params: { type: 0, page: 1 }
    };
  },
  created() {
    // this.doctorFindUnreadCount();

    this.doctorFindNewsAll(this.params);
  },
  methods: {
    // 医生查询系统消息和活动消息
    doctorFindNewsAll(params) {
      Api.doctorFindNewsAll({ ...params }).then(res => {
        this.list = res.data;
      });
    },
    // 修改医生系统或活动消息为已读
    insertSystemUser(newId) {
      Api.insertSystemUser({ newId }).then(res => {
        if (res.status === 20 && res.data) {
          this.doctorFindNewsAll(this.params);
        }
      });
    },
    getRead(data) {
      this.params.status = data;
      this.doctorFindNewsAll(this.params);
    },
    getId(data) {
      console.log(data);
      this.insertSystemUser(data);
    },
    getpage(data) {
      this.params.page = data;
      this.doctorFindNewsAll(this.params);
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