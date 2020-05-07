<template>
  <div class="operation-detail-wrapper">
        <div class='operation-back-btn'> 
            <el-button @click='toIndex'>返回</el-button>
            <el-button type="primary" @click="toEdit">修改</el-button>
            <el-button type="danger" @click="onDelete">删除</el-button>
        </div>
        <section class='operation-detail-main'>
            <!-- 头部 -->
            <div class='operation-item'>
                
                <span class="operation-label">手术室名称</span>
                <span class="operation-content">{{detailData.roomName || '-'}}</span>
                
            </div>
            <div class='operation-item' style="paddingBottom: 0px;">
                
                <div class="operation-label" style="paddingBottom: 8px;">手术室照片</div>
                <div class="operation-img-wrapper">

                    <template v-for="(item,index) in detailData.roomImg">
                        <img :src="item" alt=""  class="operation-img" :key="index">
                    </template>
                </div>   
                
            </div>
            <el-divider content-position="left"></el-divider>
             <div class='operation-item'>
                
                <span class="operation-label">当前状态</span>
                <span class="operation-content">{{detailData.whetherFree ? '占用' : '空闲'}}</span>
            </div>
            <el-calendar
                :range="detailData.range"
            >
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <p 
                        :class="detailData.list 
                            && detailData.list.filter(v => v.timeStr === data.day).length > 0 
                            && detailData.list.filter(v => v.timeStr === data.day)[0].whetherFreeDate
                        ? 'red date-text' : 'green date-text' " 
                        v-show='detailData.list && detailData.list.filter(v => v.timeStr === data.day).length > 0'
                        @click="toOrder(data)"
                    >
                    {{ data.day.split('-').slice(2).join('').toString().replace(/^0+/,"")}}
                    </p>
                </template>
            </el-calendar>
            <div class="tuli">
                <div style="paddingBottom: 20px;"><i class="redBack"></i><span>红色代表手术室已被预定</span></div>
                <div style="paddingBottom: 40px;"><i class="greenBack"></i><span>绿色代表手术室空闲</span></div>
            </div>
             
        </section>
      

        <!-- 拒绝认证 -->
        <el-dialog 
            class="grid-body"
            :visible.sync="dialogFormVisible"
            width="30%"
            @closed="handleClose"
            :close-on-click-modal='false'
            title='预约手术室'
        >
            <el-row>
                <el-form :model="form" ref="form" label-width="100px">
                    
                    <el-form-item 
                        label="时间段" 
                        style="marginBottom: 0px"
                    >
                       <el-select v-model="form.timeSlot" placeholder="请选择">
                            <el-option
                                v-for="item in timeOption"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                
                <el-button @click="handleClose" size="small">取消</el-button>
                <el-button type="primary" @click="onSubmitdialog" size="small">确定</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

import Api  from '@/api/index.js';
import { getDay, format, subDays, addDays } from 'date-fns';

