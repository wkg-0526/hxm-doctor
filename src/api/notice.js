const baseUrl = process.env.API_URL ? process.env.API_URL : "";
import http from "./http";
export default {
  // 医生查询系统消息和活动消息
  doctorFindNewsAll(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorFindNewsAll.json`, param, callbak);
  },
  // 修改医生系统或活动消息为已读
  insertSystemUser(param, callbak) {
    return http.get(`${baseUrl}/doctor/insertSystemUser.htm`, param, callbak);
  },
  // 查询医生系统认证消息
  doctorFindauthenticationNews(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorFindauthenticationNews.json`, param, callbak);
  },
  // 医生认证消息改为已读
  doctorUpdateUserNewsWhetherRead(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorUpdateUserNewsWhetherRead.json`, param, callbak);
  },
  // 查询医生的互动消息
  doctorFindNews(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorFindNews.json`, param, callbak);
  },
  // 更新互动消息为已读
  doctorUpdateDoctorNewsWhetherRead(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorUpdateDoctorNewsWhetherRead.htm`, param, callbak);
  },
  // 查询医生的未读消息数量
  doctorFindUnreadCount(param, callbak) {
    return http.get(`${baseUrl}doctor/doctorFindUnreadCount.json`, param, callbak);
  }
};
