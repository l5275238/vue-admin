<template>

  <div>
    <el-dialog
      title="分配权限"
      :visible.sync="value"
      width="50%"
      :before-close="handleClose">
      <el-radio-group v-model="form.roleId">
        <el-radio :label="item.id" v-for="item in roleList" :key="item.id">{{item.roleName}}</el-radio>

      </el-radio-group>

      <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="onsubmit">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
  import {getRoleList,addUserRole} from '@/api/people.js'
    export default {
        name: "fenPeiModel",
        props:{
          value:Boolean,
          default:function () {
            return {}
          },
          form:{
            value: Object,
            default:function () {
              return {}
            }
          }
        },
      data(){

          return{
            roleList:[],
            handleClose: (item)=> {

        this.$emit('input',false)

            }
          }
      },
      watch:{
        form:function () {
          console.log(this.form);
        }
      },
      created(){
          this.getRoleList()
      },
      methods:{
        getRoleList(){
          getRoleList().then(res=>{
            this.roleList=res;
          })
        },
        onsubmit(){
          addUserRole(this.form).then(res=>{
              this.$emit('submit');
              this.$emit('input',false)
          })
        }
      }


    }
</script>

<style scoped>

</style>
