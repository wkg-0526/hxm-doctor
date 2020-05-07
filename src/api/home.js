const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"

export default {
  // 机构数据统计
  dataStatistics(param, callbak) {
    return http.get(`${baseUrl}/hospital/dataStatistics.json`, param, callbak)
  },
  // 查询机构年下的每月的手术量
  findHospitalOperativeVolumeThisYearMonth(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/findHospitalOperativeVolumeThisYearMonth.json`,
      param,
      callbak
    )
  },
  // 机构查询年龄分布比例
  findHosptalAgeBL(param, callbak) {
    return http.get(`${baseUrl}/hospital/findHosptalAgeBL.json`, param, callbak)
  }
}
