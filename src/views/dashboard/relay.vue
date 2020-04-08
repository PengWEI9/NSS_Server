<template>
  <div class="container">
    <div class="names">
      <label class="name">{{ relay.name }}</label>
      <label v-show="!getAuto()" class="name" style="color:red;padding-top:5px;font-size:12px">STATE: {{ getState() }}</label>
      <el-popover
        v-show="getLeft() != ''"
        v-model="visible"
        placement="left"
        title="Left Time"
        width="200"
      >
        <div class="left-div">
          <input v-model="currentLeft" class="left-time" placeholder="left time" type="number">
          <el-button type="primary" size="mini" @click="updateLeft()">Update</el-button>
        </div>
        <label slot="reference" class="name-left" style="color:red;padding-top:5px;font-size:12px" @click="getCurrentLeft()">LEFT: {{ getLeft() }}</label>
      </el-popover>
    </div>
    <div class="main">
      <div class="main-btn">
        <button class="btn-off" :style="{'background':state=='1'?'yellowgreen':'gray'}" @click="relayAction(1)">{{ relay.on }}</button>
        <button class="btn-off" :style="{'background':state=='0'?'yellowgreen':'gray'}" @click="relayAction(0)">{{ relay.off }}</button>
        <button class="btn-off" :style="{'background':auon == 1?'yellowgreen':'gray'}" @click="relayAction(2)">{{ relay.autoon }}</button>
        <button class="btn-off" :style="{'background':auoff == 1?'yellowgreen':'gray'}" @click="relayAction(6)">{{ relay.autooff }}</button>
        <button class="btn-off" @click="clear()">CLEAR</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sn: {
      type: String,
      default: ''
    },
    relay: {
      type: Object,
      required: true
    },
    state: {
      type: String,
      default: '0'
    },
    auon: {
      type: String,
      default: '0'
    },
    auoff: {
      type: String,
      default: '0'
    },
    left: {
      type: Number,
      default: 0
    },
    ptime: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // isAuto: false
      currentLeft: 0,
      visible: false
    }
  },
  methods: {
    getAuto() {
      if (this.auon === '1' || this.auoff === '1') {
        return true
      } else {
        return false
      }
    },
    getState() {
      if (this.auon === '1') {
        return 'AutoOn'
      } else if (this.auoff === '1') {
        return 'AutoOff'
      } else if (this.state === '0') {
        return 'Close'
      } else if (this.state === '1') {
        return 'Open'
      } else {
        return 'Unknow'
      }
    },
    getLeft() {
      if (this.auon === '1') {
        return this.left + ' Minutes'
      } else if (this.auoff === '1') {
        return this.left + ' Minutes'
      } else {
        return ''
      }
    },
    getCurrentLeft() {
      this.currentLeft = this.left
    },
    clear() {
      const cmd = 'clear' + (this.index + 1)
      this.$mqttClient.publish(this.sn + 'ctr', cmd)
      this.$mqttClient.publish(this.sn + 'ctr', 'state=?')
    },
    relayAction(type) {
      let cmd = 'setr='
      for (let i = 0; i < 8; i++) {
        if (i === this.index) {
          cmd += type
        } else {
          cmd += 'x'
        }
      }
      this.$mqttClient.publish(this.sn + 'ctr', cmd)
    },
    updateLeft() {
      this.visible = false
      if (!isNaN(this.currentLeft) && parseInt(this.currentLeft) >= 0) {
        this.$mqttClient.publish(this.sn + 'ctr', 'lefttime' + (this.index + 1) + '=' + (parseInt(this.currentLeft) + this.ptime - this.left))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 95%;
    display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: flex-start;
    box-shadow: 1px 1px 4px gray;
  margin: 5px 0px;
  padding: 8px 0px;
  background: white;
  border-radius: 4px;
}
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // height: 84px;
  margin-top: 5px;
  &-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    // background: gray;
    width: 100%;
    // margin: 10px 0px 0px;
  }
}
.line {
  width: 1px;
  // background: #ddd;
  height: 84px;
}
.btn-off {
  outline: none;
  background: gray;
  border-radius: 4px;
  font-size: 10px;
  padding: 5px 10px;
  border: 0px;
  height: 30px;
  color: white;
  margin: 2px;
}
.btn-off:hover {
  background: #a2a2a2;
}
.btn-off:active {
  background: #606060;
}
.operate {
  display: flex;
  align-items: center;
  background: wheat;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 100%;
  padding: 0px 10px;
}
.name {
  font-size: 14px;
  color: black;
  padding: 0px 4px;
  margin-left: 10px;
  // max-width: 140px;
  word-break: break-all;white-space: normal;
}
.name-left {
  font-size: 14px;
  color: black;
  padding: 0px 4px;
  margin-left: 10px;
  text-decoration: underline;
  // max-width: 140px;
  word-break: break-all;white-space: normal;
}
.div-btn{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.more{
  font-size: 10px;
  color: #5555ff;
  text-decoration: underline;
}
.names{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;;
}
.clear{
  font-size: 10px;
  color:#5555ff;
  text-decoration: underline;
}
.clear:active{
  color: blue;
}
.left-time{
  border-radius: 4px;
  border: 1px solid #bbb;
  padding: 6px;
  width: 80px;
  font-size: 10px;
}
.left-div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
