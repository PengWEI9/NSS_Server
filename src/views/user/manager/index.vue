<template>
  <div class="main">
    <el-button type="primary" @click="addDevice">ADD USER</el-button>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column
        label="Username"
        prop="username"
      />
      <el-table-column
        label="Password"
        prop="password"
      />
      <el-table-column
        label="Nickname"
        prop="nickname"
      />
      <el-table-column
        label="Email"
        prop="email"
      />
      <el-table-column
        align="right"
        fixed="right"
        width="160px"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editDevice(scope.$index, scope.row.username)"
          >Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: ''
    }
  },
  mounted() {
    this.getDevices()
  },
  methods: {
    getDevices() {
      this.$store.dispatch('user/getUsers').then(data => {
        this.tableData = data
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$confirm('Delete this user?')
        .then(_ => {
          this.$store.dispatch('user/delUsers', {
            username: row.username
          })
            .then(data => {
              this.tableData = data
              this.$message({
                type: 'success',
                message: 'Delete success'
              })
            })
        })
        .catch(_ => {})
    },
    addDevice() {
      this.$router.push('/user/add')
    },
    editDevice(index, row) {
      this.$router.push('/user/add?username=' + row)
    }
  }
}
</script>
<style scoped>
  .main{
    padding: 20px;
  }
</style>
<style>
.el-message-box{
  width: 90%;
  max-width: 400px;
}
</style>
