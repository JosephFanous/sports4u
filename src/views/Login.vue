<template>
<div>
  <div id="header">
  <img src="images/logo.png" alt="Sports4U" id = "s4upic"/>
  <h1 class="title is-1">Sports4U</h1>
  </div>
  <div id="form" class="box">
   <div class="field">
      <label id="tag" class="label">E-Mail</label>
      <div class="control has-icons-left has-icons-right" id="eml">
         <input v-on:keyup.enter="login" v-model="email" class="input is-dark" v-bind:class="{'is-danger': emlerr}" type="email" placeholder="E-Mail address" />
         <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas" v-bind:class="{'fa-exclamation-triangle': emlerr}"></i>
         </span>
         <p id="emltxt"> {{emlerr}} </p>
      </div>
   </div>

   <div class="field">
      <label id="tag" class="label">Password</label>
      <div class="control has-icons-left has-icons-right" id="pss">
         <input v-on:keyup.enter="login" v-model="password" class="input is-dark" v-bind:class="{'is-danger': psserr}" type="password" placeholder="Password">
         <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
         </span>
         <span class="icon is-small is-right">
           <i class="fas" v-bind:class="{'fa-exclamation-triangle': psserr}"></i>
         </span>
         <p id="psstxt"> {{psserr}} </p>
      </div>
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
  #tag{
    text-align: center;
  }
  #s4upic{
    height: 100px;
    width: 190px;
  }

  #eml, #pss{
    width: 400px;
    margin: auto;
  }

  #pss{
    padding-bottom: 25px;
  }

  #form{
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    min-width: 647px;
  }
  #log{
    text-align: center;
    margin: auto;
  }
  #sign{
    padding-top: 50px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .field{
    label{
      padding-left: 5px;
    }
    text-align: left;
  }
  #emltxt, #psstxt{
    text-align: center;
  }
</style>
<script>
  export default{
    name: "Login",
    data: function() {
      return {
        email: null,
        password: null,
        emlerr: '',
        psserr: ''
      }
    },
    components: {
    },
    methods: {
      login: function() {
        const apiUrl = process.env.VUE_APP_API_URL
        this.emlerr = '';
        this.psserr = '';
        let next = true
        if(!this.email){
          this.emlerr = 'Please enter your email.'
          next = false
        }
        if(next==true){
        fetch(`${apiUrl}/login`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          // to be able to receive cookies back
          credentials: 'include',
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })
          .then(res => res.json())
          .then(data => {
            if(data.success){
              this.$globalStore.user = data.user
              this.$router.push({
                path: '/'
              })
              return
            }
            if (data.errors.email){
              this.emlerr = 'Email could not be found. Please enter a valid Email.';
            }
            if (data.errors.password){
              this.psserr = 'Password is incorrect.';
            }
          })
        }
      }
    }
  }
</script>
