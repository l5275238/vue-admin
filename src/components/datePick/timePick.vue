<template>
    <div>
      <el-time-picker
        v-model="value1"
        @change="change"
        value-format="HH:mm"
        :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
        placeholder="选择时间">
      </el-time-picker>
    </div>
</template>

<script>
  export default {
    name: "timePick",
    data(){
      return{
        value1:""
      }
    },
    props:{
      value:{
        default:function () {
          return ""
        }
      },
    },
    created(){
      this.value1=this.value
    },
    methods:{
      change:function (item) {

        this.$emit('input',item)
        this.$emit('change',item)
      }
    }
  }
</script>

<style scoped>

</style>
