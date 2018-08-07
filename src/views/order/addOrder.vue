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
let formData={
    orderType:"",
    serverCharge:"",
    mode:""

  };
  export default {
    name: "addOrder",

    components:{

      vForm,
      vSelect,
      selectTaber
    },
    computed:{

    },
    data(){
     let that=this

      return {
        form:formData,
        depotList:[],
        vform:[  {
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
                  params.orderType=item;
                this.form=Object.assign({},this.form,params)
                }
              }

            })

          }
        },
          {
            key:"mode",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"计算方式",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('vSelect',{
                props:{
                  value:params['mode'],

                  options: [{
                    value: '1',
                    label: '数量'
                  }, {
                    value: '3',
                    label: '面积'
                  },],
                },
                on:{
                  change:(item)=>{
                    params.mode=item
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
            key:"serverCharge",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"服务费",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('vSelect',{
                props:{
                  value:params['serverCharge'],

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
                    params.serverCharge=item
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
            name:"电话",
            isHidden:()=>{
              return this.orderType!=3
            }


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
