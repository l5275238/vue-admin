<!--  -->
<template>
  <div>
    <fenPeiModle v-model="fenPshow" :form="form" @submit="submit"></fenPeiModle>
<data-table :obj="res" :columns="columns"></data-table>

  </div>
</template>

<script>
import dataTable from '@/components/dataTable/dataTable'
import { getList ,deletPeople} from '@/api/people';
import minx from '@/minxs/page'
import fenPeiModle from './fenPeiModel'
export default {
mixins:[minx],
  data () {
    return {
      form:{},
      fenPshow:false,
        columns:[
          {
              prop:"name",
            isShow:true,
            label:"姓名"
          },
          {
              prop:"roleName",
            isShow:true,
            label:"角色"
          },
          {
            prop:"edit",
            isShow:true,
            label:"操作",
            render:(h,params)=>{
              return h(
                'div',[h('el-button',{

                  props:{
                    type:"primary"
                  },
                  on:{
                    click:()=>{
                      this.form=params.row;
                      this.fenPshow=true
                    }
                  }
                },"分配"),
                  h('el-button',{

                    props:{
                      type:"warning"
                    },
                    on:{
                      click:()=>{
                        deletPeople(params.row.id).then(res=>{
                          this.getList()
                        })
                      }
                    }
                  },"取消分配")]
              )
            }
          }
        ],
    };
  },

  components: {dataTable,fenPeiModle},

  computed: {},

  created(){
      this.getList()
  },

  methods: {
    submit:function(){
      this.getList()
    },
      getList:function (params) {
          this.res.isLoading=true,
          getList(this.res.page).then(res=>{
              this.res.list=res.list;
                this.res.isLoading=false,
              this.res.page.totalCount=res.totalCount
          })
      }
  }
}

</script>
<style lang='less' scoped>
</style>
