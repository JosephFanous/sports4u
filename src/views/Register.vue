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
        <input class="input is-dark" type="email" placeholder="John" />
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
     <label class="label">Last Name</label>
     <div class="control has-icons-left has-icons-right" id="lname">
        <input class="input is-dark" type="email" placeholder="Adams" />
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
      <label class="label">E-Mail</label>
      <div class="control has-icons-left has-icons-right" id="eml">
         <input class="input is-dark" type="email" placeholder="example@hotmail.com" />
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
         <input class="input is-dark" type="password" placeholder="••••••••••••">
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
      <label class="label">Verify Password</label>
      <div class="control has-icons-left has-icons-right" id="pss">
         <input class="input is-dark" type="password" placeholder="••••••••••••">
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
         <button class="button is-link">Sign Up</button>
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

  #eml, #pss, #fname, #lname, #vpss{
    width: 500px;
    margin: auto;
  }

  #form{
    text-align: center;
    margin-left: 350px;
    margin-right: 320px;
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
<script>
  export default{
    name: "Register",
    components: {
    },
  }
</script>
