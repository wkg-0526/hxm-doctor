const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"

export default {
  // ==========医生管理
  // 机构查询审核中的医生列表
  hospitalToexaminedoctor(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalToexaminedoctor.json`,
      param,
      callbak
    )
  },
  // 机构查看未审核的医生详情
  hospitalToexaminedoctorDetail(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalToexaminedoctorDetail.json`,
      param,
      callbak
    )
  },
  // 机构同意医生入驻
  updateHospitalAgreedoctor(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/updateHospitalAgreedoctor.htm`,
      param,
      callbak
    )
  },

  // 机构查询需要邀请的医生列表
  hospitalOperateInvitationDoctor(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalOperateInvitationDoctor.json`,
      param,
      callbak
    )
  },
  // 查询需要邀请入驻的医生详情
  hospitalOperateInvitationDoctorDetail(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalOperateInvitationDoctorDetail.json`,
      param,
      callbak
    )
  },

  // 机构查询已邀请的医生列表
  findAlreadyInvitedDoctor(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/findAlreadyInvitedDoctor.json`,
      param,
      callbak
    )
  },
  // 查询已邀请入驻的医生详情
  findAlreadyInvitedDoctorDetail(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/findAlreadyInvitedDoctorDetail.json`,
      param,
      callbak
    )
  },

  // 机构邀请医生入驻
  insertDoctorNewsInfo(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/insertDoctorNewsInfo.htm`,
      param,
      callbak
    )
  },

  // 机构查询已绑定的医生列表
  hospitalOperateFindDoctor(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalOperateFindDoctor.json`,
      param,
      callbak
    )
  },
  // 机构查看已入住的医生详情
  hospitalAdoptdoctorDetails(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalAdoptdoctorDetails.json`,
      param,
      callbak
    )
  },
  //    医生查询自己的资料（修改个人资料使用）
  findAuthenticationDoctorDeatail(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/findAuthenticationDoctorDeatail.json`,
      param,
      callbak
    )
  },

  //   查看系统分类擅长项目使用
  findSystemCategory(param, callbak) {
    return http.get(`${baseUrl}/findSystemCategory.json`, param, callbak)
  },
  //   医生更新自己的信息
  updateDoctor(param, callbak) {
    return http.postAsFormData(
      `${baseUrl}/doctor/updateDoctor.htm`,
      param,
      callbak
    )
  },
  //   医生查询绑定的机构列表和邀请入驻列表
  DoctorFindAllBindHospital(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/DoctorFindAllBindHospital.json`,
      param,
      callbak
    )
  },
  //   医生同意入驻机构
  insertDoctorAgreeHospitals(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/insertDoctorAgreeHospitals.htm`,
      param,
      callbak
    )
  },
  //   医生拒绝机构
  insertDoctorRefuseHospitals(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/insertDoctorRefuseHospitals.htm`,
      param,
      callbak
    )
  },
  //   医生解除跟医院的合作
  deleteDoctorHospitalIds(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/deleteDoctorHospitalIds.htm`,
      param,
      callbak
    )
  },
  //   查询医生的未读消息数量
  doctorFindUnreadCount(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/doctorFindUnreadCount.json`,
      param,
      callbak
    )
  },
  // 医生查询系统消息
  doctorfindSystemNewInfo(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/doctorfindSystemNewInfo.json`,
      param,
      callbak
    )
  },
  // 系统消息查询机构入驻邀请详情
  appFindDoctorHospitalDetail(param, callbak) {
    return http.get(
      `${baseUrl}/systemNew/appFindDoctorHospitalDetail.json`,
      param,
      callbak
    )
  }
}
