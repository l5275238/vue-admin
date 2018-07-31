<template>
  <div style="width: 500px">
    <el-form  label-width="80px" :model="formLabelAlign">
    <el-form-item label="产品名称">
      <el-input v-model="formLabelAlign.productName"></el-input>
    </el-form-item>
    <el-form-item label="产品类型">
      <el-input v-model="formLabelAlign.productType"></el-input>
    </el-form-item>
    <el-form-item label="尺寸">
      <el-input v-model="formLabelAlign.productSize"></el-input>
    </el-form-item>
      <el-form-item label="长">
        <el-input v-model="formLabelAlign.productWidth"></el-input>
      </el-form-item>
      <el-form-item label="宽">
        <el-input v-model="formLabelAlign.productHeight"></el-input>
      </el-form-item>
      <el-form-item label="成本">
        <el-input v-model="formLabelAlign.productUnitPrice"></el-input>
      </el-form-item>
      <el-form-item label="售价">
        <el-input v-model="formLabelAlign.productUnitSalePrice"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="formLabelAlign.productUnit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>

      </el-form-item>
    </el-form>

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
      data(){
          return {
            formLabelAlign:{},
            add:{
              title:"新增产品",
              url:"/product/add"
            },
            columns:[
              {
                prop:"productName",
                isShow:true,
                label:"商品名称"
              },
              {
                prop:"productUnitPrice",
                isShow:true,
                label:"成本价"
              },
              {
                prop:"productUnitSalePrice",
                isShow:true,
                label:"出售价"
              },
              {
                prop:"productType",
                isShow:true,
                label:"类型"
              },
              {
                prop:"productWidth",
                isShow:true,
                label:"长"
              },
              {
                prop:"productHeight",
                isShow:true,
                label:"高"
              }
            ]
          }
      },
      created(){


      },
      methods:{
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
