<template>
  <div>
    <div class="container bootstrap snippet">
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Edit Profile</h1>
        <hr>
      <h4><span id="fname" class="label label-default">
        First name
        <router-link id="he"class="button is-link" to="/first">Edit</router-link>
      </span></h4>

      <h4><span id="lname" class="label label-default">
        Last name
        <router-link id="he"class="button is-link" to="/last">Edit</router-link>
      </span></h4>

      <h4><span id="uname" class="label label-default">
        Username
        <router-link id="he"class="button is-link" to="/username">Edit</router-link>
      </span></h4>

      <h4><span id="ename" class="label label-default">
        Email
        <router-link id="he"class="button is-link" to="/email">Edit</router-link>
      </span></h4>

      <h4><span id="pname" class="label label-default">
        Password
        <router-link id="he"class="button is-link" to="/password">Edit</router-link>
      </span></h4>
  </div>
  <hr>
  </div>
</template>
<style>

h4{
  padding: 30px;
}

#he{
  float: right;
}

</style>
<script>
export default{
  name: "Profile",
}
</script>
