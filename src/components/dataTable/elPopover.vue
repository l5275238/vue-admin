<template>
    <div class="prop">
      <el-tooltip class="item" effect="light" content="Top Center 提示文字" placement="top">
        <div slot="content" class="content">
          <div v-for="item in list">
            <span>{{item.fedLevel}}</span>
            <span>{{item.count}}</span>

          </div>
        </div>
        <span>{{name}}</span>
      </el-tooltip>


    </div>
</template>

<script>
    export default {
        name: "elPopover",
      props:['name','list']
    }
</script>

<style scoped lang="less">
.content{
  width: 100px;
  >div{
    display: flex;
    width: 100px;
   padding: 0 10px;

    justify-content: space-between;
  }
}
</style>
