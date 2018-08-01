<template>
  <div>
    <div class="top">
      <selectBtn @change="change"></selectBtn>
      <el-select v-model="jxsValue" placeholder="选择门店" @change="getJxsList">
        <el-option
          v-for="item in options"
          :key="item.depotId"
          :label="item.depotName"
          :value="item.depotId">
        </el-option>
      </el-select>
    </div>

  </div>
</template>

<script>
  import {getPurchase,getJxsList} from '@/api/financial'
  import selectBtn from '@/components/selectBtn/selectBtn'
  export default {
    name: "jxs",
    components:{
      selectBtn
    },
    data(){
      return{
        jxsValue:"",
        options:[],
        time:{}
      }
    },
    created(){
      getPurchase().then(res=>{
        this.options=res
      })
    },
    methods:{
      change:function (item) {
        this.time=item;
        this.getJxsList()
      },
      getJxsList:function () {
        getJxsList(Object.assign({},this.time,{
          depotId:this.jxsValue,
          depotType:1,

        })).then()
      }
    }

  }

</script>

<style scoped lang="less">
  .top{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    width: 100%;
  }

</style>
