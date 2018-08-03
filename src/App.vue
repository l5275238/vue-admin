<template>
  <div id="app">
    <router-view></router-view>
    <productModel v-model="show"></productModel>
  </div>
</template>

<script>
  import productModel from './views/components/productModel'
export default {
  name: 'App',
  data(){
    return{
      show:true
    }
  },
  components:{
    productModel
  }
}
</script>
