<template>
  <nav class="navbar has-background-white-ter" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <div class="navbar-item">
        <div class="buttons is-large">
          <router-link class="button is-large" v-bind:to="`/`">
          <span class="icon">
           <i class="fas fa-home"></i>
          </span>
          <span>Home</span>
          </router-link>
          <router-link class="button is-large" v-bind:to="`/about`">About Us</router-link>
          <router-link v-if="isSignedIn"class="button is-large" v-bind:to="`/afterLogin`">Dashboard</router-link>
        </div>
        <div class="centerlogo">
          <img class="logo" src="images/atheletes.png"  alt="Sports4U" />
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div v-if="isSignedIn" class="buttons">
           <router-link  class="button is-large" to="/afterLogin">
             <span class="icon">
              <i class="fas fa-user"></i>
             </span>
             <span>Logged in as: {{user_name}} </span>
           </router-link>
           
           <Button v-on:click="handleSignOutClick" class="button has-background-light is-medium" to="/">Sign Out</Button>
        </div>
        <div v-else class="buttons">
           <router-link  class="button is-danger is-large" to="/register">Register</router-link>
           <router-link class="button has-background-light is-large" to="/login">Log in</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
//TODO Add Navbars ontop of everypage
//TODO Create Proper Router links on Navbars
//TODO Maybe center logo
  export default {
    name: 'Navbar',
  };
</script>
