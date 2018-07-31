<template>
  <div class="dataTable">
  <el-table  :data="obj.list"  :height="!hasPage?600:null"   v-loading="obj.isLoading" @selection-change="handleSelectionChange" @cell-click="cellClick"  :row-class-name="tableRowClassName" :max-height="height">
    <!--选择-->
    <el-table-column v-if="hasSelection" type="selection">
    </el-table-column>
    <!--序号-->
    <el-table-column v-if="hasIndex" type="index">
    </el-table-column>
    <!--数据源-->

    <el-table-column
      v-for="column in columns"
      v-if="column.isShow&&!column.scope"
      align="center"
      :sortable="!column.hasSort"
      :show-overflow-tooltip="tooltip"
      :key="column.prop"
      :prop="column.prop"
      :width="column.width"
      :sort-by="column.prop"
      :sort-method="column.method"
      :label="column.label" >
      <template slot-scope="scope">
        <div v-if="column.render">
          <render :render="column.render" :params="scope"></render>
        </div>
        <div v-else>
          {{scope.row | itemFilter(column)}}
        </div>
      </template>
    </el-table-column>



  </el-table>
    <div class="page">
  <el-pagination   v-if="hasPage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"

    :current-page="obj.page.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="obj.pageSize" layout="total, sizes, prev, pager, next" :total="obj.page.total||0">
  </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import radioBtn from './radioBtn'
  import elPop from './elPopover'
  import render from './render'
  /*向父组件传递的数据：
       * commitSelection     被选中的数据
       *
       * */
  export default {
    name: "tm-table",
    watch:{
        obj:function () {
          console.log(this.obj);
        }
    },
components:{
  render,
  radioBtn,
  elPop
},
    filters:{
      itemFilter(value,column){
        if(column.filter){
          return column.filter(value[column.prop])
        }
        return value[column.prop]
      }
    },
    props: {
      tableRowClassName:{
        type:Function,
        default:function () {
          return ""
        }
      },
      tooltip: {
        type: Boolean,
        default: true
      },
      page:{
        type:Object,
        default:function () {
          return {
            page:1,
            limit:10,
            totalCount:0,
          }
        }
      },
      operation:{
        type:Object,
        default:function () {
          return {}
        }
      },
      hasPage:{
        type:Boolean,
        default:function () {
          return true
        }
      },

      //是否可以选择
      hasSelection: {
        type: Boolean,
        default: function() {
          return false;
        }
      },
      //是否有序列项
      hasIndex: {
        type: Boolean,
        default: function() {
          return false;
        }
      },
      //是否有操作
      hasOperation:{
        type:Boolean,
        default:function(){
          return false;
        }
      },
      height: {
        default: function() {
          return "100%";
        }
      },
      // 这是相应的字段展示
      columns: {
        type: Array,
        default: function() {
          return [];
        }
      },
      // 这是数据源
      obj: {
          type: Object,
          default: function() {
            return {
              list:[],
              page:1,
              size:10
            }

          }
      }
    },
    created(){

    },
    data(){
      return {
        BASE_URL: process.env.BASE_API,
      }
    },

    methods: {
      //将选中的行发送到父组件
      sortFn(a,b){

     // let ref=/^\d+(\.\d+)?\%?$/;
     // if(ref.test(a)&&ref.test(b)){
     //    a=parseFloat(a.replace(/(\%)/,''));
     //    b=parseFloat(a.replace(/(\%)/,''));
     //    return a-b;
     // }
     //    return a-b;
      },
      handleSelectionChange(val) {
        const selectionArr = [];
        val.forEach(function(el) {
          selectionArr.push(el);
        });
        this.$emit("commitSelection", selectionArr);
      },
      handleSizeChange(pageSize){
        this.obj.page.pageSize = pageSize;
         this.$emit('select',this.obj.page)
      },
      handleCurrentChange(pageChange){
        this.obj.page.pageNum= pageChange;
        this.$emit('select',this.obj.page)
      },
      cellClick(value) {
        //行点击事件
        this.$emit("commitClick", value);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .el-table {
    width: 100%;
  }
  .page{
    display: flex;
    justify-content: flex-end;
    padding-top: 53px;
  }
</style>
<style lang="less">
  .dataTable{
    height: 100%;

  .el-table th{

    background-color: #f9f9f9
  }
  .el-table th>.cell{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #004986;
  }
  /*.el-table .warning-row {*/
  /*background: oldlace;*/
  /*}*/

  .el-table .success-row {
    background: #7d94ed;
    color: #ffffff;
  }
    .el-table .erro-row {
      background: #bbc7f8;
      color: #ffffff;
    }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f5f7fa;
    color:#606266;
  }
  }

</style>
