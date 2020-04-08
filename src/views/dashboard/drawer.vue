<template>
  <el-drawer
    :title="device.name"
    :with-header="true"
    :visible.sync="drawer"
    direction="rtl"
    :before-close="handleClose"
    :size="getClient()?'100%':'400px'"
    class="main"
  >
    <div class="current">
      <Vol :title="titles[0]" :value="currentVols[0]" />
      <Vol :title="titles[1]" :value="currentVols[1]" />
      <Vol :title="titles[2]" :value="currentVols[2]" />
      <Vol :title="titles[3]" :value="currentVols[3]" />
    </div>
    <div class="action" :style="{'width':getClient()?'100%':'400px'}">
      <Relay
        v-for="(item,index) in relays"
        :key="index"
        :sn="device.sn"
        :relay="item"
        :state="currentStates.substring(index,index+1)"
        :auon="currentAuOn.substring(index,index+1)"
        :auoff="currentAuOff.substring(index,index+1)"
        :left="currentLeft[index]"
        :ptime="currentPtime[index]"
        :index="index"
      />
    </div>
  </el-drawer>
</template>

<script>
import { _isMobile } from '@/utils/index'
import Relay from './relay'
import Vol from './vol'
export default {
  components: {
    Relay,
    Vol
  },
  props: {
    drawer: {
      type: Boolean,
      required: false
    },
    device: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      relays: [],
      titles: ['Vol1', 'Vol2', 'Vol3', 'Vol4'],
      currentVols: [0, 0, 0, 0],
      currentStates: 'xxxxxxxx',
      currentAuOn: 'xxxxxxxx',
      currentAuOff: 'xxxxxxxx',
      currentLeft: [0, 0, 0, 0, 0, 0, 0, 0],
      currentPtime: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  watch: {
    drawer: function(val, oldVal) {
      if (val) {
        //
        // console.dir(JSON.parse(this.device.relays))
        this.relays = JSON.parse(this.device.relays)
      }
    }
  },
  mounted() {
    this.$mqttClient.on('message', (topic, message) => {
      if (topic === this.device.sn + 'state') {
        // this.state = true
        try {
          const info = JSON.parse(message.toString())
          if (info.vol !== 'undefined') {
            this.currentVols = info.vol
          }
          if (info.output !== 'undefined') {
            this.currentStates = info.output
          }
          if (info.auon !== 'undefined') {
            this.currentAuOn = info.auon
          }
          if (info.auoff !== 'undefined') {
            this.currentAuOff = info.auoff
          }
          if (info.lefttime !== 'undefined') {
            this.currentLeft = info.lefttime
          }
          if (info.ptime !== 'undefined') {
            this.currentPtime = info.ptime
          }
        } catch (e) {
          //
        }
      }
    })
  },
  methods: {
    handleClose() {
      this.$emit('close', false)
    },
    getClient() {
      return _isMobile()
    }
  }
}
</script>
<style>
   :focus{
        outline:0;
    }
  .el-drawer{
    overflow-y: auto;
  }
</style>
<style lang="scss" scoped>
  .form{
    padding: 20px;
  }
  .main{
    // width: 500px;
  }
  .action {
  width: 400px;
  // height: calc(100vh - 120px);
  padding: 10px 0px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.current {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // margin: 30px 10px 0px;
    box-shadow: 1px 1px 5px #ddd;
    // margin: 10px;
    padding: 10px 10px;
  }
</style>
