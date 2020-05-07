<template>
<div class='renzheng-success-wrapper'>
    <div class="img-wrapper">
        <img src="../../assets/images/shenhe.png" alt="">
    </div>   
    <!-- <div class="title-wrapper">
        您提交的资料正在审核中
    </div> -->
    <div class="tip-wrapper">
        您已被降级为普通用户
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
	data(){
		return ({
		})
	},
	methods : {
       
	},
}
</script>
