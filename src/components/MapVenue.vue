<template>
  <div>
    <h4 class='title is-4'>{{ venue.text }}</h4>
    <p class='subtitle is-6'>{{ venue.properties.address || venue.place_name }}</p>
  </div>
</template>

<script>
export default {
  name: 'MapVenue',
  props: ['venue']
};
</script>

<style scoped lang="scss">
</style>
