<template>
  <div class="main">
    <div class="info">
      <div class="main-name" @click="show">
        <label class="name">
          {{ device.name }}
        </label>
        <div>
          <svg-icon icon-class="state" style="font-size:12px;" :style="{'color':device.state == 1?'yellowgreen':'gray'}" />
          <label class="sn">
            {{ device.state == 1?'online':'offline' }}
          </label>
          <label class="more">|</label>
          <label class="more">more</label>
        </div>
      </div>
      <div class="btn-name">
        <label class="sn">{{ getNames(2).name }}</label>
        <label v-show="!getAuto(2)" class="name" style="color:red;padding-top:5px;font-size:12px">STATE: {{ getState(2) }}</label>
        <label v-show="getLeft(2) != ''" class="name" style="color:red;padding-top:5px;font-size:12px">LEFT: {{ getLeft(2) }}</label>
      </div>
      <div style="width:100%;height:1px;background:#ddd;margin:5px 0px" />
      <div class="btn-relay">
        <button class="btn-off" :style="{'background':getOn1()?'yellowgreen':'gray'}" @click="relayAction(2,1)">{{ getNames(2).on }}</button>
        <button class="btn-off" :style="{'background':getOff1()?'yellowgreen':'gray'}" @click="relayAction(2,0)">{{ getNames(2).off }}</button>
        <button class="btn-off" :style="{'background':getAuOn1()?'yellowgreen':'gray'}" @click="relayAction(2,2)">{{ getNames(2).autoon }}</button>
        <button class="btn-off" :style="{'background':getAuOff1()?'yellowgreen':'gray'}" @click="relayAction(2,6)">{{ getNames(2).autooff }}</button>
        <button class="btn-off" @click="clear(2)">CLEAR</button>
      </div>
      <div class="btn-name">
        <label class="sn">{{ getNames(3).name }}</label>
        <label v-show="!getAuto(3)" class="name" style="color:red;padding-top:5px;font-size:12px">STATE: {{ getState(3) }}</label>
        <label v-show="getLeft(3) != ''" class="name" style="color:red;padding-top:5px;font-size:12px">LEFT: {{ getLeft(3) }}</label>
      </div>
      <div style="width:100%;height:1px;background:#ddd;margin:5px 0px" />
      <div class="btn-relay">
        <button class="btn-off" :style="{'background':getOn2()?'yellowgreen':'gray'}" @click="relayAction(3,1)">{{ getNames(3).on }}</button>
        <button class="btn-off" :style="{'background':getOff2()?'yellowgreen':'gray'}" @click="relayAction(3,0)">{{ getNames(3).off }}</button>
        <button class="btn-off" :style="{'background':getAuOn2()?'yellowgreen':'gray'}" @click="relayAction(3,2)">{{ getNames(3).autoon }}</button>
        <button class="btn-off" :style="{'background':getAuOff2()?'yellowgreen':'gray'}" @click="relayAction(3,6)">{{ getNames(3).autooff }}</button>
        <button class="btn-off" @click="clear(3)">CLEAR</button>
      </div>
    </div>
    <!-- <svg-icon icon-class="go" /> -->
  </div>
</template>

