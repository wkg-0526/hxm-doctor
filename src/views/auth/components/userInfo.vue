<template>
  <div class="auth-detail-user">
        <!-- 头像区 -->
        <!-- 医生 -->
        <div class='top' v-if='infoType === "1"'>
            <el-avatar 
                :size="67" 
                :src="value.portrait" 
                @error="errorHandler"
            >
                <el-avatar icon="el-icon-user-solid" :size="67" style="fontSize: 25px;"></el-avatar>
            </el-avatar>
            <div style="marginLeft: 23px;">
                <div class="top-name">{{value.fullName}}</div>
                <div class="top-time">申请时间：{{value.empowerTime | date-format('YYYY-MM-DD')}}</div>
            </div>
            
        </div>
        <!-- 机构 -->
        <div class='top' v-if='infoType === "2"'>
            <el-avatar 
                :size="67" 
                :src="value.hospitalLog" 
                @error="errorHandler"
            >
                <el-avatar icon="el-icon-user-solid" :size="67" style="fontSize: 25px;"></el-avatar>
            </el-avatar>
            <div style="marginLeft: 23px;">
                <div class="top-name">{{value.hospitalName}}</div>
                <div class="top-time">
                    <span style="margin-right: 30px; display: inline-block">{{value.city || '-' }}</span>申请时间：{{value.empowerTime | date-format('YYYY-MM-DD')}}</div>
            </div>
            
        </div>
        <!-- 咨询师 -->
        <div class='top' v-if='infoType === "3"'>
            <el-avatar 
                :size="67" 
                :src="value.userHead" 
                @error="errorHandler"
            >
                <el-avatar icon="el-icon-user-solid" :size="67" style="fontSize: 25px;"></el-avatar>
            </el-avatar>
            <div style="marginLeft: 23px;">
                <div class="top-name">{{value.fullName}}</div>
                <div class="top-time">申请时间：{{value.empowerTime | date-format('YYYY-MM-DD')}}</div>
            </div>
            
        </div>
        <!-- 信息区 -->
        <div class="person">
            <!-- 医生 -->
            <ul class="person-ul clearfix" v-if='infoType === "1"'> 
                <li>性别：{{value.gender || '-'}}</li>
                <li>联系电话：{{value.telephone || '-'}}</li>
                <li>电子邮箱：{{value.mailbox || '-'}}</li>
                <li>国家：{{value.country || '-'}}</li>
                <li>职称：{{value.occupationTitle || '-'}}</li>
                <li>从业时间：{{value.time | date-format('YYYY-MM-DD')}}</li>
                <li>擅长项目：{{value.BeGoodAteStr || '-'}}</li>
            </ul>
            <!-- 机构 -->
            <ul class="person-ul clearfix" v-if='infoType === "2"'> 
                <li>医院类型：{{value.type || '-'}}</li>
                <li>联系电话：{{value.telephone || '-'}}</li>
                <li>电子邮箱：{{value.mailbox || '-'}}</li>
                <li class="w17">国家：{{value.country || '-'}}</li>
                <li>类型：{{value.type || '-'}}</li>
                <li class="w50">地址：{{value.address || '-'}}</li>
            </ul>
            <!-- 咨询师 -->
            <ul class="person-ul clearfix" v-if='infoType === "3"'> 
                <li>性别：{{value.gender || '-'}}</li>
                <li>联系电话：{{value.telephone || '-'}}</li>
                <li>电子邮箱：{{value.mailbox || '-'}}</li>
                <li>国家：{{value.country || '-'}}</li>
                <li>身份证：{{value.idNumber || '-'}}</li>
                <li>从业时间：{{value.time| date-format('YYYY-MM-DD')}}</li>
                <li class="w50">擅长项目：{{value.BeGoodAteStr || '-'}}</li>
                <li class="w50">地址：{{value.detailAddress || '-'}}</li>
            </ul>
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
        value: Object,
        infoType: String
    },
    data () {
        return {
        }
    },
    created(){
       
    },
    mounted(){
        console.log(this.value)
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
// .person{
//     border-bottom: 1px solid 
// }
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
