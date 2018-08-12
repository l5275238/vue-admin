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
            prop:"width ",
            isShow:true,
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
            isShow:true,
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
            prop:"mode",
            isShow:true,
            label:"计算类型",
            render:(h,params)=>{
              let create=this.$createElement;
              let value=params.row['mode'];
              return create('vSelect',{

                props:{
                  value:params.row['mode'],

                  options: [{
                    value: '1',
                    label: '数量'
                  }, {
                    value: '2',
                    label: '面积'
                  },],
                },
                on:{
                  change:(item)=>{
                    params.row.mode=item;
                    this.$set(this.list,params.$index,params.row)
                    


                  }
                }

              })

            }
          },
          {
            prop:"serverCharge",
            isShow:true,
            label:"服务费用",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('vSelect',{
                props:{
                  value:params.row['serverCharge'],

                  options: [{
                    value: '1',
                    label: '支付'
                  }, {
                    value: '2',
                    label: '不支付'
                  },],
                },
                on:{
                  change:(item)=>{
                    params.row.serverCharge=item
                    this.$set(this.list,params.$index,params.row)
                    
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
                  value:params.row.address
                },
                on:{
                  change:item=>{
                    params.row.address=item
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
                    this.$set(this.list,params.$index,params.row)

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
                    this.$set(this.list,params.$index,params.row)
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
