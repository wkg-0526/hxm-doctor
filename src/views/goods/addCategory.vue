<!--  添加类目 -->
<template>
    <div class="addCategory-wrapper">
        <el-dialog 
            :title="title" 
            :visible.sync="visible"
            custom-class='addCategory'
            :width='dialogWidth'
        >
            <el-form 
                :model="form" 
                ref="form"
                hide-required-asterisk
                :rules="rules"
            >
                <el-form-item label="类目" 
                    :label-width="formLabelWidth"
                    prop='category'
                >
                    <el-input 
                        v-model="form.category" 
                        autocomplete="off"
                        class="w400"
                    ></el-input>
                </el-form-item>
                <el-form-item 
                    label="定价" 
                    :label-width="formLabelWidth"
                    prop='price'
                    
                >
                    <el-input 
                        v-model="form.price" 
                        autocomplete="off"
                        class="w400"
                    >
                        <span slot="prepend">¥</span>
                    </el-input>
                </el-form-item>
                <el-form-item 
                    label="库存" 
                    :label-width="formLabelWidth"
                    prop='stock'
                >
                    <el-input 
                        v-model="form.stock" 
                        autocomplete="off"
                        class="w400"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
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
        title: {
            type: String,
            default: '标题'
        },
    },
    data () {
        return {
            form: {
                category: '',
                price: '',
                stock: '',
                
            },
            formLabelWidth: '100px',
            dialogWidth: '600px',
            rules: {
                category: [
                    { required: true, message: '请输入类目', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: '请输入定价', trigger: 'blur' }
                ],
                stock: [
                    { required: true, message: '请输入库存', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    console.log(this.form,'11')
                    this.$emit('onSubmit',this.form)

                    this.form = {
                        category: '',
                        price: '',
                        stock: ''
                    }

                    // this.$refs['form'].resetFields();
                    
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onCancel(){
            this.form = {
                category: '',
                price: '',
                stock: ''
            }
            this.$refs['form'].resetFields();
            this.$emit('onCancel')
        }
    },
}
</script>

<style lang='less' scoped>
.addCategory{
    z-index: 10010;
}
.w400{
    width: 400px;
}
</style>
<style lang='less'>
.addCategory-wrapper .el-dialog__wrapper{
    z-index: 10010!important;
}
</style>
