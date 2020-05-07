<template>
  <div class="auth-detail-wrapper">
       
        <slot name='btn'></slot>

        <section class='auth-detail-main'>
            <!-- 头部 -->
            <div class='auth-detail-title'>
                 <slot name='title'></slot>
                
            </div>
            <!-- 个人信息 -->
            <div class='block-wrapper'>
               <!-- 医生 -->
                <div class='top'>
                    <el-avatar 
                        :size="67" 
                        :src="detailData.portrait" 
                        @error="errorHandler"
                    >
                        <el-avatar icon="el-icon-user-solid" :size="67" style="fontSize: 25px;"></el-avatar>
                    </el-avatar>
                    <div style="marginLeft: 23px;">
                        <div class="top-name">{{detailData.fullName}}</div>
                        <div class="top-time">申请时间：{{detailData.time | date-format('YYYY-MM-DD')}}</div>
                    </div>
                    
                </div>
                <!-- 信息区 -->
                <div class="person">
                    <!-- 医生 -->
                    <ul class="person-ul clearfix" > 
                        <li>性别：{{detailData.gender || '-'}}</li>
                        <li>联系电话：{{detailData.telephone || '-'}}</li>
                        <li>电子邮箱：{{detailData.mailbox || '-'}}</li>
                        <li>国家：{{detailData.country || '-'}}</li>
                        <li>职称：{{detailData.occupationTitle || '-'}}</li>
                        <li>从业时间：{{detailData.time | date-format('YYYY-MM-DD')}}</li>
                    </ul>
                    
                </div>  
        
            </div>
            <div class='block-wrapper'>
                <div class="person">
                    <!-- 医生 -->
                    <ul class="person-ul clearfix" > 
                        <li style="width: 66%;">擅长项目：{{detailData.beGoodAteStr || '-'}}</li>
                        <!-- <li>排名：{{'-'}}</li> -->
                        <li>手术次数：{{detailData.operativeVolume || '0'}}</li>
                        <li>案例数：{{detailData.diaryCount || '0'}}</li>
                        <!-- <li>综合评分：{{'-'}}</li> -->
                        <li>问答数：{{detailData.replyCount || '0'}}</li>
                        <li>粉丝：{{detailData.fsCount || '0' }}</li>
                        
                    </ul>
                    
                </div>  
            </div>
            <!-- 所在医院 -->
            <div 
                class='block-wrapper hospital-wrapper'
                style="border-bottom: none;"
            >
                <div class="auth-detail-hospital">
                    <div class="hospital-title">所在医院（{{detailData.hospital ? detailData.hospital.length : 0}}):</div>
                    <template v-for="(item, index) in detailData.hospital" >
                        <div class="hospital-item" :key="index">
                            <el-avatar 
                                :size="48" 
                                :src="item.hospitalLog" 
                                @error="errorHandler"
                            >
                                <el-avatar icon="el-icon-user-solid" style="fontSize: 20px;line-height: 48px;"></el-avatar>
                            </el-avatar>
                            <div style="marginLeft: 40px;">
                                <div class="hospital-name">{{item.hospitalName}}</div>
                                <!-- <div class="top-time">申请时间：{{value.empowerTime | date-format('YYYY-MM-DD')}}</div> -->
                            </div>
                        </div>
                    </template>
                        
                </div> 
                <!-- <hospitalInfo :value='detailData' :infoType='type'></hospitalInfo> -->
            </div>
        </section>
    

       
  </div>
</template>

<script>
// @ is an alias to /src

import Api  from '@/api/index.js';

export default {
    name: "auth",
    components: {
    },
    props: {
        userId: {
        },
        detailData: {
            type: Object
        },
        title: {
            type: String
        }
    },
    data () {
        return {
            type: '',
            id: '',
            isDisabled: false,
            dialogFormVisible: false,
            form: {

            }
        }
    },
    created(){
        this.userId = this.$route.query.userId;
        // console.log(this.$route.query)
    },
    mounted(){
        this.$nextTick(() => {
            // this.getDetailData()
        })
        
    },
    methods: {
        getDetailData(){
            
            Api['hospitalToexaminedoctorDetail']({
                userId: this.userId
            })
            .then((res) =>{
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
                            message: `医生不存在`,
                            type: 'warning'
                        });
                    }else{
                        let _detailData = res.data;
                        // 处理数据
                        if(_detailData.beGoodAte){
                            _detailData.beGoodAteStr = _detailData.beGoodAte.join('、');
                        }
                        this.detailData = _detailData;
                    }
                    
                }
            })
            .catch(function (error) {
            })
            
        },
        // 通过认证
        agreeCerti(){
            const { type, detailData } = this;
            let self = this;
            this.$confirm('是否同意其入驻?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isDisabled = true;
                // let _title = '';
                // let _url = '';
                // if(type === '1'){
                //     _title = '医生'
                //     _url = 'updateOperateAgreeDoctor'
                // }else if(type === '2'){
                //     _title = '机构'
                //     _url = 'updateOperateAgreeHospital'
                // }else if(type === '3'){
                //     _title = '咨询师'
                //     _url = 'updateOperateAgreeConsultant'
                // }
                    Api['updateHospitalAgreedoctor']({
                        userId: detailData.userId,
                    })
                    .then((res) =>{
                        this.isDisabled = false;
                        if(res && res.status === 200){
                            if(res.data.result){
                                this.$router.push({
                                    path: '/doctor/doctorApply',
                                    query: {
                                        // id,
                                        // type 
                                    }
                                })
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
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
        errorHandler(){
            return true;
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
.top{
    display: flex;
    
}
.top-name{
    padding-top: 8px;
    font-size: 16px;
    color: #282828; 
}
.top-time{
    padding-top: 16px;
    color: #989898;
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
        min-height: 60px;
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
    .hospital-title{
        padding-bottom: 20px;
    }
    .hospital-item{
        display: flex;
        align-items: center;
        padding-bottom: 30px;
    }
}
.btn-wrapper{
    padding: 40px 0;
    text-align: center;
}
.person-ul{
    padding-top: 16px;
    li{
        width: 33%;
        float:left;
        padding-bottom: 14px;
    }
    li.w50{
        width: 50%;
    }
    li.w17{
        width: 17%;
    }
    
}
</style>