<script>
export default {
  props: {
    device: {
      type: Object,
      required: true
    },
    selected: {
      type: Object,
      required: true
    },
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      names: [
        {
          name: '',
          on: 'ON',
          off: 'OFF',
          autoon: 'Auto ON',
          autooff: 'Auto OFF'
        },
        {
          name: 'Flood Light-Control',
          on: 'ON',
          off: 'OFF',
          autoon: 'Auto ON',
          autooff: 'Auto OFF'
        }
      ],
      // deviceData: '',
      on1: false,
      off1: false,
      autoOn1: false,
      autoOff1: false,
      on2: false,
      off2: false,
      autoOn2: false,
      autoOff2: false
    }
  },
  methods: {
    show() {
      this.$emit('currentDevice', this.device)
    },
    isSelected() {
      if (this.selected.sn === this.device.sn) {
        return true
      } else {
        return false
      }
    },
    getNames(index) {
      const relays = JSON.parse(this.device.relays)
      return relays[index]
    },
    clear(index) {
      const cmd = 'clear' + (index + 1)
      this.$mqttClient.publish(this.device.sn + 'ctr', cmd)
      this.$mqttClient.publish(this.device.sn + 'ctr', 'state=?')
    },
    relayAction(index, type) {
      let cmd = 'setr='
      for (let i = 0; i < 8; i++) {
        if (i === index) {
          cmd += type
        } else {
          cmd += 'x'
        }
      }
      // console.dir(this.device.sn + '    ' + cmd)
      this.$mqttClient.publish(this.device.sn + 'ctr', cmd)
    },
    getAuto(index) {
      if (this.device === '') {
        return false
      }
      if (this.device.auon.substring(index, index + 1) === '1' || this.device.auoff.substring(index, index + 1) === '1') {
        return true
      } else {
        return false
      }
    },
    getState(index) {
      if (this.device === '') {
        return '--'
      }
      if (this.device.output.substring(index, index + 1) === '0') {
        return 'Close'
      } else if (this.device.output.substring(index, index + 1) === '1') {
        return 'Open'
      } else {
        return '--'
      }
    },
    getLeft(index) {
      if (this.device === '') {
        return ''
      }
      if (this.device.auon.substring(index, index + 1) === '1') {
        return this.device.lefttime[index] + ' Minutes'
      } else if (this.device.auoff.substring(index, index + 1) === '1') {
        return this.device.lefttime[index] + ' Minutes'
      } else {
        return ''
      }
    },
    getOn1() {
      if (this.device === '') {
        return false
      }
      if (this.device.output.substring(2, 3) === '1') {
        return true
      } else {
        return false
      }
    },
    getOff1() {
      if (this.device === '') {
        return false
      }
      if (this.device.output.substring(2, 3) === '0') {
        return true
      } else {
        return false
      }
    },
    getOn2() {
      if (this.device === '') {
        return false
      }
      if (this.device.output.substring(3, 4) === '1') {
        return true
      } else {
        return false
      }
    },
    getOff2() {
      if (this.device === '') {
        return false
      }
      if (this.device.output.substring(3, 4) === '0') {
        return true
      } else {
        return false
      }
    },
    getAuOn1() {
      if (this.device === '') {
        return false
      }
      if (this.device.auon.substring(2, 3) === '1') {
        return true
      } else {
        return false
      }
    },
    getAuOff1() {
      if (this.device === '') {
        return false
      }
      if (this.device.auoff.substring(2, 3) === '1') {
        return true
      } else {
        return false
      }
    },
    getAuOn2() {
      if (this.device === '') {
        return false
      }
      if (this.device.auon.substring(3, 4) === '1') {
        return true
      } else {
        return false
      }
    },
    getAuOff2() {
      if (this.device === '') {
        return false
      }
      if (this.device.auoff.substring(3, 4) === '1') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  // height: 50px;
  margin: 2px 0px;
  border-radius: 4px;
  background: white;
  box-shadow: 1px 1px 2px #ccc;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  // height: 72px;
  &-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &-state{
    display: flex;
    align-items: center;
  }
}
.main:hover {
  background: whitesmoke;
}
.info {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.name {
  font-size: 16px;
  color: black;
  padding: 2px 0px 2px 5px;
}
.sn {
  font-size: 12px;
  color: gray;
}
.state {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &-icon {
    // font-size: 10px;
  }
  &-name {
    font-size: 10px;
    color: gray;
    margin-left: 5px;
  }
}
.common-btn{
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  padding: 2px 5px;
  width: 72px;
}
.more{
  font-size: 12px;
  color: #5555ff;
  text-decoration: underline;
}
.btn-name{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0px 0px;
}
.btn-relay{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.relay-state{
    font-size: 12px;
  color: red;
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
  // margin: 2px;
}
.btn-off:hover {
  background: #a2a2a2;
}
.btn-off:active {
  background: #606060;
}
</style>
