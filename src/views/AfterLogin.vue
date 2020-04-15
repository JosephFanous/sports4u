<template>
  <div class="columns is-gapless">
   <div id = "ColumnInfoBar" class="column is-one-fifths">
     <div id = "InfoBar" >
        <div class="ImageInfo">
           <figure id = "Image" class="image is-96x96">
             <img class="is-rounded" src="../assets/intial.png">
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
            <li><a v-bind:class= "{ 'is-active' : dashBoard}" href="#"><span class="icon is-small"><i class="fas fa-chart-line"></i></span> Dashboard</a></li>
            <li><a href="#"><span class="icon is-small"><i class="fas fa-plus-circle"></i></span> Add an Event</a></li>
         </ul>
         <p class="menu-label">Setting</p>
         <ul class="menu-list">
            <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-address-card"></i></span> Profile</a></li>
            <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-cog"></i></span> Advanced Settings</a></li>
            <!-- <li>

               <ul>
                  <li><a>Members</a></li>
                  <li><a>Plugins</a></li>
                  <li><a>Add a member</a></li>
               </ul>
            </li> -->
         </ul>
         <p class="menu-label"> Messaging</p>
           <ul class="menu-list">
             <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-envelope"></i></span> Inbox</a></li>
             <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-reply"></i></span> Reply</a></li>
           </ul>
         </p>

         <p class="menu-label">Contact Us</p>
         <ul class="menu-list">
           <!-- v-bind:class= "{ 'is-active' : reportBugModal} -->
             <li><a v-on:click=HandleBugModalClick() v-bind:class= "{ 'is-active' : reportBugModal}" href="#"><span class="icon is-small"><i class="fas fa-bug"></i></span> Report Software Bugs</a></li>
            <!-- <li v-on:click=HandleBugModalClick()>
              <a>
              <span class="icon is-small"><i class="fa fa-bug"></i></span> Report Software Bugs
              </a>
            </li> -->

         </ul>

         <button v-on:click="handleLogoutClick" class="button is-block is-info is-large is-fullwidth" v-bind:class="{ 'is-loading': isLogoutLoading }"  id = "LogoutButton">
          <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
         </button>

       </nav>


       <!-- <div id= buttonContainer class="buttons">

         <button id = "LogoutButton" class="button is-small" >Logout</button>
       </div> -->

   </div>






   <div id = "ColumnTwo" class="column is-two-fifths">
     <div id = "EventLayout" class="tile is-ancestor">
       <div class="tile is-12 is-vertical is-parent">
         <div class="tile is-child box">
           <p class="title">Events</p>




           <div role="tablist">
            <b-card  no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block href="#" v-b-toggle.accordion-1 variant="info">Your Event (s)</b-button>
              </b-card-header>
              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body >
                  <table id = "EventsTable" class="table is-fullwidth is-striped">
                     <tbody v-for="items in UserEvents">
                        <tr>
                           <td  width="5%"><i class="fas fa-user-friends"></i>{{items.PeopleAttending}}</td>
                           <td><a v-on:click="MoreDetails"> {{items.Name}} </a></td>
                           <td width="10%"><a  v-on:click="EditButton(items.Name)"><i class="fas fa-edit" ></i></a></td>
                           <td width="10%"><a v-on:click="DeleteButton(items.Name, 'UserEvents')"><i class="fas fa-trash-alt"></i></a></td>
                           <!-- <td class="level-right"><a class="button is-small is-primary" href="#">Edit</a></td> -->
                        </tr>

                     </tbody>
                  </table>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block href="#" v-b-toggle.accordion-2 variant="info">Signed Up Events</b-button>
              </b-card-header>
              <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body >
                  <article class="post" v-for="item in UserSignedUpEvents">
                   <h4>{{item.Name}} &nbsp;
                       <span id = "CloseButton" class="tag is-danger">
                         Cancel
                         <button v-on:click="DeleteButton(item.Name, 'SignedUpEvents')" class="delete is-small"></button>
                       </span>
                   </h4>
                    <div class="media">
                      <div class="media-left">
                        <p class="image is-32x32">
                          <img src="http://bulma.io/images/placeholders/128x128.png">
                        </p>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <a href="#">@{{item.UserName}} &nbsp; &nbsp; &nbsp; &nbsp;</a> <i class="fas fa-clock"></i> {{item.StartTime}} &nbsp;
                            <span class="tag"> <i class="fas fa-location-arrow"> </i> &nbsp;{{item.Address}}</span>
                          </p>
                        </div>
                      </div>
                      <div class="media-right">
                        <span class="has-text-grey-light"><i class="fas fa-user-friends"></i> {{item.PeopleAttending}}</span>
                      </div>
                    </div>
                  </article>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block href="#" v-b-toggle.accordion-3 variant="info">Upcoming Event </b-button>
              </b-card-header>
              <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <!-- Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. -->
                  <!-- <div class = "Boxes">
                    <div class="box">
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>Name of Peson Hosting it</strong> <small>Username</small> <small>31m</small>
                            <br>
                            Decription of the event/Other infoarmtion
                          </p>
                        </div>
                        <nav class="level is-mobile">
                          <div class="level-left">
                            <a class="level-item" aria-label="reply">
                              <span class="icon is-small">
                                <i id = "Contact" class="fas fa-reply" aria-hidden="true"></i>
                              </span>
                            </a>
                            <a class="level-item" aria-label="like">
                              <span class="icon is-small">
                                <i id = "WatchList" class="fas fa-heart" aria-hidden="true"></i>
                              </span>
                            </a>
                          </div>
                        </nav>
                      </div>
                    </article>
                    </div>
                  </div> -->
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
     <div id = "MapLayout" class="tile is-ancestor">
       <div class="tile is-12 is-vertical is-parent">
         <div class="tile is-child box">
           <p class="title">Map</p>
           <div id='map'></div>
        <!-- <div class="card"> -->
            <!-- <div class="card-image"> -->

              <!-- <figure class="image is-4by3">

                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure> -->
            <!-- </div> -->
            <!-- <div class="card-content">
              <div class="content">
                <header class="card-header">
                   <p class="card-header-title">
                      Events happening right now (Click For More INFO)
                   </p>

                </header>
                <div class = "card-table">
                  <table class="table is-fullwidth is-striped">
                     <tbody>
                        <tr>
                           <td width="5%"><i class="fa fa-circle" style=color:green;></i></td>
                           <td><a href="#">Lorum ipsum dolem aire</a></td>
                           <td class="level-right"><a class="button is-small is-primary" href="#">Join</a></td>
                        </tr>
                        <tr>
                           <td width="5%"><i class="fa fa-circle" style=color:green;></i></td>
                             <td><a href="#">Lorum ipsum dolem aire</a></td>
                           <td class="level-right"><a class="button is-small is-primary" href="#">Join</a></td>
                        </tr>
                        <tr>
                           <td width="5%"><i class="fa fa-circle" style=color:green;></i></td>
                             <td><a href="#">Lorum ipsum dolem aire</a></td>
                           <td class="level-right"><a class="button is-small is-primary" href="#">Join</a></td>
                        </tr>
                        <tr>
                           <td width="5%"><i class="fa fa-circle" style=color:green;></i></td>
                             <td><a href="#">Lorum ipsum dolem aire</a></td>
                           <td class="level-right"><a class="button is-small is-primary" href="#">Join</a></td>
                        </tr>
                     </tbody>
                  </table>
                </div>
              </div> -->

                </div>

            </div>
          </div>


         </div>
         <div  v-bind:class= "{ 'is-active' : EditOption}" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <h2 class="modal-card-title">What would you like to Edit?</h2>
                <button v-on:click="CloseModal" class="delete" aria-label="close"></button>
              </header>

              <section class="modal-card-body">
                  <h6>* Please leave the fields <strong>EMPTY</strong> that you do not wish to change</h6>
                  <div class="field">
                    <label class="label">Event Name</label>
                    <div class="control">
                      <input v-model = "UpdateTemp.EventName" class="input" type="text" placeholder="">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Sport</label>
                    <div class="field">
                      <div class="control">
                        <div class="select is-primary">
                          <select id = "SportDropDown" v-on:click="SportSelection">
                            <option value=""> </option>
                            <option value="Basketball">Basketball</option>
                            <option value="Table Tennis">Table Tennis</option>
                            <option value="Volleyball">Volleyball</option>
                            <option value="Badminton">Badminton</option>
                            <option value="Soccer">Soccer</option>
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
                      <input class="input" type="text" placeholder="dd-mmm-yyyy hh:mm:(AM/PM)">
                    </div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">End Time</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="dd-mmm-yyyy hh:mm(AM/PM)">
                    </div>
                  </div>
                </div>
            </div>

                <div class="field">
                  <div class="field">
                    <div class="control">
                      <label class="checkbox">
                        <input type="checkbox">
                        I agree that once the edits have been made, they will not reversable</a>
                      </label>
                    </div>
                </div>
              </div>

              </section>
              <footer class="modal-card-foot">
                <button class="button is-success">Save changes</button>
              </footer>
            </div>
          </div>

          <div  v-bind:class= "{ 'is-active' : reportBugModal}" class="modal text">
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
    </div>
       </div>
     </div>

 </div>
