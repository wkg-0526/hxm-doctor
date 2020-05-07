<template>
        
    <section class="list-wrapper">
    
        <list
            :data='data'
            :gutter='10'
            ref='list'
            :pageSize="6"
        >
            <template v-slot:default="{item}">
                <div class='operation-item' @click='toDetail(item)'> 
                    <div class='operation-img' :style="{backgroundImage: `url(${item.roomImg})`}"></div>
                    <div class='operation-main'>
                        <p class='block-title operation-title'>{{item.roomName}}</p>
                        <div class="operation-text clearfix">
                            <p class='block-left' v-show="item.time">
                                {{item.time | date-format('YYYY-MM-DD')}}
                            </p>
                            <p 
                                class='block-right' 
                                :style="{color: item.whetherFree ? '#D0021B' : '#96D652'}"
                            >
                                {{item.whetherFree ? '占用' : '空闲'}}
                            </p>
                        </div>
                        
                    </div>
                </div>
            </template>
        </list>
    </section>
</template>

<script>
// @ is an alias to /src
import list from "@/components/list.vue";
// import dairyBg from "@/assets/images/dairy-bg.png";
export default {
    name: "home",
    components: {
        list
    },
    data () {
        return {
            // dairyBg,
            data: {
                url: 'hospitalFindOperationRoomInfo',
                // list: 'list',
                // count: 'count'
            },
        }
    },
    mounted(){
        // this.getlistData();
    },
    methods: {

        getlistData(){
            this.$nextTick(() => {
                this.$refs.list && this.$refs.list.getListData();
            })

        },
        toDetail(item){
            this.$router.push({
                path: '/operation/detail',
                query: {roomId:item.roomId}
            })
        },
        //
        errorHandler(){
            return true;
        }
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#989898;
.list-wrapper{
    padding-top: 70px;
}
.operation-wrapper{
    width: 1140px;
    flex-wrap: wrap;
    padding-top: 25px;
    display: flex;
    justify-content : flex-start;
    margin: 0 auto;
}
.operation-item{
    width: 284px;
    box-shadow:0px 2px 24px 0px rgba(192,192,192,0.5);
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 70px;
    border-radius:8px;
    cursor: pointer;
}
.operation-img{
    width: 100%;
    height: 153px;
    background-position: center center;
    background-size: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.operation-title{
    padding-top: 12px;
    padding-bottom: 12x;
}
.operation-text{
    .block-left{
        float: left;
    }
    .block-right {
        float: right;
    }
}
.operation-main{
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 13px;
}

.no-data{
    padding: 30px;
}

</style>

