<template>

</template>

<script>
  import { getList } from '@/api/product'
    export default {
        name: "productList",
      created(){
        getList({
          page:1,
        })
      }
    }
</script>

<style scoped>

</style>
