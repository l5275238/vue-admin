<template>
  <el-form  label-width="80px" :model="form" :rules="rules" ref="ruleForm" >
    <el-form-item :label="item.name" :prop="item.key" :key="item.key" v-for="item in vform">
      <el-input v-model="form[item.key]" ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>

    </el-form-item>
  </el-form>
</template>

<script>
  import check from './check'
  import type from  '@/utils/type'
    export default {
        name: "vForm",
      props:{
        form:{
          type:Object,
          default:function () {
            return{}
          }
        },
        vform:{
          type:Array,
          default:function () {
            return []
          }
        }
      },
        data(){
return{

}
        },
      methods:{
        onSubmit:function () {
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              this.$emit('subMit',this.form)
            } else {
              this.$message.error('输入有误');
              return false;
            }
          });

        }
      },
      computed:{
        rules:function () {
          let obj={}
          for (let value of this.vform){

            if(type.isString(value.validator[0])){

               obj[value.key]=[
                 {
                   validator:check(value.validator,value.name),
                   trigger:value.trigger|'blur'
                 }
               ]
             }
             else {
               obj[value.key]=value.validator.map(item=>{

                 if(type.isFunc(item)){
                   var validator=item
                 }
                 if(type.isArray(item)){

                   var validator=check(item,value.name)
                 }
                 return {
                   validator:validator,
                   trigger:value.trigger|'blur'
                 }
               })
             }


          }

          return obj
        }
      }
    }
</script>

<style scoped>

</style>
