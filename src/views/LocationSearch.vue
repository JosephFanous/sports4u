<template>
<div>
  <section class="section">
    <div class="container">
      <h1 class="title">Venue Search</h1>
      <div class="field">
        <label class="label is-block">Search Location</label>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Enter a location"
              v-model="query"
              v-on:keyup.enter="search"
              v-bind:class="{ 'is-danger': resultsError }"
          >
          </div>
          <div class="control">
            <button
              class='button is-link'
              v-on:click="search"
              v-bind:class="{ 'is-loading': resultsIsLoading }"
            >
              <span class='icon'>
                <i class='fas fa-search'></i>
              </span>
            </button>
          </div>
        </div>
        <p class="has-text-danger">{{ resultsError }}</p>
      </div>
      <ul v-if="!resultsIsLoading && !resultsError">
        <li v-for="result in results" v-bind:key="result.place_name">
          <div class="location-result">
            <div class='is-flex'>
              <div class='left'>
                <h6 class='title is-6'>{{ result.text }}</h6>
                <p class='subtitle is-7'>{{ result.place_name }}</p>
              </div>
              <button
                class='button is-small is-pulled-right'
                v-bind:class="{ 'is-loading': resultsIsLoading }"
                v-on:click="findPage(
                  result.center[0],
                  result.center[1],
                  result.place_name
                )"
              >
                Go to venue page
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</div>
</template>

<style lang="scss">
.location-result > div {
  justify-content: space-between;
}
</style>

<script>
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import { geocode, findVenuePage } from '../util';

export default {
  name: "LocationSearch",
  data: function() {
    return {
      query: '',
      results: null,
      resultsError: '',
      resultsIsLoading: false
    }
  },
  methods: {
    search() {
      console.log(this.query)
      this.resultsIsLoading = true
      this.resultsError = ''

      if (!this.query) {
        this.resultsIsLoading = false
        this.resultsError = 'Please enter a search query'
        return
      }

      geocode(this.query).then(features => {
        console.log(features)
        this.results = features
      }).catch(err => {
        console.error(err)
        this.resultsError = 'Could not perform search - please try again.'
      }).finally(() => {
        this.resultsIsLoading = false
      })
    },
    findPage(lon, lat, address) {
      findVenuePage(lon, lat, address).then(venueID => {
        this.$router.push({
          path: '/venue/' + venueID
        })
      }).catch(console.error)
    }
  },
  computed: {
  },
  mounted: function() {
  }
};
</script>
