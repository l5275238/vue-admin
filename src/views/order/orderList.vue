<template>
  <div>
    <dataTable :obj="res" :add="add" :columns="columns"></dataTable>
  </div>

</template>
<script>
  import dataTable from '@/components/dataTable/dataTable'
  import selectBtn from '@/components/selectBtn/selectBtn'
  import minx from '@/minxs/page'
  import {getList,deletOrder,finished,audito} from '@/api/order.js'
export default {
name:"orderList",
  mixins:[minx],
  components:{
    dataTable
  },
  data(){
   return{
     add:{
              title:"新增订单",
              url:"/order/addOrder"
            },
     columns:[
       {
         prop:"orderType",
         isShow:true,
         label:"订单类型",
         render:(h,params)=>{
           var title;
           if(params.row.orderType==1){
             title= "门店"
           }
           else {
             title= "渠道"
           }
           return h('div',title)
         }
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
       {
         prop:"edit",
         isShow:true,
         label:"操作",
         render:(h,params)=>{
           return h(
             'div',[h('el-button',{

               props:{
                 type:"primary"
               },
               on:{
                 click:()=>{
                  this.$router.push({
                    path:"/order/addOrder",
                    query:{
                      id:params.row.orderId
                    }
                  })
                 }
               }
             },"编辑"),
             h('el-button',{

               props:{
                 type:"warning"
               },
               on:{
                 click:()=>{
                   audito(params.row.orderId).then(res=>{
                     this.getList()
                   })
                 }
               }
             },"审核"),
             h('el-button',{

               props:{
                 type:"warning"
               },
               on:{
                 click:()=>{
                   finished(params.row.orderId).then(res=>{
                     this.getList()
                   })
                 }
               }
             },"完成"),
             h('el-button',{

               props:{
                 type:"danger"
               },
               on:{
                 click:()=>{
                   deletOrder(params.row.orderId).then(res=>{
                     this.getList(Ø)
                   })
                 }
               }
             },"删除")]
           )
         }
       }
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
