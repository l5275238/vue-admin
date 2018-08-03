<template>
      <div>
        <el-dialog title="选择产品" :visible.sync="value" :before-close="bfClose">
          <dataTable :obj="res"  :columns="columns" :hasPage="hasPage" ></dataTable>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="close">确 定</el-button>
          </div>
        </el-dialog>
      </div>
</template>

<script>
  import dataTable from '@/components/dataTable/dataTable'
  import {getAll} from '@/api/product.js'
    export default {
        name: "productModel",
      components:{
        dataTable
      },
      data(){
          return{
            res:{
              list:[]
            },
            hasPage:false,
            bfClose:()=>{
              this.$emit('input',false)
            },
            columns:[
              {
                prop:"",
                isShow:true,
                label:"选择",
                render:(h,params)=>{
                  return h('el-checkbox',{
                    props:{
                      value:params.row.isCheck
                    }
                  })
                }
              },
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
          this.getAll()
      },

      methods:{
        getAll () {
          getAll().then(res=>{
              this.res.list=res;
          })
        },
        close(){
          this.$emit('input',false)
        }
      },
      props:{

        value:{
          type:Boolean,
          default:function () {
            return true
          }
        }
      }
    }
</script>

<style scoped>

</style>
