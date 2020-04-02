<template>
  <div class="map columns is-gapless">
    <div class="sidebar has-text-left column is-4">
      <div class="section">
        <h1 class="title">Sport Finder</h1>
        <div class="field">
          <label class="label">Sport</label>
          <div class="control is-expanded">
            <div class="select is-fullwidth">
              <select v-model="sport" v-on:change="handleSportChange">
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
                <input
                  class="input"
                  type="number"
                  v-bind:class="{ 'is-danger': fieldErrors.searchRadius }"
                  v-model="searchRadius"
                  v-on:change="handleRadiusChange"
                >
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
                v-on:input="handleSearchChange"
                v-bind:class="{ 'is-danger': fieldErrors.searchLocation }"
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
        <ul
          v-if="!searchHasError && !isSearchCenterResultsLoading && searchCenterResults && searchCenterResults.length && !searchLocationCenter"
          class='location-results'
        >
          <li v-for="result in searchCenterResults" v-bind:key="result.id">
            <LocationResult v-on:locationSelect='handleLocationSelect' v-bind:result='result' />
          </li>
        </ul>
        <p class="error-text" v-if="searchHasError">An error occurred - try searching again.</p>
        <p v-if="searchCenterResults && !searchCenterResults.length">No results - try a different search query.</p>
        <div class="errors">
          <p v-for="message in errorMessages" v-bind:key="message" class="has-text-danger">
            {{ message }}
          </p>
        </div>
        <button v-on:click="handleUpdateClick" class='button is-link'>Update Search</button>
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
  margin-bottom: 0.75rem;
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

.error-text, .errors p:last-child {
  margin-bottom: 0.75rem;
}
</style>

<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import { getClientLocation, metresToPixels } from '../util';
import LocationResult from '../components/LocationResult.vue';

// TODO: search for location from text box and list possible and select to set center of search radius - DONE
// TODO: set default search center to client location, if available - DONE
// TODO: display some type of search radius circle on map - DONE
// TODO: setting sport from URL param - DONE
// TODO: form validation - DONE
// TODO: reverse geocoding for coordinate click -> location
//       clicking on a location on the map should display a view that shows the name, address, and sports at that
//       location
// on search, we get points from the server and display them on the map
// we add click listeners to the points added that when clicked, reverse geocode the coordinates to an address
// we display the address and the sports data from the server for that location

export default {
  name: "Map",
  components: {
    LocationResult
  },
  data: function() {
    return {
      searchCenterResults: null,
      isSearchCenterResultsLoading: false,
      searchRadius: 100,
      searchLocation: '',
      sport: this.$route.query.sport || 'Basketball',
      searchLocationCenter: null, // coords returned by mapbox have format [longitude, latitude]
      searchHasError: false,
      fieldErrors: {}
    }
  },
  methods: {
    handleUpdateClick: function() {
      this.fieldErrors = {}
      const errors = {}
      if (!this.searchLocationCenter) errors.searchLocation = 'Please select a search location.'
      if (this.searchRadius <= 0) errors.searchRadius = 'Please enter a search radius greater than zero.'
      this.fieldErrors = errors
    },
    handleSportChange: function() {
      this.$router.push({
        path: this.$route.path,
        query: { sport: this.sport }
      })
    },
    handleRadiusChange: function() {
      this.fieldErrors = { ...this.fieldErrors, searchRadius: null }
    },
    handleSearchChange: function() {
      this.searchLocationCenter = null
      this.searchCenterResults = null
      this.fieldErrors = { ...this.fieldErrors, searchLocation: null }
    },
    handleLocationSelect: function(location) {
      this.fieldErrors = { ...this.fieldErrors, searchLocation: null }
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
  computed: {
    errorMessages: function() {
      // compute error messages array from fieldErrors object
      return Object.values(this.fieldErrors).filter(str => str)
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

    map.on('load', () => {
      getClientLocation(location => {
        const { coords } = location;
        const endpoint = `geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json`
        
        map.jumpTo({
          center: { lon: coords.longitude, lat: coords.latitude },
          zoom: 8
        });

        // const marker = new mapboxgl.Marker()
        //   .setLngLat([coords.longitude, coords.latitude])
        //   .addTo(map);
        
        fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
          .then(res => {
            if (res.ok) return res.json()
            else throw new Error(res.status)
          })
          .then(json => {
            const loc = json.features[0]
            if (loc) {
              this.searchLocation = loc.place_name
              this.searchLocationCenter = loc.center
              const searchRadiusMetres = parseFloat(this.searchRadius) * 1000
              
              const searchRadiusSource = {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: loc.center
                  }
                }
              }

              map.addLayer({
                id: 'search-radius',
                source: searchRadiusSource,
                type: 'circle',
                paint: {
                  'circle-color': '#6eb9ff',
                  'circle-opacity': 0.1,
                  'circle-radius': [
                    // https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#camera-expressions
                    // interpolate between 0 when completely zoomed out and pixel radius at max zoom
                    'interpolate', ['exponential', 2], ['zoom'],
                    0, 0,
                    20, metresToPixels(searchRadiusMetres, loc.center[1], 20)
                  ],
                  'circle-stroke-color': '#0000ff',
                  'circle-stroke-opacity': 0.3,
                  'circle-stroke-width': 2
                }
              })
            }
          })
      });
    })
  }
};
</script>
