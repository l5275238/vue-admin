<template>
  <div>
    <el-radio-group  v-model="evaluate" @change="change">
      <el-radio-button label="0">免考评</el-radio-button>
      <el-radio-button label="1">参加考评</el-radio-button>

    </el-radio-group>

  </div>
</template>

<script>
    export default {
      name: "radioBtn",
      data(){
        return{
          evaluate:"1"
        }
      },
      props:{
        isEvaluate:{
            type:String,
            default(){
              return "1"
            }
          }
      },
      watch:{
        isEvaluate(){

          this.evaluate=this.isEvaluate
        }
      },
      created(){
        this.evaluate=this.isEvaluate
        // console.log(this.isEvaluate);
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
