<template>
    <div>
      <el-date-picker
        v-model="value1"
        type="date"
        :picker-options="pickOption"
        placeholder="选择日期"  @change="change">
      </el-date-picker>
      <el-select v-model="type" placeholder="请选择" @change="change">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.laber"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
</template>

<script>
  import {parseTime} from '@/filters/index'
    export default {
        name: "selectBtn",
      data(){
          return {
            value1:"",
            pickOption:{
              disabledDate:function (nowDate) {
                let date=new Date().valueOf();
                let now =nowDate.valueOf();
                return now>date
              }
            },
            type:"0",
            typeList:[
              {value:"0",laber:"年"},
              {value:"1",laber:"月"},
              {value:"2",laber:"日"}
            ]
          }
      },
      computed:{
        params:function () {
          return {
            date:this.value1,
            type:this.type
          }
        }
      },
      methods:{
          initTime(){
            let data=new Date().valueOf()

            this.value1=parseTime(data,"{y}-{m}-{d}")
          },
        change(){
            this.$emit('change',this.params)
        }
      },
      created(){
          this.initTime();
          this.change()
      }
    }
</script>

<style scoped>

</style>
