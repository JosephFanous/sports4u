<template>
  <div class="container">
    <div v-if="!isVenueLoading && !venueError" class="section">
      <header v-if="!isLocationLoading && !locationError && location">
        <h1 class='title is-1'>{{ location.text }}</h1>
        <h2 class='subtitle is-3'>{{ location.place_name }}</h2>
      </header>
      <h1 v-if="!isLocationLoading && locationError" class='title'>
        {{ locationError }}
      </h1>
      <div class="events">
        <h3 class="title is-4">Events</h3>
        <p v-if="!events.length">No events at this location... 🙁</p>
        <ul>
          <li class="box" v-for="event in events" v-bind:key="event.EventID">
            <h3 class='event-title title is-5'>{{ event.Name }}</h3>
            <p>{{ event.SportName }}</p>
            <p>{{ event.StartTime }}</p>
            <p>{{ event.EndTime }}</p>
            <small>{{ event.EventAddedTime }}</small>
          </li>
        </ul>
      </div>
    </div>
    <div class="section" v-if="isVenueLoading || venueError">
      <p v-if="isVenueLoading">Loading venue data...</p>
      <p v-if="!isVenueLoading && venueError">{{ venueError }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.events {
  margin-top: 2rem;
}

.events li {
  margin-bottom: 1rem;
  .event-title {
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
}
</style>

<script>
import mapboxgl from 'mapbox-gl'
import { getVenue, reverseGeocode } from '../util'

export default {
  name: "VenuePage",
  components: {
  },
  data: function() {
    return {
      isVenueLoading: false,
      venueError: '',
      events: [],
      isLocationLoading: false,
      locationError: '',
      location: null,
    }
  },
  methods: {
    // get location data from mapbox for this venue
    getLocationData(lon, lat) {
      this.isLocationLoading = true
      this.locationError = ''

      reverseGeocode(lon, lat)
        .then(location => {
          this.location = location
        })
        .catch(err => {
          this.locationError = 'Could not fetch location.'
        })
        .finally(() => {
          this.isLocationLoading = false
        })
    }
  },
  computed: {
  },
  mounted: function() {
    const venueId = this.$route.params.id

    this.isVenueLoading = true
    this.venueError = ''
    getVenue(venueId)
      .then(data => {
        console.log(data)
        const coords = data.coords
        this.getLocationData(coords.Longitude, coords.Latitude)
        this.events = data.events
      })
      .catch(err => {
        console.error(err)
        this.venueError = 'Could not fetch venue.'
      })
      .finally(() => {
        this.isVenueLoading = false;
      })
    console.log(venueId)
  }
};
</script>
