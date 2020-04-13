<template>
<div>
  <div id="header">
  <img src="images/logo.png" alt="Sports4U" id = "s4upic"/>
  <h1 class="title is-1">Sports4U</h1>
  </div>
  <div id="form" class="box">
   <div class="field">
      <label class="label">E-Mail</label>
      <div class="control has-icons-left has-icons-right" id="eml">
         <input v-model="email" class="input is-dark" type="email" placeholder="E-Mail address" />
         <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
         </span>
      </div>
      <!-- <p class="help is-success">This E-Mail is available</p> -->
   </div>

   <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right" id="pss">
         <input v-model="password" class="input is-dark" type="password" placeholder="Password">
         <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
         </span>
      </div>
      <!-- <p class="help is-danger">This password does not meet our minimum requirements</p> -->
   </div>
   <div class="field">
      <div class="control" id="log">
          <button v-on:click="login" class="button is-link">Log In</button>
      </div>
      </div>
   </div>
      <div>
      <label class="label" id="sign">Don't have an account? Sign up below.</label>
      </div>
      <div class="control" id="log">
      <router-link class="button is-link" to="/register">Sign Up</router-link>
      </div>
  </div>
</template>
<style lang="scss" scoped>
  h1{
    text-align: center;
    padding-bottom: 5px;
  }
  button{
    text-align: center;
  }

  a{
    text-decoration: none;
  }

  #s4upic{
    height: 100px;
    width: 190px;
  }

  #eml{
    width: 400px;
    margin: auto;
  }

  #pss{
    width: 400px;
    margin: auto;
  }

  #form{
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  }
  #log{
    text-align: center;
    margin: auto;
  }
  #sign{
    padding-top: 50px;
    text-align: center;
  }
  .field{
    label{
      padding-left: 5px;
    }
    text-align: left;
  }
</style>
//TODO change variable signed in to true corresponding to the correct username
<script>
  export default{
    name: "Login",
    data: function() {
      return {
        email: null,
        password: null
      }
    },
    components: {
    },
    methods: {
      login: function() {
        const apiUrl = process.env.VUE_APP_API_URL
        fetch(`${apiUrl}/login`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })
          .then(res => res.json())
          .then(data => console.log(data))
      }
    }
  }
</script>
