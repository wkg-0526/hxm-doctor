const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"

export default {
  // 机构查询实地场景图
  findhospitalSceneInfo(param, callbak) {
    return http.get(`${baseUrl}/operate/findhospitalSceneInfo.json`, param, callbak)
  },
  // 机构上传实地场景
  insertHospitalSceneInfo(param, callbak) {
    return http.postAsFormData(`${baseUrl}/hospital/insertHospitalSceneInfo.htm`, param, callbak)
  },
  // 机构删除场地图片
  deleteHospitalScene(param, callbak) {
    return http.postAsFormData(`${baseUrl}/hospital/deleteHospitalScene.htm`, param, callbak)
  }
}
