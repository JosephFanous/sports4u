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
         <input class="input is-danger" type="email" placeholder="E-Mail address" />
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
         <input class="input is-danger" type="password" placeholder="Password">
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
         <button class="button is-link">Log In</button>
      </div>
      </div>
   </div>
      <div>
      <label class="label" id="sign">Don't have an account? Sign up below.</label>
      </div>
      <div class="control" id="log">
         <button class="button is-link">Sign Up</button>
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
    width: 500px;
    margin: auto;
  }

  #pss{
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
