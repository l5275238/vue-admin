<template>
    <dataTable :obj="res" :add="add" :columns="columns"></dataTable>
</template>

<script>
  import {getWareHoseList,deletHose} from '@/api/wareHouse.js'
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
              {prop:"depotAddress",
                label:"仓库地址",
                isShow:true
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
                          this.$router.push({path:'/wareHouse/addWareHouse',query:{id:params.row.depotId}})
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

                          deletHose({id:params.row.depotId}).then(
                            res=>{
                              this.getWareHoseList()
                            }
                          )
                        }
                      }
                    },'删除')
                  ])
                }
              },
            ],
            add:{
              title:"新增仓库",
              url:"/wareHouse/addWareHouse"
            }
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
