<!--  -->
<template>
  <div>
<data-table :obj="res" :columns="columns"></data-table>

  </div>
</template>

<script>
import dataTable from '@/components/dataTable/dataTable'
import { getList } from '@/api/people';
import minx from '@/minxs/page'
export default {
mixins:[minx],
  data () {
    return {
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
          }
        ],
    };
  },

  components: {dataTable},

  computed: {},

  created(){
      this.getList()
  },

  methods: {
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