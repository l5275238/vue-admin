<template>
      <div>
        <div class="top">
          <selectBtn @change="change"></selectBtn>
          <el-select v-model="jxsValue" placeholder="请选择经销商">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

      </div>
</template>

<script>
  import {getJxs,getJxsList} from '@/api/financial'
  import selectBtn from '@/components/selectBtn/selectBtn'
    export default {
        name: "jxs",
      components:{
        selectBtn
      },
      data(){
          return{
           jxsValue:"",
            options:[],
            time:{}
          }
      },
      created(){
      getJxs().then(res=>{
       this.options=res
      })
      },
      methods:{
        change:function (item) {
            this.time=item;
            this.getList()
        },
        getList:function () {
          getJxsList(Object.assign({},this.time,{
            shopId:this.jxsValue,
            orderType:3,
          })).then()
        }
      }

    }

</script>

<style scoped lang="less">
  .top{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    width: 100%;
  }

</style>
