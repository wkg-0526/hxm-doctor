<template>
  <div class="dynamic-wrapper">
        <div class="menu-bar">
			<div class="tab-wrapper">
				<el-tabs 
					v-model="headerIndex" 
					@tab-click="switchTab"
					class="menu-tab"
				>
					<el-tab-pane label="全部" name="1" >
						<tableComp key="1"/>
					</el-tab-pane>
					<el-tab-pane :label='"举报处理的（"+ total + "）"' name="2">
						<tableComp key="2"/>
					</el-tab-pane>
				</el-tabs>
			</div>
            
            <div class="menu-right">
                <div class="search-input">

					<el-input
						placeholder="搜索昵称/手机号"
						prefix-icon="el-icon-search"
						v-model="content"
						class="round"
						size="medium"
					>
				
					</el-input>
				</div>
				<div class="search-btn">
					<el-button 
					type="primary" 
					round 
					@click="onSearch" 
					class="yellow"
					size="medium"
					>开始搜索</el-button>
				</div>
					
              
            </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import classification from "@/components/classification.js";

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
            navData: classification,
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
		//
		onSearch(){

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
