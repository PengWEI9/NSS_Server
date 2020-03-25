<template>
  <div class="main">
    <div class="info">
      <div class="main-name" @click="show">
        <label class="name">
          {{ device.name }}
        </label>
        <div>
          <svg-icon icon-class="state" style="font-size:12px;" :style="{'color':state?'yellowgreen':'gray'}" />
          <label class="sn">
            {{ state?'online':'offline' }}
          </label>
          <label class="more">|</label>
          <label class="more">more</label>
        </div>
        <!-- <div class="main-state">
          <label class="sn">
            {{ device.sn }}
          </label>
        </div> -->
        <!-- <div class="main-state">
          <svg-icon icon-class="state" style="font-size:12px;" :style="{'color':state?'yellowgreen':'gray'}" />
          <label class="sn">
            {{ state?'Online':'Offline' }}
          </label>
        </div> -->
      </div>
      <div class="btn-name">
        <label class="sn">{{ names[0].name }}</label>
        <label v-show="!getAuto(2)" class="name" style="color:red;padding-top:5px;font-size:12px">STATE: {{ getState(2) }}</label>
        <label v-show="getLeft(2) != ''" class="name" style="color:red;padding-top:5px;font-size:12px">LEFT: {{ getLeft(2) }}</label>
      </div>
      <div style="width:100%;height:1px;background:#ddd;margin:5px 0px" />
      <div class="btn-relay">
        <button class="btn-off" @click="relayAction(2,1)">{{ names[0].on }}</button>
        <button class="btn-off" @click="relayAction(2,0)">{{ names[0].off }}</button>
        <button class="btn-off" @click="relayAction(2,2)">{{ names[0].autoon }}</button>
        <button class="btn-off" @click="relayAction(2,6)">{{ names[0].autooff }}</button>
        <button class="btn-off" @click="clear(2)">CLEAR</button>
      </div>
      <div class="btn-name">
        <label class="sn">{{ names[1].name }}</label>
        <label v-show="!getAuto(3)" class="name" style="color:red;padding-top:5px;font-size:12px">STATE: {{ getState(3) }}</label>
        <label v-show="getLeft(3) != ''" class="name" style="color:red;padding-top:5px;font-size:12px">LEFT: {{ getLeft(3) }}</label>
      </div>
      <div style="width:100%;height:1px;background:#ddd;margin:5px 0px" />
      <div class="btn-relay">
        <button class="btn-off" @click="relayAction(3,1)">{{ names[1].on }}</button>
        <button class="btn-off" @click="relayAction(3,0)">{{ names[1].off }}</button>
        <button class="btn-off" @click="relayAction(3,2)">{{ names[1].autoon }}</button>
        <button class="btn-off" @click="relayAction(3,6)">{{ names[1].autooff }}</button>
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
      state: false,
      state_name: 'offline',
      names: [
        {
          name: 'Siren-Control',
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
      deviceData: ''
    }
  },
  watch: {
    search(nv, ov) {
      if (nv !== ov) {
        this.state = false
        this.deviceData = ''
      }
    }
  },
  mounted() {
    this.$mqttClient.on('message', (topic, message) => {
      if (topic === this.device.sn + 'state') {
        this.state = true
        this.deviceData = JSON.parse(message.toString())
      }
    })
    this.$mqttClient.subscribe(this.device.sn + 'state')
    this.getNames()
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
    getNames() {
      const relays = JSON.parse(this.device.relays)
      if (relays.length > 3) {
        this.names[0] = relays[2]
        this.names[1] = relays[3]
      }
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
      if (this.deviceData === '') {
        return false
      }
      if (this.deviceData.auon.substring(index, index + 1) === '1' || this.deviceData.auoff.substring(index, index + 1) === '1') {
        return true
      } else {
        return false
      }
    },
    getState(index) {
      if (this.deviceData === '') {
        return '--'
      }
      if (this.deviceData.output.substring(index, index + 1) === '0') {
        return 'Close'
      } else if (this.deviceData.output.substring(index, index + 1) === '1') {
        return 'Open'
      } else {
        return '--'
      }
    },
    getLeft(index) {
      if (this.deviceData === '') {
        return ''
      }
      if (this.deviceData.auon.substring(index, index + 1) === '1') {
        return this.deviceData.lefttime[index] + ' Minutes'
      } else if (this.deviceData.auoff.substring(index, index + 1) === '1') {
        return this.deviceData.lefttime[index] + ' Minutes'
      } else {
        return ''
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
