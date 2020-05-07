<template>
	<div class="modify-set-wrapper">
		<div class="form">
			<el-form 
                ref="form" 
                :rules="rules" 
                :model="formData" 
                label-width="100px" 
                label-position='left'
                hide-required-asterisk
            >

				<!-- <el-form-item label="手机号" prop="userPhone">
					<el-input v-model="formData.userPhone" class="input"></el-input>
				</el-form-item>

				<el-form-item label="验证码" prop="regValidate">
					<el-input v-model.trim="formData.regValidate" class="input">
						<template 
							slot="append" 
						><span 
							@click="onSendText"
							class="code-btn"
							:style="{ cursor: disabled ? 'default' : 'pointer'}"
						>{{btnTitle}}</span></template>
					</el-input>
				</el-form-item> -->
                <el-form-item label="旧密码" prop="userPwd">
					<el-input v-model="formData.userPwd" type="password" class="input"></el-input>
				</el-form-item>
				
				<el-form-item label="密码" prop="newPwd">
					<el-input v-model="formData.newPwd" type="password" class="input"></el-input>
				</el-form-item>

				<el-form-item label="确认密码" prop="qrPassWord">
					<el-input v-model="formData.qrPassWord" type="password" class="input"></el-input>
				</el-form-item>

				<div class="btnBox">
					<el-button 
						class="button"  
						@click="onForget"
						round
						size="medium"
					>忘记密码</el-button>
				
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
<style lang='less'>
.registerWrapper .el-input-group__append{
	padding: 0;
}
</style>

<script>
import Api  from '@/api/index.js';
import codeModal from './../renzheng/component/code'
export default {
	created : function(){

	},
	mounted : function(){
		//console.log(this.$router.path);
    },
    props: ['isBindPhone'],
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
			}else if(val !== _this.formData.newPwd) {
				callback(new Error('两次输入密码不一致!'));
			}else{
				callback();
			}
		}
		return ({
			/* 表单数据 */
			formData : {
				userPhone : '',
				// regValidate : '',
				newPwd : '',
				qrPassWord : ''
			},
			/* 校验数据 */
			rules : {
				userPhone : [
					{validator : verifyPhone , trigger : 'blur' }
				],
				regValidate : [
					{validator: verifyReg , trigger : 'blur' }
                ],
                userPwd : [
					{required: true,message: '请输入旧密码', trigger : 'blur' }
				],
				newPwd : [
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
	methods : {
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
		// 提交表单
		submitForm : function(){
			// this.$emit('nextStep', 2)
			this.$refs.form.validate((valid) => {
				if (valid) {
                    // 如果绑定了手机，直接修改
                    if(this.isBindPhone){
                        this.loginDisabled = true;
                        Api.updateUserHospitalPwd({
                            newPwd: this.formData.newPwd,
                            // userPhone: formData.userPhone,
                            userPwd: this.formData.userPwd
                        })
                        .then((res) =>{
                            this.loginDisabled = false;
                            if(res.data.result === 1){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                               this.resetForm();
                                
                            }else if(res.data.result === 0){
                                this.$message({
                                    message: '修改失败',
                                    type: 'warning'
                                });
                            }
                        })
                    }else{
                        this.$emit('setData', 'type', 2)
                        this.$emit('setData','psdData', this.formData)
                    }
                    
					// const {formData} = this;
					// this.loginDisabled = true
					
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
        onForget(){
            if(this.isBindPhone){
                this.$emit('setData', 'type', 3)
            }else{
                this.$emit('setData', 'type', 2)
            }
            
        },
        resetForm(){
            this.type = 1;
            this.$refs.form.resetFields();
        }


	},
}
</script>
