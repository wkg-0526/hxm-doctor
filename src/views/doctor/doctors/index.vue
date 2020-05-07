<template>
  <div class="doctors-wrapper">
            
        <div class="tab-wrapper">
            
         </div> 
            <tableComp 
                key="1" 	
                type="1" 
                ref="tableComp1"
                :content='content'
                @setContent='setContent'
            />
                
       
       
           
  </div>
</template>

<script>
// @ is an alias to /src

import tableComp from "./component/table";

export default {
    name: "home",
    components: {
		// HelloWorld
		tableComp,
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
            // this.resetSearch();
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
.search-wrapper{

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
