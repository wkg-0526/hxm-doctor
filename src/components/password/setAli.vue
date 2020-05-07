<template>
	<div class="modify-set-wrapper">
		<div class="form">
			<el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position='left' hide-required-asterisk>

				<el-form-item label="手机号">
                    <!-- 12345678123 -->
                    {{phone}}
					<!-- <el-input v-model="formData.userPhone" class="input"></el-input> -->
				</el-form-item>

				<el-form-item label="验证码" prop="updateValidate">
					<el-input v-model.trim="formData.updateValidate" class="input">
						<template 
							slot="append" 
						><span 
							@click="onSendText"
							class="code-btn"
							:style="{ cursor: disabled ? 'default' : 'pointer'}"
						>{{btnTitle}}</span></template>
					</el-input>
				</el-form-item>


                <el-form-item label="支付宝账号" prop="aliAccount">
					<el-input v-model="formData.aliAccount" class="input"></el-input>
				</el-form-item>

                <el-form-item label="真实姓名" prop="name">
					<el-input v-model="formData.name" class="input"></el-input>
				</el-form-item>

				<div class="btnBox">
					<el-button 
						class="button"  
						@click="onCancel"
						round
						size="medium"
					>取消</el-button>
				
					<el-button 
						class="button"  
						@click="submitForm"
						round
						size="medium"
						:disabled="loginDisabled"
					>确认设置</el-button>
                </div>
			</el-form>
			<codeModal
				:visible='codeVisible'
				@codeSubmit='codeSubmit'
				@codeCancel='codeCancel'
				ref='codeModal'
                
			></codeModal>
		</div>
	</div>
</template>

<style lang="less" scoped>

.modify-set-wrapper{
    position: relative;
    
	.form{
        position: absolute;
        left: 50%;
        margin-left: -200px;
        top: 50%;
        transform: translateY(50%);
		width: 400px;
		// margin: 0 auto;
		// margin-top: 200px;
		.input{
			width: 300px;
		}
		.btnBox{
			display: flex;
			justify-content: space-between;
            padding-bottom: 30px;
            padding-top: 30px;
            margin-left: 30px;
            margin-right: 30px;
		}
		.code-btn{
			display: inline-block;
			padding:  0 20px;
		}

	}
}

</style>

<script>
import Api  from '@/api/index.js';
import codeModal from '../../views/renzheng/component/code'

