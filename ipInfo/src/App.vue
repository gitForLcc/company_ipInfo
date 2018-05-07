<template>
  <div id="app">
    <HeaderView></HeaderView>
    <loading v-show="loading"></loading>
    <!-- <HomeView></HomeView> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <FooterView></FooterView>
  </div>
</template>

<script>
import HeaderView from './components/Header.vue'
// import HomeView from './components/Home.vue'
import FooterView from './components/footer.vue'

import {mapGetters,mapActions} from 'vuex'
export default{
  computed:mapGetters([
      'loading'
    ]),
  components:{
    HeaderView,
    FooterView
  }
}
</script>

<style>

</style>