export default {
    name: "operation",
    components: {
    },
    data () {
        return {
            type: '',
            roomId: '',
            detailData: {
                
            },
            isDisabled: false,
            dialogFormVisible: false,
            form: {
                timeSlot: ''
            },
            timeOption: [
                {value: '9:00-11:00', disabled: false},
                {value: '11:00-13:00', disabled: false},
                {value: '14:00-16:00', disabled: false},
                {value: '16:00-18:00', disabled: false},

            ],
            activeData: ''
        }
    },
    created(){
        this.roomId = this.$route.query.roomId;
    },
    mounted(){
        const self = this;
        this.$nextTick(() => {
            this.getDetailData()
// format(this.detailData.list[0].time, 'YYYY-MM-DD'),
            
        })

        
        
    },
    methods: {
        // 获取星期一 和周末
        getDate(date,type='+'){
            // "+", 之后
            // "-", 之前
            let _date = getDay(date)
            if((_date === 1 && type=== '-') || (_date === 7 && type=== '+')){
                return date;
            }
            // 周日
            if(type=== '+'){
                return addDays(date,7 - _date)
            // 周一
            }else if(type === '-'){
                return subDays(date,_date - 1)
            }

        },
        getDetailData(){
            
            Api['hospitalFindOperationRoomInfoDetail']({
                roomId: this.roomId
            })
            .then((res) =>{
                console.log(res,'sss')
                if(res && res.status === 200){
                    // 用户不存在
                    if(res.data.result && res.data.result === 500){
                        // this.$router.push({
                        //     path: '/operation/operationIndex',
                        //     query: {
                        //         // id,
                        //         // type 
                        //     }
                        // })
                        this.$message({
                            message: `手术室不存在`,
                            type: 'warning'
                        });
                    }else{
                        let _detailData = res.data;
                        // 处理数据
                        // 格式化时间
                        let _date = getDay(_detailData.list[0].time)
                        let _list = _detailData.list.map(v => {
                                v.timeStr = format(v.time,'YYYY-MM-DD')
                                return v
                            }
                        )
                        _detailData.list = _list;
                        // 时间范围
                        _detailData.range = [
                            format(this.getDate(_detailData.list[0].time, '-'),'YYYY-MM-DD'),
                            format(this.getDate(_detailData.list[_detailData.list.length-1].time,'+'),'YYYY-MM-DD')
                        ]
                        
                        this.detailData = _detailData;
                        
                    }
                    
                }
            })
            .catch(function (error) {
            })
            
        },
        toOrder(data){
            Api['hospitalFindOperationRoomWhether']({
                roomId: this.roomId,
                date: data.day
            })
            .then((res) =>{
                
                if(res && res.status === 200){
                    let _data = res.data;
                    
                    this.timeOption.forEach((v,i) => {
                        let _obj = v;
                        if(_data[v.value]){
                            
                            _obj.disabled = true;
                            
                        }else{
                            _obj.disabled = false;
                        }
                        this.$set(this.timeOption,_obj,i)
                    })
                   
                    this.activeData = data.day;
                    this.dialogFormVisible = true;
                    
                       
                }
            })
            .catch(function (error) {
            })
            
        },
        toIndex(){
            this.$router.push({
                path: '/operation/index',
                query: {
                    // id,
                    // type 
                }
            })
        },
        // 点击编辑
        toEdit(){
            this.$router.push({
                path: '/operation/edit',
                query: {
                    roomId: this.roomId
                }
            })
        },
        
        onCallback(isSuccess){
            const { type } = this;
            if(isSuccess){
                this.$message({
                    message: "认证成功",
                    type: 'success'
                });
            }else{
                this.$message({
                    message: "操作成功",
                    type: 'success'
                });
            }

            this.$router.push({
                path: '/operation/operationIndex',
                query: {
                    // id,
                    type 
                }
            })
        },
       
        handleClose(){
            this.dialogFormVisible = false;
            this.form.timeSlot = '';
            this.$refs.form.resetFields();
        },
        onSubmitdialog(){
            const { activeData } = this;

            if(!this.form.timeSlot){
                this.$message({
                    message: "请选择时间段",
                    type: 'warning'
                });
                return;
            }
            let { timeSlot } = this.form;
            let params = {
                timeSlot,
                roomId: this.roomId,
                date: activeData
            };
            Api['insertOperationRoomRecordInfo'](params)
            .then((res) =>{
                if(res && res.status === 200){
                    if(res.data.result){
                        this.getDetailData();
                        this.handleClose()
                        this.$message({
                            message: "预约成功",
                            type: 'success'
                        });
                    }
                }
            })
            .catch((error) => {
                this.dialogFormVisible = false;
            });
        },
        // 点击删除
        onDelete(item){
            this.$confirm('是否删除该手术室?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Api.hospitalDeleteOperationRoom({
                    roomId: this.roomId
                })
                .then((res) =>{
                        
                    if(res && res.status === 200){
                        if(res.data.result){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.toIndex();
                        }else{
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                        }
                        
                    }
                })
                .catch(function (error) {
                })
            }).catch(() => {
                        
            });
        }
            
        
		
    }
};
</script>


<style lang='less' scoped>
@theme-color: #ff8232;
@text-color:#686868;
@border-color: rgba(221,221,221,1);
.operation-detail-wrapper{
    width: 518px;
    margin: 0 auto;
    // background: #f6f7f9;
}
.operation-back-btn{
    padding: 33px 0;
}
.top{
    display: flex;
    
}
.operation-item{
    padding-bottom: 35px;
    .operation-label{
        padding-right: 34px;
    }
}
.btn-wrapper{
    padding: 40px 0;
    text-align: center;
}
.red{
    color: #D0021B;
}
.green{
    color: #96D652;
}
.date-text{
    text-align: center;
    line-height: 69px;
    font-size: 16px;
}
.tuli{
    padding-top: 27px;
    vertical-align: middle;
    font-size: 14px;
    span{
        display: inline-block;
        line-height: 20px;
    }
    i{
        display: inline-block;
        margin-right: 10px;
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
    }
    .redBack{
        background: #D0021B;
        border-radius: 2px;
    }
    .greenBack{
        background: #96D652;
    }
}
.operation-img-wrapper{
    margin-left: -17px;
    margin-right: -18px;
    .operation-img{
        display: inline-block;
        width: 242px;
        margin-left: 17px;
        margin-right: 17px;
        border-radius:8px;
        margin-top: 22px;
    }
}
</style>

