<template>
  <div class="dynamic-detail-wrapper">
        <div class="detail-left">
            <div class="button-wrapper">
                <el-button round class="yellow btn-padding-30" size="small"> 返回 </el-button>
                <el-button round size="small" class="btn-padding-30"> 删除 </el-button>
            </div>
        </div>
        <div class="detail-right">
ddf
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
        }
    },
    methods: {
        getDetailData(){

        }
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;

// 左边
.detail-left{
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100vh;
    width: 250px;
    border-right: 1px solid #e6e6e6;
}
.button-wrapper{
    padding-top: 34px;
    text-align: center;
}

.detail-right{
    position: absolute;
    right: 50px;
    top: 0;
    left: 250px;
    border-right: 1px solid #e6e6e6;
}
.menu-bar .el-menu-demo{
    padding-left: 55px;
}
.menu-tab{
	// line-height: 70px;
}

</style>
