<template>
  <div class="about">
  <Navbar></Navbar>
    <div class="title">
      <h2 class="title is-1">About Sports4U</h2>
      <h4 class="subtitle is-2">We provide you a simple way to find sports and events, locally in your area.</h4>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title{
  text-align: center;
  border-bottom: 1px solid black
}

</style>
<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: "About",
  components: {
    Navbar,
  },
}
</script>
