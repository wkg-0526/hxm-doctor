<template>
  <div class="child-wrapper">
        
        <section class="list-wrapper">
        
            <list
                :data='data'
                :gutter='10'
                ref='list'
                :pageSize="20"
            >
                <template v-slot:default="{item}">
                    <div class='doctor-item' @click='toDetail(item)'> 
                        <el-avatar 
                            :size="67" 
                            :src="item.portrait" 
                            @error="errorHandler"
                        >
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-avatar>
                        <div class='doctor-main'>
                            <p class='block-title doctor-title'>{{item.fullName}}</p>
                            <p class='block-text doctor-text'>{{item.occupationTitle}}</p>
                            <p class='block-text doctor-text'>{{item.time | date-format('YYYY-MM-DD')}}</p>
                        </div>
                    </div>
                </template>
            </list>
        </section>
  </div>
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
                url: 'hospitalToexaminedoctor',
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
                this.$refs.list.getListData();
            })

        },
        toDetail(item){
            this.$router.push({
                path: 'doctorApply/detail',
                query: {userId:item.userId}
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

.doctor-wrapper, .hospital-wrapper,.consultant-wrapper{
    width: 1140px;
    flex-wrap: wrap;
    padding-top: 25px;
    display: flex;
    justify-content : flex-start;
    margin: 0 auto;
}
.doctor-item, .hospital-item,.consultant-item{
    width: 252px;
    box-shadow: 0px 2px 24px 0px rgba(192,192,192,0.5);
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 28px;
    display: flex;
    padding: 22px 0 22px 29px;
    border-radius:8px;
    cursor: pointer;
}
.doctor-title{
    padding-bottom: 5px;
}
.doctor-text{
    padding-bottom: 5px;
}
.doctor-main{
    padding-left: 23px;
}

</style>

