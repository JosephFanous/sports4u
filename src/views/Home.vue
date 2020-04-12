<template>
  <div class="has-background-white-ter">
  <nav class="navbar has-background-white-ter" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
       <a class="navbar-item" href="https://sports4u.com">
          <img src="images/sports_logo.png"  alt="Sports4U" />
       </a>

       <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
       </a>
    </div>
    <div class="navbar-start">
      <div class="navbar-item">
        <div class="buttons is-large">
          <router-link class="button is-large" v-bind:to="`/`">
          <span class="icon">
           <i class="fas fa-home"></i>
          </span>
          <span>Home</span>
          </router-link>
          <router-link class="button is-large" v-bind:to="`/about`">About Us</router-link>
          <router-link v-if="isSignedIn"class="button is-large" v-bind:to="`/afterLogin`">Dashboard</router-link>
        </div>
        
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div v-if="isSignedIn" class="buttons">
           <router-link  class="button is-large" to="/afterLogin">
             <span class="icon">
              <i class="fas fa-user"></i>
             </span>
             <span>Logged in as: {{user_name}} </span>
           </router-link>
           
           <Button v-on:click="handleSignOutClick" class="button has-background-light is-medium" to="/">Sign Out</Button>
        </div>
        <div v-else class="buttons">
           <router-link  class="button is-danger is-large" to="/register">Register</router-link>
           <router-link class="button has-background-light is-large" to="/login">Log in</router-link>
        </div>
      </div>
    </div>
  </nav>
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
   
  
  <div class="modal"
  v-bind:class= "{ 'is-active' : showModal }"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{selectedSport}} Facilities</p>
        <button class="delete" aria-label="close" v-on:click="handleCloseClick"></button>
      </header>
      <section class="modal-card-body">
      <div class="container">
      {{selectedSport}}
      </div>
      <ul v-for="location in locations" v-bind:key = "location.place_name">
        <li class="has-text-weight-bold" >
        Name: {{location.text}}
        </li>
        <li class="has-text-weight-bold" >
        Address: {{ location.place_name }}
        </li>
      </ul>
      <!--LISTING # 1
        <ul>
          <li>Locations: Underground Goodlife Parking</li>
          <li>Address: 399 Elmgrove Ave, Oshawa, ON L1J 2C6 Elmgrove Ave, Oshawa, ON L1J 2C6</li>
          <li>Rating: 4.0</li>
          <li>Phone Number: 905 ### ###</li>
        </ul> !-->
        
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
nav{
  padding: 20px;
}
section{
  border-top: 2px solid grey;
  margin-bottom: 10px;
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

//TODO IF THE USER IS LOGGED IN, THEN DISPLAY THE USER'S NAME AND A SIGN OUT BUTTON 

export default {
  name: "Home",
  components: {
  },
  methods: {
    handlesSportsClick(sport){
      this.showModal = true,
      this.selectedSport = sport
      const promises = []
      //Fetch the coordinates from the API
      // Fetch location data from map box
      
      //TODO HANDLE LOADING
      const apiUrl = process.env.VUE_APP_API_URL
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
    handleSignOutClick(){
      console.log("User Signed Out")
      this.isSignedIn = false
    },
  },
  data: function(){
    return{
      sports: ["Soccer","Volleyball","Basketball","Table Tennis","Football", "Hockey", "Baseball", "Badminton"],
      showModal: false,
      selectedSport: '',
      clientCoords: null,
      //Set to False;
      isSignedIn: true,
      locations: [],
      user_name: '',
    }
  },
  mounted: function(){
    getClientLocation(location => {
      const {coords} = location;
      this.clientCoords = coords;
    })
  },
  beforeMount: function(){
    //Check if the user is signed in From another page
    if(this.isSignedIn == true){
      //TODO PULL USERNAME FROM DATABASE AFTER LOGIN
      this.user_name = "Nandor";
    }else{
      
    }
  },
  
  
};
</script>
