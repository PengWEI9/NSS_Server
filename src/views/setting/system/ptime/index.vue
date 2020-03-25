<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="160px"
      :label-position="getClient() ? 'top' : 'left'"
      style="max-width:500px"
    >
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
      <el-form-item label="Pulse 1(m)" prop="ptime0">
        <el-input
          v-model="form.ptime0"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Pulse 2(m)" prop="ptime1">
        <el-input
          v-model="form.ptime1"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Pulse 3(m)" prop="ptime2">
        <el-input
          v-model="form.ptime2"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Pulse 4(m)" prop="ptime3">
        <el-input
          v-model="form.ptime3"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Pulse 5(m)" prop="ptime4">
        <el-input
          v-model="form.ptime4"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Pulse 6(m)" prop="ptime5">
        <el-input
          v-model="form.ptime5"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Pulse 7(m)" prop="ptime6">
        <el-input
          v-model="form.ptime6"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Pulse 8(m)" prop="ptime7">
        <el-input
          v-model="form.ptime7"
          placeholder="pulse time"
          type="number"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100px;margin-top:20px"
          @click="updateDevice('form')"
        >Update</el-button>
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
        ptime0: 0,
        ptime1: 0,
        ptime2: 0,
        ptime3: 0,
        ptime4: 0,
        ptime5: 0,
        ptime6: 0,
        ptime7: 0
      },
      rules: {
        ptime0: [
          {
            type: 'string',
            required: true,
            validator: validateParam,
            trigger: 'blur'
          }
        ],
        ptime1: [
          { type: 'string', required: true, validator: validateParam, trigger: 'blur' }
        ],
        ptime2: [
          { type: 'string', required: true, validator: validateParam, trigger: 'blur' }
        ],
        ptime3: [
          { type: 'string', required: true, validator: validateParam, trigger: 'blur' }
        ],
        ptime4: [
          { type: 'string', required: true, validator: validateParam, trigger: 'blur' }
        ],
        ptime5: [
          { type: 'string', required: true, validator: validateParam, trigger: 'blur' }
        ],
        ptime6: [
          { type: 'string', required: true, validator: validateParam, trigger: 'blur' }
        ],
        ptime7: [
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
    ...mapGetters(['username'])
  },
  watch: {
    currentSn(nv, ov) {
      this.form = {
        ptime0: 0,
        ptime1: 0,
        ptime2: 0,
        ptime3: 0,
        ptime4: 0,
        ptime5: 0,
        ptime6: 0,
        ptime7: 0
      }
      if (nv !== '-1') {
        this.$mqttClient.publish(nv + 'ctr', 'state=?')
        this.$mqttClient.subscribe(nv + 'state')
      }
    }
  },
  mounted() {
    this.$mqttClient.on('message', (topic, message) => {
      if (topic === this.currentSn + 'state') {
        // this.state = true
        try {
          const info = JSON.parse(message.toString())
          if (info.ptime !== 'undefined') {
            this.form.ptime0 = info.ptime[0]
            this.form.ptime1 = info.ptime[1]
            this.form.ptime2 = info.ptime[2]
            this.form.ptime3 = info.ptime[3]
            this.form.ptime4 = info.ptime[4]
            this.form.ptime5 = info.ptime[5]
            this.form.ptime6 = info.ptime[6]
            this.form.ptime7 = info.ptime[7]
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          //
          // “cmd”:"relay","ptime":[1,2,3,4,5,6,7,8]｝
          const cmd = '{"cmd":"relay","ptime":[' + this.form.ptime0 + ',' + this.form.ptime1 + ',' + this.form.ptime2 + ',' + this.form.ptime3 + ',' + this.form.ptime4 + ',' + this.form.ptime5 + ',' + this.form.ptime6 + ',' + this.form.ptime7 + ']}'
          this.$mqttClient.publish(this.currentSn + 'ctr', cmd)
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
.main {
  padding: 10px;
}
.select {
  margin: 10px 0px;
}
</style>
