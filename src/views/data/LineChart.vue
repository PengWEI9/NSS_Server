<template>
  <div :class="className" class="main" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // console.dir('呜呜呜呜')
      this.setOptions(this.chartData)
    },
    setOptions({ vol1, vol2, vol3, vol4, time } = {}) {
      this.chart.setOption({
        xAxis: {
          data: time,
          // boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '3%',
          bottom: -5,
          start: 0,
          end: 100 // 初始化滚动条
        }],
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          min: 8,
          max: 15
        },
        legend: {
          data: ['vol1', 'vol2', 'vol3', 'vol4']
        },
        series: [{
          name: 'vol1',
          itemStyle: {
            normal: {
              color: '#FF005A'
            }
          },
          barGap: 0,
          barWidth: 5,
          // smooth: true,
          type: 'bar',
          data: vol1
          // animationDuration: 2800,
          // animationEasing: 'cubicInOut'
        },
        {
          name: 'vol2',
          smooth: true,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#3888fa'
            }
          },
          barWidth: 5,
          data: vol2
          // animationDuration: 2800,
          // animationEasing: 'quadraticOut'
        },
        {
          name: 'vol3',
          // smooth: true,
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'gray'
            }
          },
          barWidth: 5,
          data: vol3
          // animationDuration: 2800,
          // animationEasing: 'quadraticOut'
        },
        {
          name: 'vol4',
          // smooth: true,
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'green'
            }
          },
          barWidth: 5,
          data: vol4
          // animationDuration: 2800,
          // animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .main{
    width: 100%;
    height: calc(100vh - 240px);
  }
</style>
