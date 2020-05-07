<template>
  <div class="dynamic-detail-wrapper">
        <div class="detail-left">
            <div class="button-wrapper">
                <el-button 
                    round 
                    class="yellow btn-padding-30" 
                    size="small"
                    @click='toBack'
                > 返回 </el-button>
                <el-button 
                    round 
                    size="small" 
                    class="btn-padding-30"
                > 删除 </el-button>
            </div>
            <div class='detail-user'>
                
                <!-- <img  src='https://www.baidu.com/img/bd_logo1.png?where=super' /> -->
                <el-avatar 
                    size="small" 
                    @error="errorHandler"
                    icon="el-icon-user-solid"
                    class="img-wrapper"
                >
                    <img  :src='detailData.userHead' class="img-wrapper"/>
                </el-avatar>
                <span>{{detailData.userName}}</span>
            </div>
            <div class='text-wrapper'>
                类型: {{detailData.classification}}
            </div>
            <div class='text-wrapper'>
                {{detailData.time | date-format}}
            </div>
             <div class='text-wrapper'>
                <p>封面:</p> 
                <img src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' class='cover'/>
            </div>
            <div class='text-wrapper'>
                浏览: {{detailData.readCount || 0}}
            </div>
            <div class='text-wrapper'>
                评论: {{detailData.commentCount || 0}}
            </div>
            <div class='text-wrapper'>
                点赞: {{detailData.praiseCount || 0}}
            </div>
            <div class='text-wrapper'>
                收藏: {{detailData.collectionCount || 0}}
            </div>
            
            
        </div>
        <div class="detail-right">
            <h6 class='detail-title'>{{detailData.dynamicTitle}}</h6>
            <div v-html='detailData.dynamicContent'></div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api  from '@/api/index.js';
export default {
    name: "home",
    components: {
		// HelloWorld
    },
    data () {
        return {
            dynamicId: '',
            detailData: {}
        }
    },
    created() {
        console.log(this.$route.query)
        this.dynamicId = this.$route.query.dynamicId;
        this.getDetailData();
    },
    methods: {
        getDetailData(){
            const { dynamicId } = this;

            Api.findDynamicInfoDetail({
                dynamicId
            })
            .then((res) =>{
                    
                if(res && res.status === 200){
                    this.detailData = res.data;
                }
            })
            .catch(function (error) {
            })

        },
        // 点击返回
        toBack(){
            this.$router.push({
                path: '/content/contentDynamic'
            })
        },
        // 错误图片
        errorHandler(){
            return true;
        }
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#282828;

// 左边
.detail-left{
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100vh;
    width: 270px;
    border-right: 1px solid #e6e6e6;
    padding-left: 25px;
}
.button-wrapper{
    padding-top: 34px;
}
.detail-user{
    padding-top: 40px;
    color: @text-color;
    font-size: 13px;
    .img-wrapper{
        width: 25px;
        height: 25px;
        margin-right: 15px;
    }
    >span{
        display: inline-block;
        line-height: 25px;
        vertical-align: top;
    }
}
.text-wrapper{
    padding-top: 28px;
    color: @text-color;
    .cover{
        display: inline-block;
        width: 194px;
        height: 243px;
        border-radius: 10px;
        margin-top: 14px;
    }
}

// 右边
.detail-right{
    position: absolute;
    right: 50px;
    top: 0;
    left: 270px;
    border-right: 1px solid #e6e6e6;
    padding: 15px 0px 15px 20px;
    .detail-title{
        font-size: 18px;
        font-weight: normal;
        padding-bottom: 15px;
    }
}


</style>
