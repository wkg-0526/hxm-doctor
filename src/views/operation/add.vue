<template>
	<div class="operation-action-box">
       
        <div class="form form1">
            <el-form ref="form1" :rules="rules1" :model="formData1" label-width="83px" hide-required-asterisk>
                <el-form-item label="手术室名称" prop="roomName" >
                    <el-input v-model="formData1.roomName" class="input"></el-input>
                </el-form-item>
                <div style="overflow: hidden">
                    <div class="form-title el-form-item__label">手术室照片</div>
                </div>
               
                <!-- <el-form-item label="手术室照片"> -->
                    <section style="display: inline-block;margin-left: -14px;margin-right: -14px;">   
                        <!-- <div style="display: inline-block;margin-left: -14px;margin-right: -14px;">
                            
                            <template  v-for="(item, index) in imgList">   
                             
                                <label :for='"file" + index' :key="index">
                                    <img :src="item" alt=""  class="operation-action-img" >
                                    <input 
                                        :id='"file" + index' 
                                        type="file" 
                                        class="el-upload__input"  
                                        @change="fileChange2($event,item,index)"
                                    />
                                </label>
                                
                            </template>
                            
                        
                            <label for="file" v-show="imgList.length < 5">
                                <div 
                                class="img pointer" 
                            > + </div>
                                <input 
                                    id="file" 
                                    type="file" 
                                    class="el-upload__input"  
                                    @change="fileChange1"
                                />
                                
                                </label>
                            </div> -->

                            <template v-for="(item,index) in fileList" >
                                <div :key="index"  class="img-item-wrapper">
                                    <img
                                        class="img-item"
                                        :src="item.url" alt=""
                                    >
                                    <span class="el-upload-list__item-actions">
                                        <!-- <span
                                            class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)"
                                        >
                                            <i class="el-icon-zoom-in"></i>
                                        </span> -->
                                        <span
                                            class="el-upload-list__item-delete"
                                            @click="handleRemove(item,index)"
                                        >
                                        <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </template>

                            <el-upload
                                action="/operate/upload.json"
                                :on-remove="handleRemove"
                                :before-upload="beforeUpload"
                                :on-success="handleUploadSuccess"
                                class="upload-wrapper"
                                :show-file-list='false'
                            >
                                
                                <i slot="default" class="el-icon-plus" v-show="fileList.length < 5"></i>
                                
                            </el-upload>

                            
                            
                    </section>
                    
                    
                <!-- </el-form-item> -->
                   
            </el-form>

        </div>
        <div class='operation-action-btn'> 
            <el-button @click='handleCancel'>取消</el-button>
            <el-button type="primary" @click="handleAction" :disabled="disabled">{{type === 'edit' ? '修改' : '添加'}}</el-button>
        </div>
        
		
	</div>
</template>

<style lang="less" scoped>

.operation-action-box{
    width: 600px;
    margin: 0 auto;
    .operation-action-img{
        display: inline-block;
        width: 284px;
        vertical-align: top;
        margin-left: 14px;
        margin-right: 14px;
        margin-bottom: 22px;
    }
    .upload-wrapper{
        display: inline-block;
    }
	.form{
		
		margin-top: 50px;
		.input{
			// width: 300px;
		}
		
    }
    .form-title{
        width: 83px;
        text-align: right;
        color: #606266;
        padding-bottom: 20px;
        overflow: hidden;
    }
    .form1{
        
		.img,.img-item{
			display: inline-block;
			width: 284px;
			// border: 1px solid #ddd;
			color: #ddd;
            text-align: center;
            border-radius: 6px;
            // margin-left: 14px;
            // margin-right: 14px;

        }
        .img-item-wrapper{
            position: relative;
            display: inline-block;
             width: 284px;
            height: auto;
            margin-left: 14px;
            margin-right: 14px;
            border: none;
            font-size: 0px;
            vertical-align: top;
            margin-bottom: 20px;
            border-radius: 6px;
            overflow: hidden;
        }
        .el-upload-list__item-actions:hover{
            opacity: 1;
            span{
                display: inline-block;
            }
        }
        .el-upload-list__item-actions .el-upload-list__item-delete{
            position: static;
            font-size: inherit;
            color: inherit;
            
        }
        


        .el-upload-list__item-actions {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0,0,0,.5);
            transition: opacity .3s;
            
        }
        .el-upload-list__item-delete {
            position: absolute;
            right: 10px;
            top: 0;
            cursor: pointer;
        }
        .el-upload-list__item-actions::after {
            display: inline-block;
            content: "";
            height: 100%;
            vertical-align: middle;
        }
      
    }
    .operation-action-btn{

        padding-top: 43px;
        text-align: center;
        padding-bottom: 40px;
        margin-left: 14px;
        margin-right: 14px;
        
    }
    
    
}


