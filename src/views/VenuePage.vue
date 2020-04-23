<template>
  <div class="container">
    <div v-if="!isVenueLoading && !venueError" class="section">
      <header class="is-flex" v-if="!isLocationLoading && !locationError && location">
        <div class="header-text">
          <h1 class='title is-1'>{{ location.text }}</h1>
          <h2 class='subtitle is-3'>{{ location.place_name }}</h2>
        </div>
        <div class="day-graph">
          <h3 class="title is-6">Popular Days</h3>
          <DayPopularity v-bind:venueID="$route.params.id" />
        </div>
      </header>
      <h1 v-if="!isLocationLoading && locationError" class='title'>
        {{ locationError }}
      </h1>
      <div class="events">
        <p v-if="!events.length">No events at this location... 🙁</p>
        <div v-if="events.length" class="events-title">
          <h3 class="title is-4">Events</h3>
          <router-link
            v-if="!$globalStore.user"
            class="button is-link"
            to="/login"
            tag="button"
          >
            Add Event
          </router-link>
          <button
            v-else
            v-on:click="handleOpenAddEvent"
            class="button is-link"
          >
            Add Event
          </button>
        </div>
        <div v-if="events.length" class="columns">
          <div class="column is-one-third">
            <div class="box filters">
              <div class="filter-header is-flex">
                <h3 class="title is-5">Filter</h3>
                <button v-on:click="toggleShowAll" class="button is-link is-light">{{ showAll ? 'Deselect All' : 'Select All' }}</button>
              </div>
              <button
                v-for="sport in Object.keys(emojiBySport)"
                v-bind:key="sport"
                class="button is-medium is-fullwidth"
                v-bind:class="{ 'is-link': selectedSports[sport] }"
                v-on:click="toggleSport(sport)"
              >
                {{ emojiBySport[sport] + ' ' + sport }}
              </button>
            </div>
          </div>
          <ul class="column is-two-thirds">
            <p class="title is-5" v-if="!visibleEvents.length">No events found... 🙁</p>
            <li class="box" v-for="event in visibleEvents" v-bind:key="event.EventID">
              <div class='event-header is-flex'>
                <h3 class='event-title title is-5'>{{ event.Name }}</h3>
                <small>Added on {{ formatDate(event.EventAddedTime) }}</small>
              </div>
              <span class="event-sport tag is-normal is-rounded">{{ emojiBySport[event.SportName] + ' ' + event.SportName }}</span>
              <p><i class="fas fa-calendar"></i>{{ dateRange(event.StartTime, event.EndTime) }}</p>
              <p><i class="fas fa-clock"></i>{{ formatTime(event.StartTime) }} to {{ formatTime(event.EndTime) }}</p>
              <router-link
                v-if="!$globalStore.user"
                class="button is-success"
                to="/login"
                tag="button"
              >
                Join Event
              </router-link>
              <button
                v-else
                v-on:click="handleToggleEvent(event.EventID, !event.IsAttending)"
                class="button"
                v-bind:class="{
                  'is-success': !event.IsAttending,
                  'is-danger': event.IsAttending,
                  'is-loading': eventLoadings[event.EventID]
                }"
              >
                {{ event.IsAttending ? 'Leave Event' : 'Join Event' }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section" v-if="isVenueLoading || venueError">
      <p v-if="isVenueLoading">Loading venue data...</p>
      <p v-if="!isVenueLoading && venueError">{{ venueError }}</p>
    </div>
    <AddEvent
      v-if="showAddEventModal"
      v-bind:venueID="$route.params.id"
      v-on:close="handleCloseAddEvent"
      v-on:eventAdded="handleAddEvent"
    />
  </div>
</template>

<style lang="scss">
.events {
  margin-top: 2rem;
}

.header-text {
  padding-right: 3rem;
}

.day-graph {
  text-align: center;
  padding-right: 20px;
  .title {
    margin-bottom: 1rem;
  }
}

.event-sport {
  font-weight: semibold;
  margin-bottom: 0.75rem;
}

.filter-header {
  .title {
    margin: 0;
  }
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.filters .button {
  justify-content: flex-start;
  font-weight: bold;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
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
import {
  getVenue,
  reverseGeocode,
  joinEvent,
  leaveEvent,
  formatDate,
  formatTime
} from '../util'
import AddEvent from '../components/AddEvent'
import DayPopularity from '../components/DayPopularity'
import { emojiBySport } from '../util'

const initialSelection = {}
for (let sport in emojiBySport) {
  initialSelection[sport] = true
}

export default {
  name: "VenuePage",
  components: {
    AddEvent,
    DayPopularity
  },
  data: function() {
    return {
      isVenueLoading: false,
      venueError: '',
      events: [],
      isLocationLoading: false,
      locationError: '',
      location: null,
      showAddEventModal: false,
      eventLoadings: {},
      emojiBySport,
      selectedSports: this.$route.query.sport ? { [this.$route.query.sport]: true } : initialSelection,
      showAll: this.$route.query.sport ? false : true
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
    },
    handleAddEvent(event) {
      this.events = [event, ...this.events]
      this.showAddEventModal = false
    },
    handleToggleEvent(id, newState) {
      console.log('attempting to join event', id)
      this.eventLoadings = { ...this.eventLoadings, [id]: true }

      let promise
      if (newState) {
        promise = joinEvent(id)
      } else {
        promise = leaveEvent(id)
      }

      promise
        .then(data => {
          if (!data.error) {
            this.events = this.events.map(event => {
              if (event.EventID == id) return { ...event, IsAttending: newState }
              return event
            })
          }
        })
        .catch(console.error)
        .finally(() => { 
          this.eventLoadings = { ...this.eventLoadings, [id]: false }
        })
    },
    toggleSport(sport) {
      this.selectedSports = {
        ...this.selectedSports,
        [sport]: !this.selectedSports[sport]
      }

      if (!this.selectedSports[sport] && this.showAll) {
        this.showAll = false
      }

      const totalSports = 8
      let numSelected = 0
      for (let sport in this.selectedSports) {
        if (this.selectedSports[sport]) numSelected++
      }

      if (this.selectedSports[sport] && numSelected == totalSports) this.showAll = true
    },
    toggleShowAll() {
      this.showAll = !this.showAll
      const newSelected = {}

      for (let sport in this.emojiBySport) {
        newSelected[sport] = this.showAll
      }

      this.selectedSports = newSelected
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
  },
  computed: {
    visibleEvents: function() {
      return this.events.filter(event => this.selectedSports[event.SportName])
    }
  }
};
</script>
