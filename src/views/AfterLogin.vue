<template>
    <div class="columns is-gapless">
        <SideBar v-bind:Username ="Username" v-bind:EmailAddress = "EmailAddress"></SideBar>
        <div id="ColumnTwo" class="column is-two-fifths">
            <div id="EventLayout" class="tile is-ancestor">
                <div class="tile is-12 is-vertical is-parent">
                    <div class="tile is-child box">
                        <p class="title">Events</p>
                        <div role="tablist">
                            <b-card no-body class="mb-2">
                                <b-card-header header-tag="header" class="p-3" role="tab">
                                    <b-button block href="#" v-b-toggle.accordion-1 variant="info">Your Event (s)</b-button>
                                </b-card-header>
                                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                    <b-card-body  id = "Test">
                                        <table id="EventsTable" class="table is-fullwidth is-striped">
                                            <tbody  id = "Test" v-for="items in UserEvents">
                                                <tr>
                                                    <td width="5%"><i class="fas fa-user-friends"></i>{{items.PeopleAttending}}</td>
                                                    <td><a v-on:click="MoreDetails"> {{items.Name}} </a></td>
                                                    <td width="10%"><a v-on:click="EditButton(items.Name)"><i class="fas fa-edit" ></i></a></td>
                                                    <td width="10%"><a v-on:click="DeleteButton(items.EventID, 'UserEvents')"><i class="fas fa-trash-alt"></i></a></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>

                            <b-card no-body class="mb-2">
                                <b-card-header header-tag="header" class="p-3" role="tab">
                                    <b-button block href="#" v-b-toggle.accordion-2 variant="info">Signed Up Events</b-button>
                                </b-card-header>
                                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                                    <b-card-body>
                                        <article class="post" v-for="item in UserSignedUpEvents">
                                            <h4>{{item.Name}} &nbsp;
                                              <span id = "CloseButton" class="tag is-danger">
                                                Cancel
                                               <button v-on:click="DeleteButton(item.EventID, 'SignedUpEvents')" class="delete is-small"></button>
                                             </span>
                                            </h4>
                                            <div class="media">
                                                <div class="media-left">
                                                    <p class="image is-32x32">
                                                        <img v-bind:src="'images/' + item.SportName + '.png'">
                                                    </p>
                                                </div>
                                                <div class="media-content">
                                                    <div class="content">
                                                        <p>
                                                            <a href="#">@{{item.UserName}}&nbsp;</a>
                                                            <br><i class="fas fa-clock"></i> {{item.StartTime}}
                                                            <br>
                                                            <span class="tag"> <i class="fas fa-location-arrow"> </i> &nbsp;{{item.Address}}</span>
                                                        </p>
                                                    </div>
                                                    <hr>
                                                </div>
                                                <div class="media-right">
                                                    <span class="has-text-grey-light"><i class="fas fa-user-friends"></i> {{item.PeopleAttending}}</span>
                                                </div>
                                            </div>
                                        </article>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>

                            <b-card no-body class="mb-2">
                                <b-card-header header-tag="header" class="p-3" role="tab">
                                    <b-button block href="#" v-b-toggle.accordion-3 variant="info">Upcoming Event </b-button>
                                </b-card-header>
                                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                                    <b-card-body>
                                        <div class="content">
                                            <table class="table is-fullwidth is-striped">
                                                <tbody>
                                                    <tr v-for="item in UpcomingEvents">
                                                        <td width="5%"><i class="fa fa-circle" style=color:green;></i></td>
                                                        <td><a href="#">{{item.Name}}</a></td>
                                                        <td class="level-right"><a v-on:click="JoinEvent(item.Name)" class="button is-small is-primary" href="#">Join</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="column is-two-fifths">
            <div id="MapLayout" class="tile is-ancestor">
                <div class="tile is-12 is-vertical is-parent">
                    <div class="tile is-child box">
                        <p class="title">Map</p>
                        <div id='map'></div>
                        <p id = "NotificationCenter" class="title">Notification Center <span id = "NewIcon" class="badge badge-secondary">New</span></p>
                        <div id = "UpdateBar" class="row">
                          <div id = "leftSideTab" class="col-4">
                            <div class="list-group" id="LeftTab" role="tablist">
                              <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#FirstList" role="tab" aria-controls="Event Update"><h6>New Joined Users <span id = "numColor" class="badge badge-primary badge-pill">{{this.NewUserNotify.length}}</span></h6></a>
                              <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#SecondList" role="tab" aria-controls="profile"><h6>Event Changes <span id = "numColor" class="badge badge-primary badge-pill">{{this.SignedUpUpdates.length}}</span></h6></a>
                              <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#ThirdList" role="tab" aria-controls="messages"><h6>Deleted Events <span id = "numColor" class="badge badge-primary badge-pill">{{this.EventsDeletedUsers.length}}</span></h6></a>
                            </div>
                          </div>
                          <div id = "rightSideTab" class="col-8">
                            <div class="tab-content" id="nav-tabContent">
                              <div class="tab-pane fade show active" id="FirstList" role="tabpanel" aria-labelledby="list-home-list">
                                <article id = "notificationRight" class="tile is-child notification is-success">
                                  <div class="content">
                                    <p class="title">While you were away</p>
                                    <p class="subtitle">People that have joined your event(s)</p>
                                    <div class="content" >
                                      <ul v-for="item in NewUserNotify" >
                                         <li><strong>@{{item.JoinedUser}}</strong> has joined the following event: <strong>{{item.Name}}</strong></li>
                                       </ul>

                                    </div>
                                  </div>
                                </article>
                              </div>
                              <div class="tab-pane fade" id="SecondList" role="tabpanel" aria-labelledby="list-profile-list">
                                <article id = "notificationRight" class="tile is-child notification is-danger">
                                  <div class="content">
                                    <p class="title">Welcome Back!</p>
                                    <p class="subtitle">More information can be found under the Signed Up tab.</p>
                                    <div class="content">
                                      <ul v-for="item in SignedUpUpdates">
                                         <li>The following informatiion regarding an event has been updated: {{item.UpdateEvent}}</li>
                                       </ul>
                                    </div>
                                  </div>
                                </article>
                              </div>
                              <div class="tab-pane fade" id="ThirdList" role="tabpanel" aria-labelledby="list-messages-list">
                                <article id = "notificationRight" class="tile is-child notification is-warning">
                                  <div class="content">
                                    <p class="title">Deleted Events</p>
                                    <p class="subtitle">The following Events have been deleted by the user</p>
                                    <div class="content">
                                      <ul v-for="item in EventsDeletedUsers">
                                         <li> {{item.DeleteEvent}}</li>
                                       </ul>
                                    </div>
                                  </div>
                                </article>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div v-bind:class="{ 'is-active' : EditOption}" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <h2 class="modal-card-title">What would you like to Edit?</h2>
                    <button v-on:click="CloseModal" class="delete" aria-label="close"></button>
                </header>

                <section  class="modal-card-body">
                    <h6>* Please  <strong>DO NOT</strong> edit the fields that you do not wish to change. Address cannot be changed as it violates the companies policy.</h6>
                    <div class="field">
                        <label class="label">Event Name</label>
                        <div class="control">
                            <input id="EventInput" onfocus="this.value=''" class="input" type="text" placeholder="">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Sport</label>
                        <div class="field">
                            <div class="control">
                                <div class="select is-primary">
                                    <select id="SportDropDown">
                                        <option value="No changes"> No Change </option>
                                        <option value="1">Basketball</option>
                                        <option value="2">Table Tennis</option>
                                        <option value="3">Volleyball</option>
                                        <option value="4">Badminton</option>
                                        <option value="5">Soccer</option>
                                        <option value="6">Hockey</option>
                                        <option value="7">Baseball</option>
                                        <option value="8">FootBall</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-half">
                            <div class="field">
                                <label class="label">Start Time</label>
                                <div class="control">
                                    <input id="StartTime" class="input" type="datetime-local" v-model="startDate">
                                </div>
                            </div>
                        </div>
                        <div class="column is-half">
                            <div class="field">
                                <label class="label">End Time</label>
                                <div class="control">
                                    <input id="EndTime" class="input" type="datetime-local" v-model="endDate">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="field">
                            <div class="control">
                                <label class="checkbox">
                                    <input id="CheckBox" type="checkbox"> I agree that once the edits have been made, they will not be reversable</a>
                                </label>
                                <p  v-bind:class="{ 'help is-danger' : EditErrorCheck }"   v-model="ErrorMessage" >{{ErrorMessage}}</p>
                            </div>
                        </div>
                    </div>

                </section>
                <footer class="modal-card-foot">
                    <button v-on:click="SubmitEdit" class="button is-success">Save changes</button>
                </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
