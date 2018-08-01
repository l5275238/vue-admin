<template>
    <dataTable :obj="res" :columns="columns"></dataTable>
</template>

<script>
  import {getWareHoseList} from '@/api/wareHouse.js'
  import minx from '@/minxs/page'
  import dataTable from '@/components/dataTable/dataTable'
    export default {
        name: "wareHouse",
      mixins:[minx],
      components:{
        dataTable
      },
      data(){
          return{
            columns:[
              {prop:"depotName",
                label:"仓库名字",
                isShow:true
              },
              {},
              {},
            ]
          }
      },
      created(){
        this.getWareHoseList()
      },
      methods:{
        getWareHoseList:async function () {
          this.res.isLoading=true
         await getWareHoseList(this.res.page).then(res=>{
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
