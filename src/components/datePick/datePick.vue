<template>
    <div class="datePiack">
      <el-date-picker
        v-model="value1"
        type="date"
        value-format="yyyy-MM-dd"
        @change="change"
        placeholder="选择日期">
      </el-date-picker>

    </div>
</template>

<script>
    export default {
        name: "datePick",
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
