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
import { getClientLocation } from '../util';

// TODO: geocode entered location to coords and show marker on map
// TODO: setting fields from URL params
// TODO: reverse geocoding for coordinate click -> location

export default {
  name: "Map",
  components: {},
  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    // eslint-disable-next-line
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11"
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    // const query = 'ontario tech university';
    // const endpoint = `geocoding/v5/mapbox.places/${query}.json`;
    // fetch(`https://api.mapbox.com/${endpoint}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
    //   .then(res => res.json())
    //   .then(json => console.log(json));

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
