<!--  -->
<template>
	<div class="home-wrapper">
		<section class="top-wrapper block-wrapper">
			<div style="background: #96D652;" class="top-item mr10" >
				<div>
					<img :src="indexFour" alt=""><span class='top-item-title'>入驻医生总数</span>
				</div>
				<div class="top-item-num">{{topData.doctorCount}}</div>
				
			</div>

			<div style="background: #8686E1" class="top-item mr10">
				<div>
					<img :src="indexThree" alt=""><span class='top-item-title'>本月入驻医生</span>
				</div>
				<div class="top-item-num">{{topData.doctorsThisMonthCount}}</div>
			</div>

			<div style="background: #FFD533" class="top-item mr10">
				<div>
					<img :src="indexTwo" alt=""><span class='top-item-title'>总手术次数</span>
				</div>
				<div class="top-item-num">{{topData.operativeVolumeCount}}</div>
			</div>

			<div style="background: #FF8233" class="top-item">
				<div>
					<img :src="indexOne" alt=""><span class='top-item-title'>本月手术次数</span>
				</div>
				<div class="top-item-num">{{topData.operativeVolumeThisMonthCount}}</div>
			</div>
			
		</section>

		<!-- 月订单量  -->
		<section class="order-wrapper block-wrapper">
			<!-- 上面部分 -->
			<div class="title-wrapper clearfix">
				<div class="title-left">
					<img :src="increaseUrl" alt=""><span class='title-left-text'>月订单量</span>
				</div>
				<div class="title-right">
					<img 
						:src="shangyinianUrl" 
						alt="" 
						class="title-left-arrow mr22 pointer"
						@click="toYear('left')"
					/>
					<el-dropdown class="title-drop pointer" @command="handleCommand">
						<span class="el-dropdown-link">
							{{thisYear}}年
						</span>
						<el-dropdown-menu slot="dropdown">

							<el-dropdown-item 
								v-for="item in yearOption" 
								:key="item"
								:command='item'
							>{{item}}</el-dropdown-item>
							
						</el-dropdown-menu>
					</el-dropdown>
					<img 
						:src="xiayinianUrl" 
						alt="" 
						class="title-right-arrow ml22 pointer"
						@click="toYear('right')"
					/>
					
				</div>
			</div>
			<LineLink  :option='lineOption' :height='280' ref="lineLink" id='lineLink'></LineLink> 
			
		</section>

		<!-- 手术客户年龄分布  -->
		<section class="age-wrapper block-wrapper">
			<!-- 上面部分 -->
			<div class="title-wrapper clearfix">
				<div class="title-left">
					<img :src="nianlingUrl" alt=""><span class='title-left-text'>手术客户年龄分布</span>
				</div>
			</div>
			<div class="age-main clearfix">
				<div class="age-left">
					<LineLink  
						:option='histogramOption' 
						:height='440' 
						ref="histogramLink" 
						id='histogramLink'
					></LineLink>
				</div>
				<div class="age-right">
					<div 
						class="age-right-main"
					>
					<span class="age-span">年龄</span>
					<span class="age-span">占比</span>
					
					</div>
					<div 
						v-for="(item, index) in ageData" 
						:key="index"
						class="age-right-main"
					>
					<span class="age-span">{{item.key}}</span>
					<span class="age-span">{{item.value}}</span>
					
					</div>
				</div>
			</div>
			 
			
		</section>

	</div>
</template>

