<template>
  <div class="add">
    <vForm :form="form" :vform="vform" @subMit="onSubmit"></vForm>

  </div>

</template>

<script>
  import vForm from '@/components/form/vForm'
  import {editHose,getHose} from '@/api/wareHouse.js'
    export default {
        name: "addWareHouse",
      components:{

        vForm
      },
      data(){
          return{
            form:{},
            vform:[    {
              key:"depotName",
              validator: ['isNotEmpty'],
              trigger:'blur',
              name:"仓库名称"
            },
              {
                key:"depotAddress",
                validator: ['isNotEmpty'],
                trigger:'blur',
                name:"仓库地址"
              },
          ]
          }
      },
      created(){
        if(this.$route.query.id){
          getHose({depotId:this.$route.query.id}).then(data=>{
            this.form=data
          })
        }
      },
      methods:{
        onSubmit:function (item) {
          editHose(item)
        }
      }
    }
</script>

<style scoped>

</style>