/*Imports used for this file*/
import { endSession, todayInputValue, isValidDate, formatDate, formatTime, FormatDateDatabase } from '../util'
import SideBar from '../components/SideBar.vue'
import mapboxgl from 'mapbox-gl';
export default {
  name: "AfterLogin",
  props: {},
  components: {
    SideBar,
  },

  data: function(){
    return{
      UserEvents: [],
      UserSignedUpEvents: [],
      UpcomingEvents : [],
      NewUserNotify : [],
      SignedUpUpdates : [],
      EventsDeletedUsers : [],
      UserID : 1,//this.$globalStore.user.id,
      map : null,
      popup : null,
      centerOfMap : null,
      EditOption : false,
      UpdateTemp : [],
      startDate: todayInputValue() + 'T12:00',
      endDate: todayInputValue() + 'T13:00',
      EditErrorCheck : false,
      ErrorMessage : '',
      Username: '',
      EmailAddress: '',

    }

  },
  created: function(){
    this.loadUserData(); // Used to load users data
    this.loadEvents(); // Used to load events for the user
    this.loadSignedUpEvents(); // load up Signed Up events
    this.loadUpComingEvents(); // loading upcoming events
    this.loadNewUserNotifications();
    this.loadSignedUpUpdates();
    this.EventsDeleted();

  },
  methods: {
    loadUserData: function(){
      fetch('http://localhost:3000/users/'+this.UserID)
        .then(response => response.json())
        .then(data => {
            this.Username = data.UserName;
            this.EmailAddress = data.Email;
          })
    .catch(err => console.log(err));
    },
    loadEvents: function(){
      fetch('http://localhost:3000/Events/'+this.UserID+'/0')
        .then(response => response.json())
        .then(data => {
          for(var i=0;i<data.length;i++){
            this.UserEvents.push(data[i]);
          }
          })
    .catch(err => console.log(err));

    },
    loadSignedUpEvents: function(){
      fetch('http://localhost:3000/SignedUpEvents/'+this.UserID+'/Attending')
        .then(response => response.json())
        .then(data => {
            for(var i=0;i<data.length;i++){
              data[i].StartTime = formatTime(data[i].StartTime)
              this.UserSignedUpEvents.push(data[i]);
            }
            console.log(this.UserSignedUpEvents)
          })
    .catch(err => console.log(err));

    },
    loadUpComingEvents: function(){
      fetch('http://localhost:3000/UpcomingEvents/'+this.UserID+'/0')
        .then(response => response.json())
        .then(data => {
            for(var i=0;i<data.length;i++){
              this.UpcomingEvents.push(data[i]);
            }
          }).catch(err => console.log(err));
    },
    loadNewUserNotifications: function(){
      fetch('http://localhost:3000/NewUsersJoined/'+this.UserID)
        .then(response => response.json())
        .then(data => {
            for(var i=0;i<data.length;i++){
              this.NewUserNotify.push(data[i]);
            }
          }).catch(err => console.log(err));
    },
    loadSignedUpUpdates : function(){
      fetch('http://localhost:3000/SignUpUpdates/'+this.UserID)
        .then(response => response.json())
        .then(data => {
          for(var i=0;i<data.length;i++){
              this.SignedUpUpdates.push(data[i])
          }
          })
        .catch(err => console.log(err));
      console.log(this.SignedUpUpdates)
    },
    EventsDeleted : function(){
      fetch('http://localhost:3000/EventDeleted/'+this.UserID)
        .then(response => response.json())
        .then(data => {
          for(var i=0;i<data.length;i++){
              this.EventsDeletedUsers.push(data[i])
          }
        })
        .catch(err => console.log(err));
        console.log(this.EventsDeletedUsers)
    },
    /*Used fot the popups that appear on the map*/
    MoreDetails: function(event){
      // Remove previous popups and add new ones
      if(this.popup != null)this.popup.remove();
      var element = event.target;
      var vm = this;
      for(var i=0;i<vm.UserEvents.length;i++){
        if(vm.UserEvents[i].Name == element.text.trim()){
            this.popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat([vm.UserEvents[i].Longitude, vm.UserEvents[i].Latitude])
            .setHTML('<div><h3>'+ vm.UserEvents[i].Name + '</h3><ul style="list-style-type:none;"><li><strong>SportName: </strong>' + vm.UserEvents[i].SportName +
            '</li><li><strong>StartTime: </strong>'+ vm.UserEvents[i].StartTime + '</li><li><strong>EndTime: </strong>'+ vm.UserEvents[i].EndTime +
             '</li><li><strong>Address: </strong>'+ vm.UserEvents[i].Address + '<li></ul></div>')
            .addTo(vm.map);
            var target = [vm.UserEvents[i].Longitude, vm.UserEvents[i].Latitude];

            /*With the help of https://docs.mapbox.com/mapbox-gl-js/example/flyto-options/ */
            this.map.flyTo({
              center: target,
              zoom: 11,
              bearing: 0,

              speed: 2, // make the flying slow
              curve: 1, // change the speed at which it zooms out

              easing: function(t) {
              return t;
              },
              essential: true
              });
          }
        }
      },
      CloseModal: function(){
        // Used to overwrite field to avoid crashes
        $("#EventInput").val("")
        $("#SportDropDown").val("No changes");
        $( "#CheckBox" ).prop( "checked", false );
        this.startDate =todayInputValue() + 'T12:00',
        this.endDate = todayInputValue() + 'T13:00',
        // Close the dialoge
        this.EditOption = false;

      },
      EditButton: function(EventName){
        this.UpdateTemp.DataToBeChanged = EventName
        this.EditOption = true;
      },
      /*Used for the edit feature */
     SubmitEdit: function(EventName){
       console.log("YES")
       var SendingInfo = [this.UserID];
       this.UpdateTemp.SportDropDown =  ($("#SportDropDown option:selected").val())
       this.UpdateTemp.EventName = $('#EventInput').val();
       this.UpdateTemp.StartTime = $('#StartTime').val();
       this.UpdateTemp.EndTime =  $('#EndTime').val();
       this.UpdateTemp.Sign = document.getElementById("CheckBox").checked;
       /*Overwrites field that empty and field and send information to the server accordinly*/
       if(this.UpdateTemp.Sign == true){
         for(var i=0;i<this.UserEvents.length;i++){
           if(this.UserEvents[i].Name == this.UpdateTemp.DataToBeChanged){
             this.UserEvents[i].SportName = ($("#SportDropDown option:selected").text())
             SendingInfo.push(this.UserEvents[i].EventID)
             if(this.UpdateTemp.EventName != ""){
                 this.UserEvents[i].Name = this.UpdateTemp.EventName
                 SendingInfo.push(this.UpdateTemp.EventName)
             }else{
                 SendingInfo.push(this.UserEvents[i].Name)
             }
             if(this.UpdateTemp.SportDropDown != "No changes"){
                 this.UserEvents[i].SportID = this.UpdateTemp.SportDropDown
                 SendingInfo.push(this.UpdateTemp.SportDropDown)
             }else{
                 SendingInfo.push(this.UserEvents[i].SportID)
             }
             if(this.UpdateTemp.StartTime != (todayInputValue() + 'T12:00')){
                 this.UserEvents[i].StartTime = FormatDateDatabase(this.UpdateTemp.StartTime)
                 SendingInfo.push(FormatDateDatabase(this.UpdateTemp.StartTime))
             }else{
                 SendingInfo.push(this.UserEvents[i].StartTime)
             }
             if(this.UpdateTemp.EndTime != (todayInputValue() + 'T13:00')){
                 this.UserEvents[i].EndTime = FormatDateDatabase(this.UpdateTemp.EndTime)
                 SendingInfo.push(FormatDateDatabase(this.UpdateTemp.EndTime))
             }else{
                 SendingInfo.push(this.UserEvents[i].EndTime)
             }
         }
         this.EditOption = false;
       }
     }else{
       this.ErrorMessage = "Please agree the terms and conditions"
       this.EditErrorCheck = true
     }

     var data = SendingInfo;
     const options = {
       method: 'POST',
       headers: {
         'Content-Type':  'application/json'
       },
       body: JSON.stringify(data)
     };
     fetch('http://localhost:3000/UpdateEdit', options)

      },
      /*Used deleting events in the your event tab and signedup events*/
      DeleteButton: function(DeleteEvent, TypeOfEvent){
        var EventID;
        var EventName;
        if(confirm("Are you sure!") == true){
          if(TypeOfEvent == 'UserEvents'){
              for(var i=0;i<this.UserEvents.length;i++){
                 if(this.UserEvents[i].EventID == DeleteEvent){
                     EventID = this.UserEvents[i].EventID
                     EventName = this.UserEvents[i].Name
                     this.UserEvents = this.UserEvents.filter(event => event.EventID != EventID)
                 }
              }
           }
           if(TypeOfEvent == 'SignedUpEvents'){
               for(var i=0;i<this.UserSignedUpEvents.length;i++){
                  if(this.UserSignedUpEvents[i].EventID == DeleteEvent){
                      EventID = this.UserSignedUpEvents[i].EventID
                      this.UserSignedUpEvents[i].PeopleAttending = this.UserSignedUpEvents[i].PeopleAttending - 1;
                      this.UpcomingEvents.push(this.UserSignedUpEvents[i])
                      this.UserSignedUpEvents = this.UserSignedUpEvents.filter(event => event.EventID != EventID)
                  }
               }
            }

            var data = {EventID, TypeOfEvent, EventName};
            const options = {
              method: 'POST',
              headers: {
                'Content-Type':  'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(data)
            };
            fetch('http://localhost:3000/DeleteEvents', options)

        }else {
            console.log("Delete Rejected!");
            console.log(UserName)
        }

      },

      JoinEvent : function(EventName){
        var EventID, UserID = this.UserID, OwnerUserID, UserName = this.Username;
        for(var i=0;i<this.UpcomingEvents.length;i++){
          if(this.UpcomingEvents[i].Name == EventName){
              this.UpcomingEvents[i].PeopleAttending = this.UpcomingEvents[i].PeopleAttending + 1;
              if((formatTime(this.UpcomingEvents[i].StartTime ) != ("NaN:NaN AM" || "NaN:NaN PM"))){ // checks the format of the time, so it does not Overwrite it
                  this.UpcomingEvents[i].StartTime = formatTime(  this.UpcomingEvents[i].StartTime )
              }
              OwnerUserID = this.UpcomingEvents[i].UserID;
              EventID = this.UpcomingEvents[i].EventID;
              console.log(UserName)
              this.UserSignedUpEvents.push(this.UpcomingEvents[i]);
              this.UpcomingEvents = this.UpcomingEvents.filter(event => event.EventID != EventID)
          }
        }
        var data = {EventID, UserID,OwnerUserID, UserName};
        const options = {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        };
        fetch('http://localhost:3000/JoinEvent', options)

      },
  },

  /*Loads the map at the start of the page and mounts it*/
  mounted: function() {

    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-79.347015, 43.651070],
      zoom: 8,
      attributionControl: false
    });
    // Adding the zoom in and full screen feature
    this.map.addControl(new mapboxgl.FullscreenControl())
    this.map.addControl(new mapboxgl.NavigationControl());
  }
};

