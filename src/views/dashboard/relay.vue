<template>
  <div class="container" :style="{'background':state=='1'?'yellowgreen':'white'}">
    <div class="names">
      <label class="name">{{ relay.name }}</label>
      <label v-show="!getAuto()" class="name" style="color:red;padding-top:5px;font-size:12px">STATE: {{ getState() }}</label>
      <label v-show="getLeft() != ''" class="name" style="color:red;padding-top:5px;font-size:12px">LEFT: {{ getLeft() }}</label>
    </div>
    <div class="main">
      <div class="main-btn">
        <button class="btn-off" @click="relayAction(1)">{{ relay.on }}</button>
        <button class="btn-off" @click="relayAction(0)">{{ relay.off }}</button>
        <button class="btn-off" :style="{'background':auon == 1?'green':'gray'}" @click="relayAction(2)">{{ relay.autoon }}</button>
        <button class="btn-off" :style="{'background':auoff == 1?'green':'gray'}" @click="relayAction(6)">{{ relay.autooff }}</button>
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
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // isAuto: false
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
</style>