export default {
	created : function(){

	},
	mounted : function(){
		//console.log(this.$router.path);
    },
    props: ['phone','isUpdate'],
	components:{
		codeModal
	},
	data(){
		let _this = this;

		let verifyReg = function(rule, value, callback){
			let val = value && value.trim();
			if(!val){
				callback('请输入验证码');
			}else{
				callback();
			}
		};
		let verifyCode = function(rule, value, callback){
			let val = value && value.trim();
			if(!val){
				callback('请输入图形验证码');
			}else{
				callback();
			}
		};
		
		let verifyPhone = function(rule, value, callback){
			let val = value && value.trim();
			if(!val){
				callback('请输入手机号');
			}else if(!/^1[345678]\d{9}$/.test(val)){
				callback('手机号格式错误')
			}else{
				callback();
			}
		};

		
		
		return ({
			/* 表单数据 */
			formData : {
				userPhone : '',
				updateValidate : '',
				aliAccount : '',
				name : ''
			},
			/* 校验数据 */
			rules : {
				userPhone : [
					{validator : verifyPhone , trigger : 'blur' }
				],
				updateValidate : [
					{validator: verifyReg , trigger : 'blur' }
				],
				aliAccount : [
					{required: true, message: '请输入支付宝账号' , trigger : 'blur' }
				],
				name : [
					{required: true, message: '真实姓名' , trigger : 'blur'}
				]
			},
			// 倒计时时间
			time: 120,
			// 发送验证码按钮
			disabled: false,
			btnTitle: '发送验证码',
			// 图形验证码链接
			regUrl: '',
			// 登录按钮防重复
			loginDisabled: false,
            codeVisible: false,
            timer:null,
            
		})
    },
    mounted(){
        this.getBindPhone();
    },
	methods : {
		// 提交表单
		submitForm : function(){
            
			this.$refs.form.validate((valid) => {
				if (valid) {

                    // this.$emit('nextStep', 2)
                    // this.$emit('setData',psdData, this.formData)
					const {formData} = this;
                    this.loginDisabled = true;
                    let _url = 'insertBindAccountInfo'
                    if(this.isUpdate){
                        _url = 'updateBindAccountInfo'
                    }
                    
                    // 初次绑定
					Api[_url]({
						updateValidate: formData.updateValidate,
						aliAccount: formData.aliAccount,
						name: formData.name
					})
					.then((res) =>{
						this.loginDisabled = false;
						if(res.data.result === 1){
							this.$message({
								message: '绑定成功',
								type: 'success'
							});
                            this.onCancel();
							// this.loginDisabled = true;
						}else if(res.data.result === 0){
							this.$message({
								message: '手机号已注册',
								type: 'warning'
							});
						}else if(res.data.result === 500){
							this.$message({
								message: '验证码错误',
								type: 'warning'
							});
						}
					})
				}else{

				}
			});
		},
		// 点击发送验证码
		onSendText(){
			if(this.disabled){
				return;
            }
            let _url = 'bindAliAccount'
            if(this.isUpdate){
                _url = 'updatebindAliAccount'
            }
            Api[_url]({
               
            })
            .then((res) =>{
                if(res.data.result === 1){
                    // 执行倒计时
                    this.validateBtn();
                    // this.$refs.codeModal.codeCancel()
                }else if(res.data.result === 0){
                    this.$message({
                        message: '手机号不存在',
                        type: 'warning'
                    });
                    this.$refs.codeModal.getImgCode()
                }
            })
			// 校验
			// this.$refs.form.validateField('userPhone', (error)=> {
			// 	if(!error){
					
					// if(this.regUrl){
					// 	this.sendCode()
			
						// this.codeVisible = true;
					// }
					
					
			// 	}
			// })
				
		},
		// 获取图形验证码
		// getImgCode(){
		// 	this.regUrl = '/validateCode.json?'+ Math.random()
		// },
		// 图形验证码点击取消
		codeCancel(){
			this.codeVisible = false;
		},
		// 图形验证码点击确定
		codeSubmit(url){
			const {formData} = this;
			var p = new Promise((resolve,reject) => {
				Api.registerSendValidate({
					code: url,
					userPhone: formData.userPhone
				})
				.then((res) =>{
					if(res.data.result === 1){
						// 执行倒计时
						this.validateBtn();
						this.$refs.codeModal.codeCancel()
						resolve();
					}else if(res.data.result === 0){
						this.$message({
							message: '验证码发送失败',
							type: 'warning'
						});
						this.$refs.codeModal.getImgCode()
					}else if(res.data.result === 500){
						this.$refs.codeModal.getImgCode()
						this.$message({
							message: '图形验证码错误',
							type: 'warning'
						});
					}
				})
			})
			return p;
        },

		validateBtn(){
		    //倒计时
			let time = this.time;
			this.timer = setInterval(() => {
				if(time == 0) {
					clearInterval(this.timer);
					this.disabled = false;
					this.btnTitle = "发送验证码";
				} else {
					this.btnTitle = time + '秒后重试';
					this.disabled = true;
					time--
				}
			},1000)
		},
        onCancel(){
            this.$refs.form.resetFields();

            // 清除倒计时
            clearInterval(this.timer)
            this.time = 120;
            this.btnTitle = "发送验证码";
            this.$emit('onCancel')
            this.$emit('setData', 'type', 1)
        },
        getBindPhone(){
            // hospitalFindPhone
            Api.hospitalFindPhone({})
            .then((res) =>{
                
                if(res && res.data && res.data.result){
                }
            })
            .catch((error) => {
            });
        }

	},
}
</script>
