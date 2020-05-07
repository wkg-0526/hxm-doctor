<template>
	<div class="qualification-box">
        <div class="form">
			<el-form ref="form2" :rules="rules2" :model="formData2" label-width="100px" label-position='left'>

				<el-form-item label="法人名字" prop="legalPerson">
					<el-input v-model="formData2.legalPerson" class="input"></el-input>
				</el-form-item>

				<el-form-item label="法人身份证" prop="legalPersonIdNumber">
					<el-input v-model="formData2.legalPersonIdNumber" class="input"></el-input>
				</el-form-item>

				<el-form-item label="法人手机" prop="legalPersonPhone" style="{paddingBottom: '24px'}">
					<el-input v-model="formData2.legalPersonPhone" class="input"></el-input>
				</el-form-item>

				<el-form-item label="联系人名字" prop="fullName">
					<el-input v-model="formData2.fullName" class="input"></el-input>
				</el-form-item>

                <el-form-item label="联系人手机" prop="telePhone">
					<el-input v-model="formData2.telePhone" class="input"></el-input>
				</el-form-item>
                
                <el-form-item label="电子邮箱" prop="mailbox">
					<el-input v-model="formData2.mailbox" class="input"></el-input>
				</el-form-item>

                <el-form-item label="联系人职位" prop="position">
					<el-select 
						v-model="formData2.position" 
						placeholder="请选择"
						class="input"
					>
						<el-option label="管理者" value="管理者"></el-option>
						<el-option label="市场部" value="市场部"></el-option>
						<el-option label="销售部" value="销售部"></el-option>
						<el-option label="客服部" value="客服部"></el-option>
						<el-option label="其他" value="其他"></el-option>
					</el-select>
				</el-form-item>

				
			</el-form>
		</div>
        <div class="form form1">
            <el-form ref="form1" :rules="rules1" :model="formData1" label-width="100px" label-position='top'>
                <el-row :gutter="14">
                    <el-col :span="12">
                        <el-form-item label="营业执照名称" prop="businessLicenseName">
                            <el-input v-model="formData1.businessLicenseName" class="input"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="统一社会信用代码" prop="creditCode">
                            <el-input v-model="formData1.creditCode" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="14" style="paddingBottom:20px">
                    <el-col :span="12">
                        <el-form-item label="营业执照或民办非企业单位证书：">
                           <label for="businessLicenseFile">
								<div 
									class="img pointer" 
									v-show='!imgUrl1'
								> + </div>
								 <el-image 
									style="width: 328px; height: 180px"
									:src="imgUrl1" 
									v-show='imgUrl1'
									class="pointer"
								>
								</el-image>
								
								<input 
									id="businessLicenseFile" 
									type="file" 
									class="el-upload__input"  
									@change="fileChange1"
								/>
							</label>
                        </el-form-item>
                        <el-form-item label="医疗机构执业许可证：">
                            <label for="institutionalLicenseFile">
								<div 
									class="img pointer" 
									v-show='!imgUrl2'
								> + </div>
								<el-image 
									style="width: 328px; height: 180px"
									:src="imgUrl2" 
									v-show='imgUrl2'
									class="pointer"
								>
								</el-image>
								
								<input 
									id="institutionalLicenseFile" 
									type="file" 
									class="el-upload__input"  
									@change="fileChange2"
								/>
							</label>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="qualification-tip">
                            <div class="title">资质证明要求：</div>
                            <div class="text">
                                1、证件大小不超过2MB
                            </div>
                            <div class="text">
                                2、证件需在有效期内
                            </div>
                            <div class="text">
                                3、需盖有地方卫生部门公章
                            </div>
                            <div class="text">
                                4、证件名称需与认证名称匹配
                            </div>
                            <div class="text">
                                5、营业执照名称需与医疗机构执业许可证名称匹配
                            </div>
                            <div class="text">
                                6、诊疗科目中需含有：医疗美容科、整形外科、美容皮肤科等医疗美容相关科目
                            </div>
                        </div>  
                    </el-col>
                </el-row>
            </el-form>

        </div>
        
		
	</div>
</template>

<style lang="less" scoped>

.qualification-box{
	.qualification-title{
        color: #282828;
        font-size: 20px;
        padding: 55px 0 40px 0;
        text-align: center;
    }
	.form{
		width: 400px;
		margin: 0 auto;
		// margin-top: 200px;
		.input{
			width: 300px;
		}
		
    }
    .form1{
        width: 670px;
        .input{
            width: 328px;
		}
		.img{
			display: inline-block;
			width: 328px;
			height: 180px;
			border: 1px solid #ddd;
			font-size: 50px;
			color: #ddd;
			text-align: center;
			line-height: 180px;
		}
    }
    .qualification-tip{
        width: 100%;
        background: #f5f7f8;
        padding: 15px 27px 0 27px;
        margin-top: 50px;
        height: 436px;
        .title{
            line-height:16px;
            font-size:16px;
            color:rgba(40,40,40,1);
            margin-bottom: 18px;
        }
        .text{
            color: #686868;
            padding-bottom: 16px;
        }
        
    }
    
}


</style>
<style lang='less'>
.qualification-box .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.qualification-box {
	.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
		content: '';
		margin-right: 0px;
	}
}

