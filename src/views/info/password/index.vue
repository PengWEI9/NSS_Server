<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="160px" :label-position="getClient()?'top':'left'" style="max-width:500px">
      <el-form-item label="Old Password" prop="oldpassword" required>
        <el-input v-model="form.oldpassword" type="password" />
      </el-form-item>
      <el-form-item label="New Password" prop="newpassword" required>
        <el-input v-model="form.newpassword" type="password" />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="againpassword" required>
        <el-input v-model="form.againpassword" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { _isMobile } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Password is too short'))
      } else {
        callback()
      }
    }

    const validatePasswordAgain = (rule, value, callback) => {
      if (value !== this.form.newpassword) {
        callback(new Error('Inconsistent passwords'))
      }
      callback()
    }

    return {
      form: {
        username: '',
        oldpassword: '',
        newpassword: '',
        againpassword: ''
      },
      formRules: {
        oldpassword: [
          { type: 'string', required: true, message: 'Password is empty', trigger: 'change' }
        ],
        newpassword: [
          { type: 'string', required: true, validator: validatePassword, trigger: 'change' }
        ],
        againpassword: [
          { type: 'string', required: true, validator: validatePasswordAgain, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.form.username = this.username
      this.$store.dispatch('user/updatePassword', this.form)
        .then(() => {
          this.$router.push(`/login`)
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
