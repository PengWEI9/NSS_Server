<template>
  <div class="main">
    <el-button type="primary" @click="addDevice">ADD DEVICE</el-button>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column
        label="Name"
        prop="name"
      />
      <el-table-column
        label="Sn"
        prop="sn"
      />
      <el-table-column
        label="Weight"
        prop="weight"
      />
      <!-- <el-table-column
        label="Relays"
        prop="relays"
      /> -->
      <el-table-column
        align="right"
        fixed="right"
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
      this.$store.dispatch('device/getDevices').then(data => {
        this.tableData = data
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$confirm('Delete this device?')
        .then(_ => {
          this.$store.dispatch('device/deleteDevices', {
            sn: row.sn
          })
            .then(data => {
              this.$message({
                type: 'success',
                message: 'Delete success'
              })
              this.getDevices()
            // location.reload()
            })
        })
        .catch(_ => {})
    },
    addDevice() {
      this.$router.push('/device/add')
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