</style>
<style lang="less">

.form1 .el-upload i{
    width:284px;
    height:153px;
    border-radius:8px;
    background: #fff;
    font-size: 50px;
    line-height: 153px;
    color: #ddd;
    margin-left: 14px;
    margin-right: 14px;
    border:1px solid #ddd;
}
</style>

<script>
import Api  from '@/api/index.js';
export default {
	created : function(){

	},
	mounted : function(){
        //console.log(this.$router.path);
        if(this.$route.query.roomId){
            this.roomId = this.$route.query.roomId;
            this.type= 'edit'
            this.getDetailData();
            
        }
        
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
				roomName: '',
				file: []
            },
			imgList: [],
            
			/* 校验数据 */
			rules1 : {
				roomName : [
					{required : true, message: '请输入手术室名称', trigger: 'blur' }
				],
			},
			
            disabled: false,
            type: 'add',
            fileList: []

			
		})
    },
    
	methods : {
        handleRemove(item,index){
                
            this.fileList.splice(index,1)
            
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
            let _obj = {url: res.url[0]}
            this.fileList.push(_obj)

        //    console.log(this.fileList,'222')
        },
        getDetailData(){
            
            Api['hospitalFindOperationRoomInfoDetail']({
                roomId: this.roomId
            })
            .then((res) =>{
                if(res && res.status === 200){
                    // 用户不存在
                    if(res.data.result && res.data.result === 500){
                        // this.$router.push({
                        //     path: '/operation/operationIndex',
                        //     query: {
                        //         // id,
                        //         // type 
                        //     }
                        // })
                        this.$message({
                            message: `手术室不存在`,
                            type: 'warning'
                        });
                    }else{
                        let _detailData = res.data;
                        // 处理数据
                        // 格式化时间
                        // let _date = getDay(_detailData.list[0].time)
                        // let _list = _detailData.list.map(v => {
                        //         v.timeStr = format(v.time,'YYYY-MM-DD')
                        //         return v
                        //     }
                        // )
                        // _detailData.list = _list;
                        // // 时间范围
                        // _detailData.range = [
                        //     format(this.getDate(_detailData.list[0].time, '-'),'YYYY-MM-DD'),
                        //     format(this.getDate(_detailData.list[_detailData.list.length-1].time,'+'),'YYYY-MM-DD')
                        // ]
                        // console.log(_detailData,'ss')
                        
                        this.formData1.roomName = _detailData.roomName;
                        this.formData1.file = [..._detailData.roomImg];
                        this.imgList = [..._detailData.roomImg];
                        this.fileList = _detailData.roomImg.map( v=> {return {url: v}});

                        
                    }
                    
                }
            })
            .catch(function (error) {
            })
            
        },

		// 提交表单
		handleAction : function(){
            console.log(this.fileList,'11')
            // this.$emit('nextStep', 4)
            var p = new Promise((resolve,reject) => {
                
                
                this.$refs.form1.validate((valid) => {
                    if (valid) {
                        if(this.fileList.length === 0){
                            this.$message.warning('请上传手术室照片');
                            return;
                        }
                        // 编辑
                        if(this.type === 'edit'){
                            
                            this.disabled = true;
                            Api.hospitalUpdateOperationRoom({
                                roomName: this.formData1.roomName,
                                roomId: this.roomId,
                                file: this.fileList.map(v => v.url)
                            })
                            .then((res) =>{
                               this.disabled = false;
                                
                                if(res && res.data && res.data.result){
                                   
                                    this.handleCancel()
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                }
                                
                            })
                            .catch((error) => {
                                this.disabled = false;
                            });
                        }else{
                           
                            this.disabled = true;
                            Api.hospitalInsertoperationRoomInfo({
                                roomName: this.formData1.roomName,
                                file: this.fileList.map(v => v.url)
                            })
                            .then((res) =>{
                                this.disabled = false;
                               
                                if(res && res.data && res.data.result){
                                    this.handleCancel()
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                }
                                
                            })
                            .catch((error) => {
                                this.disabled = false;
                            });
                        }
                        
                    }else{


                    }
                });
                
                // if(_pass1){
                //     this.$emit('setData', 
                //     {qualificationData: {...this.formData1,...this.formData2}},
                //         3
                //     )

                //     resolve()
                // }
            })
			return p;
        },
        // 点击取消
        handleCancel(){
            // 编辑
            if(this.type === 'edit'){
                this.$router.push({
                    path: '/operation/detail',
                    query: {
                        roomId: this.roomId
                    }
                })
            }else{
                this.$router.push({
                    path: '/operation/index',
                    query: {
                    }
                })
                // this.$refs.form1.resetFields();
                // this.formData1.file = []
                // this.imgList = []
            }
        },
		fileChange2(e,item,index){
			const self = this;
			var file = e.target.files;
			// map转arr 取前5个数据
            file = [...file].slice(0,5);

			if(file && file.length > 0){
                file.forEach((val,ind,arr) => {
                    var type = val.type;
                    var formData = new FormData();
                    var reader = new FileReader();
                    var image = new Image();
                    // alert(e.target);
                    if(!/image\/\w+/.test(type)){
                        this.$message.error('上传类型错误!');
                        document.getElementById('fileInput').value = '';
                    }else if(val.size > 1024*1024*2){
                        this.$message.error('图片大小不能超过 2MB!');
                        document.getElementById('fileInput').value = '';
                    }else{
                        self.$set(self.formData1.file,index,val)
                        console.log(self.formData1,'aaa')
                        // self.formData1.file[ind]= val;
                        // 预览
                        reader.onload = (function (val) {
                            return function (e) {
                                var datainfo = this.result;
                                self.$set(self.imgList,index,datainfo)
                                // self.imgList[ind] = datainfo;
                                
                            };
                        })(e.target.files[ind]);
                        
                        reader.readAsDataURL(e.target.files[ind]);

                    };
                });
				
            };
        },
        fileChange1(e){
			const self = this;
			var file = e.target.files;
			// map转arr 取前5个数据
            file = [...file][0];
            console.log(file,'aaa')
			if(file){
                    var type = file.type;
                    var formData = new FormData();
                    var reader = new FileReader();
                    var image = new Image();
                    // alert(e.target);
                    if(!/image\/\w+/.test(type)){
                        this.$message.error('上传类型错误!');
                        document.getElementById('fileInput').value = '';
                    }else if(file.size > 1024*1024*2){
                        this.$message.error('图片大小不能超过 2MB!');
                        document.getElementById('fileInput').value = '';
                        return
                    }else{
                        // self.$set(self.formData1.file,ind,val)
                        console.log(self.formData1,file,'111')
                        self.formData1.file.push(file)
                        console.log(self.formData1,'222')
                        // self.formData1.file[ind]= val;
                        // 预览
                        reader.onload = (function (file) {
                            return function (e) {
                                var datainfo = this.result;
                                // self.$set(self.imgList,ind,datainfo)
                                self.imgList.push(datainfo)
                                console.log(self.imgList,'333')
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
				file: ''
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
