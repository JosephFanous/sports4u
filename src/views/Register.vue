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
        <input v-model="First" class="input is-dark" type="text" placeholder="John" />
        <span class="icon is-small is-left">
           <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
           <i class="fas fa-exclamation-triangle"></i>
        </span>
        <p id="firsttxt"> {{firsterr}} </p>
     </div>
  </div>

  <div class="field">
     <label class="label">Last Name</label>
     <div class="control has-icons-left has-icons-right" id="lname">
        <input v-model="Last" class="input is-dark" type="text" placeholder="Adams" />
        <span class="icon is-small is-left">
           <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
           <i class="fas fa-exclamation-triangle"></i>
        </span>
        <p id="lasttxt"> {{lasterr}} </p>
     </div>
  </div>

  <div class="field">
     <label class="label">Username</label>
     <div class="control has-icons-left has-icons-right" id="usrnm">
        <input v-model="Username" class="input is-dark" type="text" placeholder="kingzilla" />
        <span class="icon is-small is-left">
           <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
           <i class="fas fa-exclamation-triangle"></i>
        </span>
        <p id="usertxt"> {{usererr}} </p>
     </div>
  </div>

   <div class="field">
      <label class="label">E-Mail</label>
      <div class="control has-icons-left has-icons-right" id="eml">
         <input v-model="Email" class="input is-dark" type="email" placeholder="example@hotmail.com" />
         <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
         </span>
         <p id="emailtxt"> {{emailerr}} </p>
      </div>
   </div>

   <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right" id="pss">
         <input v-model="Password" class="input is-dark" type="password" placeholder="••••••••••••">
         <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
         </span>
         <p id="psstxt"> {{psserr}} </p>
      </div>
   </div>

   <div class="field">
      <label class="label">Verify Password</label>
      <div class="control has-icons-left has-icons-right" id="vpss">
         <input class="input is-dark" type="password" placeholder="••••••••••••">
         <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
         </span>
         <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
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
            this.$globalStore.currentUsername = data.Username
            this.$router.push({
              path: '/'
            })
            return
          }
          if (data.errors.First){
            this.firsterr = 'Please enter your first name.';
          }
          if (data.errors.Last){
            this.lasrterr = 'Please enter your Last name.';
          }
          if (data.errors.Email){
            this.emailerr = 'Please enter a Email.'; //still have to do conditional for taken
          }
          if (data.errors.Username){
            this.usererr = 'This username is taken. Please enter another one.'; //still have to do conditional for if anything there or too short/long
          }
          if (data.errors.Password){
            this.psserr = 'Please enter a password.'; //still have to do conditional for does not match or too short/long
          }
        })
      }
    }
  }
</script>
