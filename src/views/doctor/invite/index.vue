<template>
  <div class="dynamic-wrapper">
        <div class="menu-bar">
            
			<div class="tab-wrapper">
				<el-tabs 
					v-model="headerIndex" 
					@tab-click="switchTab"
					class="menu-tab"
				>
					<el-tab-pane label="寻找医生" name="1" >
						<tableComp 
							key="1" 	
							type="1" 
							ref="tableComp1"
							:content='content'
							@setContent='setContent'
						/>
					</el-tab-pane>
					<el-tab-pane label='邀请进度' name="2">
						<tableComp 
							key="2" 
							type="2" 
							@setData='setData' 
							ref="tableComp2"
							:content='content'
							@setContent='setContent'
						/>
					</el-tab-pane>
				</el-tabs>
			</div>
            <!-- <div class="menu-right">
				<searchLink 
					placeholder='搜索昵称/手机号'
					ref="searchLink"
                	@onSearch='onSearch'
				></searchLink>
            </div> -->
           
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import searchLink from "@/components/search.vue";

import tableComp from "./component/table";

export default {
    name: "home",
    components: {
		// HelloWorld
		tableComp,
		searchLink
    },
    data () {
        return {
            headerIndex: '1',
			cardData: [],
			content: '',
			total: 0
        }
    },
    mounted(){
        if(this.$route.query.type){
            this.headerIndex = this.$route.query.type;
        }
    },
    methods: {
        // nav切换
        switchTab(item,index){
            // this.navIndex = index;
        },
		//
		setData(key,value){
			this[key] = value;
		},
		// resetSearch(){
        //     this.$nextTick(() => {
        //         if(this.headerIndex === '1'){
        //             this.$refs.tableComp1.page = 1;
        //             this.$refs.tableComp1.getListData();
        //         }else if (this.headerIndex === '2'){
        //             this.$refs.tableComp2.page = 1;
        //             this.$refs.tableComp2.getListData();
        //         }
        //     })
            
        // },
		// 点击搜索
        onSearch(val){
            this.content = val;
            this.resetSearch();
		},
		setContent(){
            const {content} = this;
            this.$refs.searchLink.content = content;
        }
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;
.dynamic-wrapper{
    min-height: 100vh;
    // background: #f6f7f9;
}
.menu-bar .el-menu-demo{
    padding-left: 55px;
}
.menu-bar{
	position: relative;
	
	.menu-right{
		position: absolute;
		right: 40px;
		top: 0;
		height: 70px;
		z-index: 3;
	}
}

</style>
