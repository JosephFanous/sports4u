<template>
<div class="mappage">
  <div class="map columns is-gapless">
    <div class="sidebar has-text-left column is-4 has-background-white-ter">
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
                <option>Soccer</option>
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
          v-if="!searchCenterError & !isSearchCenterResultsLoading && searchCenterResults && searchCenterResults.length && !searchLocationCenter"
          class='location-results'
        >
          <li v-for="result in searchCenterResults" v-bind:key="result.id">
            <LocationResult v-on:locationSelect='handleLocationSelect' v-bind:result='result' />
          </li>
        </ul>
        <p class="error-text" v-if="searchCenterError">{{ searchCenterError }}</p>
        <p v-if="!searchCenterError && !isSearchCenterResultsLoading && searchCenterResults && !searchCenterResults.length">No results - try a different search query.</p>
        <div class="errors">
          <p v-for="message in errorMessages" v-bind:key="message" class="has-text-danger">
            {{ message }}
          </p>
        </div>
        <button
          v-on:click="handleUpdateClick"
          class="button is-link"
          v-bind:class="{ 'is-loading': isVenueSearchLoading }"
        >
          Update Search
        </button>
        <p v-if="venueSearchError">{{ venueSearchError }}</p>
      </div>
      <hr>
      <section class="section section-venue">
        <MapVenue v-if="selectedVenue" v-bind:venue="selectedVenue" />
      </section>
    </div>
    <div id="map-container" class="column">
    </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.map {
  height: 100%;
}

.mappage {
  height: calc(100% - 100px);
}

.sidebar {
  background-color: white;
}

.sidebar .section {
  padding-bottom: 2rem;
}

