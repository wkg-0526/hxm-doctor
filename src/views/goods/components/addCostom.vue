<!--
 * @Author:  chenamin
 * @Date: 2020-03-23 21:13:18
 * @LastEditTime: 2020-03-24 15:50:03
 * @LastEditors: Please set LastEditors
 * @Description: 修改商品自定义费用的label
 * @FilePath: /xiaomei-jg/src/views/goods/components/addCostom.vue
 -->
 <template>
    <div>
        <el-dialog 
            class="grid-body"
            :visible.sync="show"
            width="30%"
            :close-on-click-modal='false'
            @closed="handleClose"
        >
            <el-row>
                <el-form 
                    ref="form" 
                    :model="form" 
                    :rules="rules"
                    label-width="100px"
                    hide-required-asterisk
                >
                    <el-form-item 
                        label="自定义名称" 
                        prop="custom"
                        style="marginBottom: 0px"
                    >
                        <el-input 
                            v-model.trim="form.custom" 
                            placeholder="请输入"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                
                <el-button @click="handleClose" size="small">取消</el-button>
                <el-button type="primary" @click="handleSubmit" size="small">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            // 表单数据
            form: {
                custom: ''
            },
            // 规则
            rules: {
                custom: [
                    { required: true, message: '请输入自定义名称', trigger: 'blur' },
                ],
                
            }
        }
    },
    methods: {
        /**
         * @description: 确定
         * @param {type} 
         * @return: 
         */
        handleSubmit() {
            this.$refs['form'].validate((valid) => {
            if (valid) {
                this.$emit('handleModalSubmit', this.form)
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        /**
         * @description: 取消
         * @param {type} 
         * @return: 
         */
        handleClose() {
            
            this.$refs['form'].resetFields();
            this.$emit('handleModalCancel')
        }
    },
}
</script>

<style lang='less' scoped>

</style>
