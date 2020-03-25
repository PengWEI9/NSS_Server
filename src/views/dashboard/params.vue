<template>
  <el-drawer
    title="Setting"
    :with-header="false"
    :visible.sync="paramDrawer"
    direction="rtl"
    :before-close="handleClose"
    size="500px"
    class="main"
  >
    <el-form label-width="160px" label-position="left" class="form">
      <el-form-item label="RelayStart">
        <el-input v-model="relaystart" placeholder="Relay start" />
        <el-button type="primary" style="width:100px;margin-top:20px">Update</el-button>
      </el-form-item>
      <div style="width:100%;height:1px;background:#ddd;margin:0px 0px 20px" />
      <el-form-item label="RelayInit">
        <el-input v-model="relayinit" placeholder="Relay init" />
        <el-button type="primary" style="width:100px;margin-top:20px">Update</el-button>
      </el-form-item>
      <div style="width:100%;height:1px;background:#ddd;margin:0px 0px 20px" />
      <el-form-item label="Delay(s)">
        <el-input v-model="relayinit" placeholder="Delay" />
        <el-button type="primary" style="width:100px;margin-top:20px">Update</el-button>
      </el-form-item>
      <div style="width:100%;height:1px;background:#ddd;margin:0px 0px 20px" />
      <el-form-item v-for="(item,index) in ptime" :key="index" :label="'Channel'+(index+1)+' pulse(min)'">
        <el-input v-model="ptime[index]" placeholder="Pulse time" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100px;margin-top:20px">Update</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  props: {
    paramDrawer: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      relaystart: '',
      relayinit: '',
      delay: 0,
      ptime: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  watch: {
    paramsDrawer: function(val, oldVal) {
      // if (val) {

      // } else {

      // }
    }
  },

  methods: {
    handleClose() {
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .form{
    padding: 20px;
  }
  .main{
    // width: 500px;
  }
</style>
