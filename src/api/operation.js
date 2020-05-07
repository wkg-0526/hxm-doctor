const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"

export default {
  // 机构查询手术室列表
  hospitalFindOperationRoomInfo(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalFindOperationRoomInfo.json`,
      param,
      callbak
    )
  },
  // 机构添加手术室
  hospitalInsertoperationRoomInfo(param, callbak) {
    return http.postAsFormData(
      `${baseUrl}/hospital/hospitalInsertoperationRoomInfo.json`,
      param,
      callbak
    )
  },
  // 修改手术室
  hospitalUpdateOperationRoom(param, callbak) {
    return http.postAsFormData(
      `${baseUrl}/hospital/hospitalUpdateOperationRoom.htm`,
      param,
      callbak
    )
  },
  // 机构查询手术室详情
  hospitalFindOperationRoomInfoDetail(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalFindOperationRoomInfoDetail.json`,
      param,
      callbak
    )
  },

  // 机构查询手术室是否预约
  hospitalFindOperationRoomWhether(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalFindOperationRoomWhether.json`,
      param,
      callbak
    )
  },
  // 机构预约手术室
  insertOperationRoomRecordInfo(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/insertOperationRoomRecordInfo.htm`,
      param,
      callbak
    )
  },
  // 机构删除手术室
  hospitalDeleteOperationRoom(param, callbak) {
    return http.get(
      `${baseUrl}/hospital/hospitalDeleteOperationRoom.htm`,
      param,
      callbak
    )
  }
}
