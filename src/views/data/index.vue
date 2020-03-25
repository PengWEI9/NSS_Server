<template>
  <div class="chart-history">
    <div v-show="!getClient()" class="chart-date">
      <el-select v-model="currentDevice" filterable placeholder="Select device">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="times"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="To"
        start-placeholder="start date"
        end-placeholder="end tdate"
        :picker-options="pickerOptions"
      />
    </div>
    <div v-show="getClient()" class="chart-mobile">
      <el-select v-model="currentDevice" filterable placeholder="Select device">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:5px">
        <el-date-picker
          v-model="times[0]"
          type="date"
          style="width:100%"
          placeholder="start date"
        />
        <label style="color:gray;font-size:12px;padding:5px">To</label>
        <el-date-picker
          v-model="times[1]"
          type="date"
          style="width:100%"
          placeholder="end date"
        />
      </div>
    </div>
    <line-chart :chart-data="lineChartData" />
  </div>
</template>

<script>
import LineChart from './LineChart'
import { _isMobile } from '@/utils/index'
export default {
  components: {
    LineChart
  },
  data() {
    return {
      options: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '1 week',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '1 month',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '3 months',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      currentDevice: '',
      lineChartData: {
        vol: [], vol2: [], vol3: [], vol4: [], time: []
      },
      datas: [],
      times: [
        new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
        new Date()
      ]
    }
  },
  watch: {
    times(nv, ov) {
      // console.dir(nv)
      if (this.currentDevice !== '') {
        this.getDatas(this.currentDevice, nv[0].getTime(), nv[1].getTime())
      }
    },
    currentDevice(nv, ov) {
      if (nv !== '' && this.times.length === 2) {
        this.getDatas(this.currentDevice, this.times[0].getTime(), this.times[1].getTime())
      }
    }
  },
  mounted() {
    this.getDevices()
  },
  methods: {
    getDevices() {
      this.options = []
      this.$store.dispatch('device/getDevices').then(data => {
        for (let i = 0; i < data.length; i++) {
          const obj = {}
          obj.value = data[i].sn
          obj.label = data[i].name
          this.options.push(obj)
        }
      })
    },
    getDatas(sn, data1, data2) {
      this.$store.dispatch('datas/getDatas', {
        sn,
        data1,
        data2
      }).then(data => {
        this.lineChartData = data
      })
    },
    getClient() {
      return _isMobile()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  flex: 1;
  overflow-y: auto;
//   min-width: 500px;
  display: flex;
  flex-direction: column;
  &-current {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 30px 10px 0px;
    box-shadow: 1px 1px 5px #ddd;
    // margin: 10px;
    padding: 20px 10px;
  }
  &-history {
    margin: 20px 10px 0px;
    border-radius: 4px;
    box-shadow: 1px 1px 5px #ddd;
    padding: 10px;
    flex: 1;
    // background: gray;
  }
  &-date {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 10px;
    margin-bottom: 10px;
  }
  &-mobile{
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
  }
  &-name {
    margin-left: 10px;
    font-size: 18px;
    color: black;
  }
  &-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background: wheat;
    // margin-top: 20px;
    padding: 10px 0px;
    border-bottom: 1px solid #ddd;
  }
  &-base {
    display: flex;
    flex-direction: column;
  }
  &-sn {
    margin-left: 10px;
    font-size: 12px;
    margin-top: 5px;
    color: gray;
  }
  &-time {
    margin-right: 10px;
    font-size: 12px;
    color: gray;
  }

}
</style>
