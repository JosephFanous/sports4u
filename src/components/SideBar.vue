<template>
      <div id="ColumnInfoBar" class="column is-2">
          <div id="InfoBar">
              <div class="ImageInfo">
                  <figure id="Image" class="image is-96x96">
                      <img class="is-rounded" src="images/intial.png">
                  </figure>
              </div>
              <div class="Info">
                  <h4 id = "Username" class="title is-4">{{Username}}</h4>
                  <h6 id = "Email" class="subtitle is-6">{{EmailAddress}}</h6>
              </div>
          </div>
          <nav class="menu">
              <!-- <p class="menu-label">Home</p> -->
              <ul class="menu-list">
                <li id = "MenuItem" ><router-link to='/'><span class="icon is-small"><i class="fas fa-home"></i></span> Home</router-link></li>
                <li id = "MenuItem"><a v-bind:class="{ 'is-active' : dashBoard}" href="#"><span class="icon is-small"><i class="fas fa-chart-line"></i></span> Dashboard</a></li>
                <li id = "MenuItem"><router-link to='/locationsearch'><span class="icon is-small"><i class="fas fa-search"></i></span> Search For Events</router-link></li>
                <li id = "MenuItem"><router-link to="/profile"><span class="icon is-small"><i class="fas fa-address-card"></i></span> Profile</router-link></li>
                <li id = "MenuItem"><router-link to="/"><span class="icon is-small"><i class="fas fa-cog"></i></span> Advanced Settings</router-link></li>
                <li id = "MenuItem"><a v-on:click=HandleBugModalClick() v-bind:class="{ 'is-active' : reportBugModal}" href="#"><span class="icon is-small"><i class="fas fa-bug"></i></span> Report Software Bugs</a></li>
              </ul>

              <button v-on:click="handleLogoutClick" class="button is-block is-info is-large" v-bind:class="{ 'is-loading': isLogoutLoading }" id="LogoutButton">
                  <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
              </button>
          </nav>
          <div v-bind:class="{ 'is-active' : reportBugModal}" class="modal text">
          <div class="modal-background"></div>
          <div class="modal-card ">
              <header class="modal-card-head">
                  <p class="modal-card-title">Submit an issue here</p>
                  <button v-on:click="HandleSubmitClick" class="delete" aria-label="close"></button>
              </header>
              <section class="modal-card-body">
                  <div class="field is-grouped is-grouped-centered">
                      <ul>
                          <label class="text-is-bold">Report issue here:</label>
                          <input class="input is-rounded" type="text" placeholder="Enter claim here">
                      </ul>
                  </div>
              </section>
              <footer class="modal-card-foot">
                  <div class="field is-grouped is-grouped-centered">
                      <button v-on:click="HandleSubmitClick" class="button is-success">Submit Claim</button>
                      <button v-on:click="HandleSubmitClick" class="button">Cancel</button>
                  </div>
              </footer>
          </div>
      </div>
      </div>

</template>
<script>
import { endSession } from '../util'
  export default {
    name: 'SideBar',
    props: ['Username', 'EmailAddress'],
    data: function() {
      return {
        reportBugModal: false,
        isLogoutLoading: false,
        dashBoard : true,
      }
    },

    methods: {
      handleLogoutClick(){
        var data = {'UserID':this.$globalStore.user.id}
        const options = {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch('http://localhost:3000/LogoutRequest', options)
        console.log("User Signed Out")
        this.isLogoutLoading = true

        endSession().then(data => {
          this.$globalStore.user = null
          this.$router.push({
            path: '/'
          })
        }).finally(() => {
          this.isLogoutLoading = false
        })
      },
      HandleBugModalClick: function(){
        this.dashBoard = false;
        this.reportBugModal = true;
      },
      HandleSubmitClick: function(){
        this.reportBugModal = false;
        this.dashBoard = true;
      },
    }
  }
</script>
<style scoped>
  #ColumnInfoBar{
    background-color: #1e3d59;
    position: relative;
  }
  .menu-label{
    font-size: 18px;
  }
  .menu-list{
    font-size: 18px;
    padding: 7px;
  }
  #InfoBar{
    position: relative;
  }
  #Image{
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
  }
  div.Info{
    text-align: center;
    padding-bottom: 15px;
  }

  nav.menu{
    padding: 10px;
  }
  #LogoutButton {
    position: absolute;
    bottom: 0px;
    margin-bottom: 30px;
    padding-left: 40%;
    padding-right: 40%;
    margin-left: 5px;
  }

  #MenuItem{
    padding-top: 10px;
    color: white;
  }
  #MenuItem :hover{
    background-color: #ff6e40;
    color: white;
    font-weight: bold;
  }
  a{
    color: #f5f0e1;
  }
  #Username, #Email{
    color: #f5f0e1;

  }
</style>
