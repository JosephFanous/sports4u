<template>
  <div>
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
import Chatbox from '../components/Chatbox.vue';

export default {
  name: "About",
  components: {
    Chatbox,
  },
  beforeMount: function(){
    //Check if the user is signed in From another page, check sign in and username from log in.
    if(this.isSignedIn == true){
      //TODO PULL USERNAME FROM DATABASE AFTER LOGIN
      this.user_name = "Nandor";
    }else{
      
    }
  },
}
</script>
