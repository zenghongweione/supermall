<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle" :class="{ active: isActive }">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isActive: true,
    };
  },
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  mounted() {},
  computed:{
    isActive() {
      // this.$route.path  获取当前路径信息     判断是否选中当前路径，如果是当前路径就返回true
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color:this.activeColor } : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  },
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>