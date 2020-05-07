<template>
  <div class="dairy-wrapper">
        <!-- <div class="menu-bar">
            <el-menu :default-active="headerIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">全部日记</el-menu-item>
                <el-menu-item index="2">举报处理（16）</el-menu-item>
            </el-menu>
        </div> -->
        <div class="tab-wrapper">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部日记" name="first">
                    <tableComp key="1"/>
                </el-tab-pane>
                <el-tab-pane label="举报处理（16）" name="second">
                    <tableComp key="2"/>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- nav -->
        
  </div>
</template>

<script>
// @ is an alias to /src
import classification from "@/components/classification.js";
import tableComp from "./table";


export default {
    name: "home",
    components: {
        tableComp
        // HelloWorld
    },
    data () {
        return {
            headerIndex: '1',
            navIndex: 0,
            navData: classification,
            cardData: []
        }
    },
    methods: {
        // 头部切换
        handleSelect(){

        },
        // nav切换
        switchTab(item,index){
            this.navIndex = index;
        }
        //
    }
};
</script>



