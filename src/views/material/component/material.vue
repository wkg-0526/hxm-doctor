<template>
	<div class="material-box">
		<div class="form">
			<el-form ref="form" :rules="rules" :model="formData" label-width="100px" label-position='left'>
				<el-form-item label="头像" prop="hospitalLogFile">
					<label for="fileInput">
						<el-avatar 
							:size='106' 
							class="avartar pointer" 
							v-show='!imgUrl'
						>点击上传</el-avatar>
						<el-avatar 
							:size='106' 
							:src="imgUrl" 
							fit="contain" 
							v-show='imgUrl'
							class="pointer"
						></el-avatar>
						<!-- <span 
							class="el-avatar el-avatar--circle" 
							style="height: 106px; width: 106px; line-height: 106px;">
							<img src=""/>
						</span> -->
						<input 
							id="fileInput" 
							type="file" 
							class="el-upload__input"  
							@change="fileChange"
						/>
					</label>

				</el-form-item>

				<el-form-item label="医院名称" prop="hospitalName">
					<el-input 
						v-model="formData.hospitalName" 
						class="input"
						placeholder="请输入"
					></el-input>
				</el-form-item>

				<el-form-item label="成立时间" prop="time">
					<el-date-picker
						v-model="formData.time"
						type="date"
						placeholder="请选择"
						class="input"
						value-format='yyyy-MM-dd'
						format='yyyy-MM-dd'
					>
					</el-date-picker>
					<!-- <el-input v-model="formData.hospitalName" class="input"></el-input> -->
				</el-form-item>

				<el-form-item label="国家" prop="country">
					<el-select 
						v-model="formData.country" 
						placeholder="请选择"
						class="input"
					>
						<el-option label="中国" value="中国"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="城市" prop="city">
					<el-cascader
						v-model="formData.city"
						:options="city"
						class="input"
						label="value"
						value='value'
						clearable
						:show-all-levels="false"
					/>
				</el-form-item>

				<el-form-item label="地址" prop="address">
					<el-input 
						v-model="formData.address" 
						class="input"
						placeholder="请输入"
						type="textarea"
						:rows="4"
					></el-input>
				</el-form-item>

                <el-form-item label="类型" prop="type">
						<el-select 
							v-model="formData.type" 
							placeholder="请选择"
							:offset="2"
							class="input"
							clearable
						>
							<el-option label="美容医院" value="美容医院"></el-option>
							<el-option label="美容门诊部" value="美容门诊部"></el-option>
							<el-option label="美容诊所" value="美容诊所"></el-option>
							<!-- <el-option label="区域二" value="beijing"></el-option> -->
						</el-select>
					<!-- <el-input v-model="formData.type" class="input"></el-input> -->
				</el-form-item>

                <el-form-item label="简介(选填)" prop="introduce">
					<el-input 
						v-model="formData.introduce" 
						class="input"
						type="textarea"
						placeholder="请输入"
						:rows="4"
					></el-input>
				</el-form-item>

				<!-- <div class="btnBox">
                    <el-button 
						class="button"  
                        size="medium"
						@click="toBack"
						round
					>返回上一步</el-button>
					<el-button 
						class="button yellow"
                        size="medium"
						type="primary" 
						@click="submitForm"
						round
					>下一步</el-button>
				</div> -->
			</el-form>
		</div>
	</div>
</template>

<style lang="less" scoped>

.material-box{
    padding-top: 45px;
	.material-tip{
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
		.btnBox{
            padding-bottom: 30px;
			display: flex;
			justify-content: space-between;
		}
	}
}


</style>
<style lang="less">
.material-box{
	.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
		content: '';
		margin-right: 0px;
	}
}
</style>

<script>
import city from '../component/city.js';
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
		let verifyaccount = function(rule, value, callback){
			let val = value && value.trim();
			if(!val){
				callback('请输入密码');
			}else{
				callback();
			}
		};
		let verifyjiGou = function(rule, value, callback){
			let val = value && value.trim();
			if(!val){
				callback('请选择机构');
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
				hospitalName : '',
				time: '',
				country : '中国',
				address : '',
				type : '',
				introduce : '',
				hospitalLogFile: '',
			},
			city: city,
			imgUrl: '',
			/* 校验数据 */
			rules : {
				hospitalName : [
					{required : true, message: '请输入医院名称', trigger: 'blur' }
				],
				city : [
					{required : true, message: '请选择城市', trigger: 'change' }
				],
				time : [
					{required : true, message: '请选择成立时间', trigger: 'change' }
				],
				country : [
					{required : true, message: '请选择成立时间', trigger: 'change' }
				],
				address : [
					{required : true, message: '请输入地址', trigger: 'blur' }
				],
				type : [
					{required : true, message: '请选择类型', trigger : 'change' }
				],
				introduce : [
					{required : false,  trigger : 'blur'}
				],
				
			}
			
		})
	},
	methods : {
		// 提交表单
		submitForm : function(){
            console.log('111')
            var p = new Promise((resolve,reject) => {
                if(!this.imgUrl){
                    this.$message.warning('请上传头像');
                    return
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {

                        this.$emit('setData', {materialData: this.formData})
                        this.$nextTick(() => {
                            resolve();
                        })
                    }else{

                    }
                });
            })
			return p;
        },
		fileChange(e){
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
					self.formData.hospitalLogFile = file;
					// 预览
					reader.onload = (function (file) {
						return function (e) {
							var datainfo = this.result;
							// $("#IDcardShow").css({
							// 	"background": "url(" + datainfo + ") center center no-repeat",
							// 	"background-size": "cover"
							// });
							self.imgUrl = datainfo;
							
					};
					})(e.target.files[0]);
					
					reader.readAsDataURL(e.target.files[0]);

				};
			};
		},
		// 上传的通用方法
		updateFile : function(data,fileList,type,verify,file){
			if(data.success){
				let verifyArr = [];
				fileList.map((v,k) => {
					let nameArr = v.name.split('.');
					let name = nameArr[nameArr.length - 1];
					let arr = verify;
					if(arr.indexOf(name) !== -1){
						verifyArr.push(v);
					}
				});
				this.formData[type] = verifyArr;
				// 重新校验数据
				this.$refs.ruleForm.validateField(type);

			}else{
				// 如果格式存在问题
				this.formData[type] = Object.assign([],this.formData[type]);
			}
			// 解决 同一文件不能多次上传
			// $('[type="file"]').val('');

			// this.$parent.setLoading(false);

        },
        reset(){
            this.formData = {
				hospitalName : '',
				time: '',
				country : '中国',
				address : '',
				type : '',
				introduce : '',
				hospitalLogFile: '',
            };
            this.imgUrl = '';
            this.$refs['form'].resetFields();
        }

	},
}
</script>