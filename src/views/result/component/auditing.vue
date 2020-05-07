<template>
<div class='renzheng-success-wrapper'>
    <div class="img-wrapper">
        <img src="../../../assets/images/shenhe.png" alt="">
    </div>   
    <div class="title-wrapper">
        您提交的资料正在审核中
    </div>
    <div class="tip-wrapper">
        审核结果我们将以短信形式发送至您的手机
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
        font-size: 16px;
        color: #686868;
    }

}

</style>

<script>
export default {
	created : function(){

	},
	mounted : function(){
		//console.log(this.$router.path);
    },
    props: ['type'],
	data(){
		
		return ({
			
			
		})
	},
	methods : {
        toLogin(){
            this.$router.push({path: '/login'})
        }
	},
}
</script>
