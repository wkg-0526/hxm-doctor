<!-- code -->
<template>
    <div class="code-modal">
        <el-dialog :visible.sync="visible" width='400px' :close-on-click-modal='false' append-to-body>
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="" :label-width="formLabelWidth" prop="code">
                    <el-input 
                        v-model="form.code" 
                        autocomplete="off"
                        placeholder="请输入图形验证码"
                    ></el-input>
                </el-form-item>
                <div v-show='regUrl'><img 
                    @click="getImgCode"
                    class="code-img"
                    :src="regUrl"
                    style="{ cursor: 'pointer'}"
                /></div>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="codeCancel">取 消</el-button>
                <el-button type="primary" @click="codeSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            default: '/doctor/validateCode.json?'
        }
    },
    data () {
        let verifyCode = function(rule, value, callback){
			let val = value && value.trim();
			if(!val){
				callback('请输入图形验证码');
			}else{
				callback();
			}
		};
        return {
            form: {
                code: '',
            },
            formLabelWidth: '0',
            regUrl: '',
            rules : {
				code : [
					{validator : verifyCode , trigger : 'blur' }
				],
				
			},
        }
    },
    mounted() {
        this.getImgCode();
    },
    methods: {
        
        // 获取图形验证码
		getImgCode(){
			this.regUrl = this.url + Math.random()
        },
        // 点击取消
        codeCancel(){
            this.regUrl = '';
            this.getImgCode();
            this.$emit('codeCancel')
            this.$refs.form.resetFields();
            
        },
        //点击确定
        codeSubmit(){
            this.$refs.form.validate((valid) => {
                if (valid) {
            
                    this.$emit('codeSubmit',this.form.code)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        } 
    },
}
</script>

<style lang='less' scoped>
.code-img{
    display: inline-block;
}
</style>
<style lang='less'>
.code-modal div.el-dialog__body{
    padding-bottom: none;
}
</style>
