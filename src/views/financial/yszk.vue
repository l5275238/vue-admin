<template>
<div>
<selectBtn></selectBtn>
</div>
</template>

<script>
import {getMenDian} from '@/api/financial'
  import selectBtn from '@/components/selectBtn/selectBtn'
    export default {
        name: "yszk",
      components:{
        selectBtn
      },
      created(){
        getMenDian()
      }
    }
</script>

<style scoped>

</style>
