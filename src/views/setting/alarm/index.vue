<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px" :label-position="getClient()?'top':'left'" style="max-width:500px">
      <el-form-item label="Select Device" required>
        <el-select v-model="currentSn" filterable placeholder="please select">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="Vol 1">
        <div style="display:flex">
          <el-input v-model="form.vol1[1]" style="flex:1;margin:0px 1px" placeholder="Low threshold value" type="number" />
          <el-input v-model="form.vol1[0]" style="flex:1;margin:0px 1px" placeholder="High threshold value" type="number" />
        </div>
      </el-form-item>
      <el-form-item label="Vol 2">
        <div style="display:flex">
          <el-input v-model="form.vol2[1]" style="flex:1;margin:0px 1px" placeholder="Low threshold value" type="number" />
          <el-input v-model="form.vol2[0]" style="flex:1;margin:0px 1px" placeholder="High threshold value" type="number" />
        </div>
      </el-form-item>
      <el-form-item label="Vol 3">
        <div style="display:flex">
          <el-input v-model="form.vol3[1]" style="flex:1;margin:0px 1px" placeholder="Low threshold value" type="number" />
          <el-input v-model="form.vol3[0]" style="flex:1;margin:0px 1px" placeholder="High threshold value" type="number" />
        </div>
      </el-form-item>
      <el-form-item label="Vol 4">
        <div style="display:flex">
          <el-input v-model="form.vol4[1]" style="flex:1;margin:0px 1px" placeholder="Low threshold value" type="number" />
          <el-input v-model="form.vol4[0]" style="flex:1;margin:0px 1px" placeholder="High threshold value" type="number" />
        </div>
      </el-form-item>
      <el-form-item label="Vol Alarm Push">
        <el-switch v-model="form.enable" />
      </el-form-item>
      <el-form-item label="Offline Push">
        <el-switch v-model="form.offline" />
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
        sn: '',
        vol1: [0, 0],
        vol2: [0, 0],
        vol3: [0, 0],
        vol4: [0, 0],
        offline: false,
        enable: false
      },
      rules: {
        name: [
          { type: 'string', required: true, message: 'Name is empty', trigger: 'change' }
        ]
      },
      options: [],
      deviceDatas: [],
      currentDevice: '',
      currentSn: ''
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  watch: {
    currentSn(nv, ov) {
      this.form = {
        user: '',
        sn: '',
        vol1: [0, 0],
        vol2: [0, 0],
        vol3: [0, 0],
        vol4: [0, 0],
        offline: false,
        enable: false
      }
      for (let i = 0; i < this.deviceDatas.length; i++) {
        if (this.deviceDatas[i].sn === nv) {
          this.form.sn = this.deviceDatas[i].sn
          const alarms = this.deviceDatas[i].alarm
          if (alarms !== '') {
            try {
              const alarmJson = JSON.parse(alarms)
              this.form.sn = this.deviceDatas[i].sn
              this.form.vol1 = alarmJson.vol1
              this.form.vol2 = alarmJson.vol2
              this.form.vol3 = alarmJson.vol3
              this.form.vol4 = alarmJson.vol4
              this.form.offline = alarmJson.offline
              this.form.enable = alarmJson.enable
            } catch (e) {
              //
            }
          }
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.user = this.username
          this.$store.dispatch('device/updateAlarm', this.form)
            .then(data => {
              this.$message({
                type: 'success',
                message: 'Update success'
              })
              this.getDevices()
            })
        }
      })
    },
    getDevices() {
      this.options = []
      this.$store.dispatch('device/getDevices').then(data => {
        this.deviceDatas = data
        const all = {}
        all.label = 'Multiple'
        all.options = [
          {
            label: 'All',
            value: '-1'
          }
        ]
        const single = {}
        single.label = 'Single'
        const temp = []
        for (let i = 0; i < data.length; i++) {
          const obj = {}
          obj.value = data[i].sn
          obj.label = data[i].name
          temp.push(obj)
        }
        single.options = temp
        this.options.push(all)
        this.options.push(single)
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
