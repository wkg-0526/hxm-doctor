<template>
  <div class="child-wrapper">
        <div class="nav-wrapper">
            <template 
                v-for="(item, index) in navData"
            >
                <span 
                    :key="index" 
                    :class="{active: navIndex===index} "
                    @click="switchNav(item, index)"
                    >{{item.name}}
                    </span>
            </template>

        </div>
         <div class="table-wrapper">
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <!-- <el-table-column
                    label="ID"
                    min-width="50"
                    >
                    <template slot-scope="scope">
                        <p  v-if='scope.row.id' >{{scope.row.id}}</p>
                        <p v-else>--</p>
                    </template>
                </el-table-column> -->
                <el-table-column
                    label="发帖人"
                    prop="permit_number"
                    min-width="50">
                    <template slot-scope="scope">
                        <el-avatar 
                            v-if='scope.row.userHead'
                            size="small" 
                            icon="el-icon-user-solid"
                            class="img-wrapper"
                            @error="errorHandler"
                        >
                            <img  :src='scope.row.userHead' class="img-wrapper"/>
                        </el-avatar>
                        
					    <p v-else>-</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="动态标题"
                    min-width="200"
                    align='center'
                >
                    <template slot-scope="scope">
                        <p v-if='scope.row.dynamicTitle'>{{scope.row.dynamicTitle}}</p>
                        <p v-else>--</p>
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="发布时间"
                    min-width="100"
                    align='center'
                >
                    <template slot-scope="scope">
                        <p v-if='scope.row.time'>{{scope.row.time | date-format}}</p>
                        <p v-else>--</p>
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="浏览数"
                    min-width="70"
                    align='center'
                >
                    <template slot-scope="scope">
                        <p>{{scope.row.readCount || 0}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="评论数"
                    min-width="70"
                    align='center'
                >
                    <template slot-scope="scope">
                        <div>
                            <p>{{scope.row.commentCount || 0}}</p>
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column
                    label="点赞数"
                    min-width="70"
                    align='center'
                >
                    <template slot-scope="scope">
                        <div>
                            <p>{{scope.row.praiseCount || 0}}</p>
                        </div>
                        
                    </template>
                </el-table-column>
                
                <el-table-column 
                    label="操作"
                    min-width='135'
                    fixed="right"
                >
                    <template slot-scope="scope">
                        
                        <!-- <a href="javascript:;" 
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)" v-if='scope.row.modifyButton' class="table-action">修订</a> -->
                        <router-link 
                            :to='{
                                path:"/content/contentDynamicDetail",
                                query:{dynamicId:scope.row.dynamicId}
                            }'
                            class="table-action mr10"
                        >
                            <el-button size='mini'>查看详情</el-button>
                        </router-link>
                        <el-button 
                            size='mini'
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                        <!-- <a href="javascript:;"
                            type="danger"
                            v-if='scope.row.state == "ACCEPTED"'
                            @click="handleRevoke(scope.$index, scope.row)" 
                            class="table-action">
                            <i class="iconfont iconyuyuechexiao" title="撤销" style="font-size:18px;"></i>
                        </a> -->
                    </template>
                </el-table-column>
            </el-table>
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
import classification from "@/components/classification.js";
import Api  from '@/api/index.js';

export default {
    name: "home",
    components: {
        // HelloWorld
    },
    data () {
        return {
            navIndex: 0,
            navData: classification,
            tableData: [
                // {userHead: 'ddd'}
            ],
            page: 1,
            pageSize: 15,
            total: 0,
            // 当前选中分类
            activeNav: {name: ''}
        }
    },
    mounted(){
        this.getListData();
    },
    methods: {
        // nav切换
        switchNav(item,index){
            console.log(item,'item')
            this.navIndex = index;
            this.activeNav = item;
            this.getListData();
        },
        //
        getListData(){
            
            const { page, activeNav } = this;
            console.log(activeNav)
            Api.operateFindDynamic({
                page,
                classification: activeNav.name === '全部' ? '' : activeNav.name
            })
            .then((response) =>{
                    
                if(response && response.status === 200){
                    this.tableData = response.data.list;
                    this.total = response.data.dynamicCount;
                }
            })
            .catch(function (error) {
            })

        },
        handleCurrentChange(value){
            // pageStart变化
            this.pageStart = value;
            this.getListData();
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
.table-wrapper{
    margin-left: 55px;
    margin-right: 40px;
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
</style>

