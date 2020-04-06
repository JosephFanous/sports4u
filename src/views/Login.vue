<template>
<div>
  <div id="header">
  <img src="images/logo.png" alt="Sports4U" id = "s4upic"/>
  <h1 class="title is-1">Sports4U</h1>
  </div>
  <div id="form" class="content-tab">
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
         <button class="button is-link">Register</button>
      </div>
   </div>
   </div>
  </div>
</template>
<style lang="scss" scoped>
  h1{
    text-align: center;
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
  }
  #log{
    text-align: center;
    margin: auto;
  }
</style>
<script>
  export default{
    name: "Login",
    components: {
    },
  }
</script>
