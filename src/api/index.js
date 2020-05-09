const baseUrl = process.env.API_URL ? process.env.API_URL : "";
import http from "./http";
import operation from "./operation";
import home from "./home";
import doctor from "./doctor";
import financial from "./financial";
import picture from "./picture";
import order from "./order";
import good from "./good";
import aply from "./aply";

export default {
  // 登录
  login(param, callbak) {
    return http.get(`${baseUrl}/doctor/doctorLogin.htm`, param, callbak);
  },
  // 退出登录
  exit(param, callbak) {
    return http.get(`${baseUrl}/doctor/exit.htm`, param, callbak);
  },
  // 获得用户信息
  hospitalFindUserInfo(param, callbak) {
    return http.get(`${baseUrl}/hospital/hospitalFindUserInfo.json`, param, callbak);
  },
  // 下载
  downloadFile(url, param) {
    return http.downloadFile(`${baseUrl}${url}`, param);
  },
  // ==== 认证
  insertAuthenticationHospital(param, callbak) {
    return http.postAsFormData(`${baseUrl}/doctor/insertAuthenticationDoctor.htm`, param, callbak);
  },
  // 医生注册 验证手机号,并发送验证码
  registerSendValidate(param, callbak) {
    return http.get(`${baseUrl}/doctor/registerSendValidate.json`, param, callbak);
  },
  // 医生验证码登陆 验证手机号,并发送验证码
  loginSendValidate(param, callbak) {
    return http.get(`${baseUrl}/doctor/loginSendValidate.json`, param, callbak);
  },
  // 医生重新认证 点进去调用查看之前认证的信息及拒绝原因
  findHospitalDetail(param, callbak) {
    return http.get(`${baseUrl}/doctor/findDoctorDetail.json`, param, callbak);
  },
  // 医生验证码登陆
  logValidates(param, callbak) {
    return http.get(`${baseUrl}/doctor/logValidates.htm`, param, callbak);
  },
  // 用户验证码第一次设置密码
  updateUserPasswordValidateLogin(param, callbak) {
    return http.get(`${baseUrl}/doctor/updateUserPasswordValidateLogin.htm`, param, callbak);
  },
  // 医生注册
  insertUserRegister(param, callbak) {
    return http.get(`${baseUrl}/doctor/insertUserRegister.htm`, param, callbak);
  },
  // 修改密码
  resetPsd(param, callbak) {
    return http.post(`${baseUrl}/v1.0/auth/account`, param, callbak);
  },
  // 修改认证
  updateHospital(param, callbak) {
    return http.postAsFormData(`${baseUrl}/doctor/updatesDoctor.htm`, param, callbak);
  },
  // 修改认证

  //=======用户管理
  // 运营查询用户信息
  operateValidate(param, callbak) {
    return http.get(`${baseUrl}/operate/operateValidate.json`, param, callbak);
  },
  // 拉黑
  updateUserPullBlack(param, callbak) {
    return http.get(`${baseUrl}/operate/updateUserPullBlack.htm`, param, callbak);
  },

  // =======动态管理
  // 查询动态列表
  operateFindDynamic(param, callbak) {
    return http.get(`${baseUrl}/operate/operateFindDynamic.json`, param, callbak);
  },
  // 查询动态详情
  findDynamicInfoDetail(param, callbak) {
    return http.get(`${baseUrl}/operate/findDynamicInfoDetail.json`, param, callbak);
  },
  // ========认证处理
  // 查询审核中的医生列表
  operateFindDoctor(param, callbak) {
    return http.get(`${baseUrl}/operate/operateFindDoctor.json`, param, callbak);
  },
  // 查询医生申请认证详情
  operateFindDoctorDetail(param, callbak) {
    return http.get(`${baseUrl}/operate/operateFindDoctorDetail.json`, param, callbak);
  },
  // 运营同意用户申请为医生
  updateOperateAgreeDoctor(param, callbak) {
    return http.get(`${baseUrl}/operate/updateOperateAgreeDoctor.htm`, param, callbak);
  },
  // 运营拒绝用户申请为医生
  updateOperateRefuseDoctor(param, callbak) {
    return http.get(`${baseUrl}/operate/updateOperateRefuseDoctor.htm`, param, callbak);
  },
  // 医院申请列表
  operateFindHospital(param, callbak) {
    return http.get(`${baseUrl}/operate/operateFindHospital.json`, param, callbak);
  },
  // 查询医院申请认证详情
  operateFindHospitalDetail(param, callbak) {
    return http.get(`${baseUrl}/operate/operateFindHospitalDetail.json`, param, callbak);
  },
  // 运营同意用户申请为医院
  updateOperateAgreeHospital(param, callbak) {
    return http.get(`${baseUrl}/operate/updateOperateAgreeHospital.htm`, param, callbak);
  },
  // 运营拒绝用户申请为医院
  updateOperateRefuseHospital(param, callbak) {
    return http.get(`${baseUrl}/operate/updateOperateRefuseHospital.htm`, param, callbak);
  },
  // 咨询师申请列表
  operateFindConsultant(param, callbak) {
    return http.get(`${baseUrl}/operate/operateFindConsultant.json`, param, callbak);
  },
  // 查询咨询师申请认证详情
  operateFindConsultantDetail(param, callbak) {
    return http.get(`${baseUrl}/operate/operateFindConsultantDetail.json`, param, callbak);
  },
  // 运营同意用户申请为咨询师
  updateOperateAgreeConsultant(param, callbak) {
    return http.get(`${baseUrl}/operate/updateOperateAgreeConsultant.htm`, param, callbak);
  },
  // 运营拒绝用户申请为咨询师
  updateOperateRefuseConsultant(param, callbak) {
    return http.get(`${baseUrl}/operate/updateOperateRefuseConsultant.htm`, param, callbak);
  },

  ...operation,
  ...home,
  ...doctor,
  ...financial,
  ...picture,
  ...order,
  ...good,
  ...aply,
  // ===== 资料设置
  // 机构查询机构资料(已认证机构修改资料使用)
  appFindHospitalDetailAuthentication(param, callbak) {
    return http.get(`${baseUrl}/hospital/appFindHospitalDetailAuthentication.json`, param, callbak);
  },
  // 更新申请中的机构信息(已认证机构修改资料使用)
  updateHospitalAuthentication(param, callbak) {
    return http.postAsFormData(
      `${baseUrl}/hospital/updateHospitalAuthentication.htm`,
      param,
      callbak
    );
  },
  // ====== 修改密码
  // 机构更新密码
  updateUserHospitalPwd(param, callbak) {
    return http.get(`${baseUrl}/hospital/updateUserHospitalPwd.json`, param, callbak);
  },
  // 查询机构是否绑定手机号
  findHospitalWhetherBindPhone(param, callbak) {
    return http.get(`${baseUrl}/hospital/findHospitalWhetherBindPhone.json`, param, callbak);
  },
  // 机构查询绑定的手机号
  hospitalFindPhone(param, callbak) {
    return http.get(`${baseUrl}/hospital/hospitalFindPhone.json`, param, callbak);
  },
  // 机构绑定手机号 验证手机号,并发送验证码
  bindSendValidate(param, callbak) {
    return http.get(`${baseUrl}/hospital/bindSendValidate.json`, param, callbak);
  },
  // 机构绑定手机号
  hospitalBindPhone(param, callbak) {
    return http.get(`${baseUrl}/hospital/hospitalBindPhone.json`, param, callbak);
  },
  // 机构运营手机号验证更新密码
  hsopiitalUpdatephonePwd(param, callbak) {
    return http.get(`${baseUrl}/hospital/hsopiitalUpdatephonePwd.htm`, param, callbak);
  },
  // 机构运营手机验证修改密码 发送验证码
  updateSendValidate(param, callbak) {
    return http.get(`${baseUrl}/hospital/updateSendValidate.json`, param, callbak);
  }
};
