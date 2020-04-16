<template>
    <div>
        <div id="ColumnInfoBar" class="column is-one-fifths">
            <div id="InfoBar">
                <div class="ImageInfo">
                    <figure id="Image" class="image is-96x96">
                        <img class="is-rounded" src="images/intial.png">
                    </figure>
                </div>
                <div class="Info">
                    <h4 class="title is-4">{{Username}}</h4>
                    <h6 class="subtitle is-6">{{EmailAddress}}</h6>
                </div>
            </div>
            <nav class="menu">
                <p class="menu-label">Home</p>
                <ul class="menu-list">
                  <li>
                    <router-link to='/'><span class="icon is-small"><i class="fas fa-home"></i></span>Home</router-link>
                  </li>
                  <li><a v-bind:class="{ 'is-active' : dashBoard}" href="#"><span class="icon is-small"><i class="fas fa-chart-line"></i></span> Dashboard</a></li>
                  <li><a href="#"><span class="icon is-small"><i class="fas fa-search"></i></span> Search For Events</a></li>
                </ul>
                <p class="menu-label">Setting</p>
                <ul class="menu-list">
                    <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-address-card"></i></span> Profile</a></li>
                    <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-cog"></i></span> Advanced Settings</a></li>

                </ul>
                <p class="menu-label"> Messaging</p>
                <ul class="menu-list">
                    <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-envelope"></i></span> Inbox</a></li>
                    <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-reply"></i></span> Reply</a></li>
                </ul>
                </p>

                <p class="menu-label">Contact Us</p>
                <ul class="menu-list">

                    <li><a v-on:click=HandleBugModalClick() v-bind:class="{ 'is-active' : reportBugModal}" href="#"><span class="icon is-small"><i class="fas fa-bug"></i></span> Report Software Bugs</a></li>

                </ul>

                <button v-on:click="handleLogoutClick" class="button is-block is-info is-large is-fullwidth" v-bind:class="{ 'is-loading': isLogoutLoading }" id="LogoutButton">
                    <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
                </button>
            </nav>
        </div>
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
    props: {
    },
    data: function() {
      return {
        UserID : 1,//this.$globalStore.user.id,
        Username: '',
        EmailAddress: '',
        reportBugModal: false,
        isLogoutLoading: false,
        dashBoard : true,
      }
    },
    created: function(){
      this.loadUserData(); // Used to load users data
    },
    methods: {
      loadUserData: function(){
        var vm = this;
        fetch('http://localhost:3000/users/'+this.UserID)
          .then(response => response.json())
          .then(data => {
              vm.Username = data.UserName;
              vm.EmailAddress = data.Email;
            })
      .catch(err => console.log(err));
      },
      handleLogoutClick(){
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
  .menu-label{
    font-size: 15px;
  }
  .menu-list{
    font-size: 15px;
  }
  #InfoBar{
    position: relative;
  }
  #Image{
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
  }
  div.Info{
    text-align: center;
    padding-bottom: 15px;
  }

  nav.menu{
    padding: 10px;
  }
  #LogoutButton {
    margin-top: 100px;
  }
</style>
