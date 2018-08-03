<template>
  <div>
    <dataTable :obj="res" :add="add" :columns="columns"></dataTable>
  </div>

</template>

<script>
  import minx from '@/minxs/page'
  import dataTable from '@/components/dataTable/dataTable'
  import {getList,delet} from '@/api/product.js'
    export default {
        name: "productList",
      mixins:[minx],
      components:{
        dataTable
      },
      data(){
          return {
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
              },
              {
                prop:"",
                isShow:true,
                label:"操作",
                render:(h,params)=>{
                  return h('div',[
                    h('el-button',{
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                            this.$router.push({path:'/product/add',query:{id:params.row.productId}})
                        }
                      }
                    },'编辑'),
                    h('el-button',{
                      props: {
                        type: 'danger',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          console.log(params.row);
                          delet({id:params.row.productId}).then(
                            res=>{
                              this.getList()
                            }
                          )
                        }
                      }
                    },'删除')
                  ])
                }
              },

            ]
          }
      },
      created(){
          this.getList()

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
