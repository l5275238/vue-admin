<template>
  <div>

      <dataTable :obj="res"  :columns="columns" :hasPage="hasPage" ></dataTable>

  </div>
</template>

<script>
  import dataTable from '@/components/dataTable/dataTable'
  import {getAll} from '@/api/product.js'
  import vSelect from '@/components/select/select'
  export default {
    name: "productModel",
    components:{
      dataTable,
      vSelect,
    },

    watch:{
      list:function () {

        this.res.list=this.list.map(item=>{
          item.number='1'
          item.zhuang='1'
          item.kong='1'
          return item
        });

      },
      wHshow:function () {


       this.columns[4].isShow=this.wHshow;
       this.columns[5].isShow=this.wHshow;
      }
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
            prop:"width ",
            isShow:this.wHshow,
            label:"宽",
            render:(h,params)=>{
              return h('el-input',{
                props:{
                  value:params.row.width
                },
                on:{
                  change:item=>{
                    params.row.width=item
                  }
                }
              })
            }
          },
          {
            prop:"height",
            isShow:this.wHshow,
            label:"高",
            render:(h,params)=>{
              return h('el-input',{
                props:{
                  value:params.row.height
                },
                on:{
                  change:item=>{
                    params.row.height=item
                  }
                }
              })
            }
          },
          {
            prop:"number",
            isShow:true,
            label:"数量",
            render:(h,params)=>{
              return h('el-input',{
                props:{
                  value:params.row.number
                },
                on:{
                  change:item=>{
                    params.row.number=item
                  }
                }
              })
            }
          },
          {
            prop:"discount",
            isShow:true,
            label:"折扣",
            render:(h,params)=>{
              return h('el-input',{
                props:{
                  value:params.row.discount
                },
                on:{
                  change:item=>{
                    params.row.discount=item
                  }
                }
              })
            }
          },
          {
            prop:"address",
            isShow:true,
            label:"地址",
            render:(h,params)=>{
              return h('el-input',{
                props:{
                  value:params.row.discount
                },
                on:{
                  change:item=>{
                    params.row.discount=item
                  }
                }
              })
            }
          },
          {
            prop:"kong",
            isShow:true,
            label:"打孔/挂钩",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('vSelect',{
                props:{
                  value:params.row['kong'],

                  options: [{
                    value: '1',
                    label: '打孔'
                  }, {
                    value: '3',
                    label: '挂钩'
                  },],
                },
                on:{
                  change:(item)=>{
                    params.row.kong=item
                  }
                }

              })

            }
          },
          {
            prop:"zhuang",
            isShow:true,
            label:"墙装/顶装",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('vSelect',{
                props:{
                  value:params.row['zhuang'],
                  options: [{
                    value: '1',
                    label: '墙装'
                  }, {
                    value: '3',
                    label: '顶装'
                  },],
                },
                on:{
                  change:(item)=>{
                    params.row.zhuang=item
                  }
                }

              })

            }
          },



        ]
      }

    },
    created(){
      console.log(this.wHshow);
    },

    methods:{

      close(){
        this.$emit('input',false)
      }
    },

    props:{
      list:{
        type:Array,
        default:function () {
          return []
        }
      },
      value:{
        type:Boolean,
        default:function () {
          return true
        }
      },
      wHshow:{
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
