<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px" :label-position="getClient()?'top':'left'">
      <el-form-item label="Select Device" required>
        <el-select v-model="currentSn" filterable placeholder="please select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Device SN">
        <el-input v-model="form.sn" placeholder="Device SN" disabled />
      </el-form-item>
      <el-form-item label="Device Name" prop="name">
        <el-input v-model="form.name" placeholder="Device Name" />
      </el-form-item>
      <el-form-item label="Device Type" prop="version" required>
        <el-select v-model="form.version" placeholder="Select type">
          <el-option label="Camera" value="Camera" />
          <el-option label="Flog" value="Flog" />
        </el-select>
      </el-form-item>
      <el-form-item label="Device Weight">
        <el-input v-model="form.weight" placeholder="Device Weight" type="number" />
      </el-form-item>
      <el-form-item label="Channel 1">
        <div style="display:flex">
          <el-input v-model="form.relays[0].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[0].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[0].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[0].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[0].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item label="Channel 2">
        <div style="display:flex">
          <el-input v-model="form.relays[1].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[1].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[1].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[2].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[2].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item label="Channel 3">
        <div style="display:flex">
          <el-input v-model="form.relays[2].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[2].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[2].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[3].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[3].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item label="Channel 4">
        <div style="display:flex">
          <el-input v-model="form.relays[3].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[3].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[3].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[0].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[0].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item label="Channel 5">
        <div style="display:flex">
          <el-input v-model="form.relays[4].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[4].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[4].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[4].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[4].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item label="Channel 6">
        <div style="display:flex">
          <el-input v-model="form.relays[5].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[5].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[5].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[5].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[5].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item label="Channel 7">
        <div style="display:flex">
          <el-input v-model="form.relays[6].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[6].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[6].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[6].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[6].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item label="Channel 8">
        <div style="display:flex">
          <el-input v-model="form.relays[7].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[7].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[7].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[7].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[7].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100px;margin-top:20px" @click="updateDevice('form')">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { _isMobile } from '@/utils/index'
export default {
  data() {
    return {
      form: {
        user: '',
        name: '',
        sn: '',
        version: '',
        weight: 0,
        relays: [{ name: 'S&F+', on: 'ON', off: 'OFF', autoon: 'Auto ON', autooff: 'Auto OFF' }, { name: 'Camera', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Siren-Control', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Flood Light-Control', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Speaker', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Microphine', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'Solar', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }, { name: 'default', on: 'OFF', off: 'ON', autoon: 'Auto OFF', autooff: 'Auto ON' }]
      },
      rules: {
        name: [
          { type: 'string', required: true, message: 'Name is empty', trigger: 'change' }
        ]
      },
      currentSn: '',
      options: [],
      deviceDatas: [],
      currentDevice: ''
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  watch: {
    currentSn(nv, ov) {
      for (let i = 0; i < this.deviceDatas.length; i++) {
        if (this.deviceDatas[i].sn === nv) {
          this.form.name = this.deviceDatas[i].name
          this.form.sn = this.deviceDatas[i].sn
          this.form.weight = this.deviceDatas[i].weight
          this.form.version = this.deviceDatas[i].version
          this.form.relays = JSON.parse(this.deviceDatas[i].relays)
          break
        }
      }
    }
  },
  mounted() {
    this.getDevices()
  },
  methods: {
    updateDevice(formName) {
      if (this.currentSn === '') {
        this.$message({
          type: 'error',
          message: 'Please select device'
        })
        return
      }
      this.form.user = this.usernname
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('device/updateDevice', this.form)
            .then(data => {
              this.$message({
                type: 'success',
                message: 'Update success'
              })
            })
        }
      })
    },
    getDevices() {
      this.options = []
      this.$store.dispatch('device/getDevices').then(data => {
        this.deviceDatas = data
        for (let i = 0; i < data.length; i++) {
          const obj = {}
          obj.value = data[i].sn
          obj.label = data[i].name
          this.options.push(obj)
        }
      })
    },
    getClient() {
      return _isMobile()
    }
  }
}
</script>

<style lang="scss" scoped>
    .main{
        padding: 10px;
    }
    .select{
        margin: 10px 0px;
    }
</style>
