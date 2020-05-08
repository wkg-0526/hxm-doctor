<!--  -->
<template>
    <el-form-item :label="title" class="upload-item-wrapper">
        <template v-for="(item,index) in imgList" >
            <div :key="index"  class="img-item-wrapper">
                <img
                    class="img-item"
                    :src="item" alt=""
                >
                <i class="el-icon-error img-close-icon pointer" @click="handleRemove(item,index)"></i>
                
            </div>
            
        </template>
        
        <label :for="fileListName">
            <span 
                class="img pointer" 
                v-show='fileList.length < 3'
            > + </span>
            <input 
                :id="fileListName" 
                type="file"
                class="el-upload__input"  
                @change="fileChange($event)"
            />
        </label>
        <div class="desc">请上传应用高清图片，最大3M</div>
    </el-form-item>
</template>

<script>
export default {
    data () {
        return {
            imgList: [],
        }
    },
    props: {
        // 参数名
        fileListName: {
            type: String,
            default: ''
        },
        fileList: {
            type: Array,
            default: ()=> {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        },
    },
    mounted(){
    },
    methods: {
        
        fileChange(e) {
            const { imgList } = this;
            const { fileList } = this;
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
					document.getElementById(self.fileListName).value = '';
				}else if(file.size > 1024*1024*3){
					this.$message.error('上传图片大小不能超过 3MB!');
					document.getElementById(self.fileListName).value = '';
				}else{
					// console.log(file,'file')
                    // self.formData1[fileName] = file;
                    fileList.push(file)
                    this.$emit('setData',this.fileListName, fileList)
					// 预览
					reader.onload = (function (file) {
						return function (e) {
							var datainfo = this.result;
                            imgList.push(datainfo);
                            this.imgList = imgList;
							// self[imgUrl] = datainfo;
							
					};
					})(e.target.files[0]);
					
					reader.readAsDataURL(e.target.files[0]);

				};
			};
        },
        handleRemove(item,index){
            this.imgList.splice(index,1) 
            const { fileList } = this; 
            fileList.splice(index,1)
            this.$emit('setData',this.fileListName, fileList)
            
        },
        reset(){
            this.imgList = [];
        }
    },
}
</script>

<style lang='less' scoped>
.upload-item-wrapper{
	.desc{
        color: #999;
        font-size: 12px;
        padding-top: 15px;
    }
    .img-item-wrapper{
        position: relative;
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
        img{
            vertical-align: top;
            display: inline-block;
            width: 110px;
        }
        i{
            position: absolute;
            right: -7px;
            top: -7px;
        }
        
    }
    .img{
        display: inline-block;
        width: 110px;
        height: 110px;
        border: 1px solid #ddd;
        font-size: 50px;
        color: #ddd;
        text-align: center;
        line-height: 100px;
        border-radius: 4px;
    }
}
</style>
