/*
 * @Author: chenamin
 * @LastModifiedBy: chenamin
 * @Date: 2019-12-17 21:24:41
 * @LastEditTime: 2020-03-28 16:29:00
 * @FilePath: /xiaomei-jg/src/api/good.js
 * @Description: file content
 */
const baseUrl = process.env.API_URL ? process.env.API_URL : ""
import http from "./http"

export default {
  // 医生查询商品所有
  findhospitalShopInfoUserId(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/findDoctorCustomizelShopInfoUserId.json`,
      param,
      callbak
    )
  },
  // 医生添加商品
  insertHospitalShopInfo(param, callbak) {
    return http.postAsFormData(
      `${baseUrl}/doctor/insertDoctorCustomizeShopInfo.htm`,
      param,
      callbak
    )
  },
  // 医生更新商品
  updateHospitalShopInfo(param, callbak) {
    return http.postAsFormData(
      `${baseUrl}/doctor/updateDoctorCustomizeShopInfo.htm`,
      param,
      callbak
    )
  },
  // 医生更新商品上架状态
  updateHospitalShopShelfState(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/updateDoctorCustomizeShopShelfState.htm`,
      param,
      callbak
    )
  },

  // 医生查询商品详情
  findShopDetail(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/findDoctorCustomizeShopDetail.json`,
      param,
      callbak
    )
  },
  // 医生删除商品
  deleteHospitalShop(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/deleteDoctorCustomizeShop.htm`,
      param,
      callbak
    )
  },
  // 运营设置或取消商品为兑换商品
  updateShopType(param, callbak) {
    return http.get(`${baseUrl}/operate/updateShopType.htm`, param, callbak)
  },
  // 医生取消商品的申请
  hospitalWithdrawShop(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/doctorCustomizeWithdrawShop.htm`,
      param,
      callbak
    )
  },

  // 查询机构商品所有类目
  findHospitalCategory(param, callbak) {
    return http.get(`${baseUrl}/findHospitalCategory.json`, param, callbak)
  },
  // 根据类目查询机构下的品牌
  findHospitalCategoryProductBrand(param, callbak) {
    return http.get(
      `${baseUrl}/findHospitalCategoryProductBrand.json`,
      param,
      callbak
    )
  },

  // 运营查询机构分类的项目名列表
  findHospitalProjectClassification(param, callbak) {
    return http.get(
      `${baseUrl}/operate/findHospitalProjectClassification.json`,
      param,
      callbak
    )
  },

  // 查询系统所有一级分类
  findSystemCategory(param, callbak) {
    return http.get(`${baseUrl}/findSystemCategory.json`, param, callbak)
  },
  // 根据系统一级分类查询所有二级分类
  findSystemCategoryTwo(param, callbak) {
    return http.get(`${baseUrl}/findSystemCategoryTwo.json`, param, callbak)
  },
  // 根据系统分类二级分类查询所有的医生订制项目
  findDoctorCustomizedClassificationAll(param, callbak) {
    return http.get(
      `${baseUrl}/operate/findDoctorCustomizedClassificationAll.json`,
      param,
      callbak
    )
  },

  // 医生商品移位（只有上架的状态才有这个按钮）
  updateHospitalShopMove(param, callbak) {
    return http.get(
      `${baseUrl}/doctor/updateDoctorCustomizeShopMove.htm`,
      param,
      callbak
    )
  }
}
