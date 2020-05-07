<template>
  <div class="auth-detail-license">
        <div class="license-title"><span>营业执照名称</span>{{value.businessLicenseName}}</div>
        <div class="license-title"><span>统一社会信用代码</span>{{value.creditCode}}</div>
        <div class="pt20">证书资料：</div>
        
        <!-- 营业执照或民办非企业单位证书： -->
        <div class="license-title-sub">营业执照或民办非企业单位证书：</div>
        <div class="license-item-wrapper clearfix">
            <div class="license-item">
                <el-image
                style="width: 320px; height: 180px"
                :src="value.businessLicense"
                fit="fill"></el-image>
            </div>
        </div>
        <!-- 医疗机构执业许可证： -->
        <div class="license-title-sub">医疗机构执业许可证：</div>
        <div class="license-item-wrapper clearfix">
            <div class="license-item">
                <el-image
                style="width: 320px; height: 180px"
                :src="value.institutionalLicense"
                fit="fill"></el-image>
            </div>
        </div>
        
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
        value: Object
    },
    data () {
        return {
            
        }
    },
    created(){
       
    },
    mounted(){
    },
    methods: {
        errorHandler(){
            return true;
        }
		
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;
.pt20{
    padding-top: 20px;
}
.license-title{
    color: #000000;
    font-size: 16px;
    span{
        margin-right: 20px;
    }
}
.license-title-sub{
    padding-top: 20px;
}
.license-item{
    margin-right: 30px;
    margin-top: 20px;
    float: left;
}
.hospital-name{
    padding-top: 8px;
    // font-size: 13px;
    color: #3E3E3E; 
}
</style>
