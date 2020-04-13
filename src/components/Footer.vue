<template>
  <div class="Footerpage">
    <div class="Columns">
      <section class="col1">
        <h1>Contact Info</h1>
        <ul>
          <li>emails</li>
          <li>phone number</li>
        </ul>
      </section>
      
      <section class="col2">
      <h1>Quick links to parts of our website</h1>
      <router-link v-if="isSignedIn" v-bind:to="`/afterLogin`">Dashboard</router-link>
      <router-link v-bind:to="`/about`">About Us</router-link>
      </section>
      
      <section class="col3">
      
      </section>
    </div>
  
  </div>
</template>

<script>
//TODO ADD FOOTER Content
//TODO Style Footer
</script>
