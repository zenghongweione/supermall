<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- probe-type数据是写死的，加冒号是为了让它以number类型传输，不加冒号是字符串格式 -->
     <scroll class="content" 
     ref="scroll" 
     :probe-type="3" 
     @scroll="contentScroll"
     :pull-up-load="true"
     @pullingUp="loadMore"
     >
      <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control
          class="tab-control"
          
          :titles="['流行', '新款', '精选']"
          @tabClick='tabClick'
        ></tab-control>
        <good-list :goods="showGoods"></good-list>
     </scroll>
     <Back-top @click.native="backClick" v-show="isShowBackTop"></Back-top>
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import { getHomeMultidata, getHomeGoods } from "../../network/home";
import RecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "../../components/common/navbar/NavBar.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll";
import BackTop from 'components/content/backTop/BackTop'

export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType:'pop',
      isShowBackTop:false
    };
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index){
      switch (index){
        case 0:this.currentType = 'pop'
        break;
        case 1:this.currentType = 'new'
        break;
        case 2:this.currentType = 'sell'
        break;
      }
      console.log(index);
      // this.getHomeGoods(this.goods[index])
    },
    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log("2333", res);
        this.goods[type].list.push(...res.data.list) 
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
    backClick(){
      // console.log(this.$refs.scroll.scroll);
      // console.log(this.$refs.scroll.message);
      this.$refs.scroll.scrollTo(0,0,500)
      console.log('点击');
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      console.log('上拉加载更多');

      // refresh重新加载一遍,数据还没请求到，导致页面没有撑开，可以用refresh重新触发一次插件
      this.$refs.scroll.scroll.refresh()
    }
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
