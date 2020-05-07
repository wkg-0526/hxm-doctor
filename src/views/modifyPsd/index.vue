<!--  -->
<template>
    <div>
        <setPsd 
            v-show='type === 1' 
            @setData='setData' 
            :isBindPhone='isBindPhone'
            ref="setPsd"
        ></setPsd>
        <bindPhone 
            v-show='type === 2' 
            @setData='setData'
            @bindSuccess='bindSuccess'
            ref='bindPhone'
        ></bindPhone>
        <forgetPsd 
            v-show='type === 3' 
            @setData='setData'
            :phone='phone'
            @submitSuccess='submitSuccess'
            @resetForm='resetForm'
        ></forgetPsd>
    </div>
</template>

<script>
import setPsd from './setPsd'
import forgetPsd from '@/components/password/forgetPsd'
import bindPhone from '@/components/password/bindPhone'
import Api  from '@/api/index.js';
export default {
    components: {
        setPsd,
        bindPhone,
        forgetPsd,
    },
    data () {
        return {
            type: 1,
            isBindPhone:false,
            psdData: {},
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
                    // 查询手机号
                    this.getPhone()
                }
            })
            .catch((error) => {
            });
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
        setData(value,key) {
            this[value] = key;
        },
        resetPsd(){

        },
        bindSuccess(phone){
            this.getIsBindPhone();
            // this.phone = phone;
            this.type = 3

        },
        submitSuccess(){
            this.type = 1;
        },
        resetForm(){
            this.type = 1;
            this.$refs.setPsd && this.$refs.setPsd.resetForm()
        }
    },
}

</script>

<style lang='less' scoped>

</style>
