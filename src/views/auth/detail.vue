<template>
  <div class="auth-detail-wrapper">
        <div class='auth-back-btn'> 
            <el-button @click='toIndex'>返回</el-button>
        </div>
        <section class='auth-detail-main'>
            <!-- 头部 -->
            <div class='auth-detail-title'>
                <span v-if='type === "1"'>医生认证申请</span>
                <span v-if='type === "2"'>机构认证申请</span>
                <span v-if='type === "3"'>咨询师认证申请</span>
            </div>
            <!-- 个人信息 -->
            <div class='block-wrapper'>
                <userInfo :value='detailData' :infoType='type'></userInfo>
            </div>
            <!-- ==== 医生 -->
            <!-- 所在医院 -->
            <div 
                class='block-wrapper hospital-wrapper'
                v-if='type === "1"'
            >
                <hospitalInfo :value='detailData' :infoType='type'></hospitalInfo>
            </div>
            <!-- 证书资料 -->
            <div 
                class='block-wrapper certi-wrapper'
                v-if='type === "1"'
            >
                <certiInfo :value='detailData' :infoType='type'></certiInfo>
            </div>
            <!-- ======机构 -->
            <!-- 简介 -->
            <div 
                class='block-wrapper intro-wrapper'
                v-if='type === "2"'
            >
                <div class="intro-title">简介:</div>
                <div>{{detailData.introduce || '无'}}</div>
            </div>
            <!-- 执照 -->
            <div 
                class='block-wrapper'
                v-if='type === "2"'
            >
                <licenseInfo :value='detailData' :infoType='type'></licenseInfo>
            </div>
            <!-- 法人信息 -->
            <div 
                class='block-wrapper'
                v-if='type === "2"'
            >
               <ul class="block-ul clearfix" v-if='type === "2"'> 
                    <li>法人姓名：{{detailData.legalPerson || '-'}}</li>
                    <li>联系电话：{{detailData.legalPersonPhone || '-'}}</li>
                    <li>法人身份证：{{detailData.legalPersonIdNumber || '-'}}</li>
                </ul>
            </div>
            <!-- 联系人 -->
            <div 
                class='block-wrapper bb-none'
                v-if='type === "2"'
            >
               <ul class="block-ul clearfix" v-if='type === "2"'> 
                    <li>联系人姓名：{{detailData.fullName || '-'}}</li>
                    <li>联系人电话：{{detailData.telePhone || '-'}}</li>
                    <li>联系人邮箱：{{detailData.gender || '-'}}</li>
                    <li>联系人职位：{{detailData.position || '-'}}</li>
                </ul>
            </div>

            <!-- ===== 咨询师 -->
            <!-- 咨询师详细信息 -->
            <div 
                class='block-wrapper deep-detail-wrapper'
                v-if='type === "3"'
            >
                <ul class="block-ul clearfix" v-if='type === "3"'> 
                    <li>最高学历：{{detailData.gender || '-'}}</li>
                    <li>专业：{{detailData.telephone || '-'}}</li>
                    <li>学校：{{detailData.gender || '-'}}</li>
                    <li>时间：{{detailData.country || '-'}}</li>
                </ul>
            </div>
            
        </section>
        <section class='btn-wrapper'>
            <el-button style="margin-right: 30px" @click="refuseCerti">拒绝认证</el-button>
            <el-button type="primary" @click="agreeCerti" :disabled="isDisabled">同意认证</el-button>
        </section>

        <!-- 拒绝认证 -->
        <el-dialog 
            class="grid-body"
            :visible.sync="dialogFormVisible"
            width="30%"
            @closed="handleClose"
            :close-on-click-modal='false'
        >
            <el-row>
                <el-form :model="form" ref="form" label-width="100px">
                    
                    <el-form-item 
                        label="" 
                        label-width='0px'
                        style="marginBottom: 0px"
                    >
                        <el-input 
                            class="w220" 
                            v-model.trim="form.reason" 
                            placeholder="请填写拒绝理由"
                            type="textarea"
                            :rows="4" 
                            clearable>
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                
                <el-button @click="handleClose" size="small">取消</el-button>
                <el-button type="primary" @click="onSubmitdialog" size="small">发送原因</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

import Api  from '@/api/index.js';
import userInfo from './components/userInfo.vue';
import hospitalInfo from './components/hospitalInfo.vue';
import certiInfo from './components/certiInfo.vue';
import licenseInfo from './components/licenseInfo';
import { debuglog } from 'util';

