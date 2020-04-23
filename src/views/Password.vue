<template>
  <div>
    <div class="container bootstrap snippet">
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Edit Profile</h1>
        <hr>
  	<div class="row">
        <div class="col-md-9 personal-info">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <h4 class="col-lg-3 control-label">New password:</h4>
              <div class="col-lg-8">
                <input v-on:keyup.enter="save" class="input is-dark" v-model="Password" type="password">
                <p id="vpsstxt"> {{psserr}} </p>
              </div>
            </div>
            <div class="form-group">
              <h4 class="col-lg-3 control-label">Verify password:</h4>
              <div class="col-lg-8">
                <input v-on:keyup.enter="save" class="input is-dark" v-model="vPassword" type="password">
                <p id="vpsstxt"> {{vpsserr}} </p>
              </div>
            </div>
            <div class="field">
               <div class="control" id="log">
                   <button v-on:click="save" class="button is-link">Save changes</button>
                   <router-link id="pp"class="button is-link" to="/afterLogin">Cancel</router-link>
               </div>
               </div>
          </div>
        </div>
    </div>
  </div>
  <hr>
  </div>
</template>
<style>



#pp{
  margin-left: 25px;
}

#log{
  text-align: left;
  margin: auto;
  padding-left: 15px;
  padding-top: 15px;
}

#psstxt, #vpsstxt{
  padding-top: 10px;
}
</style>
<script>
export default{
  name: "Password",

  data: function(){
    return{
      userID: this.$globalStore.user.id,
      Password: null,
      vPassword: null,
      vpsserr: '',
      psserr: ''
    }
  },
  methods:{
    save: function(){
    const apiUrl = process.env.VUE_APP_API_URL
    this.vpsserr = '';
    this.psserr = '';
    let next = true
    if(this.Password != this.vPassword){
      this.vpsserr = 'Password does not match. Please try again.'
      next = false
    }
    if(!this.Password){
      this.psserr = 'Please enter a new password.'
    }
    if(next == true){
      fetch(`${apiUrl}/password`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // to be able to receive cookies back
        credentials: 'include',
        body: JSON.stringify({
          Password: this.Password
        })
      })
      .then(res => res.json())
      .then(data =>{
      if(data.success){
        this.$globalStore.user = data.user
        this.$router.push({
          path: '/afterLogin'
        })
        return
      }
      if (data.errors.Email){
        this.emailerr = 'This email is taken. Please enter another one.';
      }
      })
    }
  }

  }
}
</script>
