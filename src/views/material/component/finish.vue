<template>
<div class='renzheng-success-wrapper'>
    <div class="img-wrapper">
        <img :src="finishData.hospitalLog" alt="">
        <span style="color: #FF8233">账号生成成功</span>
    </div>   
    <div class="item-main">
        <div class="item-wrapper">
            <span>医院名字</span>
            {{finishData.hospitalName}}
        </div>
        <div class="item-wrapper">
            <span>医院账号</span>
            {{finishData.userAccount}}
        </div>
        <div class="item-wrapper">
            <span>医院密码</span>
            {{finishData.pwd}}
        </div>
    </div>
    <div class="renzheng-btn-wrapper">
        <el-button size="small" @click="toBack" >返回</el-button>
    </div>

    
     
</div>
</template>

<style lang="less" scoped>
.renzheng-success-wrapper{
    width: 400px;
    margin: 108px auto;
    .img-wrapper{
        display: flex;
        align-content: center;
        line-height: 66px;
        margin-bottom: 47px;
        img{
            display: inline-block;
            width: 66px;
            height: 66px;
            border-radius: 50%;
            margin-right: 35px;
        }
        span{
            display: inline-block;
        }
    }
    
    .item-main{
        .item-wrapper{
            padding-bottom: 22px;
            >span{
                padding-right: 30px;
            }
        }
    }
    .renzheng-btn-wrapper{
        padding-top: 18px;
        padding-left: 86px;
    }

}

</style>
<style lang='less'>
.renzheng-btn-wrapper{
    button.el-button{
        padding-left: 20px;
        padding-right: 20px;
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
    props: ['finishData'],
	data(){
		
		return ({
			
			
		})
	},
	methods : {
        toBack(){
            this.$emit('toBack')
        }
	},
}
</script>
