(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07f4b496"],{4101:function(e,t,o){"use strict";o.r(t);var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"content"},[o("h1",[e._v("合作机构")]),o("div",{staticClass:"containter"},[o("div",{staticClass:"coopOra-header"},[o("el-form",{attrs:{"label-position":e.labelPosition,"label-width":"80px",model:e.formLabelAlign}},[o("el-row",[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"合作时间"}},[o("div",{staticClass:"block"},[o("el-date-picker",{attrs:{type:"datetimerange","default-time":["12:00:00"]},model:{value:e.formLabelAlign.cooppTimes,callback:function(t){e.$set(e.formLabelAlign,"cooppTimes",t)},expression:"formLabelAlign.cooppTimes"}})],1)])],1),o("el-col",{attrs:{span:2}},[o("el-button",{attrs:{type:"success"},on:{click:e.search}},[e._v("开始搜索")])],1)],1)],1)],1),o("el-row",[o("el-col",[o("div",{staticClass:"select"},[o("div",{staticClass:"select-item"},[o("el-select",{attrs:{placeholder:"按时间排序"},on:{change:e.doctorOrder},model:{value:e.formLabelAlign.order,callback:function(t){e.$set(e.formLabelAlign,"order",t)},expression:"formLabelAlign.order"}},e._l(e.formLabelAlign.timeSort,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)])])],1),o("ul",e._l(e.doctorList,(function(t){return o("li",{key:t.hospitalId},[o("el-row",[o("el-col",[o("el-row",[o("el-col",{attrs:{span:6}},[o("el-avatar",{attrs:{src:t.hospitalLog}})],1),o("el-col",{attrs:{span:14}},[o("el-row",[o("el-col",[o("p",[e._v("医院名称："+e._s(t.hospitalName))])]),o("el-col",[o("p",[e._v("城市："+e._s(t.city))])]),o("el-col",[o("h3",[e._v("合作状态：")]),0===t.type?o("span",[e._v("审核中")]):o("span",[e._v("合作中")])])],1)],1)],1)],1)],1),o("el-row",[o("el-col",[o("el-button",{directives:[{name:"show",rawName:"v-show",value:1===t.type,expression:"item.type===1?true:false"}],attrs:{type:"primary"},on:{click:function(o){return e.doctorAgree(t.hospitalId)}}},[e._v("接受合作")]),o("el-button",{directives:[{name:"show",rawName:"v-show",value:1===t.type,expression:"item.type===1?true:false"}],on:{click:function(o){return e.doctorRefu(t.hospitalId)}}},[e._v("拒绝合作")]),o("el-button",{directives:[{name:"show",rawName:"v-show",value:1!==t.type,expression:"item.type===1?false:true"}],staticClass:"plainBtn",on:{click:function(o){return e.delHospital(t.hospitalId)}}},[e._v("解除合作")])],1)],1)],1)})),0)],1)])},a=[],r=(o("8e6e"),o("456d"),o("ac6a"),o("bd86")),i=o("365c"),l=o("70f2"),n=o.n(l);function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,s)}return o}function p(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){Object(r["a"])(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var d={name:"CoopOrganization",data:function(){return{labelPosition:"right",formLabelAlign:{coopValue:"",cooppTimes:"",timeSort:[{label:"时间正序",value:"0"},{label:"时间倒序",value:"1"}],order:""},doctorList:[],count:""}},created:function(){this.DoctorFindAllBindHospital({page:1})},methods:{DoctorFindAllBindHospital:function(e){var t=this;i["a"].DoctorFindAllBindHospital(p({},e)).then((function(e){200===e.status&&e.data.list&&(t.doctorList=e.data.list)}))},delHospital:function(e){this.deleteDoctorHospitalIds(e)},deleteDoctorHospitalIds:function(e){var t=this;i["a"].deleteDoctorHospitalIds({hospitalId:e}).then((function(e){200===e.status&&e.data&&(1===e.data.result?(t.$message({type:"success",message:"解除成功!"}),t.DoctorFindAllBindHospital({page:1})):0===e.data.result?(t.$message({type:"info",message:"解除失败!"}),t.DoctorFindAllBindHospital({page:1})):t.$message({type:"error",message:"未登录"}))}))},doctorAgree:function(e){this.insertDoctorAgreeHospitals(e)},insertDoctorAgreeHospitals:function(e){var t=this;i["a"].insertDoctorAgreeHospitals(e).then((function(e){200===e.status&&e.data&&(1===e.data.result?(t.$message({type:"success",message:"加入成功!"}),t.DoctorFindAllBindHospital(1)):0===e.data.result?(t.$message({type:"info",message:"加入失败!"}),t.DoctorFindAllBindHospital({page:1})):t.$message({type:"error",message:"未登录"}))}))},doctorRefu:function(e){this.insertDoctorRefuseHospitals(e)},insertDoctorRefuseHospitals:function(e){var t=this;i["a"].insertDoctorRefuseHospitals(e).then((function(e){200===e.status&&e.data&&(1===e.data.result?(t.$message({type:"success",message:"已拒绝!"}),t.DoctorFindAllBindHospital(1)):0===e.data.result?(t.$message({type:"info",message:"拒绝失败!"}),t.DoctorFindAllBindHospital(1)):t.$message({type:"error",message:"未登录"}))}))},doctorOrder:function(e){this.DoctorFindAllBindHospital({page:1,order:e})},search:function(){var e=[];this.formLabelAlign.cooppTimes.forEach((function(t){e.push(n()(t,"YYYY-MM-DD"))}));var t={};t.startTime=e[0],t.endTime=e[1];var o={page:1,startTime:t.startTime,endTime:t.endTime};this.DoctorFindAllBindHospital(o)}}},u=d,f=(o("e356"),o("2877")),m=Object(f["a"])(u,s,a,!1,null,"68fa25aa",null);t["default"]=m.exports},e356:function(e,t,o){"use strict";var s=o("ed50"),a=o.n(s);a.a},ed50:function(e,t,o){}}]);
//# sourceMappingURL=chunk-07f4b496.c9710af5.js.map