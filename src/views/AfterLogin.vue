<template>
  <div class="columns">
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
            <li><a class="is-active" href="#"><span class="icon is-small"><i class="fas fa-chart-line"></i></span> Dashboard</a></li>
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
            <li><a><span class="icon is-small"><i class="fa fa-bug"></i></span> Report Software Bugs </a></li>
            <li id = "LastOne"><a><span class="icon is-small"><i class="fas fa-question-circle"></i></span> Additional Inquires </a></li>

         </ul>

         <button id = "LogoutButton" class="button is-block is-info is-large is-fullwidth">Logout <i class="fas fa-sign-out-alt" aria-hidden="true"></i></button>

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
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block href="#" v-b-toggle.accordion-1 variant="info">Your Event (s)</b-button>
              </b-card-header>
              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <table class="table is-fullwidth is-striped">
                     <tbody v-for="items in UserEvents">
                        <tr  v-for="item in items">
                           <td  width="5%"><i class="fas fa-user-friends"></i>{{item.PeopleAttending}}</td>
                           <td><a href="#"> {{item.Name}} </a></td>
                           <td width="10%"><a  href="#"><i class="fas fa-edit"></i></a></td>
                           <td width="10%"><a  href="#"><i class="fas fa-trash-alt"></i></a></td>
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
                <b-card-body v-for="items in UserSignedUpEvents">
                  <article class="post" v-for="item in items">
                   <h4>{{item.Name}} &nbsp;
                       <span id = "CloseButton" class="tag is-danger">
                         Cancel
                         <button class="delete is-small"></button>
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
                            <span class="tag"> <i class="fas fa-location-arrow"> </i> &nbsp; 2000 Simcoe St N, Oshawa, ON L1G 0C5</span>
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


           <div class="card">
            <div class="card-image">
                <div id='map'style='width: 100%; height: 100%;' ></div>
              <!-- <figure class="image is-4by3">

                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure> -->
            </div>
            <div class="card-content">
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
              </div>

                </div>

            </div>
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
      UserID : 1,
    }

  },
  created: function(){
    this.loadUserData();
    this.loadEvents(); //Active events
    this.loadSignedUpEvents();
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
            vm.UserEvents.push(data);
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
            }
            vm.UserSignedUpEvents.push(data);
          })
    .catch(err => console.log(err));

    },
  },

  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
    });
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
// #EventLayout, #ColumnTwo, {
//   height: 100%;
// }

</style>
