<template>
  <div id="app" class="has-background-white-ter" >
    <!-- <Navbar /> -->
     <Navbar v-if="$route.name !== 'AfterLogin'" />
     <Chatbox v-if="$route.name !== 'Login' && this.$globalStore.user!== null" />
    <!-- <div v-if="$route.name !== 'Map'" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/map">Map</router-link>
    </div> ! -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Chatbox from './components/Chatbox'
import { checkAuth } from './util'

export default {
  components: {
    Navbar,
    Chatbox,
  },
  mounted: function() {
    // check if the user is logged in
    checkAuth()
      .then(user => {
        this.$globalStore.user = user
      })
  }
}
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";

html, body {
  height: 100%;
  overflow-y: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  overflow: auto;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
