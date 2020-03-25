<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px" :label-position="getClient()?'top':'left'" style="max-width:500px">
      <el-form-item label="Username" prop="username" required>
        <el-input v-model="form.username" placeholder="username" :disabled="!isAdd" />
      </el-form-item>
      <el-form-item label="Password" prop="password" required>
        <el-input v-model="form.password" placeholder="password" />
      </el-form-item>
      <el-form-item label="Nickname">
        <el-input v-model="form.nickname" placeholder="nickname" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" placeholder="email" />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="goback()">Cancel</el-button>
      <el-button type="primary" @click="deal()">OK</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { _isMobile } from '@/utils/index'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        nickname: '',
        email: ''
      },
      rules: {
        username: [
          { type: 'string', required: true, message: 'username is empty', trigger: 'change' }
        ],
        password: [
          { type: 'string', required: true, message: 'password is empty', trigger: 'change' }
        ]
      },
      isAdd: true
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  mounted() {
    if (typeof (this.$route.query.username) !== 'undefined') {
      this.isAdd = false
      this.$store.dispatch('user/getUserInfo', this.$route.query.username)
        .then(data => {
          this.form.username = data.username
          this.form.password = data.password
          this.form.nickname = data.nickname
          this.form.email = data.email
        })
    }
  },
  methods: {
    deal(formName) {
      const that = this
      if (this.isAdd) {
        this.$store.dispatch('user/addUser', this.form)
          .then(function(data) {
            that.$router.push('/user/manager')
          })
      } else {
        this.$store.dispatch('user/updateAllInfo', this.form)
          .then(function(data) {
            that.$router.push('/user/manager')
          })
      }
    },
    goback() {
      this.$router.push('/user/manager')
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
