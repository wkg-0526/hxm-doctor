<template>
  	<div class="user-wrapper">
	  	<div class="search-wrapper">
			<!-- <div class="search-btn-wrapper"> -->
				<el-input
					placeholder="搜索昵称/手机号"
					prefix-icon="el-icon-search"
					v-model="content"
					class="search-input round"
					size="medium"
				>
				</el-input>
			<!-- </div> -->
			
			
			<el-button 
				type="primary" 
				round 
				@click="onSearch" 
				size="medium"
				class="search-btn"
			>开始搜索</el-button>
		</div>
		<el-table
			:data="tableData"
			style="width: 100%"
			
			header-align='center'
		>
			<el-table-column
				label="头像"
				min-width="65"
			>
				<template slot-scope="scope">
					<img  v-if='scope.row.userHead' :src='scope.row.userHead' class="img-wrapper"/>
					<p v-else>-</p>
				</template>
			</el-table-column>
			<el-table-column
				label="昵称"
				prop="userName"
				min-width="100"
				align='center'
			>
				<template slot-scope="scope">
					<p v-if='scope.row.userName'>{{scope.row.userName}}</p>
					<p v-else>-</p>
				</template>
			</el-table-column>
			<el-table-column
				label="手机号码"
				width="100"
				align='center'
			>
				<template slot-scope="scope">
					<p v-if='scope.row.userPhone' >{{scope.row.userPhone}}</p>
					<!-- <p v-if='scope.row.from' class="ellipsis" :title="scope.row.orgName">{{scope.row.orgName}}</p> -->
					<p v-else>-</p>
				</template>
			</el-table-column>
			<el-table-column
				label="等级"
				min-width="75"
				align='center'
			>
				<template slot-scope="scope">
					<p v-if='scope.row.grade'>{{scope.row.grade}}</p>
					<p v-else>-</p>
				</template>
			</el-table-column>
			
			<el-table-column
				label="性别"
				min-width="70"
				align='center'
			>
				<template slot-scope="scope">
					<p v-if='scope.row.gender'>{{scope.row.gender}}</p>
					<p v-else>-</p>
				</template>
			</el-table-column>
			<el-table-column
				prop="regTime"
				label="注册时间"
				min-width="110"
				align='center'
			>
				<template slot-scope="scope">
					<div>
						<p v-if='scope.row.regTime'>{{scope.row.regTime | date-format}}</p>
					<p v-else>-</p>
					</div>
					
				</template>
			</el-table-column>
			<el-table-column
				prop="gmtCreateStr"
				label="日记数"
				min-width="75"
				align='center'
			>
				<template slot-scope="scope">
					<div>
						<p v-if='scope.row.diaryCount !== undefined'>{{scope.row.diaryCount || 0}}</p>
						<p v-else>-</p>
					</div>
					
				</template>
			</el-table-column>
			<el-table-column
				prop="moenry"
				label="钱包余额"
				min-width="75"
				align='center'
			>
				<template slot-scope="scope">
					<div>
						<p v-if='scope.row.moenry !== undefined'>{{scope.row.moenry || 0}}</p>
						<p v-else>-</p>
					</div>
					
				</template>
			</el-table-column>
			<el-table-column
				prop="start_time"
				label="拥有积分"
				min-width="75"
				align='center'
			>
				<template slot-scope="scope">
					<div>
						<p v-if='scope.row.integral !== undefined'>{{scope.row.integral || 0}}</p>
						<p v-else>-</p>
					</div>
					
				</template>
			</el-table-column>
			<el-table-column
				prop="violationCount"
				label="违规次数"
				min-width="75"
				align='center'
			>
				<template slot-scope="scope">
					<div>
						<p v-if='scope.row.violationCount !== undefined'>{{scope.row.violationCount || 0}}</p>
						<p v-else>-</p>
					</div>
					
				</template>
			</el-table-column>
			
			<el-table-column 
				label="操作"
				min-width='135'
				align='center'
				fixed="right"
			>
				<template slot-scope="scope">
					<el-button size="mini" @click="onAuth(scope.row, scope.$index)">认证</el-button>
					<el-button size="mini" @click="onBlack(scope.row, scope.$index )">拉黑</el-button>
					<!-- <a href="javascript:;" 
						size="small"
						@click="handleEdit(scope.$index, scope.row)" v-if='scope.row.modifyButton' class="table-action">修订</a>
					<router-link 
						:to='{path:"/details",query:{id:scope.row.id,state:"FINISHED",breadcrumbitem:"审批日志"}}'
						class="table-action mr10">
						<i class="iconfont iconview" title="查看" style="font-size:16px;"></i>
					</router-link>
					<router-link 
						v-if='scope.row.state !== "REFUSED"' 
						:to='{path:"/permit",query:{id:scope.row.id,plate_number:scope.row.plate_number,permit_number:scope.row.permit_number,phone:scope.row.phone}}'
						class="table-action mr10">
						<i class="iconfont iconcheliangtonghangzheng" title="查看电子通行证" style="font-size:18px;"></i>
					</router-link>
					<a href="javascript:;"
						type="danger"
						v-if='scope.row.state == "ACCEPTED"'
						@click="handleRevoke(scope.$index, scope.row)" 
						class="table-action">
						<i class="iconfont iconyuyuechexiao" title="撤销" style="font-size:18px;"></i>
					</a> -->
				</template>
			</el-table-column>
		</el-table>
		<div class="paging-wrapper" v-if='tableData.length!==0'>
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="page"
				:page-size="pageSize"
				layout="prev, pager, next, jumper"
				:total="total"
				background
			>
			</el-pagination>
		</div>
		<!-- 弹窗 -->
		<el-dialog 
            :visible.sync="blackVisible"
            width="30%"
            @closed="onBlackCancel"
			:close-on-click-modal=false
		>
            <el-form :model="form" ref="loginForm">
                    <el-form-item 
                        label="请选择拉黑时间">
                        <el-select 
							v-model="form.day" 
							placeholder="请选择" 
							class="w220"
							clearable
						>
                            <el-option 
                                v-for="(item, index) in blackTimeList" 
                                :key="index" 
                                :label="item.value" 
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onBlackCancel" round>取消</el-button>
                <el-button type="primary" @click="onBlackSumbit" round>确 定</el-button>

            </div>
        </el-dialog>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'
