const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"
export default {
  // 查询医生的手机号
  findDoctorPhone(param, callbak) {
    return http.get(`${baseUrl}/doctor/findDoctorPhone.htm`, param, callbak)
  },
  // 查询医生余额
  findUserMoney(param, callbak) {
    return http.get(`${baseUrl}/doctor/findUserMoney.json`, param, callbak)
  },
  // 查询医生是否绑定支付宝
  findUserBindAlipayInfo(param, callbak) {
    return http.get(`${baseUrl}/doctor/findUserBindAlipayInfo.json`, param, callbak)
  },
  // 医生取消绑定支付宝
  deleteUserBindAlipayInfo(param, callbak) {
    return http.get(`${baseUrl}/doctor/deleteUserBindAlipayInfo.htm`, param, callbak)
  },
  // 医生绑定支付宝
  insertBindAlipayInfo(param, callbak) {
    return http.get(`${baseUrl}/doctor/insertBindAlipayInfo.htm`, param, callbak)
  },
  // 医生提现
  insertCashWithdrawalInfos(param, callbak) {
    return http.get(`${baseUrl}/doctor/insertCashWithdrawalInfos.htm`, param, callbak)
  },
  // 医生第一次设置提现密码
  insertUserPresentationPassword(param, callbak) {
    return http.get(`${baseUrl}/doctor/insertUserPresentationPassword.htm`, param, callbak)
  },
  // 查询医生是否设置了提现密码
  findUserPresentationPassword(param, callbak) {
    return http.get(`${baseUrl}/doctor/findUserPresentationPassword.json`, param, callbak)
  },
  // 医生修改提现密码发送验证码
  presentationPasswordSendValidate(param, callbak) {
    return http.get(`${baseUrl}/doctor/presentationPasswordSendValidate.htm`, param, callbak)
  },
  // 医生修改提现密码
  updateUserPresentationPassword(param, callbak) {
    return http.get(`${baseUrl}/doctor/updateUserPresentationPassword.htm`, param, callbak)
  },
  // 医生修改密码发送验证码
  updatePwdSendphonevalidate(param, callbak) {
    return http.get(`${baseUrl}/doctor/updatePwdSendphonevalidate.htm`, param, callbak)
  },
  // 医生短信验证修改登录密码
  updateUserPasswordValidate(param, callbak) {
    return http.get(`${baseUrl}/doctor/updateUserPasswordValidate.htm`, param, callbak)
  }
}