<script>
import Api  from '@/api/index.js';
import indexOne from '@/assets/images/index-1.png'
import indexTwo from '@/assets/images/index-2.png'
import indexThree from '@/assets/images/index-3.png'
import indexFour from '@/assets/images/index-4.png'
import LineLink from '@/components/echart/index.vue'
import {lineOption, histogramOption} from '@/components/echart/indexOption.js'
import nianlingUrl from '@/assets/images/nianling.png'
import increaseUrl from '@/assets/images/increase.png'
import shangyinianUrl from '@/assets/images/shangyinian.png'
import xiayinianUrl from '@/assets/images/xiayinian.png'
export default {
	components: {
		LineLink
	},
	data () {
		return {
			indexOne,
			indexTwo,
			indexThree,
			indexFour,
			nianlingUrl,
			increaseUrl,
			shangyinianUrl,
			xiayinianUrl,
			topData: {

			},
			orderData: {

			},
			ageData: {

			},
			lineOption,
			histogramOption,
			dropData: [],
			thisYear: 2020,
			yearOption: []
		}
	},
	mounted () {
		this.getYearData();
		this.getTop()
		this.getOrder()
		this.getAge()
	},
	
	methods: {
		getYearData(){
			let endYear = new Date().getFullYear();
			let startYear = new Date().getFullYear() - 50;
			let arr = []
			for (var i=startYear;i<=endYear;i++){ 
				arr.unshift(i); 
			} 
			this.thisYear = endYear;
			this.yearOption = arr;
		},
		getTop() {
			Api.dataStatistics({
                                 
			})
			.then((res) =>{
				
				if(res && res.data){
					this.topData = res.data
				}
				
			})
			.catch((error) => {
				this.disabled = false;
			});
		},
		
		getOrder() {
			const self = this;
			Api.findHospitalOperativeVolumeThisYearMonth({
                year: this.thisYear        
			})
			.then((res) =>{
				if(res && res.data){
					let _data = res.data.list.map(v => v.count)
					let _dataMonth = res.data.list.map(v => v.month + '月')
					this.lineOption.series[0].data = _data
					this.lineOption.xAxis.data = _dataMonth
					this.$nextTick(function() {
						self.$refs.lineLink && self.$refs.lineLink.initPie();
					})
					this.orderData = res.data
				}
				
			})
			.catch((error) => {
				this.disabled = false;
			});
		},
		getAge() {
			const self = this;
			Api.findHosptalAgeBL({
                                 
			})
			.then((res) =>{
				
				if(res && res.data){
					
					let xArr = [];
					let yArr = [];
					let _ageData = [];
					let _arr = ['0-18','19-23','24-30','31-40','41-49','50']
					yArr = _arr.map(val => {
						return res.data[val].split('%')[0]
					})
					_ageData = _arr.map(val => {
						return {value: res.data[val],key: val}
					})
				
					this.ageData = _ageData;
					this.histogramOption.series[0].data = yArr

					// this.histogramOption.xAxis.data = xArr;
					this.$nextTick(function() {
						self.$refs.histogramLink && self.$refs.histogramLink.initPie();
					})
				}
				
			})
			.catch((error) => {
				this.disabled = false;
			});
		},
		handleCommand(command){
			this.thisYear = command
			this.getOrder();
		},
		toYear(type){
			if(type === 'left'){
				if(this.thisYear  === this.yearOption[this.yearOption.length -1]){
					return;
				}
				this.thisYear = this.thisYear - 1;
			}else if(type === 'right'){
				if(this.thisYear  === this.yearOption[0]){
					return;
				}
				this.thisYear = this.thisYear + 1;
			}
			this.getOrder();
		}
	},
  
}
</script>

<style lang='less' scoped>
.home-wrapper{
	background: #F5F7F8;
	padding-bottom: 10px;
	min-height: calc(~"100vh - 96px");
}
.block-wrapper{
	width: 864px;
	margin: 0 auto 23px;

}
// 头部统计
.top-wrapper{
	padding-top: 40px;
	color: #fff;
	display: flex;
	.mr10{
		margin-right: 20px;
	}
	.top-item{
		flex: 1;
		padding: 15px 18px 28px 18px;
		border-radius:4px;
		box-shadow:0px 0px 10px 0px rgba(192,192,192,0.1);
		img{
			display: inline-block;
			width: 15px;
			height: 16px;
		}
		.top-item-title{
			padding-left: 10px;
			vertical-align: top;
		}
		.top-item-num{
			padding-top: 30px;
			font-weight:bold;
			font-size: 32px;
			line-height: 32px;
		}
	}
}

.order-wrapper{
	background: #fff;
}
.title-wrapper{
	padding: 17px 20px 0px 20px;
	img{
		position: relative;
		top: 2px;
	}
	.title-left-text{
		padding-left: 10px;
	}
	.title-left{
		float: left;
	}
	.title-right{
		float: right;
	}
}
.mr22{
	margin-right: 22px;
}
.ml22{
	margin-left: 22px;
}
.age-wrapper{
	padding-bottom: 18px;
	background: #fff;
}
.age-main{
	width: 817px;
	margin: 18px auto 0;
	border:1px solid rgba(221,221,221,1);
	.age-left{
		float: left;
		width: 565px;
	}
	.age-right{
		width: 250px;
		float: right;
		height: 100%;
		border-left: 1px solid rgba(221,221,221,1);
	}
	.age-span{
		display: inline-block;
		text-align: center;
		width: 50%;
		height: 57px;
		line-height: 57px;
	}
	.age-right-main{
		border-bottom: 1px solid rgba(221,221,221,1);
	}
}
</style>
<style lang='less'>
ul.el-dropdown-menu{
	max-height: 300px;
	overflow: auto;
}
</style>
