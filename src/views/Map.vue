<template>
  <div class="map columns is-gapless">
    <div class="sidebar has-text-left column is-4">
      <div class="section">
        <h1 class="title">Sport Finder</h1>
        <div class="field">
          <label class="label">Sport</label>
          <div class="control is-expanded">
            <div class="select is-fullwidth">
              <select>
                <option>Basketball</option>
                <option>Table Tennis</option>
                <option>Volleyball</option>
                <option>Badminton</option>
              </select>
            </div>
          </div>
        </div>
        <div class="location-row">
          <div class="field is-inline-block radius-field">
            <label class="label">Search Radius</label>
            <div class="control">
              <input class="input" type="number" placeholder="Enter a radius">
            </div>
          </div>
          <div class="field is-inline-block location-field">
            <label class="label">Search Location</label>
            <div class="control is-expanded">
              <input class="input" type="text" placeholder="Enter a location">
            </div>
          </div>
        </div>
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

function onMount() {
  mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
  // eslint-disable-next-line
  var map = new mapboxgl.Map({
    container: "map-container",
    style: "mapbox://styles/mapbox/streets-v11"
  });
}

export default {
  name: "Map",
  components: {
  },
  mounted: onMount
};
</script>
