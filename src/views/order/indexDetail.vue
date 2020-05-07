<!--  -->
<template>
    <div class="order-wrapper">  
        
        <!-- <div class='pb30' style="color:#FF8233;font-size: 16px;" v-if="type === '2'">
            举报理由：{{detailData.reportCause}}
        </div> -->
        <OrderInfo
            :detailData='detailData'
        ></OrderInfo>
        <div class="btn-wrapper">
            <el-button @click="onBack" >返回</el-button>
            <!-- status 状态（0未上架 1上架 3下架） -->
            <!-- <el-button @click="onLower" >{{detailData.status === 3 ? '上架' : '下架'}}</el-button>
            <el-button 
                type="danger" 
                @click="onDelete" 
                :disabled="disabled"
                >删除</el-button> -->
        </div>
            
    </div>
</template>

    <script>
    import Api  from '@/api/index.js';
    import classification from "@/components/goodClassification.js";
    import editor from "@/components/editor.vue"
    import format from 'date-fns/format'
    import OrderInfo from "@/components/order/orderInfo.vue"

    export default {
        components:{
            OrderInfo
        },
        data () {
            return {
                classificationoptions: classification.goodClassification,
                title: '',
                classification: '',
                focusImg: '',
                
                // ======
                options: [
                    {name: '满减优惠'},
                    {name: '折扣优惠'}
                ],
                disabled: false,
                categoryVisible: false,
                // 类目
                shopCategory: [],
                // 商品上传还是商品编辑 add edit
                detailData: {},
                type: '',
                orderId: ''
            }
        },
        mounted(){
            this.orderId = this.$route.query.orderId;
            // 1 商品详情 2 举报商品详情
            this.type = this.$route.query.type;
            this.guid = this.$route.query.guid;
            this.getDetailData();
        },
        methods: {
            getDetailData(){
                const { orderId } = this;
                let _url = '';
                
                Api['operateFindShopOrderDelivergoodsDetail']({
                    orderId
                })
                .then((res) =>{
                        
                    if(res && res.status === 200){
                        if(res.data.result === 500){ 
                            this.$message.warning('商品不存在!');
                        }else{
                            this.detailData = res.data;
                        }
                        
                        
                    }
                })
                .catch(function (error) {
                })

            },
            handleRemove(item,index){
                    
                this.fileList.splice(index,1)
                
            },
            catchData(val) {
                this.detail = val;
                console.log(val,'detail')
            },
            beforeUpload(file){
                // 'image/png'
                const _type = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp'];
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!_type.includes(file.type)) {
                    this.$message.warning('图片格式错误!');
                    return false
                }
            
                if (!isLt10M) {
                    this.$message.warning('图片大小不能超过 10MB!');
                    return false
                }
                return true
            },
            handleUploadSuccess(res, file){
                // console.log(this.fileList,'1111')
                // let _obj = {url: res.url[0]}
                this.fileList.push(res.url[0])
            //    console.log(this.fileList,'222')
            },
            // 点击返回
            onBack(){
                this.$router.push({
                    path: '/order/index',
                    query: {
                        // type: this.type
                    }
                })
            },
            // 
            // 点击下架
        onLower(){
            let _url = ''
            let _title = ''
            if(this.detailData.status === 3){//点击上架
                
                _url = 'updateDoctorShopAdoptUppershelf'
                _title = '上架'
            }else{//点击下架
                _url = 'updateDoctorShopAdoptLowershelf'
                _title = '下架'
                
            }
            this.$confirm(`是否${_title}该商品?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                Api[_url]({
                    orderId: this.detailData.orderId
                })
                .then((res) =>{
                        
                    if(res && res.status === 200){
                        if(res.data.result){ 
                            this.$message({
                                message: `${_title}成功`,
                                type: 'success'
                            });   
                            this.getDetailData();
                        }else{
                            this.$message({
                                message: `${_title}失败`,
                                type: 'warning'
                            });
                        }
                        
                    }
                })
                .catch(function (error) {
                })
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });          
            });
        },
            // 删除商品
            onDelete(){
                this.$confirm('是否删除该商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    Api.deleteDoctorShop({
                        orderId: this.detailData.orderId
                    })
                    .then((res) =>{
                            
                        if(res && res.status === 200){
                            if(res.data.result){
                                this.onBack()
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: '删除失败',
                                    type: 'warning'
                                });
                            }
                            
                        }
                    })
                    .catch(function (error) {
                    })
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });          
                });
            },
            setData(key,value){
                this.key = value;
            },
        },
    

    }
    </script>

    <style lang='less' scoped>
    .order-wrapper{
        width: 600px;
        margin: 50px auto;
        .pb30{
            padding-bottom: 30px;
        }
        .good-title{
            color: #282828;
            font-size: 20px;
            font-weight: normal;
            margin-bottom: 20px;
        }
        .good-title-desc{
            color: #989898;
            font-size: 14px;
        }

        .add-category{
            height: 48px;
            line-height: 48px;
            color: #FF8233;
            font-size: 16px;
            text-align: center;
            border: 1px solid #ebeef5;
            border-top: none;
        }
        // upload-wrapper
        .upload-wrapper{
            font-size: 0px;
            display: inline-block;
            .el-icon-plus{
                width: 140px;
                height: 140px;
                font-size: 36px;
                color: #979797;
                border: 1px solid #979797;
                border-radius: 6px;
                line-height: 140px;
                margin-left: 14px;
                margin-right: 14px;
            }
        }
        .img-wrapper{
            font-size: 0px;
            .img-item-wrapper{
                position: relative;
                display: inline-block;
                width: 140px;
                margin-left: 14px;
                margin-right: 14px;
                // border-radius: 6px;
                vertical-align: top;
                img{
                    display: inline-block;
                    width: 100%;
                    border-radius: 6px;
                    
                }
                .img-close-icon{
                    width: 18px;
                    height: 18px;
                    position: absolute;
                    right: -9px;
                    top: -9px;
                    font-size: 14px;
                }
            }
        }
        // 、
        .w200{
            width: 200px;
        }
        .w100{
            width: 100px;
        }
        .mr15{
            margin-right: 15px;
        }
        .discout-wrapper{
            padding-top: 28px;
            
        }
        .btn-wrapper{
            padding-top: 40px;
            text-align: center;
        }
    }
    </style>
