<template>
	<div class="bind-phone-wrapper">
        <div class="top-text">
                您还没绑定手机号，请先绑定手机
        </div>
		<div class="form">
            
			<el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position='left'>

				<el-form-item label="手机号" prop="userPhone">
                    <!-- 12345678123 -->
					<el-input v-model="formData.userPhone" class="input"></el-input>
				</el-form-item>

				<el-form-item label="验证码" prop="bindvalidate">
					<el-input v-model.trim="formData.bindvalidate" class="input">
						<template 
							slot="append" 
						><span 
							@click="onSendText"
							class="code-btn"
							:style="{ cursor: disabled ? 'default' : 'pointer'}"
						>{{btnTitle}}</span></template>
					</el-input>
				</el-form-item>
                <!-- <el-form-item label="旧密码" prop="passWord">
					<el-input v-model="formData.passWord" type="password" class="input"></el-input>
				</el-form-item>
				
				<el-form-item label="密码" prop="passWord">
					<el-input v-model="formData.passWord" type="password" class="input"></el-input>
				</el-form-item> -->

				<!-- <el-form-item label="新密码" prop="qrPassWord">
					<el-input v-model="formData.qrPassWord" type="password" class="input"></el-input>
				</el-form-item> -->

				<div class="btnBox">
					<el-button 
						class="button"  
						@click="onCancel"
						round
						size="medium"
						:disabled="loginDisabled"
					>取消</el-button>
				
					<el-button 
						class="button"  
						@click="submitForm"
						round
						size="medium"
						:disabled="loginDisabled"
					>确认修改</el-button>
                </div>
			</el-form>
			<codeModal
				:visible='codeVisible'
				@codeSubmit='codeSubmit'
				@codeCancel='codeCancel'
                url='/hospital/bindphone.json?'
				ref='codeModal'
			></codeModal>
		</div>
	</div>
</template>

<style lang="less" scoped>

.bind-phone-wrapper{
    position: relative;
    .top-text{
        text-align: center;
        color: #989898;
        padding-top: 80px;
    }
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

		let verifypassWord = function(rule, value, callback){
			let val = value && value.trim();
			if(val === ''){
				callback(new Error('请输入密码'));
			}else if(!/[a-zA-Z_0-9]{5,17}$/.test(val)){
				callback('密码长度在6~18之间，只能包含字符、数字和下划线');
			}else if( (val !== _this.formData.qrPassWord) ){
				callback();
			}else if( val === _this.formData.qrPassWord ){
				// 主动校验
				_this.$refs.form.validateField('qrPassWord');
				callback();
			}else{
				callback();
			}
		};
		let verifyqrPassWord = function(rule, value, callback){
			let val = value && value.trim();
			if (val === ''){
				callback(new Error('请再次输入密码'));
			}else if(val !== _this.formData.passWord) {
				callback(new Error('两次输入密码不一致!'));
			}else{
				callback();
			}
		}
		return ({
			/* 表单数据 */
			formData : {
				userPhone : '',
				bindvalidate : '',
				passWord : '',
				qrPassWord : ''
			},
			/* 校验数据 */
			rules : {
				userPhone : [
					{validator : verifyPhone , trigger : 'blur' }
				],
				bindvalidate : [
					{validator: verifyReg , trigger : 'blur' }
				],
				passWord : [
					{validator : verifypassWord , trigger : 'blur' }
				],
				qrPassWord : [
					{validator : verifyqrPassWord , trigger : 'blur'}
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
			codeVisible: false
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

                    // this.$emit('setData',psdData, this.formData)
					const {formData} = this;
					this.loginDisabled = true
					Api.hospitalBindPhone({
						bindvalidate: formData.bindvalidate,
						userPhone: formData.userPhone,
						// userPwd: formData.passWord
					})
					.then((res) =>{
						this.loginDisabled = false;
						if(res.data.result === 1){
							this.$message({
								message: '绑定成功',
								type: 'success'
                            });
                            this.$emit('bindSuccess', formData.userPhone);
							this.loginDisabled = true;
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
			// 校验
			this.$refs.form.validateField('userPhone', (error)=> {
				if(!error){
					
					// if(this.regUrl){
					// 	this.sendCode()
			
						this.codeVisible = true;
					// }
					
					
				}
			})
				
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
				Api.bindSendValidate({
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
							message: '手机号已注册',
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
			let timer = setInterval(() => {
				if(time == 0) {
					clearInterval(timer);
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
