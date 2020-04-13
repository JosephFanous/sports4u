<template>
  <div>
    <h1>Venue Page</h1>
    <p v-if="showHello">Hello!</p>
    <div id="map-container"></div>
  </div>
</template>

<style lang="scss">
#map-container {
  width: 500px;
  height: 500px;
}
</style>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: "VenuePage",
  components: {
  },
  data: function() {
    return {
      showHello: true
    }
  },
  methods: {
  },
  computed: {
  },
  mounted: function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9iYWNoaWxsYSIsImEiOiJjazg2bjkwbngwampwM2RqeHFneDd2amVkIn0.c1VnseQIubYRpTQ6c_fg-g';
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }
};
</script>
