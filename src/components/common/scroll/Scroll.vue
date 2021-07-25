<template>
<!-- ref -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default ({
  data() {
    return {
      scroll:null,
      message:'哈哈哈'
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM:true,
      click:true
    })
  },
  methods: {
    scrollTo(x,y,time=500) {
      this.scroll.scrollTo(x,y,time);
    },
  },
})
</script>
<style scoped>
.wrapper{
  height: 100%;
}
</style>