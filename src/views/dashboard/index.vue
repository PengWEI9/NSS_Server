<template>
  <div>
    <div v-show="!getClient()" class="search-div-pc">
      <el-input
        v-model="search"
        placeholder="Search devices by name or sn"
        clearable
        style="width:400px"
      />
      <div style="margin:5px">
        <el-checkbox v-model="check1">Camera</el-checkbox>
        <el-checkbox v-model="check2">Flog</el-checkbox>
        <el-checkbox v-model="check3">Online</el-checkbox>
        <el-checkbox v-model="check4">Offline</el-checkbox>
      </div>
    </div>
    <div v-show="getClient()" class="search-div-mobile">
      <el-input
        v-model="search"
        placeholder="Search devices by name or sn"
        clearable
        style="width:'100%'"
      />
      <div style="padding:5px;display:felx;">
        <el-checkbox v-model="check1" style="width:50px">Camera</el-checkbox>
        <el-checkbox v-model="check2" style="width:50px">Flog</el-checkbox>
        <el-checkbox v-model="check3" style="width:50px">Online</el-checkbox>
        <el-checkbox v-model="check4" style="width:50px">Offline</el-checkbox>
      </div>
    </div>
    <el-row :span="24" :gutter="4">
      <el-col
        v-for="(device, index) in deviceDatas"
        :key="index"
        :span="6"
        style="padding:5px"
        :style="{'min-width':_isMobile() == null?'330px':'100%'}"
      >
        <device
          :device="device"
          :selected="currentDevice"
          :search="searchChange"
          @currentDevice="updateDevice"
        />
      </el-col>
    </el-row>
    <drawer :drawer="detail" :device="currentDevice" @close="detail = false" />
  </div>
</template>

<script>
import Device from './device'
import Drawer from './drawer'
import { _isMobile } from '@/utils/index'
export default {
  components: {
    Device,
    Drawer
  },
  data() {
    return {
      deviceDatas: [],
      realDatas: [],
      search: '',
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      currentDevice: {
        sn: '',
        state: false,
        weight: 0,
        relays: [{ name: 'S&F+', on: 'ON', off: 'OFF', autoon: 'Auto ON', autooff: 'Auto OFF' }, { name: 'Camera', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Siren-Control', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Flood Light-Control', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Speaker', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Microphine', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Solar', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'default', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }]
      },
      detail: false,
      searchChange: ''
    }
  },
  watch: {
    search(nv, ov) {
      this.searchDevice()
    },
    check1(nv, ov) {
    //   this.check1 = nv
      this.searchDevice()
    },
    check2(nv, ov) {
    //   this.check1 = nv
      this.searchDevice()
    },
    check3(nv, ov) {
    //   this.check1 = nv
      this.searchDevice()
    },
    check4(nv, ov) {
    //   this.check1 = nv
      this.searchDevice()
    }

  },
  mounted() {
    this.getDevices()
    this.$mqttClient.on('message', (topic, message) => {
      for (let i = 0; i < this.realDatas.length; i++) {
        if (this.realDatas[i].sn + 'state' === topic) {
          this.realDatas[i].state = 1
          break
        }
      }
      for (let i = 0; i < this.deviceDatas.length; i++) {
        if (this.deviceDatas[i].sn + 'state' === topic) {
          this.deviceDatas[i].state = 1
          break
        }
      }
      if (topic === this.currentDevice.sn + 'state') {
        try {
          this.currentTime = new Date().toLocaleString()
          const msg = JSON.parse(message.toString())
          if (typeof msg.vol !== 'undefined') {
            this.currentVols = msg.vol
          }
          if (typeof msg.output !== 'undefined') {
            this.currentStates = msg.output
          }
          if (typeof msg.auon !== 'undefined') {
            this.currentAuOn = msg.auon
          }
          if (typeof msg.auoff !== 'undefined') {
            this.currentAuOff = msg.auoff
          }
          if (typeof msg.lefttime !== 'undefined') {
            this.currentLeft = msg.lefttime
          }
          if (typeof msg.pause !== 'undefined') {
            this.currentPause = msg.pause
          }
        } catch (error) {
          //
        }
      }
    })
  },
  methods: {
    searchDevice() {
      this.searchChange = Math.random() + ''
      if (this.search === '' && this.check1 === false && this.check2 === false && this.check3 === false && this.check4 === false) {
        this.deviceDatas = this.realDatas
      } else {
        const temp = []
        for (let i = 0; i < this.realDatas.length; i++) {
          if (this.realDatas[i].name.toUpperCase().includes(this.search.toUpperCase()) ||
          this.realDatas[i].sn.toUpperCase().includes(this.search.toUpperCase())
          ) {
            if (this.check1 === true) {
              if (this.realDatas[i].version === 'Camera') {
                // this.realDatas[i].state = 0
                temp.push(this.realDatas[i])
                // this.$mqttClient.publish(this.realDatas[i].sn + 'ctr', 'state=?')
              }
            }
            if (this.check2 === true) {
              if (this.realDatas[i].version === 'Flog') {
                // this.realDatas[i].state = 0
                temp.push(this.realDatas[i])
                // this.$mqttClient.publish(this.realDatas[i].sn + 'ctr', 'state=?')
              }
            }
            if (this.check3 === true) {
              if (this.realDatas[i].state === 1) {
                // this.realDatas[i].state = 0
                temp.push(this.realDatas[i])
                // this.$mqttClient.publish(this.realDatas[i].sn + 'ctr', 'state=?')
              }
            }
            if (this.check4 === true) {
              if (this.realDatas[i].state === 0) {
                // this.realDatas[i].state = 0
                temp.push(this.realDatas[i])
                // this.$mqttClient.publish(this.realDatas[i].sn + 'ctr', 'state=?')
              }
            }
            if (this.check1 === false && this.check2 === false && this.check3 === false && this.check4 === false) {
            //   this.realDatas[i].state = 0
              temp.push(this.realDatas[i])
            //   this.$mqttClient.publish(this.realDatas[i].sn + 'ctr', 'state=?')
            }
          }
        }
        this.deviceDatas = temp
        // console.dir(this.deviceDatas)
      }

      for (let i = 0; i < this.deviceDatas.length; i++) {
        this.deviceDatas[i].state = 0
        this.$mqttClient.publish(this.deviceDatas[i].sn + 'ctr', 'state=?')
      }
    },
    getDevices() {
      this.$store.dispatch('device/getDevices').then(data => {
        const temp = []
        for (let i = 0; i < data.length; i++) {
          // console.dir(data[i])
          const obj = data[i]
          obj.state = 0
          temp.push(obj)
        }
        this.realDatas = temp
        this.deviceDatas = temp
        for (let i = 0; i < data.length; i++) {
          // console.dir(data[i])
          const obj = data[i]
          obj.state = 0
          this.$mqttClient.subscribe(data[i].sn + 'state')
          this.$mqttClient.publish(data[i].sn + 'ctr', 'state=?')
        }
      })
    },
    updateDevice(e) {
      this.currentDevice = e
      this.$mqttClient.publish(e.sn + 'ctr', 'state=?')
      this.detail = true
    },
    _isMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      // console.dir(flag)
      return flag
    },
    getClient() {
      return _isMobile()
    }
  }
}
</script>

<style scoped lang="scss">
    .search-div-mobile{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-start;
        padding: 5px;
    }
    .search-div-pc{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 5px;
    }
</style>
