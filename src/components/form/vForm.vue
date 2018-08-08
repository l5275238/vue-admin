<template>
  <el-form  label-width="80px" :model="form" :rules="rules" ref="ruleForm" >
    <el-form-item :label="item.name" :prop="item.key" :key="item.key" v-for="item in vform" v-if="!item.isHidden||!item.isHidden()">
      <el-input v-model="form[item.key]" v-if="!item.render"  :disabled="item.disabled" @change="item.change||function() {

      }"></el-input>
      <render v-else :render="item.render" :params="form"></render>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>

    </el-form-item>
  </el-form>
</template>

<script>
  import check from './check'
  import type from  '@/utils/type'
  import render from './render'
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
      components:{
        render
      },
      watch:{
        form:function () {
          console.log(this.form);
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
                     if(!value.validator){
                       break
                     }
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
                   trigger:'change'
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
