<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="160px" :label-position="getClient()?'top':'left'" style="max-width:500px">
      <el-form-item label="Account">
        <el-input v-model="form.username" readonly />
      </el-form-item>
      <el-form-item label="Nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { _isMobile } from '@/utils/index'
export default {
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        email: '',
        type: ''
      }
    }
  },
  mounted() {
    this.$store.dispatch('user/getInfo')
      .then(data => {
        this.form = data
      })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('user/updateInfo', this.form)
        .then(data => {
          this.$message({
            type: 'success',
            message: 'Updated success'
          })
        })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getClient() {
      return _isMobile()
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
