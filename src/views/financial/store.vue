<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="dowload" >导出</el-button>
      <selectBtn @change="change"></selectBtn>
      <el-select v-model="jxsValue" placeholder="选择门店" @change="getJxsList">
        <el-option
          v-for="item in options"
          :key="item.depotId"
          :label="item.depotName"
          :value="item.depotId">
        </el-option>
      </el-select>
    </div>
    <dataTable :obj="res" :columns="columns" :hasPage="hasPage"></dataTable>
  </div>
</template>

<script>
  import {getPurchase,getJxsList} from '@/api/financial'
  import dataTable from '@/components/dataTable/dataTable'
  import selectBtn from '@/components/selectBtn/selectBtn'
  import minx from '@/minxs/page'
  export default {
    name: "jxs",
    mixins:[minx],
    components:{
      selectBtn,
      dataTable
    },
    data(){
      return{
        jxsValue:"",
        options:[],
        time:{},
        hasPage:false,
        columns:[
          {
            prop:"productName",
            isShow:true,
            label:"商品名称"
          },
          {
            prop:"depotNum",
            isShow:true,
            label:"商品数量"
          },
          {
            prop:"productAllSalePrice",
            isShow:true,
            label:"总零售价"
          },
          {
            prop:"productAllPrice",
            isShow:true,
            label:"总成本价"
          },
        ]
      }
    },
    created(){
      getPurchase().then(res=>{
        this.options=res
      })
    },
    dowload:function(){
      downLoad(Object.assign({},this.time,{
        shopId:this.jxsValue,
        orderType:3,
        depotType:1
      })).then(res=>{
        window.location="https://mrking.wang/"+res
      })
    },
    methods:{
      change:function (item) {
        this.time=item;
        this.getJxsList()
      },
      getJxsList:function () {
        this.res.isLoading=true
        getJxsList(Object.assign({},this.time,{
          depotId:this.jxsValue,
          depotType:1,

        })).then(res=>{
          this.res.isLoading=false

          this.res.list=res
        })
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