</style>


<script>
export default {
	created : function(){

	},
	mounted : function(){
		//console.log(this.$router.path);
	},
	data(){
		let _this = this;
		let verifylogin = function(rule, value, callback){
			let val = value && value.trim();
			if(!val){
				callback('请输入用户名');
			}else{
				callback();
			}
		};

		return ({
            /* 表单数据 */
            formData1: {
				businessLicenseName: '',
				creditCode: '',
				institutionalLicenseFile: '',
				businessLicenseFile: ''
            },
			formData2 : {
				legalPerson : '',
				legalPersonIdNumber : '',
				legalPersonPhone : '',
				fullName : '',
				telePhone : '',
				mailbox: '',
				position: '',
			},
			imgUrl1: '',
			imgUrl2: '',
            
			/* 校验数据 */
			rules1 : {
				businessLicenseName : [
					{required : true, message: '请输入营业执照名称', trigger: 'blur' }
				],
				creditCode : [
					{required : true, message: '请输入统一社会信用代码', trigger: 'blur' }
				]
				
			},
			rules2 : {
				legalPerson : [
					{required : true, message: '请输入法人名字', trigger: 'blur' }
				],
				legalPersonIdNumber : [
					// {validator : verifyaccount , trigger : 'blur' }
					{required : true, message: '请输入法人身份证', trigger: 'blur' }
				],
				legalPersonPhone : [
					{required : true, message: '请输入法人手机', trigger: 'blur' }
				],
				fullName : [
					{required : true, message: '请输入联系人名字', trigger: 'blur' }
				],
				telePhone : [
					{required : true, message: '请输入联系人手机', trigger: 'blur' }
				],
				mailbox : [
					{required : true, message: '请输入电子邮箱', trigger: 'blur' }
				],
				position : [
					{required : true, message: '请选择联系人职位', trigger: 'change' }
				],
			},
			disabled: false
			
		})
	},
	methods : {
		// 提交表单
		submitForm : function(){
            // this.$emit('nextStep', 4)
            var p = new Promise((resolve,reject) => {
                if(!this.imgUrl1){
                    this.$message.warning('请上传营业执照名称');
                    return
                }
                if(!this.imgUrl2){
                    this.$message.warning('请上传统一社会信用代码');
                    return
                }
                let _pass1 = false;
                let _pass2 = false;
                this.$refs.form1.validate((valid) => {
                    if (valid) {
                        _pass1 = true;
                    }else{

                    }
                });
                this.$refs.form2.validate((valid) => {
                    if (valid) {
                        _pass2 = true;
                    }else{

                    }
                });
                if(_pass1 && _pass2){
                    this.$emit('setData', 
                    {qualificationData: {...this.formData1,...this.formData2}},
                    3
                    )

                    resolve()
                }
            })
			return p;
        },
        toBack() {
            this.$emit('nextStep', 2)
		},
		fileChange1(e){
			const self = this;
			var file = e.target.files[0];
			var formData = new FormData();
			var reader = new FileReader();
			var image = new Image();
			if(file){
				var type = file.type;
				// alert(e.target);
				if(!/image\/\w+/.test(type)){
					this.$message.error('上传类型错误!');
					document.getElementById('fileInput').value = '';
				}else if(file.size > 1024*1024*2){
					this.$message.error('上传头像图片大小不能超过 2MB!');
					document.getElementById('fileInput').value = '';
				}else{
					console.log(file,'file')
					self.formData1.businessLicenseFile = file;
					// 预览
					reader.onload = (function (file) {
						return function (e) {
							var datainfo = this.result;
						
							self.imgUrl1 = datainfo;
							
					};
					})(e.target.files[0]);
					
					reader.readAsDataURL(e.target.files[0]);

				};
			};
		},
		fileChange2(e){
			const self = this;
			var file = e.target.files[0];
			var formData = new FormData();
			var reader = new FileReader();
			var image = new Image();
			if(file){
				var type = file.type;
				// alert(e.target);
				if(!/image\/\w+/.test(type)){
					this.$message.warning('上传类型错误!');
					document.getElementById('fileInput').value = '';
				}else if(file.size > 1024*1024*2){
					this.$message.warning('上传头像图片大小不能超过 2MB!');
					document.getElementById('fileInput').value = '';
				}else{
					console.log(file,'file')
					self.formData1.institutionalLicenseFile = file;
					// 预览
					reader.onload = (function (file) {
						return function (e) {
							var datainfo = this.result;
						
							self.imgUrl2 = datainfo;
							
					};
					})(e.target.files[0]);
					
					reader.readAsDataURL(e.target.files[0]);

				};
			};
        },
        reset(){
            this.formData1 = {
				businessLicenseName: '',
				creditCode: '',
				institutionalLicenseFile: '',
				businessLicenseFile: ''
            }
            this.formData2 = {
				legalPerson : '',
				legalPersonIdNumber : '',
				legalPersonPhone : '',
				fullName : '',
				telePhone : '',
				mailbox: '',
				position: '',
            }
            this.imgUrl1 = '';
            this.imgUrl2 = '';
            this.$refs['form2'].resetFields();
            this.$refs['form1'].resetFields();
        }
	},
}
</script>
