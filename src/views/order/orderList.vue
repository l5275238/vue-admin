<template>
  <div>
    <dataTable :obj="res" :columns="columns"></dataTable>
  </div>

</template>
<script>
  import dataTable from '@/components/dataTable/dataTable'
  import selectBtn from '@/components/selectBtn/selectBtn'
  import minx from '@/minxs/page'
  import {getList} from '@/api/order.js'
export default {
name:"orderList",
  mixins:[minx],
  components:{
    dataTable
  },
  data(){
   return{
     columns:[
       {
         prop:"orderType",
         isShow:true,
         label:"订单类型"
       },
       {
         prop:"totalMoney",
         isShow:true,
         label:"实收"
       },
       {
         prop:"allMoney",
         isShow:true,
         label:"总价"
       },
     ]
   }
  },
  created(){
  this.getList();



  },
  methods:{
    getList:async function () {
      this.res.isLoading=true
      try{
        await getList(this.res.page).then(res=>{
            this.res.list=res.list;
            this.res.page.totalCount=res.totalCount;
          }
        )
      }
      catch (e) {
        this.res.isLoading=false
      }


      this.res.isLoading=false
    }
  }


}
</script>
