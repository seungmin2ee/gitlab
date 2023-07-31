<template>
  <div class="col column">
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
        id: `${nodeItem.tagId}`,
        desc: nodeItem.tagDesc,
        type: 'tag'
      })
    }
  
    nodeItem.todos.forEach((todoItem) => {
      if (todoItem.id !== null && todoItem.desc !== null) {
        node.push({
          id: `todo-${todoItem.id}`,
          desc: todoItem.desc,
          type: 'todo'
        })
        nodeChild.push({
          source: `todo-${todoItem.id}`,
          target: `${nodeItem.tagId}`,
        })       
      }
    })
  })

  const option = {
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: false,
        force: {
          repulsion: 20,
          edgeLength: 20,
          gravity: 0.12
        },
        data: node.map(function (item) {
          return {
            x: Math.random() * 200,
            y: Math.random() * 200,
            id: item.id,
            name: item.desc,
            symbolSize: item.type === 'tag' ? 100 : 80,
            itemStyle: {
              color: item.type === 'tag' ? '#4158D9' : '#A7B2F2',
            },
          }
        }),
        links: nodeChild,
        label: {
          show: true,
          fontSize: 14,
          fontFamily: 'Pretendard-Regular',
          width: 100,
          overflow: "truncate",
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
  height: calc( 100vh - 64px);
}
</style>
