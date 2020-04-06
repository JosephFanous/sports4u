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
          <a class="button is-large" href="#main">Home</a>
          <a class="button is-large" href="#Aboutpage">About Us</a>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
           <a class="button is-danger is-large">Register</a>
           <a class="button has-background-light is-large">Log in</a>
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
      <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title center-text">Soccer</p>
              <a class="subtitle has-text-link" v-on:click="handlesSportsClick('Soccer')">Click for more details</a>
              <figure class="image is-4by3">
                <img src="images/soccer.png">
              </figure>
            </article>
          </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">Volleyball</p>
            <a class="subtitle has-text-link" v-on:click="handlesSportsClick('Volleyball')">Click for more details</a>
            <figure class="image is-4by3">
              <img src="images/volleyball.png">
            </figure>
          </article>
        </div>
        <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Basketball</p>
              <a class="subtitle has-text-link" v-on:click="handlesSportsClick('Basketball')">Click for more details</a>
              <figure class="image is-4by3">
                <img src="images/basketball.png">
              </figure>
            </article>
          </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">Table Tennis</p>
            <a class="subtitle has-text-link" v-on:click="handlesSportsClick('Table Tennis')">Click for more details</a>
            <figure class="image is-4by3">
              <img src="images/pingpong.png">
            </figure>
          </article>
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
      {{selectedSport}}
      <ul>
        <li v-for="location in locations" v-bind:key = "location.place_name">
          {{ location.place_name }}
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
        <button class="button is-success">View map</button>
        <button class="button" v-on:click="handleCloseClick">Cancel</button>
      </footer>
      </section>
    </div>
  </div>
  </div>
</template>

<style lang="scss" scope>
html, body{
  height: 100%;
}
nav{
  padding: 20px;
}
section{
  border-top: 2px solid grey;
  margin-bottom: 50px;
}
a.subtitle{
padding: 5px;
}
</style>

<script>
// @ is an alias to /src
import { getClientLocation } from '../util';

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
  },
  data: function(){
    return{
      showModal: false,
      selectedSport: '',
      clientCoords: null,
      locations: [],
    }
  },
  mounted: function(){
    getClientLocation(location => {
      const {coords} = location;
      this.clientCoords = coords;
    })
  },
  
};
</script>
