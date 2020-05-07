//行业风向折线图数据
export const lineOption1 = {
  // 指定图表的配置项和数据
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#FF8233"
      }
    }
  },

  // grid: {
  // 	left: '30',
  // 	right: '50',
  // 	top:'80',
  // 	bottom: '30',
  // 	containLabel: true
  // },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisTick: { show: false }, //是否展示标记点
    axisLine: { show: false }, //是否展示线
    data: []
  },
  yAxis: {
    type: "value"
    // {
    // 	name:" 加注金额（元）",
    // 	type : 'value',
    // 	axisLabel : {
    // 		formatter: '{value}'
    // 	},
    // 	splitLine: {show: true},//是否展示横线
    // 	axisLine: {show:false},
    // 	axisTick: {show:false},
    // 	scale:false,/*按比例显示*/
    // },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  series: [
    {
      type: "line",
      yAxisIndex: 1 /*y轴*/,
      itemStyle: {
        normal: {
          color: "#FF8233",
          label: {
            color: "#FF8233", //字的颜色
            borderColor: "#FF8233" //拐点边框颜色
            // show: true  //设置这个就会把值显示在图表上
          },
          lineStyle: {
            color: "#FF8233"
          }
        }
      },
      data: []
    }
    // {
    // 	name:'加注量',
    // 	type:'line',
    // 	stack: '总量',
    // 	yAxisIndex: 0,/*y轴*/
    // 	itemStyle: {
    // 		normal: {
    // 			color:'#A579FF',
    // 			label: {
    // 			color:'#A579FF', //字的颜色
    // 			borderColor: '#A579FF',  //拐点边框颜色
    // 			// show: true  //设置这个就会把值显示在图表上
    // 			},
    // 			lineStyle:{
    // 			color:'#A579FF'
    // 			}
    // 		}
    // 	},
    // 	data: []
    // }
  ]
}

export const lineOption = {
  xAxis: {
    type: "category",
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      type: "line",
      smooth: true
    }
  ]
}

// 柱状图
export const histogramOption = {
  color: ["#91DEFF"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: ["0-18", "19-23", "24-30", "31-40", "41-49", "50以上"],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "占比",
      type: "bar",
      barWidth: "40%",
      data: [0, 0, 0, 0, 0, 0, 0]
    }
  ]
}
