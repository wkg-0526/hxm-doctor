<!--  -->
<template>
    <div>
        <bindPhone 
            v-show='type === 1' 
            @setData='setData'
            @bindSuccess='bindSuccess'
            ref='bindPhone'
        ></bindPhone>
        <!-- 绑定支付宝 -->
        <setAli 
            v-show='type === 2' 
            @setData='setData'
            :phone='phone'
            @submitSuccess='submitSuccess'
            @onCancel='onCancel'
            :isUpdate='isUpdate'
            ref="setAli"
        ></setAli>
    </div>
</template>

<script>
import setAli from '@/components/password/setAli'
import bindPhone from '@/components/password/bindPhone'
import Api  from '@/api/index.js';
export default {
    components: {
        bindPhone,
        setAli,
    },
    data () {
        return {
            // 1 绑定手机号 2 绑定支付宝
            type: '',
            isBindPhone:false,
            psdData: {},
            phone: '',
            // 是否是更新账号
            isUpdate: false,
            link: ''
        }
    },
    created(){
        this.isUpdate = this.$route.query.isUpdate;
        this.link = this.$route.query.link;
    },
    mounted(){
        
        if(this.isUpdate){
            this.getAliData();
        }

        // 是否绑定手机号
        this.getIsBindPhone()
    },
    methods: {
        getAliData(){
			Api.findHospitalBindAccountInfo({
				
			})
			.then((res) =>{
				
				if(res && res.data){
					// 未绑定
					if(res.data.result === 500){
						this.isUpdate = false;
					}else{
                        this.$refs.setAli.formData = {
                            aliAccount: res.data.aliAccount,
                            name: res.data.name,
                            updateValidate: ''
                        }
						this.isUpdate = true;

					}
				}
			})
			.catch((error) => {
				this.disabled = false;
			});
		},
        getIsBindPhone(){
            Api.findHospitalWhetherBindPhone({})
            .then((res) =>{
                if(res && res.data){
                    if(res.data.result){
                        // 已绑定手机号
                        this.isBindPhone = true;
                        // 查询手机号
                        this.getPhone()
                        this.type = 2;
                    }else{
                        this.type = 1;
                    }
                    
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
            this.type = 2

        },
        submitSuccess(){
            this.type = 1;
        },
        onCancel(){
            this.toIndex()
        },
        toIndex(){
            if(this.link === 'withDraw'){
                this.$router.push({
                    path: '/financial/aliWithdraw',
                })
            }else{
                this.$router.push({
                    path: '/financial/index',
                })
            }
            
        }
    },
}

</script>

<style lang='less' scoped>

</style>
