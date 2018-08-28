<template>
  <div>
    <dataTable :obj="res"  :add="add" :columns="columns"></dataTable>

  </div>
</template>

<script>
  import {getOutList} from '@/api/wareHouse.js'
  import minx from '@/minxs/page'
  import dataTable from '@/components/dataTable/dataTable'
  export default {
    name: "put",
    mixins:[minx],
    data(){
      return{
        add:{
          title:"新增入库单",
          url:"/wareHouse/editPut"

        },
        columns:[
          {prop:"createDate",
            label:"创建时间",
            isShow:true
          },
          {prop:"totalMoney",
            label:"总价",
            isShow:true
          },
          {prop:"personName",
            label:"人员",
            isShow:true
          },
          {prop:"auditStatus",
            label:"订单状态",
            isShow:true,
            render:(h,params)=>{
              var title;
              if(params.row.auditStatus){
                title= "审核"
              }
              else {
                title= "未审核"
              }
              return h('div',title)
            }
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
        await getOutList(Object.assign({},this.res.page,{
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
