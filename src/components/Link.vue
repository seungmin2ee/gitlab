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

let chartEl
let chart

const renderChart = () => {
  chartEl = document.querySelector('.chart')
  chart = echarts.init(chartEl)

  const node = []
  const nodeChild = []

  linkData.value.forEach((nodeItem) => {
    if (nodeItem.tagId !== null) {
      node.push({
        id: nodeItem.tagId + '',
        desc: nodeItem.tagDesc,
      })
      
      nodeItem.todos.forEach((todoItem) => {
        node.push({
          id: `todo-${todoItem.id}`,
          desc: todoItem.desc,
        })
        nodeChild.push({
          source: `todo-${todoItem.id}`,
          target: nodeItem.tagId + '',
        })       
      })
    }
  })

  const option = {
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: false,
        force: {
          repulsion: 10,
          edgeLength: 10,
        },
        data: node.map(function (item) {
          return {
            x: Math.random() * 100,
            y: Math.random() * 100,
            id: item.id,
            name: item.desc,
            symbolSize: 80,
            itemStyle: {
              color: '#' + Math.round(Math.random() * 0xffffff).toString(16),
            }
          }
        }),
        links: nodeChild,
        label: {
          show: true,
          fontSize: 14,
        },
      }
    ]
  }

  chart.setOption(option)
}

onMounted(async () => {
  await getLinkData()
  renderChart()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100vh;
}
</style>
