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
  import {addOrder}  from "@/api/order.js";
  import {getAllHouse} from "../../api/wareHouse";
  import {getJxs} from '../../api/financial'
  import selectTaber from '../components/editProduct'
  import productModel from '@/views/components/productModel'
  

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
        vform:[  
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
            key:"date",
          validator: ['isNotEmpty'],
            trigger:'blur',
            name:"选择日期",
            render:(h,params)=>{
              return h('el-date-picker',{
                  props:{
                    "value":this.form.date
                  },
                  on:{
                    change:(item)=>{
                      console.log(item)
                      this.form.date=item
                    }
                  }
              },)
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
        addOrder(item).then(res=>{
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
