<template>
  <div>

      <dataTable :obj="res"  :columns="columns" :hasPage="hasPage" v-if="show" ></dataTable>

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
          item.number= item.number?item.number:'1'
          item.zhuang=item.zhuang? item.zhuang:'1'
          item.kong=item.kong?item.kong:'1'
          item.mode=item.mode?item.mode:'1'
          item.serverCharge=item.serverCharge?item.serverCharge:'1'
          
          return item
        });

      },

    },

    data(){
      return{
        show:true,
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
          

            
  



        ]
      }

    },
    created(){
      this.res.list=this.list.map(item=>{
        item.number='1'
        item.zhuang='1'
        item.kong='1'
        item.model='1'
        return item
      });
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
