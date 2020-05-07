<template>
<div class='renzheng-success-wrapper'>
    <div class="img-wrapper">
        <img src="../../../assets/images/shenhe.png" alt="">
    </div>   
    <div class="title-wrapper">
        对不起，您的申请没有通过
    </div>
    <div class="tip-wrapper">
     {{detailData.reason}}
    </div> 
    <div class="login-btn">
        <el-button 
            :disabled="false" 
            class="footer-btn" 
            @click="toReset"
            round
        >重新认证</el-button>

    </div>
</div>
</template>

<style lang="less" scoped>
.renzheng-success-wrapper{
    text-align: center;
    margin-top: 108px;
    .img-wrapper{
        padding-bottom: 30px;
        img{
            display: inline-block;
            width: 57px;
            height: 58px;
        }
    }
    .title-wrapper{
        font-size: 24px;
        color: #282828;
        padding-bottom: 30px;
    }
    .tip-wrapper{
        width: 400px;
        text-align: left;
        margin: 0 auto;
        font-size: 16px;
        color: #686868;
    }
    .mb24{
        margin-bottom: 24px;
    }
    .login-btn{
        padding-top: 20px;
    }

}

</style>

<script>

import Api  from '../../../api/index';

export default {
	created : function(){

    },
	mounted : function(){
        if(this.link === 'material'){
            this.detailData = this.data;
        }else{
            Api.findHospitalDetail({})
            .then((res) =>{
                if(res && res.status === 200){
                   this.detailData = res.data;
                }
                
            })
            .catch((error) => {
            });
        }
        
    },
    props: [
        'type',
        // 入口
        'link',
        'data'
    ],
	data(){
		
		return ({
			detailData: {}
			
		})
	},
	methods : {
        
        toReset(){
            if(this.link === 'material'){
                this.$emit('resetMaterial')
            }else{
                // 重新认证
                this.$router.push({
                    path: '/renzheng',
                    query: {
                        acitiveStep: 2,
                        type: 'edit'
                    }
                })
            }
            
        }
	},
}
</script>
