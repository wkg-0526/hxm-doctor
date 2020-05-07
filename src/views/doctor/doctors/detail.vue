<template>
    <div class="auth-detail-wrapper">

         <infoLink 
            :detailData='detailData' 
            :userId="userId"
            title='医生信息'
        >
            <!-- 按钮 -->
            <template slot="btn">
                <div class='auth-back-btn'> 
                    <el-button @click='toIndex'>返回</el-button>
                </div>
            </template>
            <!-- 标题 -->
            <template slot="title">
            
                <span>医生信息</span>
               
            </template>
        </infoLink>   
    </div>
</template>

<script>
// @ is an alias to /src

import Api  from '@/api/index.js';
import infoLink from '../invite/component/info'

export default {
    name: "auth",
    components: {
        infoLink
    },
    data () {
        return {
            type: '',
            userId: '',
            detailData: {
                
            },
            isDisabled: false,
            dialogFormVisible: false,
            form: {

            }
        }
    },
    created(){
        this.userId = this.$route.query.userId;
        this.type = this.$route.query.type;
        // console.log(this.$route.query)
    },
    mounted(){
        this.$nextTick(() => {
            this.getDetailData()
        })
        
    },
    methods: {
        getDetailData(){
            
            
            Api['hospitalAdoptdoctorDetails']({
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
        toIndex(){
            this.$router.push({
                path: '/doctor/doctors',
                query: {
                    // id,
                    // type: this.type
                }
            })
        },
        // 通过认证
        inviteDoctor(){
            const { type, detailData } = this;
            let self = this;
            this.$confirm('是否邀请该医生?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isDisabled = true;
                
                    Api['insertDoctorNewsInfo']({
                        userId: detailData.userId,
                    })
                    .then((res) =>{
                        this.isDisabled = false;
                        if(res && res.status === 200){
                          
                            if(res.data.result){
                                
                                this.$router.push({
                                    path: '/doctor/invite',
                                    query: {
                                        // id,
                                        type: '2' 
                                    }
                                })
                                this.$message({
                                    message: '邀请已发送',
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

