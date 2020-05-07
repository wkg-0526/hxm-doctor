<template>
  <div class="child-wrapper">
        
        <section class="list-wrapper">
                    <!-- activeClassification: activeClassification.name === '全部' ? '' : activeClassification.name -->
        <div class="search-wrapper">
			<searchLink 
				placeholder='搜索昵称/手机号'
				ref="searchLink"
                @onSearch='onSearch'
			></searchLink>
        </div>

            <list
                :data='data'
                :gutter='20'
                :filter = 'filter'
                ref='list'
                :pageSize='9'
            >
                <template v-slot:default="{item}">
                    <div class="item-wrapper clearfix" @click="toDetail(item)">
                        <div class='top'>
                            <el-avatar 
                                :size="67" 
                                :src="item.portrait" 
                                @error="errorHandler"
                            >
                                <el-avatar icon="el-icon-user-solid" :size="67" style="fontSize: 25px;"></el-avatar>
                            </el-avatar>
                            <div style="marginLeft: 23px;">
                                <div class="top-name">{{item.fullName}}</div>
                                <div class="top-time">职称：{{item.occupationTitle}}</div>
                                <div class="top-time">从业时间：{{item.time | date-format('YYYY-MM-DD')}}</div>
                            </div>
                            
                        </div>
                        <el-row class="grey pt14">
                            <el-col>性别：{{item.gender || '-'}}</el-col>
                        </el-row>
                        
                        <el-row class="grey pt14">
                            <el-col>注册医院：{{item.hospital || '-'}}</el-col>
                        </el-row>

                        <el-row class="grey pt14">
                            <el-col>擅长项目：{{item.beGoodAt ? item.beGoodAte.join('、'): '-'}}</el-col>
                        </el-row>
                         <el-row class="grey pt14">
                            <el-col>手术量：{{item.operativeVolume || 0}}</el-col>
                        </el-row>
                       
                            
                    </div>
                </template>
            </list>
        </section>
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/components/list.vue";
import searchLink from "@/components/search.vue";

export default {
    name: "home",
    components: {
        list,
        searchLink
    },
    props: {
        // content: {
        //     type: String,
        //     default: ''
        // },
        // 1: 寻找医生，2 邀请进度
        type: {
            type: String,
            default: '1'
        }
    },
    data () {
        return {
            headerIndex: '1',
            // data: {
            //     url: 'hospitalOperateInvitationDoctor',
            // },
            // filter: {
            //     content: this.content
            // },
            content: '',
            activeClassification: {name: ''}
        }
    },
    computed: {
        data: function(){
            if(this.type === '1'){
                return {
                    url: 'hospitalOperateInvitationDoctor',
                }
            }else if(this.type === '2'){
                return {
                    url: 'findAlreadyInvitedDoctor'
                }
            }
        },
        filter: function (){
            if(!this.content){
                return {}
            }else{
                return {
                    content: this.content
                }
            }
            
        }
    },
    methods: {
        // 头部切换
        handleSelect(){

        },
        // nav切换
        switchTab(item,index){
            this.navIndex = index;
            this.activeClassification = item;
            this.handleList({
                page: 1
            })
        },
        handleList(obj){
            this.$nextTick(() => {
                this.$refs.list.getListData(obj);
                // this.$emit('setContent')
            })
        },
        toDetail(item){
            this.$router.push({
                path: 'invite/detail',
                query: {
                    userId:item.userId,
                    type: this.type
                }
            })
        },
        //
        errorHandler(){
            return true;
        },
        // 点击搜索
        onSearch(val){
            this.content = val;
            this.handleList({
                page: 1
            })
            
		},
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;

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

.item-wrapper{
    width: 344px;
    padding: 20px 30px 18px 30px;
    background: #fff;
    margin-bottom: 24px;
    border-radius:8px;
    box-shadow:0px 2px 24px 0px rgba(192,192,192,0.5);
    cursor: pointer;
}
.list-wrapper{
    width: 1152px;
    padding-top: 22px;
    margin: 0 auto;
    font-size: 13px;
}
.top{
    display: flex;
    align-items: center;
}
.top-name{
    padding-top: 4px;
    font-size: 16px;
    color: #282828; 
}
.top-time{
    padding-top: 4px;
    color: #989898;
}
.grey{
    color: #989898;
}
.pt14{
    padding-top: 12px;
}
.alignRight{
    text-align: right;
}
.search-wrapper{
    padding-bottom: 20px;
    margin-left: 20px;
}
</style>

