<template>
  <div class="add">
    <vForm :form="form" :vform="vform" @subMit="onSubmit"></vForm>

  </div>

</template>

<script>
  import vForm from '@/components/form/vForm'
  import vSelect from '@/components/select/select'
  import {get,add,edit} from '@/api/product.js'
  import {getAllHouse} from "../../api/wareHouse";
  import selectTaber from '../components/editProduct'

  export default {
    name: "addOrder",

    components:{

      vForm,
      vSelect,
      selectTaber
    },
    data(){

      return {
        form:{
          orderType:""
        },
        depotList:[],
        vform:[    {
          key:"orderType",
          validator: ['isNotEmpty'],
          trigger:'blur',
          name:"订单类型",
          render:(h,params)=>{
            let create=this.$createElement;
            return create('vSelect',{
              props:{
                value:params['orderType'],

                options: [{
                  value: '1',
                  label: '门店'
                }, {
                  value: '3',
                  label: '渠道'
                },],
              },
              on:{
                change:(item)=>{
                  params.orderType=item
                }
              }

            })

          }
        },
          {
            key:"depotFromId",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"选择仓库",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('vSelect',{
                props:{
                  value:params['depotFromId'],

                  options:this.depotList,
                  label:"productId",
                  value:""
                },
                on:{
                  change:(item)=>{
                    params.depotFromId=item
                  }
                }

              })

            }
          },
          {
            key:"productSize",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"产品尺寸"
          },
          {
            key:"productWidth",
            validator: ['isNotEmpty','isNumber'],
            trigger:'blur',
            name:"选择商品",
            render:(h,params)=>{
              return h('el-button',{},'选择商品')
            }
          },
          {
            key:"productHeight",
            validator: ['isNotEmpty','isNumber'],
            trigger:'blur',
            name:"商品列表",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('selectTaber')
            }
          },
          {
            key:"mobile",
            validator: ['isNotEmpty','isNumber'],
            trigger:'blur',
            name:"电话"
          },
          {
            key:"allMoney",
            validator: ['isNotEmpty','isNumber'],
            trigger:'blur',
            name:"总价"
          },
          {
            key:"totalMoney",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"实收金额"
          },
          {
            key:"person",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"联系人"
          },
          {
            key:"address",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"地址"
          },
          {
            key:"followPerson",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"跟单人员"
          },
          {
            key:"customer",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"客户"
          },


        ],


      }
    },
    created(){
      this.getAllHouse()

    },

    methods:{
      init(){

        if(this.$route.query.id){

          this.get(this.$route.query.id)
        }
      },
      getAllHouse(){
        getAllHouse().then(data=>{
          this.depotList=data
        })
      },
      get(id){
        get({
          productId:id
        }).then(data=>{
          this.form=data
        })
      },
      onSubmit:function(item){
        edit(item).then(res=>{
          this.$router.back(-1)
        })
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

<style scoped lang="less">
  .add{
    justify-content: flex-start;
    >form{
      width: 100%;
    }
  }

</style>
