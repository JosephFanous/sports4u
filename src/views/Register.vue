<template>
<div>
  <div id="header">
  <img src="images/logo.png" alt="Sports4U" id = "s4upic"/>
  <h1 class="title is-1">Sports4U</h1>
  </div>
  <div id="form" class="box">
  <div class="field">
     <label class="label">First Name</label>
     <div class="control has-icons-left has-icons-right" id="fname">
        <input v-on:keyup.enter="signUP" v-model="First" class="input is-dark" v-bind:class="{'is-danger': firsterr}" type="text" placeholder="John" />
        <span class="icon is-small is-left">
           <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
           <i class="fas" v-bind:class="{'fa-exclamation-triangle': firsterr}"></i>
        </span>
        <p id="firsttxt"> {{firsterr}} </p>
     </div>
  </div>

  <div class="field">
     <label class="label">Last Name</label>
     <div class="control has-icons-left has-icons-right" id="lname">
        <input v-on:keyup.enter="signUP" v-model="Last" class="input is-dark" v-bind:class="{'is-danger': lasterr}" type="text" placeholder="Adams" />
        <span class="icon is-small is-left">
           <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
           <i class="fas" v-bind:class="{'fa-exclamation-triangle': lasterr}"></i>
        </span>
        <p id="lasttxt"> {{lasterr}} </p>
     </div>
  </div>

  <div class="field">
     <label class="label">Username</label>
     <div class="control has-icons-left has-icons-right" id="usrnm">
        <input v-on:keyup.enter="signUP" v-model="Username" class="input is-dark" v-bind:class="{'is-danger': usererr}" type="text" placeholder="kingzilla" />
        <span class="icon is-small is-left">
           <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
           <i class="fas" v-bind:class="{'fa-exclamation-triangle': usererr}"></i>
        </span>
        <p id="usertxt"> {{usererr}} </p>
     </div>
  </div>

   <div class="field">
      <label class="label">E-Mail</label>
      <div class="control has-icons-left has-icons-right" id="eml">
         <input v-on:keyup.enter="signUP" v-model="Email" class="input is-dark" v-bind:class="{'is-danger': emailerr}" type="email" placeholder="example@hotmail.com" />
         <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas" v-bind:class="{'fa-exclamation-triangle': emailerr}"></i>
         </span>
         <p id="emailtxt"> {{emailerr}} </p>
      </div>
   </div>

   <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right" id="pss">
         <input v-on:keyup.enter="signUP" v-model="Password" class="input is-dark" v-bind:class="{'is-danger': psserr}" type="password" placeholder="••••••••••••">
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
      <label class="label">Verify Password</label>
      <div class="control has-icons-left has-icons-right"  id="vpss">
         <input v-on:keyup.enter="signUP" v-model="vPassword" class="input is-dark" v-bind:class="{'is-danger': vpsserr}" type="password" placeholder="••••••••••••">
         <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas" v-bind:class="{'fa-exclamation-triangle': vpsserr}"></i>
         </span>
         <p id="vpsstxt"> {{vpsserr}} </p>
      </div>
   </div>

   <div class="field">
      <div class="control" id="log">
         <button v-on:click="signUP"class="button is-link">Sign Up</button>
      </div>
      </div>
   </div>
      <div>
      <label class="label" id="sign">Already have an account? Log in below.</label>
      </div>
      <div class="control" id="log">
        <router-link class="button is-link" to="/login">Log In</router-link>
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

  #eml, #pss, #fname, #lname, #vpss, #usrnm{
    width: 500px;
    margin: auto;
  }

  #vpss{
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
  }
  .field{
    label{
      padding-left: 5px;
    }
    text-align: left;
  }
  #firsttxt, #lasttxt, #usertxt, #emailtxt, #psstxt, #vpsstxt{
    text-align: center;
  }
</style>
<script>
  export default{
    name: "Register",
    data: function() {
      return{
        First: null,
        Last: null,
        Username: null,
        Email: null,
        Password: null,
        vPassword: null,
        firsterr: '',
        lasterr: '',
        usererr: '',
        emailerr: '',
        psserr: '',
        vpsserr: ''
      }
    },
    components: {
    },
    methods:{
      signUP: function(){
        const apiUrl = process.env.VUE_APP_API_URL
        this.firsterr = '';
        this.lasterr = '';
        this.usererr = '';
        this.emailerr = '';
        this.psserr = '';
        this.vpsserr = '';
        let next = true
        if(!this.First){
          this.firsterr = 'Please enter your first name.'
          next = false
        }
        if(!this.Last){
          this.lasterr = 'Please enter your last name.'
          next = false
        }
        if(!this.Username){
          this.usererr = 'Please enter your username.'
          next = false
        }
        if(!this.Email){
          this.emailerr = 'Please enter your email.'
          next = false
        }
        if(!this.Password){
          this.psserr = 'Please enter your password.'
          next = false
        }
        if(!this.vPassword){
          this.vpsserr = 'Please verify your password.'
          next = false
        }
        if(this.Password != this.vPassword){
          this.vpsserr = 'Password does not match. Please try again.'
        }
        if(next == true){
          fetch(`${apiUrl}/register`, {
            method: 'post',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              First: this.First,
              Last: this.Last,
              Username: this.Username,
              Email: this.Email,
              Password: this.Password
            })
          })
          .then(res => res.json())
          .then(data =>{
          if(data.success){
            this.$globalStore.user = data.user
            this.$router.push({
              path: '/'
            })
            return
          }
          if (data.errors.Email){
            this.emailerr = 'This email is taken. Please enter another one.';
          }
          if (data.errors.Username){
            this.usererr = 'This username is taken. Please enter another one.'; //still have to do conditional for if too short/long
          }
        })
      }
      }
    }
  }
</script>
