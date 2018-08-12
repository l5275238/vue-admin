<template>
  <div>
    <dataTable :obj="res" :add="add"  :columns="columns"></dataTable>

  </div>
</template>

<script>
  import {getPurchase} from '@/api/wareHouse.js'

  import minx from '@/minxs/page'
  import dataTable from '@/components/dataTable/dataTable'
  export default {
    name: "put",
    mixins:[minx],
    data(){
      return{
        add:{
          title:"新增采购单",
          url:"/wareHouse/addPurchase"
        },
        columns:[
          {prop:"number",
            label:"订单号",
            isShow:true
          },
          {prop:"totalMoney",
            label:"总价",
            isShow:true
          },
          {prop:"auditStatus",
            label:"订单状态",
            isShow:true
          },
        ]
      }

    },
    components:{
      dataTable
    },
    created(){
      this.getList()
    },
    methods:{
      async getList(){
        this.res.isLoading=true
        await getPurchase(Object.assign({},this.res.page,{
          depotType:2
        })).then(res=>{
          this.res.list=res.list
          this.res.page.totalCount=res.totalCount;
        })
        this.res.isLoading=false
      }
    }
  }
</script>

<style scoped>

</style>
