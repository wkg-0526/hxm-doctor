<!--  -->
<template>
    <div class="order-info-wrapper">
        <!-- 订单信息 -->
        <div class="order-top clearfix">
            <span class="left">
                订单号：{{detailData.orderNumber}}
            </span>
            <span class="right">
                申请提交时间：{{detailData.applyForReturnTime | date-format('YYYY-MM-DD hh:mm:ss')}}
            </span>
        </div>
        <!-- 订单用户 -->
        <div class="order-user">
            <div>
                <img :src="detailData.userHead" alt="" class="item-img">
                <span class="order-user-name"> {{detailData.userName}}</span>
            </div>
            <div>
                <!-- refund 售后状态 （1申请换货
2 申请退货退款 3 运营同意退货 4. 运营同意换货 5 运营拒绝退货 6 运营拒绝换货
7用户已填写退货快递 8 商家确认收货(退款已完成)） -->
                类型： 
                <span class="order-user-type">{{
                        detailData.refund === 1 ? '换货' : 
                        detailData.refund === 2 ? '退货退款' :
                        detailData.refund === 3 ? '待用户退货' :
                        detailData.refund === 4 ? '待用户退货' :
                        detailData.refund === 5 ? '拒绝退货' :
                        detailData.refund === 6 ? '拒绝换货' :
                        detailData.refund === 7 ? '用户已填写退货快递' :
                        detailData.refund === 8 ? '退款完成' : 
                        ''
                    }}</span>
            </div>
            
        </div>

        <!-- 订单详情 -->
        <div class="order-content clearfix">

            <img :src="detailData.focusImg" alt="" class="order-content-img">
            <div class="order-content-main">
                <p class="order-content-item">{{detailData.title}}</p>
                <p class="order-content-item">
                    <span>规格：{{detailData.category || '-'}}</span>
                    <span style="padding-left: 40px;">购买数量：{{detailData.orderNum}}</span>
                    <!-- <span style="padding-left: 40px;">手机号：{{detailData.harvestUserPhone}}</span> -->
                </p>
                <p class="order-content-item">
                    <span>订单价格：¥{{detailData.price}}</span>
                </p>
                <!-- <p class="order-content-item">{{detailData.paymentTime | date-format('YYYY-MM-DD hh:mm:ss')}}</p> -->
                <!-- <p class="order-content-item">订单号：{{detailData.orderNumber}}</p> -->
            </div>
        </div>
        
        <div class="order-detail" style="padding-bottom: 20px;">
            <p class="order-content-item">收货地址：{{detailData.harvestUserDetailedAddress || '-'}}</p>
            <p class="order-content-item">手机号：{{detailData.harvestUserPhone || '-'}}</p>
            <p class="order-content-item">收货人：{{detailData.harvestUserName || '-'}}</p>
            <p class="order-content-item">
                <span>用户留言：{{detailData.remarks || '无'}}</span>
            </p>
            <p class="order-content-item">
                <span style="color: #FF8233;">退货原因：{{detailData.refundReason || '无'}}</span>
            </p>
            <p class="order-content-item" v-if="detailData.refund === 6 || detailData.refund === 6">
                <span style="color: #D0021B;">拒绝原因：{{detailData.refuseReason || '无'}}</span>
            </p>
            <p class="order-content-item">
                <span>状态：{{detailData.orderStatus === 1 ? '待发货' :
                        detailData.orderStatus === 2 ? '已发货' :
                        detailData.orderStatus === 3 ? '已完成' : 
                        '-'}}</span>
            </p>
            <p class="order-content-item" v-if="detailData.orderStatus === 2">快递：{{detailData.sendExpress || '-'}}</p>
            <p class="order-content-item" v-if="detailData.orderStatus === 2">运单号：{{detailData.courierNumber || '-'}}</p>
        </div>
        
        <!-- 支付方式 -->
        <section class="order-pay" v-if="detailData.refund === 1 || detailData.refund === 2">
            <div class="order-pay-wrapper order-pay-top">
                支付方式： {{detailData.paymentMode || '-'}}
            </div>
            <div class="order-pay-wrapper order-pay-content">
                <div class="order-pay-item clearfix">
                    <span class="order-pay-left">商品总价</span>
                    <span class="order-pay-right">¥{{detailData.price || 0}}</span>
                </div>
                <div class="order-pay-item clearfix">
                    <span class="order-pay-left">积分抵折扣</span>
                    <span class="order-pay-right">-¥{{detailData.integral || 0}}</span>
                </div>
                <div class="order-pay-item clearfix">
                    <span class="order-pay-left">优惠券</span>
                    <span class="order-pay-right">-¥{{detailData.couponQuota || 0}}</span>
                </div>
            </div>
            <div class="order-pay-bottom clearfix order-pay-item ">
                <span class="order-pay-left">订单总价</span>
                <span class="order-pay-right" style="color: #FF8233;">¥{{detailData.paymentMoney}}</span>
            </div>
        </section>

       
        
    </div>
</template>

<script>
import Api  from '@/api/index.js';
import editor from "@/components/editor.vue"
import format from 'date-fns/format'

export default {
    components:{
        editor,
    },
    props: {
        detailData: {
            type: Object,
            default: {}
        },
        paramName: {
            type: Object,
            default: () => {
                return {
                    category: 'shopCategory',
                }
            },
        },
        type: {
            type: String,
            default: 'default'
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
    },
   

}
</script>

<style lang='less' scoped>
.order-info-wrapper{
    color: #686868;
    font-size: 13px;
    .order-top{
        padding-bottom: 10px;
        border-bottom: 1px solid #979797;
        margin-bottom: 20px;
        .left{
            float:left;
        }
        .right{
            float: right;
        }
    }
    .order-user{
        display: flex;
        justify-content: space-between;
        margin-bottom: 33px;
        img{
            display: inline-block;
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }
        .order-user-name{
            display: inline-block;
            vertical-align: top;
            line-height: 34px;
            height: 34px;
            margin-left: 20px;
        }
        .order-user-type{
            color: #FF8233;
            font-size: 24px;
        }
    }
    .order-content{
        margin-bottom: 18px;
        .order-content-img{
            float: left;
            width: 140px;
            height: 140px;
        }
        .order-content-main{
            float: left;
            margin-left: 10px;
            margin-top: 20px;
        }
        
    }
    .order-content-item{
        height: 18px;
        margin-bottom: 17px;
    }
    // 支付方式
    .order-pay{
        border: 1px solid #ddd;
        .order-pay-item{
            padding: 0 20px 20px 20px;
        }
        
        .order-pay-left{
            float: left;
        }
        .order-pay-right{
            float: right;
        }
        
        .order-pay-top{
            padding-left: 20px;
            height: 34px;
            line-height: 34px;
            border-bottom: 1px solid #ddd;
        }
        .order-pay-content{
           padding-top: 14px;
           border-bottom: 1px solid #ddd;
        }
        .order-pay-bottom{
           padding-bottom: 0px;
           height: 54px;
           line-height: 54px;
        }
    }
    
    .pb30{
        padding-bottom: 30px;
    }
    .w100{
        width: 100px;
    }
    .mr15{
        margin-right: 15px;
    }
    
}
</style>
