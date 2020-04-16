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
    <div class='sport' v-for="sport in sports" v-bind:key = "sport">
        <div class='box'>
        <p class="title center-text">{{sport}}</p>
        <a class="subtitle has-text-link" v-on:click="handlesSportsClick(`${sport}`)">Click for more details</a>
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
      <section class="modal-card-body">
      <div class="card" v-for="location in locations">
     <header class="card-header">
         <p class="card-header-title">
          <a class="has-text-centered">{{location.text}}</a>
         </p>
     </header>
     <div class="card-content">
       <div class="content">
         {{location.place_name}}
         <br>
         <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
       </div>
     </div>
     <footer class="card-footer">
     <router-link class="card-footer-item" v-bind:to="`/map?sport=${selectedSport}`">
     <span class="icon">
      <i class="fas fa-map"></i>
     </span>
     <span>View on map</span>
     </router-link>
     </footer>
    </div>
      <div class="container">
      </div>
      <ul v-for="location in locations">
        <li class="has-text-weight-bold" >
          Name: {{location.text}}
        </li>
        <li class="has-text-weight-bold" >
          Address: {{ location.place_name }}
        </li>
        <li class="has-text-weight-bold">
          Events:
          <ul v-for="events in eventnames">
            <li>{{events}}</li>
          </ul>
        </li>
      </ul>
      <footer class="modal-card-foot">
        <router-link class="button is-success" v-bind:to="`/map?sport=${selectedSport}`">
        <span class="icon">
         <i class="fas fa-map"></i>
        </span>
        <span>View Map</span>
        </router-link>
        <button class="button" v-on:click="handleCloseClick">Cancel</button>
      </footer>
      </section>
    </div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
html, body{
  height: 100%;
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
    handlesSportsClick(sport){
      const apiUrl = process.env.VUE_APP_API_URL
      this.showModal = true
      this.selectedSport = sport
      const promises = []
      
      //Fetch the coordinates from the API
      // Fetch location data from map box
      //TODO GET EVENT DATA FROM DATABASE
      fetch(`${apiUrl}/`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        //.then(data => console.log(data))
        .then(data => {
          data.events.forEach( event => {
            console.log(event)
            this.eventnames.push(event.name);
            this.eventStartTimes.push(event.start);
            this.eventEndTimes.push(event.end);
          })
          console.log(this.eventnames);
          
        })
        
      fetch(apiUrl + `/sports/search?lon=${this.clientCoords.longitude}&lat=${this.clientCoords.latitude}`)
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error(res.status)
        })
        .then(json => {
          const venues = json.venues
          venues.forEach(v => {
            const endpoint = `geocoding/v5/mapbox.places/${v.coordinates[0]},${v.coordinates[1]}.json`
            // get location data for venue using the venue's coordinates
            promises.push(
              fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
                .then(res => res.json())
                .then(json => json.features[0])
              )
          })
          Promise.all(promises)
            .then(values => {
              this.locations = values
              console.log(values)
            })
            .catch(err => {
              console.log(err)
            })
        })
        
    },
    handleCloseClick(){
      this.showModal = false
    },
  },
  data: function(){
    return{
      sports: ["Soccer","Volleyball","Basketball","Table Tennis","Football", "Hockey", "Baseball", "Badminton"],
      showModal: false,
      selectedSport: '',
      clientCoords: null,
      locations: [],
      eventnames:[],
      eventStartTimes:[],
      eventEndTimes:[],
    }
  },
  mounted: function(){
    getClientLocation(location => {
      const {coords} = location;
      this.clientCoords = coords;
    })
  },
  beforeMount: function(){
    //Check if the user is signed in From another page, check sign in and username from log in.
    if(this.isSignedIn == true){
      //TODO PULL USERNAME FROM DATABASE AFTER LOGIN
      this.user_name = "Nandor";
    }else{
      
    }
  },
  
  
};
</script>
