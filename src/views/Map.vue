<template>
  <div class="map columns is-gapless">
    <div class="sidebar has-text-left column is-4">
      <div class="section">
        <h1 class="title">Sport Finder</h1>
        <div class="field">
          <label class="label">Sport</label>
          <div class="control is-expanded">
            <div class="select is-fullwidth">
              <select v-model="sport">
                <option>Basketball</option>
                <option>Table Tennis</option>
                <option>Volleyball</option>
                <option>Badminton</option>
              </select>
            </div>
          </div>
        </div>
        <div class="location-row is-flex">
          <div class="field radius-field">
            <label class="label">Search Radius</label>
            <div class='field has-addons'>
              <div class="control">
                <input class="input" type="number" v-model="searchRadius">
              </div>
              <div class="control">
                <div class='button is-static'>km</div>
              </div>
            </div>
          </div>
          <div class="field location-field">
            <label class="label is-block">Search Location</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                class="input"
                type="text"
                placeholder="Enter a location"
                v-model="searchLocation"
                v-on:keyup.enter="handleLocationSearch"
              >
              </div>
              <div class="control">
                <button
                  v-on:click="handleLocationSearch"
                  class='button is-link'
                  v-bind:class="{ 'is-loading': isSearchCenterResultsLoading }"
                >
                  <span class='icon'>
                    <i class='fas fa-search'></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ul v-if="searchCenterResults && searchCenterResults.length && !searchLocationCenter" class='location-results'>
          <li v-for="result in searchCenterResults" v-bind:key="result.id">
            <LocationResult v-on:locationSelect='handleLocationSelect' v-bind:result='result' />
          </li>
        </ul>
        <p v-if="searchHasError">An error occurred - try searching again.</p>
        <p v-if="searchCenterResults && !searchCenterResults.length">No results - try a different search query.</p>
      </div>
    </div>
    <div id="map-container" class="column">
    </div>
  </div>
</template>

<style lang="scss">
.map {
  height: 100%;
}

.location-results {
  height: 250px;
  overflow-y: scroll;
  border: 1px solid $grey-lighter;
  border-radius: $radius;
  li {
    padding: 0.75rem 1rem;
  }
  li:nth-child(even) {
    background-color: $light;
  }
}

.location-row {
  width: 100%;
  .radius-field { 
    width: 30%;
  }
  .location-field { 
    width: 70%;
    padding-left: 1rem;
  }
}
</style>

<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import { getClientLocation } from '../util';
import LocationResult from '../components/LocationResult.vue';

// TODO: search for location from text box and list possible and select to set center of search radius - DONE
// TODO: set default search center to client location, if available
// TODO: search from form
// TODO: setting fields from URL params
// TODO: reverse geocoding for coordinate click -> location

export default {
  name: "Map",
  components: {
    LocationResult
  },
  data: function() {
    return {
      searchCenterResults: null,
      isSearchCenterResultsLoading: false,
      searchRadius: 10,
      searchLocation: '',
      sport: 'Basketball',
      searchLocationCenter: null,
      searchHasError: false
    }
  },
  methods: {
    handleLocationSelect: function(location) {
      console.log(location)
      console.log(this.sport)
      this.searchLocation = location.place_name
      this.searchLocationCenter = location.center
    },
    handleLocationSearch: function() {
      const endpoint = `geocoding/v5/mapbox.places/${this.searchLocation}.json`;
      this.isSearchCenterResultsLoading = true
      this.searchLocationCenter = null
      this.searchHasError = false
      fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error(res.status)
        })
        .then(json => {
          console.log('success:', json);
          this.searchCenterResults = json.features;
        })
        .catch(err => {
          this.searchHasError = true
        })
        .finally(() => {
          this.isSearchCenterResultsLoading = false
        })
    }
  },
  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    // eslint-disable-next-line
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11?optimize=true"
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    // const marker = new mapboxgl.Marker()
    //   .setLngLat([30.5, 50.5])
    //   .addTo(map);

    getClientLocation(location => {
      const { coords } = location;
      map.jumpTo({
        center: { lon: coords.longitude, lat: coords.latitude },
        zoom: 12
      });
    });
  }
};
</script>
