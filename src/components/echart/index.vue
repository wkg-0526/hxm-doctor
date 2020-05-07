
<template>
  <div>
    <div :style="{width:"100%",height: height + "px"}" :id="id"></div>
  </div>
</template>

<script>
// import React from 'react'
import echarts from "echarts" //必须
export default {
  data() {
    return {
      key: ""
    }
  },
  props: {
    option: {
      type: Object,
      default: {}
    },
    height: {
      type: Number,
      default: 500
    },
    id: {
      type: String,
      default: "id"
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.initPie()
    })
    // setTimeout(() =>{

    // 	this.initPie()
    // }, 50);
  },
  updated() {
    const self = this
    this.$nextTick(function() {
      self.initPie()
    })
  },
  methods: {
    initPie() {
      const myChart = echarts.init(document.getElementById(this.id)) //初始化echarts
      //设置options
      myChart.setOption(this.option)
      window.onresize = function() {
        myChart.resize()
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
