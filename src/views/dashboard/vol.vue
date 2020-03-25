<template>
  <div class="main">
    <div>
      <label class="value">{{ value/1000 }}</label>
      <label class="unit">v</label>
    </div>
    <label class="name">{{ title }}</label>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Vol'
    },
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
//   box-shadow: 1px 1px 5px #ddd;
  background: whitesmoke;
  margin: 4px;
  width:100px;
}
.value{
  font-size: 14px;
}
.unit{
  font-size: 14px;
  color: gray;
  padding-left: 10px;
}
.name{
  padding-top: 10px;
  font-size: 12px;
  color: #555;
}
</style>
