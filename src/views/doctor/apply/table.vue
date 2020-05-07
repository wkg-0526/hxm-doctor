<template>
  <div class="table-wrapper">
        <div class="nav-wrapper">
            <template 
                v-for="(item, index) in navData"
            >
                <span 
                    :key="index" 
                    :class="{active: navIndex===index} "
                    @click="switchTab(item, index)"
                    >{{item.name}}
                    </span>
            </template>
        </div>
        <!-- card -->
        <div class="card-wrapper">
            <template 
                v-for="(item, index) in cardData"
            >
                <div 
                    :key="index" 
                    @click="switchTab(item, index)"
                    >{{item.name}}
                </div>
            </template>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import classification from "@/components/classification.js";

export default {
    name: "home",
    components: {
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


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;
.dairy-wrapper{
    min-height: 100vh;
    background: #f6f7f9;
}
.menu-bar .el-menu-demo{
    padding-left: 55px;
}
// nav
.nav-wrapper{
    padding: 10px 25px;
    border-bottom: 1px solid #e6e6e6;
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
</style>

