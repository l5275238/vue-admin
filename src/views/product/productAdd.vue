<template>
  <div class="add">
    <vForm :form="form" :vform="vform"></vForm>

  </div>

</template>

<script>
  import minx from '@/minxs/page'
  import dataTable from '@/components/dataTable/dataTable'
  import vForm from '@/components/form/vForm'
  import {getList} from '@/api/product.js'
  import check from '@/utils/validata'
    export default {
        name: "productList",
      mixins:[minx],
      components:{
        dataTable,
        vForm
      },
      data(){
          return {
            form:{},
            vform:[    {
              key:"productName",
              validator: ['isNotEmpty'],
              trigger:'blur',
              name:"产品名称"
            },
              {
                key:"productType",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"产品类型"
              },
              {
                key:"productSize",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"产品尺寸"
              },
              {
                key:"productWidth",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"长"
              },
              {
                key:"productHeight",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"高"
              },
              {
                key:"productUnitPrice",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"成本"
              },
              {
                key:"productUnitSalePrice",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"售价"
              },
              {
                key:"productUnit",
                validator: ['isNotEmpty','isNumber'],
                trigger:'blur',
                name:"单位"
              },


            ],


          }
      },
      created(){


      },
      methods:{
        onSubmit:function(){

        },
        getList:async function () {
          this.res.isLoading=true
          await getList(this.res.page).then(res=>{
            this.res.list=res.list;
            this.res.page.totalCount=res.totalCount;
          })
          this.res.isLoading=false
        }
      }
    }
</script>

<style scoped>

</style>
