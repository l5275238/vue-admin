<template>
    <div >
      <el-select :value="value" placeholder="请选择" @change="change">
        <el-option
          v-for="item in options"
          :key="item[keyValue]"
          :label="item[label]"
          :value="item[keyValue]">
        </el-option>
      </el-select>
    </div>
</template>

<script>
    export default {
        name: "vSelect",
      props:{
          value:null,
         options:null,
          label:{
            type:String,
            default:function () {
              return "label"
            }
          },
          keyValue:{
            type:String,
            default:function () {
              return 'value'
            }
          }
      },
      created(){
        console.log(this.options);
      },
      methods:{
        change:function (item) {
          this.$emit('change',item)
        }

      }
    }
</script>

<style scoped>

</style>