</div>
</template>
<script>
import { endSession } from '../util'
import mapboxgl from 'mapbox-gl';
export default {
  name: "AfterLogin",
  props: {},

  data: function(){
    return{
      Username: '',
      EmailAddress: '',
      UserEvents: [],
      UserSignedUpEvents: [],
      UpcomingEvents : [],
      UserID : 1,//this.$globalStore.user.id,
      map : null,
      popup : null,
      centerOfMap : null,
      dashBoard : true,
      EditOption : false,

      UpdateTemp : [
        {EventName: ''},
        {SportDropDown: ''},
        {Address: ''},
        {StartTime: ''},
        {EndTime: ''},
      ],


      reportBugModal: false,
      isLogoutLoading: false

    }

  },
  created: function(){
    this.loadUserData();
    this.loadEvents(); //Active events
    this.loadSignedUpEvents();
    this.loadUpComingEvents();

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

    loadEvents: function(){
      var vm = this;
      fetch('http://localhost:3000/Events/'+this.UserID+'/0')
        .then(response => response.json())
        .then(data => {
          for(var i=0;i<data.length;i++){
            vm.UserEvents.push(data[i]);
          }
          })
    .catch(err => console.log(err));

  },
    loadSignedUpEvents: function(){
      var vm = this;
      fetch('http://localhost:3000/SignedUpEvents/'+this.UserID+'/Attending')
        .then(response => response.json())
        .then(data => {
            for(var i=0;i<data.length;i++){
              var d = new Date(data[i].StartTime);
              data[i].StartTime = d.getHours() + ':' + d.getMinutes();
              vm.UserSignedUpEvents.push(data[i]);
            }
          })
    .catch(err => console.log(err));

    },
    loadUpComingEvents: function(){
      var vm = this;
      fetch('http://localhost:3000/UpcomingEvents/'+this.UserID+'/0')
        .then(response => response.json())
        .then(data => {
            for(var i=0;i<data.length;i++){
              vm.UpcomingEvents.push(data[i]);
            }
            console.log(vm.UpcomingEvents)
          }).catch(err => console.log(err));
    },
    MoreDetails: function(event){
      // Remove previous popups and add new ones
      if(this.popup != null)this.popup.remove();
      var element = event.target;
      var vm = this;
      for(var i=0;i<vm.UserEvents.length;i++){
        if(vm.UserEvents[i].Name == element.text.trim()){
            console.log(vm.UserEvents[i].Name)
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
        this.EditOption = false;
      },
      EditButton: function(EventName){

        // for(var i=0;i<this.UserEvents.length;i++){
        //   // console.log(this.UserEvents[i].Name)
        //    if(this.UserEvents[i].Name == EventName){
        //      this.UpdateTemp.push(this.UserEvents[i])
        //    }
        // }
        console.log(this.UpdateTemp)
        this.EditOption = true;
        // var element = event.target.parentElement;
        // console.log(element);
        // this.EditButton = true;

      },

      SportSelection : function(test){
        this.UpdateTemp.SportDropDown = document.getElementById("SportDropDown").value
        console.log(this.UpdateTemp.SportDropDown);
      },


      HandleBugModalClick: function(){
        this.dashBoard = false;
        this.reportBugModal = true;
      },
      HandleSubmitClick: function(){
        this.reportBugModal = false;
        this.dashBoard = true;
      },


      DeleteButton: function(DeleteEvent, TypeOfEvent){
        var EventID;
        if(confirm("Are you sure!") == true){
          if(TypeOfEvent == 'UserEvents'){
              for(var i=0;i<this.UserEvents.length;i++){
                console.log(this.UserEvents[i].Name)
                 if(this.UserEvents[i].Name == DeleteEvent){
                     EventID = this.UserEvents[i].EventID
                     this.UserEvents = this.UserEvents.filter(event => event.EventID != EventID)


                 }
              }
           }
           if(TypeOfEvent == 'SignedUpEvents'){
               for(var i=0;i<this.UserSignedUpEvents.length;i++){
                 console.log(this.UserSignedUpEvents[i].Name)
                  if(this.UserSignedUpEvents[i].Name == DeleteEvent){
                      EventID = this.UserSignedUpEvents[i].EventID
                      this.UpcomingEvents.push(this.UserSignedUpEvents[i])
                      this.UserSignedUpEvents = this.UserSignedUpEvents.filter(event => event.EventID != EventID)

                  }
               }
            }
            console.log(EventID)
            console.log(TypeOfEvent)
            var data = {EventID, TypeOfEvent};
            const options = {
              method: 'POST',
              headers: {
                'Content-Type':  'application/json'
              },
              body: JSON.stringify(data)
            };
            fetch('http://localhost:3000/DeleteEvents', options)


        }else {
            console.log("Not happening ");
        }

      },
      JoinEvent : function(EventName){
        var EventID, UserID = this.UserID;
        for(var i=0;i<this.UpcomingEvents.length;i++){
          if(this.UpcomingEvents[i].Name == EventName){
              EventID = this.UpcomingEvents[i].EventID
              this.UserSignedUpEvents.push(this.UpcomingEvents[i]);
              this.UpcomingEvents = this.UpcomingEvents.filter(event => event.EventID != EventID)
          }
        }
        var data = {EventID, UserID};
        const options = {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch('http://localhost:3000/JoinEvent', options)


      },



      handleLogoutClick(){
        console.log("User Signed Out")
        this.isLogoutLoading = true

        endSession().then(data => {
          this.$globalStore.user = null
        }).finally(() => {
          this.isLogoutLoading = false
        })
      },







  },

  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-79.347015, 43.651070],
      zoom: 8,
      attributionControl: false
    });
    this.map.addControl(new mapboxgl.FullscreenControl())
    this.map.addControl(new mapboxgl.NavigationControl());



  }

};


</script>
<style scoped lang="scss">
#LogoutButton { margin-top: 80px;

    } /* Push it and following elements to the bottom */


#CloseButton{
   float: right;
}

div.Boxes{
    height: 100px;
    /* overflow-y: scroll; */
}
.collapse{
  height: 340px;
  overflow-y: scroll;
  max-height:340px;


}
.card-content{
  padding: 3px;
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
#signedButtons{
  margin-left : 80%;

}

#SportImage{
    position: absolute;
    top: 0px;
    right: 0px;
    filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
}

#InfoBar, #content{
  position: relative;
}
div.columns{
  padding: 10px;
  height: 100%;
  width: 100%;

}
body,html{
  height: 100%;
   /* min-width:1000px; */
  width: 100%;
}
.menu-label{
  font-size: 15px;
}
.menu-list{
  font-size: 15px;
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


</style>
