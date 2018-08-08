<template>
  <div class="add">
    <vForm :form="form" :vform="vform" @subMit="onSubmit"></vForm>
    <productModel v-model="show" @save="saveList"></productModel>
  </div>

</template>

<script>
  import vForm from '@/components/form/vForm'
  import vSelect from '@/components/select/select'
  import {get,add,edit} from '@/api/product.js'
  import {getAllHouse} from "../../api/wareHouse";
  import {getJxs} from '../../api/financial'
  import selectTaber from '../components/editProduct'
  import productModel from '@/views/components/productModel'
  import {addOrder} from "../../api/order";

  let formData={
    orderType:"1",
    serverCharge:"1",
    mode:"1",
  shopId:"",
  depotFromId:"",
  details:[],
    allMoney:0,


  };
  export default {
    name: "addOrder",

    components:{

      vForm,
      vSelect,
      selectTaber,
      productModel
    },
    watch:{
      form:function () {

        let money=0;

        for(let value of  this.form.details){
          if(value.mode==1){
            money+=this.$calculation.multiply(this.$calculation.multiply(value.number,value.productUnitSalePrice),value.discount)
          }
          else {
            money+=this.$calculation.multiply(this.$calculation.multiply(this.$calculation.multiply(value.number,value.productUnitSalePrice),this.$calculation.multiply(value.width,value.height)),value.discount)
          }
        }
        console.log(money);
        this.form.allMoney=money

      }
    },
    computed:{
      allMoney:function () {

      }
    },
    data(){
     let that=this

      return {
        show:false,
        form:formData,
        JxsList:[],
        depotList:[],
        wHshow:false,
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
          // {
          //   key:"mode",
          //   validator: ['isNotEmpty'],
          //   trigger:'blur',
          //   name:"计算方式",
          //   render:(h,params)=>{
          //     let create=this.$createElement;
          //     return create('vSelect',{
          //       props:{
          //         value:params['mode'],
          //
          //         options: [{
          //           value: '1',
          //           label: '数量'
          //         }, {
          //           value: '3',
          //           label: '面积'
          //         },],
          //       },
          //       on:{
          //         change:(item)=>{
          //           if(item==3){
          //             this.wHshow=true
          //           }
          //           else {
          //             this.wHshow=false
          //           }
          //           params.mode=item
          //           this.form=Object.assign({},this.form,params)
          //         }
          //       }
          //
          //     })
          //
          //   }
          // },
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
                  label:"depotName",
                  keyValue:"depotId",

                },
                on:{
                  change:(item)=>{
                    params.depotFromId=item
                    this.form=Object.assign({},this.form,params)
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
                    this.form=Object.assign({},this.form,params)
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
            // validator: ['isNotEmpty','isNumber'],
            trigger:'blur',
            name:"选择商品",
            render:(h,params)=>{
              return h('el-button',{
                on:{
                  click:()=>{
                    this.show=true
                  }
                }

              },'选择商品')
            }
          },
          {
            key:"details",
            // validator: ['isNotEmpty',],
            trigger:'blur',
            name:"商品列表",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('selectTaber',{
                props:{
                  list:this.form.details,
                  wHshow:this.wHshow,
                }
              })
            }
          },
          {
            key:"mobile",
            validator: ['isNotEmpty','isNumber'],
            trigger:'blur',
            name:"电话",
            isHidden:()=>{
              return this.form.orderType!=3
            }


          },
          {
            key:"allMoney",
            validator: ['isNotEmpty','isNumber'],
            trigger:'blur',
            name:"总价",
            disabled:true
          },
          {
            key:"定金",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"定金",
            isHidden:()=>{
              return this.form.orderType!=1
            }
          },
          {
            key:"totalMoney",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"实收金额"
          },
          {
            key:"shopId",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"选择渠道",
            isHidden:()=>{
              return this.form.orderType!=3
            },
            render:(h,params)=>{
              let create=this.$createElement;
              return create('vSelect',{
                props:{
                  value:params['shopId'],

                  options:this.JxsList,
                  label:"name",
                  keyValue:"id"
                },
                on:{
                  change:(item)=>{
                    params.shopId=item
                    this.form=Object.assign({},this.form,params)
                  }
                }

              })

            }
          },
          {
            key:"person",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"联系人",
            isHidden:()=>{
              return this.form.orderType!=1

            },
          },
          {
            key:"address",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"地址",
            isHidden:()=>{
              return this.form.orderType!=1
            },
          },
          {
            key:"followPerson",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"跟单人员",
            isHidden:()=>{
              return this.form.orderType!=1
            },
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
      this.getJxs()

    },

    methods:{
      saveList(item){
       this.form.details=item;
      },
      init(){

        if(this.$route.query.id){

          this.get(this.$route.query.id)
        }
      },
      getJxs(){
        getJxs().then(res=>{
          this.JxsList=res;
        })
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
