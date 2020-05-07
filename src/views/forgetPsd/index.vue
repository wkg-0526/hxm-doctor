<template>
    <div class="result-wrapper">
        <headerLink :isShowLoginBtn='true'/>
        <bindPhone 
            v-show='type === 1' 
            @setData='setData'
            @bindSuccess='bindSuccess'
            ref='bindPhone'
        ></bindPhone>
        <forgetPsd 
            v-show='type === 2' 
            @setData='setData'
            :phone='phone'
            @submitSuccess='submitSuccess'
            @resetForm='resetForm'
        ></forgetPsd>   
    </div>
</template>

<script>
// @ is an alias to /src
import forgetPsd from '@/components/password/forgetPsd'
import bindPhone from '@/components/password/bindPhone'
import  headerLink from "@/components/header";
import Api  from '@/api/index.js';
//   
export default {
    name: "login",
    components: {
        bindPhone,
        forgetPsd,
        headerLink
    },
    data () {
        
        return {
            // 1 绑定手机号 2.修改密码
            type: 1,
            isBindPhone:false,
            phone: ''
        }
    },
    mounted(){
        
        this.getIsBindPhone()
    },
    methods: {
        getIsBindPhone(){
            Api.findHospitalWhetherBindPhone({})
            .then((res) =>{
                
                if(res && res.data && res.data.result){
                    // 已绑定手机号
                    this.isBindPhone = true;
                    this.type = 2
                    // 查询手机号
                    this.getPhone()
                }
            })
            .catch((error) => {
            });
        },
        setData(value,key) {
            this[value] = key;
        },
        // 查询手机号
        getPhone(){
            Api.hospitalFindPhone({
            })
            .then((res) =>{
                if(res.data.result){
                    this.phone = res.data.result;
                    
                }else if(!res.data.result){
                    this.$message({
                        message: '手机号不存在',
                        type: 'warning'
                    });
                }
            })
        },
        bindSuccess(phone){
            // this.getIsBindPhone();
            // this.phone = phone;
            this.$router.push({path: "/login"});

        },
        submitSuccess(){
            this.type = 1;
        },
        // 跳转到认证页面
        toRenZheng() {
            this.$router.push({path: "/renzheng"});
        },
        resetForm(){
            this.type = 1;
        }
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;
.login-left{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.login-main{
    position: absolute;
    width: 860px;
    height: 512px;
    background: #fff;
    left: 50%;
    top: 50%; 
    margin-left: -449px;
    margin-top: -256px;
    // background: url("../assets/images/main-bg.png");
    // background-size: cover;
}

.extra-btn{
    padding-top: 20px;
    color: #fff;
}
</style>