export default {
    name: "auth",
    components: {
		// HelloWorld
        userInfo,
        hospitalInfo,
        certiInfo,
        licenseInfo
    },
    data () {
        return {
            type: '',
            id: '',
            detailData: {
                
            },
            isDisabled: false,
            dialogFormVisible: false,
            form: {

            }
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.type = this.$route.query.type;
        // console.log(this.$route.query)
    },
    mounted(){
        this.getDetailData()
    },
    methods: {
        getDetailData(){
            let _title = '';
            let _url = '';
            let _param = {};
            if(this.type === '1'){
                _title = '医生'
                _url = 'operateFindDoctorDetail'
                _param = {
                    doctorId: this.id
                }
            }else if(this.type === '2'){
                _title = '机构'
                _url = 'operateFindHospitalDetail'
                _param = {
                    hospitalId: this.id
                }
            }else if(this.type === '3'){
                _title = '咨询师'
                _url = 'operateFindConsultantDetail'
                _param = {
                    consultantId: this.id
                }
            }
            if(_url){
                Api[_url](_param)
                .then((res) =>{
                    console.log(res,'sss')
                    if(res && res.status === 200){
                        // 用户不存在
                        if(res.data.result && res.data.result === 500){
                            // this.$router.push({
                            //     path: '/auth/authIndex',
                            //     query: {
                            //         // id,
                            //         // type 
                            //     }
                            // })
                            this.$message({
                                message: `${_title}不存在`,
                                type: 'warning'
                            });
                        }else{
                            let _detailData = res.data;
                            // 处理数据
                            if(_detailData.BeGoodAteStr){
                                _detailData.BeGoodAteStr = _detailData.BeGoodAte.join('、');
                            }
                            this.detailData = _detailData;
                        }
                        
                    }
                })
                .catch(function (error) {
                })
            }
            
        },
        toIndex(){
            this.$router.push({
                path: '/auth/authIndex',
                query: {
                    // id,
                    // type 
                }
            })
        },
        // 通过认证
        agreeCerti(){
            const { type, detailData } = this;
            let self = this;
            this.$confirm('是否同意通过认证?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isDisabled = true;
                let _title = '';
                let _url = '';
                if(type === '1'){
                    _title = '医生'
                    _url = 'updateOperateAgreeDoctor'
                }else if(type === '2'){
                    _title = '机构'
                    _url = 'updateOperateAgreeHospital'
                }else if(type === '3'){
                    _title = '咨询师'
                    _url = 'updateOperateAgreeConsultant'
                }
                if(_url){
                    Api[_url]({
                        userId: detailData.userId,
                    })
                    .then((res) =>{
                        this.isDisabled = false;
                        if(res && res.status === 200){
                            if(res.data.result){
                                this.onCallback(true)
                            }else{
                                this.$message({
                                    message: '操作失败',
                                    type: 'warning'
                                });
                            }
                            
                        }
                    })
                    .catch(function (error) {
                        self.isDisabled = false;
                    })
                }

                
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });          
            });
        },
        onCallback(isSuccess){
            const { type } = this;
            if(isSuccess){
                this.$message({
                    message: "认证成功",
                    type: 'success'
                });
            }else{
                this.$message({
                    message: "操作成功",
                    type: 'success'
                });
            }

            this.$router.push({
                path: '/auth/authIndex',
                query: {
                    // id,
                    type 
                }
            })
        },
        // 拒绝认证 
        refuseCerti(){
            this.dialogFormVisible = true;
        },
        handleClose(){

            this.dialogFormVisible = false;
            this.form.reason = '';
            this.$refs.form.resetFields();
        },
        onSubmitdialog(){
            const { type, detailData } = this;
            let { reason } = this.form;
            let params = {
                reason,
                userId: detailData.userId
            };
            let _title = '';
            let _url = '';
            if(type === '1'){
                _title = '医生'
                _url = 'updateOperateRefuseDoctor'
            }else if(type === '2'){
                _title = '机构'
                _url = 'updateOperateRefuseHospital'
            }else if(type === '3'){
                _title = '咨询师'
                _url = 'updateOperateRefuseConsultant'
            }
            if(_url){
                Api[_url](params)
                .then((res) =>{
                    if(res && res.status === 200){
                        if(res.data.result){
                            this.onCallback(false)
                        }
                    }
                })
                .catch((error) => {
                    this.dialogFormVisible = false;
                });
            }
        }
            
        
		
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#686868;
@border-color: rgba(221,221,221,1);
.auth-detail-wrapper{
    width: 810px;
    margin: 0 auto;
    // background: #f6f7f9;
}
.auth-back-btn{
    padding: 25px 0;
}
.auth-detail-main{
    color: @text-color;
    border:1px solid @border-color;
    .auth-detail-title{
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px solid @border-color;
    }
    .block-wrapper{
        padding: 15px 20px;
        border-bottom: 1px solid @border-color;
    }
    .hospital-wrapper{
        max-height: 280px;
        overflow-y: auto;
    }
    .certi-wrapper{
        border-bottom: none;
    }
    .block-ul{
        li{
            width: 33%;
            float:left;
            padding-bottom: 14px;
        }
        li.w50{
            width: 50%;
        }
    }
    .intro-wrapper{
        max-height: 154px;
        overflow-y: auto;
        .intro-title{
            padding-bottom: 10px;
        }
    }
    .bb-none{
        border-bottom: none;
    }
}
.btn-wrapper{
    padding: 40px 0;
    text-align: center;
}
</style>
