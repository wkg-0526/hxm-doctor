<template>
  <section class="list-wrapper">
    <!-- 按钮 -->
    <div class="picture-btn-upload">
      <label for="file">
        <span class="btn-wrapper">点击上传图片</span>
        <input id="file" type="file" class="el-upload__input" @change="fileChange" />
      </label>
    </div>
    <list :data="data" :gutter="25" ref="list" :pageSize="9" :paginationHide="true">
      <template v-slot:default="{item}">
        <div class="picture-item" @click="onPreview(item)">
          <div class="picture-img" :style="{backgroundImage: `url(${item.img})`}"></div>
          <div class="picture-img-delete" @click.stop="onDelete(item)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </template>
    </list>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </section>
</template>

<script>
// @ is an alias to /src
import list from "@/components/list.vue";
import Api from "@/api/index.js";
export default {
  name: "home",
  components: {
    list
  },
  data() {
    return {
      // dairyBg,
      data: {
        url: "findhospitalSceneInfo",
        list: "img"
        // count: 'count'
      },
      imgUrl: "",
      imgFile: null,
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  mounted() {
    // this.getlistData();
  },
  methods: {
    getlistData() {
      this.$nextTick(() => {
        this.$refs.list && this.$refs.list.getListData();
      });
    },
    fileChange(e) {
      const self = this;
      var file = e.target.files[0];
      var formData = new FormData();
      var reader = new FileReader();
      var image = new Image();
      if (file) {
        var type = file.type;
        // alert(e.target);
        if (!/image\/\w+/.test(type)) {
          this.$message.error("上传类型错误!");
          document.getElementById("fileInput").value = "";
        } else if (file.size > 1024 * 1024 * 10) {
          this.$message.error("上传图片大小不能超过 10MB!");
          document.getElementById("fileInput").value = "";
        } else {
          // 预览
          reader.onload = (function(file) {
            return function(e) {
              var datainfo = this.result;
              var img = new Image();
              img.src = datainfo;
              img.onload = function() {
                // console.log(img.width, img.height)
                // if(img.width <= 800 && img.height <= 800){
                // console.log("图片没有错");
                self.imgUrl = datainfo;
                self.imgFile = file;
                self.onSubmit();
                // }else{
                //     console.log("尺寸不对 " + img.width + "*" + img.height);
                // }
              };
            };
          })(e.target.files[0]);

          reader.readAsDataURL(e.target.files[0]);
        }
      }
    },
    onSubmit() {
      let params = {
        file: this.imgFile
      };

      Api.insertHospitalSceneInfo(params)
        .then(res => {
          if (res && res.data && res.data.result) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            this.getlistData();
          }
        })
        .catch(error => {});
    },
    onPreview(item) {
      this.dialogImageUrl = item.img;
      this.dialogVisible = true;
    },
    // 点击删除
    onDelete(item) {
      this.$confirm("是否删除该图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deleteHospitalScene({
            guid: item.guid
          })
            .then(res => {
              if (res && res.status === 200) {
                if (res.data.result) {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  this.getlistData();
                } else {
                  this.$message({
                    message: "删除失败",
                    type: "warning"
                  });
                }
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    }
  }
};
</script>


<style lang='less' scoped>
@theme-color: #35b3bc;
@text-color: #989898;
.list-wrapper {
  padding-top: 25px;
}
.list-wrapper {
  width: 1002px;
  margin: 0 auto;
}
.picture-item {
  width: 284px;
  box-shadow: 0px 2px 24px 0px rgba(192, 192, 192, 0.5);
  // margin-left: 25px;
  // margin-right: 25px;
  margin-bottom: 38px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .picture-img-delete {
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: #fff;
    font-size: 18px;
    width: 80px;
    height: 80px;
    padding-left: 14px;
    padding-top: 12px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transform: translate(50%, 50%);
  }
}
.picture-img {
  width: 100%;
  height: 153px;
  background-position: center center;
  background-size: cover;
}

.picture-text {
  .block-left {
    float: left;
  }
  .block-right {
    float: right;
  }
}

.picture-btn-upload {
  padding-top: 26px;
  padding-bottom: 38px;
  padding-left: 25px;
  .btn-wrapper {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    border-radius: 4px;
    cursor: pointer;
    background: #35b3bc;
    color: #fff;
    display: inline-block;
  }
}
</style>

