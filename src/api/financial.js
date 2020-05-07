/*
 * @Author: chenamin
 * @LastModifiedBy: chenamin
 * @Date: 2019-11-25 21:34:50
 * @LastEditTime: 2020-03-25 23:53:33
 * @FilePath: /xiaomei-jg/src/api/financial.js
 * @Description: file content
 */
const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"

export default {
  // 财务管理收入
  hospitalGrossIncome(param, callbak) {
    return http.get(
      `${baseUrl}/hospitall/hospitalGrossIncome.json`,
      param,
      callbak
    )
  },
  // 机构根据年查询收入
  findHospitalThisYearGrossIncome(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/findHospitalThisYearGrossIncome.json`,
      param,
      callbak
    )
  },
  // 机构运营手机验证绑定支付宝账户发送验证码
  bindAliAccount(param, callbak) {
    return http.get(`${baseUrl}/hospital/bindAliAccount.json`, param, callbak)
  },
  // 机构绑定支付宝账号
  insertBindAccountInfo(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/insertBindAccountInfo.htm`,
      param,
      callbak
    )
  },
  // 机构查询绑定账户详情
  findHospitalBindAccountInfo(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/findHospitalBindAccountInfo.json`,
      param,
      callbak
    )
  },
  // 机构运营手机验证更新绑定支付宝账户 发送验证码
  updatebindAliAccount(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/updatebindAliAccount.json`,
      param,
      callbak
    )
  },
  // 机构修改绑定支付宝账号
  updateBindAccountInfo(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/updateBindAccountInfo.htm`,
      param,
      callbak
    )
  },
  // 查询机构收入
  hospitalGrossIncome(param, callbak) {
    return http.get(
      `${baseUrl}/hospitall/hospitalGrossIncome.json`,
      param,
      callbak
    )
  },
  // 机构提现
  cashwithdrawal(param, callbak) {
    return http.get(`${baseUrl}/hospital/cashwithdrawal.htm`, param, callbak)
  },
  // 机构运营手机验证提现 发送验证码
  cashwithdrawalUpdateValidate(param, callbak) {
    return http.get(`${baseUrl}/hospital/cashwithdrawal.json`, param, callbak)
  }
}
