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
      <div class='box has-text-centered' v-on:click="HandleCardClick(sport)">
          <p class="title center-text">{{sport}}</p>
          <figure class="image is-4by3">
          <img v-bind:src="'images/' + sport + '.png'">
          </figure>
      </div>
    </div>
    </div>
  </div>
  
  <div class="modal"v-bind:class= "{ 'is-active' : showModal }">	
    <div class="modal-background"></div>	
    <div class="modal-card">	
      <header class="modal-card-head">	
        <p class="modal-card-title">{{selectedSport}} Events</p>	
        <button class="delete" aria-label="close" v-on:click="handleCloseClick"></button>	
      </header>	
      <section class="modal-card-body" v-if="events.length==0">There are no events right now :(</section>
      <section class="modal-card-body" v-for="event in events">	
        
        <div class="card">	
          <header class="card-header">	
             <p class="card-header-title">	
              <a class="has-text-centered">{{event.Name}}</a>	
              <!-- Add Icon head and number of attending at the end of the card using a span -->
             </p>	
         </header>	
         <div class="card-content">	
           <div class="content">	
             {{event.Address}}	
             <br>	
             <time>Start date: {{event.StartTime}}</time>	
             <br>
             <time>End date: {{event.EndTime}}</time>	
             
           </div>	
          </div>
         <footer class="card-footer">	
         <router-link class="card-footer-item" v-bind:to="`/map?sport=${selectedSport}`">	
          <span class="icon">	<i class="fas fa-map"></i>	</span>	
          <span>View on map</span>	
         </router-link>	
         </footer>
       </div>
     </section>	
     
     	
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
.sport-container{
  flex-direction: row;
  flex-wrap: wrap;
}
.sport{
  padding: 5px 20px;
  width: 25%;
  margin-bottom: 40px;
}

header .card-header .card-header-title{
  text-align: center;
  font-size: 32px;
  
}
</style>

<script>
//<router-link class='box has-text-centered'  v-bind:to="`/map?sport=${sport}`" tag="div"> </router-link>
// @ is an alias to /src
import { getClientLocation } from '../util';

//TODO IF THE USER IS LOGGED IN, THEN DISPLAY THE USER'S NAME AND A SIGN OUT BUTTON DONE

export default {
  name: "Home",
  methods: {
    HandleCardClick: function(sport){
      this.showModal = true;
      this.selectedSport = sport;
      this.EventLookUp();
    },
    handleCloseClick(){	
     this.showModal = false;
     this.events = [];
    },
    EventLookUp: function(){
      //Fetch from server
      const apiUrl = process.env.VUE_APP_API_URL;
      
      fetch(`${apiUrl}/events/${this.selectedSport}`, {	
        method: 'post',	
        headers: {	
          'Accept': 'application/json',	
          'Content-Type': 'application/json',	
        },	
        })	
        .then(res => res.json())	
        .then(data => {	
          console.log(data);
          if(data.length == 0){
            console.log("No results found")
          }else{
            data.forEach( event => {
              this.events.push(event);
            })  
          }  
          })
    
    },
    
  },
  data: function(){
    return{
      sports: ["Soccer","Volleyball","Basketball","Table Tennis","Football", "Hockey", "Baseball", "Badminton"],
      selectedSport: '',
      showModal: false,
      events: []
    }
  },
};
</script>
