<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px" :label-position="getClient()?'top':'left'" :style="{'max-width':step ==0 ?'500px':'100%'}">
      <el-form-item v-show="step==0" label="Device SN" prop="sn">
        <el-input v-model="form.sn" placeholder="Device SN" />
      </el-form-item>
      <el-form-item v-show="step==0" label="Device Name" prop="name">
        <el-input v-model="form.name" placeholder="Device Name" />
      </el-form-item>
      <el-form-item v-show="step==0" label="Device Type" prop="version" required>
        <el-select v-model="form.version" placeholder="Select type">
          <el-option label="Camera" value="Camera" />
          <el-option label="Flog" value="Flog" />
        </el-select>
      </el-form-item>
      <el-form-item v-show="step==0" label="Device Weight" prop="weight">
        <el-input v-model="form.weight" placeholder="Device Weight" type="number" />
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 1">
        <div style="display:flex">
          <el-input v-model="form.relays[0].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[0].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[0].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[0].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[0].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 2">
        <div style="display:flex">
          <el-input v-model="form.relays[1].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[1].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[1].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[1].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[1].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 3">
        <div style="display:flex">
          <el-input v-model="form.relays[2].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[2].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[2].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[2].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[2].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 4">
        <div style="display:flex">
          <el-input v-model="form.relays[3].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[3].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[3].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[3].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[3].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 5">
        <div style="display:flex">
          <el-input v-model="form.relays[4].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[4].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[4].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[4].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[4].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 6">
        <div style="display:flex">
          <el-input v-model="form.relays[5].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[5].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[5].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[5].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[5].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 7">
        <div style="display:flex">
          <el-input v-model="form.relays[6].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[6].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[6].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[6].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[6].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>
      <el-form-item v-show="step==1" label="Channel 8">
        <div style="display:flex">
          <el-input v-model="form.relays[7].name" style="flex:2;margin:0px 1px" placeholder="Channel Name" />
          <el-input v-model="form.relays[7].on" style="flex:1;margin:0px 1px" placeholder="Channel ON Name" />
          <el-input v-model="form.relays[7].off" style="flex:1;margin:0px 1px" placeholder="Channel OFF Name" />
          <el-input v-model="form.relays[7].autoon" style="flex:1;margin:0px 1px" placeholder="Channel AutoON Name" />
          <el-input v-model="form.relays[7].autooff" style="flex:1;margin:0px 1px" placeholder="Channel AutoOFF Name" />
        </div>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="goback()">Cancel</el-button>
      <el-button v-show="step == 0" type="info" @click="next('form')">Next</el-button>
      <el-button v-show="step == 1" type="info" @click="step = 0">Back</el-button>
      <el-button v-show="step == 1" type="primary" @click="deal()">OK</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { _isMobile } from '@/utils/index'
export default {
  data() {
    return {
      step: 0,
      form: {
        user: '',
        name: '',
        sn: '',
        version: '',
        weight: 0,
        relays: [
          { name: 'S&F+', on: 'ON', off: 'OFF', autoon: 'Auto OFF', autooff: 'Auto ON' },
          { name: 'Camera', on: 'OFF', off: 'ON', autoon: 'Auto ON', autooff: 'Auto OFF' },
          { name: 'Siren-Control', on: 'OFF', off: 'ON', autoon: 'Auto ON', autooff: 'Auto OFF' },
          { name: 'Flood Light-Control', on: 'OFF', off: 'ON', autoon: 'Auto ON', autooff: 'Auto OFF' },
          { name: 'Speaker', on: 'OFF', off: 'ON', autoon: 'Auto ON', autooff: 'Auto OFF' },
          { name: 'Microphine', on: 'OFF', off: 'ON', autoon: 'Auto ON', autooff: 'Auto OFF' },
          { name: 'Solar', on: 'OFF', off: 'ON', autoon: 'Auto ON', autooff: 'Auto OFF' },
          { name: 'default', on: 'OFF', off: 'ON', autoon: 'Auto ON', autooff: 'Auto OFF' }
        ]
      },
      rules: {
        name: [
          { type: 'string', required: true, message: 'Name is empty', trigger: 'change' }
        ],
        sn: [
          { type: 'string', required: true, message: 'SN is empty', trigger: 'change' }
        ],
        version: [
          { type: 'string', required: true, message: 'Type is empty', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.step = 1
        }
      })
    },
    deal(formName) {
      const that = this
      this.form.user = this.username
      this.$store.dispatch('device/addDevice', this.form)
        .then(function(data) {
          that.$router.push('/device/manager')
        })
    },
    goback() {
      this.$router.push('/device/manager')
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
</style>
