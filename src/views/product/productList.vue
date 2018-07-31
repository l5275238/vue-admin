<template>
  <div>
    <dataTable></dataTable>
  </div>

</template>

<script>
  import minx from '@/minxs/page'
  import dataTable from '@/components/dataTable/dataTable'
  import {getList} from '@/api/product.js'
    export default {
        name: "productList",
      mixins:[minx],
      components:{
        dataTable
      },
      created(){
        getList(this.res.page).then(res=>{

        })
      }
    }
</script>

<style scoped>

</style>
