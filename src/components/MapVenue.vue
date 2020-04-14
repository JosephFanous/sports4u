<template>
  <div>
    <p v-if="isLocationLoading">Loading location data...</p>
    <p class='error-text' v-if="!isLocationLoading && locationError">{{ locationError }}</p>
    <div class='location-data' v-if="!isLocationLoading && !locationError && location">
      <div class="header-location is-flex">
        <h4 class="title is-4">{{ location.text }}</h4>
        <router-link
          v-bind:to="`/venue/${venue.properties.venueId}`"
          class="button is-small is-pulled-right"
        >
          Go to venue page
        </router-link>
      </div>
      <p class="subtitle is-6">{{ location.properties.address || location.place_name }}</p>
    </div>
    <p v-if="isDataLoading">Loading venue data...</p>
    <p class='error-text' v-if="!isDataLoading && dataError">{{ dataErrror }}</p>
    <div v-if="!isDataLoading && !dataError && data" class="sports">
      <h5 class="title-sports title is-5">Sports</h5>
      <p class='error-text' v-if="!data.sports.length">No sports at this location currently... 🙁</p>
      <button
        v-for="sport in data.sports"
        v-bind:key="sport"
        class="button is-light is-medium is-fullwidth"
      >
        {{ emojiBySport[sport] + ' ' + sport }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapVenue",
  props: ["venue"],
  data: function() {
    return {
      emojiBySport: {
        'Basketball': '🏀',
        'Volleyball': '🏐',
        'Table Tennis': '🏓',
        'Soccer': '⚽',
        'Badminton': '🏸'
      },

      isLocationLoading: false,
      locationError: '',
      location: null,

      isDataLoading: false,
      dataError: '',
      data: null
    }
  },
  methods: {
    updateData: function() {
      this.isLocationLoading = true
      this.locationError = ''

      const [lon, lat] = this.venue.geometry.coordinates
      const { venueId } = this.venue.properties

      const endpoint = `geocoding/v5/mapbox.places/${lon},${lat}.json`
      // get location data for venue using the venue's coordinates
      fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error(res.status)
        })
        .then(json => {
          this.location = json.features[0]
        })
        .catch(err => {
          this.locationError = 'Could not fetch venue location data - try selecting the venue again.'
        })
        .finally(() => {
          this.isLocationLoading = false
        })

      this.isDataLoading = true
      this.dataError = ''

      // get sports data using venueId
      const apiUrl = process.env.VUE_APP_API_URL
      fetch(`${apiUrl}/venues/${venueId}/sports`)
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error(res.status)
        })
        .then(json => {
          // console.log(json)
          this.data = json
          // console.log(this.selectedVenue)
        })
        .catch(err => {
          this.dataError = 'Could not fetch venue data - try selecting the venue again.'
        })
        .finally(() => {
          this.isDataLoading = false
        })
    }
  },
  watch: {
    'venue': function() {
      this.updateData()
    }
  }
};
</script>

<style scoped lang="scss">
.header-location {
  justify-content: space-between;
  margin-bottom: 0.25rem;
  .title {
    margin-bottom: 0;
  }
}

.location-data{
  margin-bottom: 1.5rem;
}

.sports {
  .title-sports {
    margin-bottom: 0.5rem;
  }
  .button {
    margin-bottom: 0.25rem;
    justify-content: flex-start;
    font-weight: bold;
  }
}

.error-text {
  margin-bottom: 0.75rem;
}
</style>
