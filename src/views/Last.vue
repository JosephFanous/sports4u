<template>
  <div>
    <div class="container bootstrap snippet">
      <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Edit Profile</h1>
        <hr>
  	<div class="row">
        <div class="col-md-9 personal-info">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <h4 class="col-lg-3 control-label">Last name:</h4>
              <div class="col-lg-8">
                <input v-on:keyup.enter="save" class="input is-dark" type="text" v-model="Last" v-bind:placeholder="last">
                <p id="lasttxt"> {{lasterr}} </p>
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


#lasttxt{
  padding-top: 10px;
}
</style>
<script>
export default{
  name: "Last",

  data: function(){
    return{
      userID: this.$globalStore.user.id,
      last: '',
      Last: null,
      lasterr: ''
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
            vm.last = data.Last;
          })
    .catch(err => console.log(err));
  },
    save: function(){
    const apiUrl = process.env.VUE_APP_API_URL
    this.lasterr = '';
    let next = true;
    if(!this.Last){
      this.lasterr = 'Please enter your Last name.'
      next = false
    }
    if (next == true){
      fetch(`${apiUrl}/last`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // to be able to receive cookies back
        credentials: 'include',
        body: JSON.stringify({
          Last: this.Last
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
