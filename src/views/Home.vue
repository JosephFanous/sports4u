<template>
  <div class="has-background-white-ter">
  
  <section class="section">
    <h1 class="title">Sports</h1>
    <h2 class="subtitle">
      Select a sport to find in your area
    </h2>
  </section>

  <div class="container is-centered">
   <div class='sport-container is-flex' >
    <div class='sport' v-for="sport in sports" v-bind:key="sport">
      <router-link class='box has-text-centered'  v-bind:to="`/map?sport=${sport}`" tag="div">
          <p class="title center-text">{{sport}}</p>
          <figure class="image is-4by3">
          <img v-bind:src="'images/' + sport + '.png'">
          </figure>
      </router-link>
    </div>
    </div>
  </div>
  
  </div>
</template>

<style lang="scss" scoped>
html, body{
  height: 100%;
}
.sport .box{
  cursor: pointer;
}
.section{
  margin-bottom: 10px;
  margin-top:0px;
  padding-left: 40px;
  padding-top: 20px
}
a.subtitle{
padding: 5px;
}
.sport-container{
  flex-direction: row;
  flex-wrap: wrap;
}
.sport{
  padding: 5px 20px;
  width: 25%;
  margin-bottom: 40px;
  
}
</style>

<script>
// @ is an alias to /src
import { getClientLocation } from '../util';

//TODO IF THE USER IS LOGGED IN, THEN DISPLAY THE USER'S NAME AND A SIGN OUT BUTTON DONE

export default {
  name: "Home",
  methods: {
    
  },
  data: function(){
    return{
      sports: ["Soccer","Volleyball","Basketball","Table Tennis","Football", "Hockey", "Baseball", "Badminton"],
      selectedSport: '',
    }
  },
};
</script>
