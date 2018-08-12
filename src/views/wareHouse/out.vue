<template>
    <div>
          <dataTable :obj="res"  :columns="columns" :add="add"></dataTable>

    </div>
</template>

<script>
  import {getOutList,deleteOutPut,auditoOutPut} from '@/api/wareHouse.js'
  import minx from '@/minxs/page'
  import dataTable from '@/components/dataTable/dataTable'
    export default {
        name: "out",
      mixins:[minx],
      data(){
          return{
            add:{
               title:"新增出库单",
              url:"/wareHouse/editOut"

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
                isShow:true
              },
              {
                prop:"edit",
                isShow:true,
                label:"操作",
                render:(h,params)=>{
                  return h(
                    'div',[h('el-button',{

                      props:{
                        type:"primary"
                      },
                      on:{
                        click:()=>{
                          this.$router.push({
                            path:"/wareHouse/editOut",
                            query:{
                              id:params.row.orderId
                            }
                          })
                        }
                      }
                    },"编辑"),
                      h('el-button',{

                        props:{
                          type:"warning"
                        },
                        on:{
                          click:()=>{
                            auditoOutPut(params.row.orderId).then(res=>{
                              this.getList()
                            })
                          }
                        }
                      },"审核"),

                      h('el-button',{

                        props:{
                          type:"danger"
                        },
                        on:{
                          click:()=>{
                            deleteOutPut(params.row.orderId).then(res=>{
                              this.getList(Ø)
                            })
                          }
                        }
                      },"删除")]
                  )
                }
              }
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
            depotType:1
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
