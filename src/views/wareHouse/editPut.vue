<template>
  <div class="add">

    <vForm :form="form" :vform="vform" @subMit="onSubmit"></vForm>
    <productModel v-model="show" @save="saveList"></productModel>
  </div>

</template>

<script>
  import vForm from '@/components/form/vForm'
  import vSelect from '@/components/select/select'
  import datePick from '@/components/datePick/datePick'
  import timePick from '@/components/datePick/timePick'
  import {get,add,edit} from '@/api/product.js'
  import {getAllHouse,editOut,getOutPut} from "../../api/wareHouse";


  import selectTaber from '../components/editProductO'
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
      productModel,
      datePick,
      timePick
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
        value10:"",
        peoPlist:[],
        depotList:[],
        wHshow:false,
        date:new Date(),
        vform:[  

          {
            key:"date",
          validator: ['isNotEmpty'],
            trigger:'blur',
            name:"选择日期",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('datePick',{
                data:{
                value10:"",
              },
                  props:{
                    "value":this.form.date,
                    "type":"date"
                  },
                  on:{
                    change:(item)=>{
                      this.form.date=item
                    }
                  }
              },)
            }
          },
          {
            key:"time",
            validator: ['isNotEmpty'],
            trigger:'blur',
            name:"选择时间",
            render:(h,params)=>{
              let create=this.$createElement;
              return create('timePick',{
                data:{
                  value10:"",
                },
                props:{
                  "value":this.form.time,
                  "type":"date"
                },
                on:{
                  change:(item)=>{
                    debugger
                    this.form.time=item
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



    },

    methods:{
      dateChange(item){
        console.log(item);
      },
      saveList(item){
       this.form.details=item;
      },
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
        editOut(item).then(res=>{
          this.$router.back(-1)
        })
      },
      getDetail:function(){
        if(this.$route.query.id){
          getOutPut(this.$route.query.id).then(res=>{
            this.form=res;
          })
        }
      },
      getList:async function () {

        await getAllist(2).then(res=>{
          this.peoPlist=res;
        })

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
