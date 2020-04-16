<template>
  <nav class="navbar has-background-white" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <div class="navbar-item">
        <div class="buttons">
          <router-link class="button" v-bind:to="`/`">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          <span>Home</span>
          </router-link>
          <router-link class="button" v-bind:to="`/about`">About Us</router-link>
          <router-link v-if="$globalStore.user" class="button" v-bind:to="`/afterLogin`">Dashboard</router-link>
        <div class="field has-addons">
          <div class="control">
            <input v-on:keyup.enter="handleSearch" v-model="searchQuery" class="input" type="text" placeholder="Find a location">
          </div>
          <div class="control">
            <router-link class="button is-link" tag="button" v-bind:to="'/locationsearch?query=' + searchQuery">
              <span class="icon is-small">
                <i class="fas fa-search"></i>
              </span>
            </router-link>
          </div>
        </div>
        </div>
        <div class="centerlogo">
          <!-- <img class="logo"  alt="Sports4U" /> -->
        </div>
      </div>
      <div class="navbar-item">
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div v-if="$globalStore.user" class="buttons">
           <router-link  class="button" to="/afterLogin">
             <span class="icon">
              <i class="fas fa-user"></i>
             </span>
             <span>Logged in as: {{ $globalStore.user.username }} </span>
           </router-link>
           <Button
            v-on:click="handleSignOutClick"
            class="button is-danger"
            v-bind:class="{ 'is-loading': isLogoutLoading }"
            >Sign Out</Button>
        </div>
        <div v-else class="buttons">
           <router-link  class="button is-link" to="/register">Register</router-link>
           <router-link class="button has-background-light" to="/login">Log in</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
  .navbar .navbar-item .buttons{
    margin-bottom: 0;
  }
  .navbar {
    height: 100px;
    background-color: white;
    // border-bottom: 1px solid $grey-darker;
  }
</style>
<script>
import { endSession } from '../util'
//TODO Add Navbars ontop of everypage
//TODO Create Proper Router links on Navbars
//TODO Maybe center logo
  export default {
    name: 'Navbar',
    props: {
      isSignedIn: Boolean,
      user_name: String,
    },
    data: function() {
      return {
        isLogoutLoading: false,
        searchQuery: ''
      }
    },
    methods: {
      handleSignOutClick() {
        console.log("User Signed Out")
        this.isLogoutLoading = true

        endSession().then(data => {
          this.$globalStore.user = null
        }).finally(() => {
          this.isLogoutLoading = false
        })
      },
      handleSearch() {
        this.$router.push({
          path: '/locationsearch',
          query: {
            query: this.searchQuery
          }
        })
      }
    }
  };
</script>