hr {
  margin: 0;
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

.section.section-venue {
  padding-top: 1.5rem;
}
</style>

<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import { getClientLocation, metresToPixels } from '../util';
import { toRadians } from '../../common/util';
import LocationResult from '../components/LocationResult.vue';
import MapVenue from '../components/MapVenue.vue';
import Navbar from '../components/Navbar.vue';

// TODO: search for location from text box and list possible and select to set center of search radius - DONE
// TODO: set default search center to client location, if available - DONE
// TODO: display some type of search radius circle on map - DONE
// TODO: setting sport from URL param - DONE
// TODO: form validation - DONE
// TODO: display venue results on map - DONE
// TODO: reverse geocoding for coordinate click -> location - DONE
//       clicking on a location on the map should display a view that shows the name, address, and sports at that
//       location
//       - use layer with features: https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
// on search, we get points from the server and display them on the map
// when a venue is clicked, we send a request to reverse geocode the venue's coordinates to get
// the correct location data
// we also send a request to the api to get all the sports data for that venue

export default {
  name: "Map",
  components: {
    LocationResult,
    MapVenue,
    Navbar,
  },
  data: function() {
    return {
      map: null,
      searchRadius: 100,
      searchLocation: '',
      sport: this.$route.query.sport || 'Basketball',
      fieldErrors: {},

      isSearchCenterResultsLoading: false,
      searchCenterResults: null,
      searchCenterError: '',
      searchLocationCenter: null, // coords returned by mapbox have format [longitude, latitude]

      isVenueSearchLoading: false,
      venueSearchError: '',
      venueResults: [], // array of { id: number, coordiantes: [lon, lat] } of search results

      selectedVenue: null
    }
  },
  methods: {
    handleUpdateClick: function() {
      this.fieldErrors = {}
      const errors = {}
      if (!this.searchLocationCenter) errors.searchLocation = 'Please select a search location.'
      if (this.searchRadius <= 0) errors.searchRadius = 'Please enter a search radius greater than zero.'

      if (Object.values(errors).length) {
        this.fieldErrors = errors
        return
      }

      const [lon, lat] = this.searchLocationCenter

      this.isVenueSearchLoading = true
      this.venueSearchError = ''
      this.updateRadiusOnMap()
      
      this.map.jumpTo({
        center: { lon, lat },
        zoom: 8
      });

      // fetch venue points to display on map
      const apiUrl = process.env.VUE_APP_API_URL
      fetch(`${apiUrl}/venues/search?lon=${lon}&lat=${lat}&radius=${this.searchRadius}&sport=${this.sport}`)
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error(res.status)
        })
        .then(json => {
          this.venueResults = json.venues

          if (this.map.getLayer('venues')) this.map.removeLayer('venues')
          if (this.map.getSource('venues')) this.map.removeSource('venues')

          const features = json.venues.map(venue => {
            return {
              type: 'Feature',
              properties: {
                venueId: venue.id
              },
              geometry: {
                type: 'Point',
                coordinates: [venue.Longitude, venue.Latitude]
              }
            }
          })
          this.map.addSource('venues', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features
            }
          })

          this.map.addLayer({
            id: 'venues',
            type: 'symbol',
            source: 'venues',
            layout: {
              'icon-image': 'sport-marker',
              'icon-allow-overlap': true
            }
          })
        })
        .catch(err => {
          this.venueSearchError = 'An error occurred - try searching again.'
        })
        .finally(() => {
          this.isVenueSearchLoading = false
        })
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
      this.searchCenterError = ''
      this.searchLocationCenter = null
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
          this.searchCenterError = 'An error occurred - try searching again.'
        })
        .finally(() => {
          this.isSearchCenterResultsLoading = false
        })
    },
    updateRadiusOnMap: function() {
      const searchRadiusMetres = parseFloat(this.searchRadius) * 1000

      const searchRadiusSource = {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: this.searchLocationCenter
          }
        }
      }

      if (this.map.getLayer('search-radius')) this.map.removeLayer('search-radius')
      if (this.map.getSource('search-radius')) this.map.removeSource('search-radius')

      this.map.addLayer({
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
            20, metresToPixels(searchRadiusMetres, this.searchLocationCenter[1], 20)
          ],
          'circle-stroke-color': '#0000ff',
          'circle-stroke-opacity': 0.3,
          'circle-stroke-width': 2
        }
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
    this.map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11?optimize=true"
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'bottom-right');

    this.map.on('load', () => {
      this.map.on('mouseenter', 'venues', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      })

      this.map.on('mouseleave', 'venues', () => {
        this.map.getCanvas().style.cursor = '';
      })

      this.map.on('click', 'venues', event => {
        this.selectedVenue = event.features[0]
      })

      this.map.loadImage('images/sport-marker.png', (err, image) => {
        if (err) console.error(err)
        this.map.addImage('sport-marker', image)
      })

      getClientLocation(location => {
        const { coords } = location;
        const endpoint = `geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json`

        this.map.jumpTo({
          center: { lon: coords.longitude, lat: coords.latitude },
          zoom: 8
        });

        // get client location data from mapbox using client's coordinates
        fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
          .then(res => {
            if (res.ok) return res.json()
            else throw new Error(res.status)
          })
          .then(json => {
            const loc = json.features[0]
            this.searchLocation = loc.place_name
            this.searchLocationCenter = loc.center
            this.updateRadiusOnMap()
            this.handleUpdateClick()
          })
      });
    })

    // for reverse geocoding (coords -> location)
    // const venues = []
    // this.map.on('click', (event) => {
    //   const endpoint = `geocoding/v5/mapbox.places/${event.lngLat.lng},${event.lngLat.lat}.json`
    //   fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
    //     .then(res => {
    //       if (res.ok) return res.json()
    //       else throw new Error(res.status)
    //     })
    //     .then(json => {
    //       console.log(json.features)
    //       const location = json.features[0]
    //       const placeType = location.place_type[0]
    //       // if (placeType == 'address' || placeType == 'poi') {
    //       //   this.selectedLocation = location
    //       //   venues.push(location.geometry.coordinates)
    //       //   console.log(venues)
    //       // }
    //     })
    //   console.log(event)
    // })
  }
};
</script>
