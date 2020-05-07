<!--  -->
<template>
    <div class="order-info-wrapper">
        <!-- 订单用户 -->
        <div class="order-user">
            <img :src="detailData.userHead" alt="" class="item-img">
            <span class="order-user-name"> {{detailData.userName}}</span>
        </div>

        <!-- 订单详情 -->
        <div class="order-content clearfix">

            <img :src="detailData.focusImg" alt="" class="order-content-img">
            <div class="order-content-main">
                <p class="order-content-item">{{detailData.title}}</p>
                <p class="order-content-item">
                    <span>收货人：{{detailData.harvestUserName}}</span>
                    <span style="padding-left: 40px;">手机号：{{detailData.harvestUserPhone}}</span>
                </p>
                <p class="order-content-item">
                    <span>订单价格：¥{{detailData.price}}</span>
                    <span style="padding-left: 40px;">购买数量：{{detailData.orderNum}}</span>
                </p>
                <p class="order-content-item">{{detailData.paymentTime | date-format('YYYY-MM-DD hh:mm:ss')}}</p>
                <p class="order-content-item">订单号：{{detailData.orderNumber}}</p>
            </div>
        </div>
        
        <div class="order-detail" style="padding-bottom: 20px;">
            <p class="order-content-item">收货地址：{{detailData.harvestUserDetailedAddress || '-'}}</p>
            <p class="order-content-item">
                <span>备注：{{detailData.remarks || '-'}}</span>
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
        <section class="order-pay">
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
    .order-user{
        margin-bottom: 15px;
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
        }
        
    }
    .order-content-item{
        height: 13px;
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
