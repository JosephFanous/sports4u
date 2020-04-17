<template>
  <div>
    <div class="container bootstrap snippet">
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Edit Profile</h1>
        <hr>
  	<div class="row">
        <div class="col-md-9 personal-info">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <h4 class="col-lg-3 control-label">First name:</h4>
              <div class="col-lg-8">
                <input v-on:keyup.enter="save" class="input is-dark" type="text" v-model="First" v-bind:placeholder="first">
                <p id="firsttxt"> {{firsterr}} </p>
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


#firsttxt{
  padding-top: 10px;
}
</style>
<script>
export default{
  name: "First",

  data: function(){
    return{
      userID: this.$globalStore.user.id,
      first: '',
      First: null,
      firsterr: ''
    }
  },
  created: function(){
    this.loadUserData();
  },
  methods:{
    loadUserData: function(){
      var vm = this;
      fetch('http://localhost:3000/users/'+this.userID,{
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
            vm.first = data.First;
          })
    .catch(err => console.log(err));
  },
    save: function(){
    const apiUrl = process.env.VUE_APP_API_URL
    this.firsterr = '';
    let next = true;
    if(!this.First){
      this.firsterr = 'Please enter your first name.'
      next = false
    }
    if (next == true){
      fetch(`${apiUrl}/first`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // to be able to receive cookies back
        credentials: 'include',
        body: JSON.stringify({
          First: this.First
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
      })
    }
  }

  }
}
</script>
