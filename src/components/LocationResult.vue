<template>
  <div class='location-result'>
    <div class='is-flex'>
      <div class='left'>
        <h6 class='title is-6'>{{ result.text }}</h6>
        <p class='subtitle is-7'>{{ result.place_name }}</p>
      </div>
      <button
        v-on:click="$emit('locationSelect', result)"
        class='button is-small is-link is-pulled-right'
      >
        Select
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationResult',
  props: ['result']
};
</script>

<style scoped lang="scss">
.location-result > div {
  justify-content: space-between;
}
.left {
  padding-right: 1rem;
}
</style>
