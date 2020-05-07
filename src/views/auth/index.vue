<template>
  <div class="auth-wrapper">
        <div class="menu-bar">
			<div class="tab-wrapper">
				<el-tabs 
					v-model="headerIndex" 
					@tab-click="switchTab"
					class="menu-tab"
				>
					<el-tab-pane label="医生认证" name="1" >
						<tableComp type="1" key='1'/>
					</el-tab-pane>
					<el-tab-pane label='机构认证' name="2">
						<tableComp type="2" key='2'/>
					</el-tab-pane>
                    <el-tab-pane label='咨询师认证' name="3">
						<tableComp type="3" key='3'/>
					</el-tab-pane>
				</el-tabs>
			</div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src

import tableComp from "./table";

export default {
    name: "home",
    components: {
		// HelloWorld
		tableComp
    },
    data () {
        return {
            headerIndex: '1',
			cardData: [],
			content: '',
			total: 0
        }
    },
    methods: {
        // nav切换
        switchTab(item,index){
            // this.navIndex = index;
        },
		
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;
.auth-wrapper{
    min-height: 100vh;
    // background: #f6f7f9;
}
.menu-bar .el-menu-demo{
    padding-left: 55px;
}
.menu-tab{
	// line-height: 70px;
}
.menu-bar{
	position: relative;
	
	.menu-right{
		position: absolute;
		right: 40px;
		top: 0;
		height: 70px;
		display: flex;
		align-items: center;
		z-index: 3;
		.search-input{
			display: inline-block;
		}
		.search-btn{
			display: inline-block;
			margin-left: 30px;
		}
	}
}

</style>
