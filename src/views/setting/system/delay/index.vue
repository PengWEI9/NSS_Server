<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px" :label-position="getClient()?'top':'left'" style="max-width:500px">
      <el-form-item label="Select Device">
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
      <el-form-item label="Delay(s)" prop="delay">
        <el-input v-model="form.delay" style="flex:1;margin:0px 1px" placeholder="Low threshold value" type="number" />
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
    const validateParam = (rule, value, callback) => {
      const v = parseInt(value)
      if (isNaN(v)) {
        callback(new Error('invaid param'))
      } else {
        if (v < 0) {
          callback(new Error('invaid param'))
        } else {
          callback()
        }
      }
    }
    return {
      form: {
        delay: 0
      },
      rules: {
        delay: [
          { type: 'string', required: true, validator: validateParam, trigger: 'blur' }
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
      if (nv !== '-1') {
        this.$mqttClient.publish(nv + 'ctr', 'state=?')
        this.$mqttClient.subscribe(nv + 'state')
      } else {
        this.form.relayinit = ''
      }
    }
  },
  mounted() {
    this.$mqttClient.on('message', (topic, message) => {
      if (topic === this.currentSn + 'state') {
        // this.state = true
        try {
          const info = JSON.parse(message.toString())
          if (info.delay !== 'undefined') {
            this.form.delay = info.delay
          }
        } catch (e) {
          //
        }
      }
    })
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
          this.$mqttClient.publish(this.currentSn + 'ctr', 'delay=' + this.form.delay)
          this.$message({
            type: 'success',
            message: 'Setting has sent'
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
