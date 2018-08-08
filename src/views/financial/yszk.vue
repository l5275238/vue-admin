<template>
<div>
<selectBtn @change="change"></selectBtn>
 <el-select v-model="jxsValue" placeholder="选择门店" @change="getJxsList">
        <el-option
          v-for="item in options"
          :key="item.depotId"
          :label="item.depotName"
          :value="item.depotId">
        </el-option>
      </el-select>
<div>
  <data-table :obj="res" :columns="columns" :hasPage="hasPage"></data-table>
</div>
</div>
</template>

<script>
import {getMenDian,getYszk} from '@/api/financial'
  import selectBtn from '@/components/selectBtn/selectBtn'
  import dataTable from '@/components/dataTable/dataTable'
  
  import minx from '@/minxs/page'
    export default {
        name: "yszk",
      components:{
        selectBtn,
        dataTable
      },
      data(){
        return {
          res:{
              list:[]
          },
          columns:[
            {
            prop:"customer",
            isShow:true,
            label:"客户"
          },
          {
            prop:"totalMoney",
            isShow:true,
            label:"总价"
          },
          {
            prop:"earnestMoney",
            isShow:true,
            label:"定金"
          },
          {
            prop:"balanceMoney",
            isShow:true,
            label:"尾款"
          },
          ],
          hasPage:false,
          time:{},
          options:[],
          jxsValue:"",
        }
      },
      methods:{
        change:function(item){
            this.time=item;
            
        this.getJxsList()
        },
        getJxsList:function () {
        this.res.isLoading=true
        getYszk(Object.assign({},this.time,{
          depotId:this.jxsValue,
          depotType:1,

        })).then(res=>{
          this.res.isLoading=false

          this.res.list=res
        })
      }
      },
      created(){
        getMenDian().then(res=>{
            this.options=res;
        })
      }
    }
</script>

<style scoped>

</style>
