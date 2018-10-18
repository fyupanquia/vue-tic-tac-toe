<template>
  <div id="ttt">
      <section class="head d-flex vh-flex-center">{{$store.state.title}}</section>
      <router-view></router-view>
      <section class="footer">{{$store.state.footer}}</section>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    this.$store.dispatch("clean_all_app");
  },
  data () {
    return {
      
    }
  }
}
</script>