import Api  from '../../../api/index.js';
import { Message } from 'element-ui';
export default {
	name: "home",
	components: {
		// HelloWorld
	},
	data(){
		return {
			tableData: [],
			page: 1,
			total: 0,
			pageSize: 15,
			content: '',
			// 拉黑弹窗
			blackVisible: false,
			blackTimeList: [
				{key: 30, value: '30天'},
				{key: 90, value: '90天'},
				{key: 365, value: '365天'},
				{key: 0, value: '永久'},
			],
			form: {
				day: ''
			},
			activeUser: {}
		}
	}, 
	mounted (){
		this.getTableData()
	},
	methods:{
		getTableData(){
			const { page, content} = this;
				
			Api.operateValidate({
				page: page,
				content: content
			})
			.then((res) =>{
				if(res && res.status === 200){
					this.tableData = res.data.user;
					this.total = res.data.userCount;
				}else{
				}            
			})
			.catch(function (error) {
			});
		},
		handleCurrentChange(value){
            // pageStart变化
            this.page = value;
            this.getTableData();
		},
		// 点击搜索
		onSearch(){
			this.page = 1;
			this.getTableData();
		},
		// 点击认证
		onAuth(row, index){

		},
		// 点击拉黑
		onBlack(row, index){
			this.blackVisible = true;
			this.activeUser = row;
		},
		// 拉黑点击确定
		onBlackSumbit(){
			const {form, activeUser} = this;
			if(!this.form.day && this.form.day !== 0){
				Message.warning('请选择拉黑时间')
				return
			}else{
				Api.updateUserPullBlack({
					userId: activeUser.userId,
					day: form.day
				})
				.then((res) =>{
					if(res && res.status === 200){
						if(res.data.result){
							this.blackVisible = false;

							// 少一个最后一页的判断
							this.getTableData();
							Message.success('拉黑成功')
						}else{
							Message.warning('拉黑失败')
						}
					}else{
					}            
				})
				.catch(function (error) {
				});
			}
		},
		// 拉黑点击取消
		onBlackCancel(){
			this.form.day = '';
			this.blackVisible = false;
		}
	}
};
</script>

<style lang='less' scoped>
.user-wrapper{
	padding: 34px 55px 0 55px;
}
.search-wrapper{
	margin-bottom: 20px;
}
.paging-wrapper{
	padding: 22px 0 29px 0;
	text-align: center;
}
.search-input{
	display: inline-block;
	width: 260px;
	margin-right: 20px;
}
.img-wrapper{
	display: block;
	width: 32px;
	height: 32px;
	border-radius: 50%;

}
.search-btn,.search-btn:hover,.search-btn:focus{
	background: #ffd533;
	border: 1px solid #ffd533;
	color: #333;
}

</style>
<style lang='less'>
// .user-wrapper{
//     .search-input{
        
//         .el-input__inner{
//             border-radius: 18px;
//         }
//     }
// }
</style>