</script>
<style scoped lang="scss">
  #CloseButton{
     float: right;
  }
  .collapse{
    height: 100%;
    max-height: 580px;
    overflow-y: scroll;

  }
  #signedButtons{
    margin-left : 80%;
  }
  #SportImage{
      position: absolute;
      top: 0px;
      right: 0px;
      filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
  }
  #content{
    position: relative;
  }
  div.columns{
    padding: 10px;
    height: 100%;
    width: 100%;

  }
  body,html{
    height: 100%;
    width: 100%;
  }
  .card-table {
      max-height: 200px;
      overflow-y: scroll;
  }
  #map{
    height: 50%;
    width: 100%;
  }
  #MapLayout, #EventLayout, #accordingMain{
    height: 100%;
    width: 100%;
  }
  #numColor{
    float: right;
  }
  #UpdateBar{
    padding-top: 10px;
  }
  #NotificationCenter{
    padding-top: 30px;
    padding-bottom: 0px;
  }
  #rightSideTab{
    padding-left: 0px;
  }
  #leftSideTab{
    padding-right: 5px;
  }
  #FirstList, #SecondList, #ThirdList{

  }
  #notificationRight{
    height: 100%;
    max-height: 335px;
    overflow-y: scroll;
  }

  #NewIcon{
    margin-left: 15px;
  }


</style>
