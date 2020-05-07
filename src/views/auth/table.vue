<template>
  <div class="child-wrapper">
        
        <div class="card-wrapper">
            <!-- 医生 -->
            <section v-show='type === "1"' class='doctor-wrapper'>
                <template v-for='(item, index) in tableData'>
                    <div class='doctor-item' @click='toDetail(item.doctorId, "1")' :key='index'> 
                        <el-avatar 
                            :size="67" 
                            :src="item.portrait" 
                            @error="errorHandler"
                        >
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-avatar>
                        <div class='doctor-main'>
                            <p class='block-title doctor-title'>{{item.fullName}}</p>
                            <p class='block-text doctor-text'>{{item.occupationTitle}}</p>
                            <p class='block-text doctor-text'>{{item.time | date-format('YYYY-MM-DD')}}</p>
                        </div>
                    </div>
                </template>
            </section>
            <!-- 机构 -->
            <section v-show='type === "2"' class='hospital-wrapper'>
                <template v-for='(item, index) in tableData'>
                    <div class='hospital-item' @click='toDetail(item.hospitalId, "2")' :key='index'>
                        <el-avatar 
                            :size="67" 
                            :src="item.hospitalLog" 
                            @error="errorHandler"
                        >
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-avatar>
                        <div class='hospital-main'>
                            <p class='block-title hospital-title'>{{item.hospitalName}}</p>
                            <p class='block-text hospital-text' ><span style="margin-right: 20px">{{item.type}}</span>{{item.city}} </p>
                            <p class='block-text hospital-text'>{{item.time | date-format('YYYY-MM-DD')}}</p>
                        </div>
                    </div>
                </template>
            </section>
            <!-- 咨询师 -->
            <section v-show='type === "3"' class='consultant-wrapper'>
                <template v-for='(item, index) in tableData'>
                    <div class='consultant-item' @click='toDetail(item.consultantId, "3")' :key='index'>
                        <el-avatar 
                            :size="67" 
                            :src="item.userHead" 
                            @error="errorHandler"
                        >
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-avatar>
                        <div class='consultant-main'>
                            <p class='block-title consultant-title'>{{item.fullName}}</p>
                            <p class='block-text consultant-text'>{{item.time | date-format('YYYY-MM-DD')}}</p>
                        </div>
                    </div>
                </template>
            </section>
        </div>
        <div class="paging-wrapper" v-if='tableData.length!==0'>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 50]"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total"
                background
            >
            </el-pagination>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api  from '@/api/index.js';

export default {
    name: "home",
    components: {
    },
    props: {
        type: String
    },
    created(){
        console.log(this.type,'ddd')
    },
    data () {
        return {
            navIndex: 0,
            tableData: [
                // {
                //     "occupationTitle":"执业医师",
                //     "doctorId":5,
                //     "fullName":"王严伟",
                //     "time":1529424000000,
                //     "portrait":"http://hxm-1259538451.file.myqcloud.com/hxm/doctorportrait/20/20190902154054527336765.png"
                // },
                

            ],
            page: 1,
            pageSize: 20,
            total: 0,
            // 当前选中分类
            activeNav: {name: ''}
        }
    },
    mounted(){
        this.getListData();
    },
    methods: {
        
        //
        getListData(){
            
            const { page, activeNav } = this;
            if(this.type === '1'){
                Api.operateFindDoctor({
                    page,
                })
                .then((res) =>{
                        
                    if(res && res.status === 200){
                        this.tableData = res.data.list;
                        this.total = res.data.count;
                    }
                })
                .catch(function (error) {
                })
            }else if(this.type === '2'){
                Api.operateFindHospital({
                    page,
                })
                .then((res) =>{
                        
                    if(res && res.status === 200){
                        this.tableData = res.data.list;
                        this.total = res.data.count;
                    }
                })
                .catch(function (error) {
                })
            }else if(this.type === '3'){
                Api.operateFindConsultant({
                    page,
                })
                .then((res) =>{
                        
                    if(res && res.status === 200){
                        this.tableData = res.data.list;
                        this.total = res.data.count;
                    }
                })
                .catch(function (error) {
                })
            }
            

        },
        handleCurrentChange(value){
            // pageStart变化
            this.page = value;
            this.getListData();
        },
        // 跳转到详情页
        toDetail(id, type){
            console.log(id,'id')
            if(id){
                this.$router.push({
                    path: '/auth/authDetail',
                    query: {
                        id,
                        type 
                    }
                })
            }
            
        },
        // 点击删除
        handleDelete(){
            let self = this;
            // 点击删除确定
            this.$confirm('是否删除该动态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // self.loading = true;
                // ajax({
                //     url:'/literature/deleteLiterature',
                //     type:'post',
                //     data:{
                //         fileCode:row.fileCode
                //     },
                //     success(res){
                //         self.loading = false;
                //         if(res.success){
                //             self.getListData();
                //             self.$message({
                //                 message: "删除成功",
                //                 type: 'success'
                //             });
                //         }else{
                //             self.$message({
                //                 message: res.errorMsg,
                //                 type: 'warning'
                //             });
                //         };
                //     }
                    
                // });
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });          
            });
        },
        errorHandler(){
            return true;
        }
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;
// nav
.nav-wrapper{
    padding: 10px 25px;
    background: #fff;
    span{
        display: inline-block;
        margin-left: 30px;
        line-height: 32px;
        height: 32px;
        cursor: pointer;
    }
    .active{
        color: @theme-color;
    }
}
.card-wrapper{
    // margin-left: 55px;
    // margin-right: 40px;
}
.paging-wrapper{
    padding: 15px 0;
    text-align: center;
}
.img-wrapper{
	display: block;
	width: 32px;
	height: 32px;
	border-radius: 50%;

}
.block-title{
    color: #282828;
    font-size: 16px;
}
.block-text{
    color: #989898;
}

// 医生
.doctor-wrapper, .hospital-wrapper,.consultant-wrapper{
    width: 1140px;
    flex-wrap: wrap;
    padding-top: 25px;
    display: flex;
    justify-content : flex-start;
    margin: 0 auto;
}
.doctor-item, .hospital-item,.consultant-item{
    width: 252px;
    box-shadow: 0px 2px 24px 0px rgba(192,192,192,0.5);
    margin-left: 16px;
    margin-right: 16px;
    margin-bottom: 28px;
    display: flex;
    padding: 22px 0 22px 29px;
    border-radius:8px;
    cursor: pointer;
}
.doctor-title{
    padding-bottom: 5px;
}
.doctor-text{
    padding-bottom: 5px;
}
// 机构
.hospital-wrapper{
    width: 1200px;
}
.hospital-item{
    margin-left: 10px;
    margin-right: 10px;
    width: 380px;
}
.doctor-main,.hospital-main,.consultant-main{
    padding-left: 23px;
}
.hospital-title{
    padding-bottom: 5px;
}
.hospital-text{
    padding-bottom: 5px;
}
// 咨询师
.consultant-title{
    padding-top: 10px;
}
.consultant-text{
    padding-top: 5px;
}
</style>

