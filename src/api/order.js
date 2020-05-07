const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"

export default {
  // 医生查询订单
  hospitalFindOrderAll(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorFindOrderAll.json`, param, callbak)
  },
  // 医生同意退款
  hospitalAgreeRefund(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorAgreeRefund.htm`, param, callbak)
  },
  // 医生拒绝退款
  hospitalRefusetorefund(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorRefusetorefund.htm`, param, callbak)
  },
  // 机构确认完成订单（预约时间后才可以确认）
  hospitalConfirmCompletionOrder(param, callbak) {
    return http.get(`${baseUrl}/hospital/hospitalConfirmCompletionOrder.htm`, param, callbak)
  },
  //   查询当前医生的机构后一个月是否可预约
  findWhetheroperationRoomRecordInfoDate(param, callbak) {
    return http.get(`${baseUrl}/doctor/findWhetheroperationRoomRecordInfoDate.json`, param, callbak)
  },
  //   查询医院可预约的时间
  findWhetheroperationRoomRecordInfo(param, callbak) {
    return http.get(`${baseUrl}/doctor/findWhetheroperationRoomRecordInfo.json`, param, callbak)
  },
  // 医生预约时间
  hospitalUpdateAbout(param, callbak) {
    return http.get(`${baseUrl}/doctor/updateDoctorCustomizedShopOrderAbout.htm`, param, callbak)
  },
  //   查询医生绑定的医院 医生预约使用
  findDoctorBindHospitalAll(param, callbak) {
    return http.get(`${baseUrl}/doctor/findDoctorBindHospitalAll.json`, param, callbak)
  },
  // 医生撤销并同意退款 已拒绝退款的订单
  hospitalCancelAndAgreeToRefund(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorCancelAndAgreeToRefund.htm`, param, callbak)
  }
}
