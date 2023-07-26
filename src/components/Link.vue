<template>
  <div class="col row">
    <div class="chart"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const linkData = ref()

const getLinkData = async () => {
  const { data } = await axios('node/link')

  linkData.value = data.contents

  console.log(linkData.value)
}

getLinkData()

let chartEl
let chart

const renderChart = () => {
  chartEl = document.querySelector('.chart')
  chart = echarts.init(chartEl)

  const data = [
    {
      fixed: true,
      x: chart.getWidth() / 2,
      y: chart.getHeight() / 2,
      symbolSize: 20,
      id: '-1'
    }
  ];
  const edges = []
  const option = {
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: false,
        data: data,
        force: {
          // initLayout: 'circular'
          // gravity: 0
          repulsion: 100,
          edgeLength: 5
        },
        edges: edges
      }
    ]
  }

  chart.setOption(option)

  setInterval(function () {
    data.push({
      id: data.length + ''
    })
    
    const source = Math.round((data.length - 1) * Math.random())
    const target = Math.round((data.length - 1) * Math.random())

    if (source !== target) {
      edges.push({
        source: source,
        target: target
      })
    }

    chart.setOption({
      series: [
        {
          roam: true,
          data: data,
          edges: edges
        }
      ]
    })
    // console.log('nodes: ' + data.length)
    // console.log('links: ' + data.length)
  }, 20000)
  // chart.setOption(option)
}

onMounted(() => {
  renderChart()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>
