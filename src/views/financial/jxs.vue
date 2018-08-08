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
        <dataTable :obj="res" :columns="columns" :hasPage="hasPage"></dataTable>
      </div>
</template>

<script>
  import {getJxs,getJxsList} from '@/api/financial'
  import selectBtn from '@/components/selectBtn/selectBtn'
  import dataTable from '@/components/dataTable/dataTable'
    export default {
        name: "jxs",
      components:{
        selectBtn,
        dataTable
      },
      data(){
          return{
            res:{
                  list:[]
            },
            hasPage:false,
           jxsValue:"",
            options:[],
            time:{},
            columns:[
              {
            prop:"productName",
            isShow:true,
            label:"产品名"
          },{
            prop:"productNum",
            isShow:true,
            label:"数量"
          },
            ]
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
