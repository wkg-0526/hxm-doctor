<!-- search -->
<template>
  <div class="search-wrapper">
    <div class="search-input">
      <el-input
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        v-model="content"
        class="round"
        :style="{width: width + 'px'}"
        :size="size"
      ></el-input>
    </div>
    <div class="search-btn">
      <el-button type="primary" round @click="onSearch" class="yellow" :size="size">开始搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "请输入"
    },
    width: {
      type: Number,
      default: 256
    },
    size: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {
      content: ""
    }
  },
  methods: {
    onSearch() {
      console.log(this.content, "aaa")
      this.$emit("onSearch", this.content)
    }
  }
}
</script>

<style lang='less' scoped>
.search-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  .search-input {
    display: inline-block;
  }
  .search-btn {
    display: inline-block;
    margin-left: 25px;
  }
}
</style>
<style lang='less'>
.search-wrapper {
  .el-input .el-input__inner {
    border-radius: 16px;
  }
}
</style>
