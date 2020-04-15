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
        <div class="events-title">
          <h3 class="title is-4">Events</h3>
          <button v-on:click="handleOpenAddEvent" class="button is-info">Add Event</button>
        </div>
        <p v-if="!events.length">No events at this location... 🙁</p>
        <ul>
          <li class="box" v-for="event in events" v-bind:key="event.EventID">
            <div class='event-header is-flex'>
              <h3 class='event-title title is-5'>{{ event.Name }}</h3>
              <small>Added on {{ formatDate(event.EventAddedTime) }}</small>
            </div>
            <p>{{ event.SportName }}</p>
            <p><i class="fas fa-calendar"></i>{{ dateRange(event.StartTime, event.EndTime) }}</p>
            <p><i class="fas fa-clock"></i>{{ formatTime(event.StartTime) }} to {{ formatTime(event.EndTime) }}</p>
            <button class="button is-success">Join Event</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="section" v-if="isVenueLoading || venueError">
      <p v-if="isVenueLoading">Loading venue data...</p>
      <p v-if="!isVenueLoading && venueError">{{ venueError }}</p>
    </div>
    <AddEvent
      v-if="showAddEventModal"
      v-on:close="handleCloseAddEvent"
    />
  </div>
</template>

<style lang="scss">
.events {
  margin-top: 2rem;
}

.modal-card-title {
  margin: 0;
}

.events-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  .title {
    margin: 0;
  }
}

.events li {
  margin-bottom: 1rem;
  .fas {
    margin-right: 0.5rem;
  }
  .event-header {
    justify-content: space-between;
    align-items: flex-start;
    small {
      font-family: monospace;
    }
  }
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
import { getVenue, reverseGeocode, formatDate, formatTime } from '../util'
import AddEvent from '../components/AddEvent'

export default {
  name: "VenuePage",
  components: {
    AddEvent
  },
  data: function() {
    return {
      isVenueLoading: false,
      venueError: '',
      events: [],
      isLocationLoading: false,
      locationError: '',
      location: null,
      showAddEventModal: false
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
    },
    formatDate,
    formatTime,
    dateRange(startStr, endStr) {
      const start = new Date(startStr)
      const end = new Date(endStr)
      const isDiffDay = start.toDateString() != end.toDateString()

      if (isDiffDay) {
        return this.formatDate(startStr) + ' to ' + this.formatDate(endStr)
      } else {
        return this.formatDate(startStr)
      }
    },
    handleOpenAddEvent() {
      this.showAddEventModal = true
    },
    handleCloseAddEvent() {
      this.showAddEventModal = false
    }
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
