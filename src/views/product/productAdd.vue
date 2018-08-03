<template>
  <div class="add">
    <vForm :form="form" :vform="vform" @subMit="onSubmit"></vForm>

  </div>

</template>

<script>
  import vForm from '@/components/form/vForm'
  import {get,add,edit} from '@/api/product.js'
  import check from '@/utils/validata'
    export default {
        name: "productList",

      components:{

        vForm
      },
      data(){

          return {
            form:{},
            vform:[    {
              key:"productName",
              validator: ['isNotEmpty'],
              trigger:'blur',
              name:"产品名称"
            },
              {
                key:"productType",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"产品类型"
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
                name:"长"
              },
              {
                key:"productHeight",
                validator: ['isNotEmpty','isNumber'],
                trigger:'blur',
                name:"高"
              },
              {
                key:"productUnitPrice",
                validator: ['isNotEmpty','isNumber'],
                trigger:'blur',
                name:"成本"
              },
              {
                key:"productUnitSalePrice",
                validator: [['isNotEmpty','isNumber'],(rule,value,callBack)=>{

                  if((value-this.form.productUnitPrice)<0){

                    callBack(new Error('售价必须大于成本价!'))
                  }
                  else {
                    callBack()
                  }
                }],
                trigger:'blur',
                name:"售价"
              },
              {
                key:"productUnit",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"单位"
              },


            ],


          }
      },
      created(){
        this.init()

      },

      methods:{
          init(){

            if(this.$route.query.id){

                this.get(this.$route.query.id)
            }
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

<style scoped>

</style>
