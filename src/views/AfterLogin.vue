<template>
<div class="columns">
   <div id = "ColumnInfoBar" class="column is-one-fifths">
     <div id = "InfoBar" >
        <div class="ImageInfo">
           <figure id = "Image" class="image is-128x128">
             <img class="is-rounded" src="../assets/intial.png">
           </figure>
         </div>
         <div class="Info">
           <h1 class="title">Admin Account</h1>
           <h2 class="subtitle">admin@yahoo.ca</h2>
         </div>
     </div>

      <nav class="menu">
         <p class="menu-label">Home</p>
         <ul class="menu-list">
            <li><a class="is-active" href="#"><span class="icon is-small"><i class="fas fa-chart-line"></i></span> Dashboard</a></li>
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
         <p class="menu-label">
           Messaging
           <ul class="menu-list">
             <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-envelope"></i></span> Inbox</a></li>
             <li><a href="www.google.com"><span class="icon is-small"><i class="fas fa-reply"></i></span> Reply</a></li>
           </ul>
         </p>

         <p class="menu-label">Contact Us</p>
         <ul class="menu-list">
            <li><a><span class="icon is-small"><i class="fa fa-bug"></i></span> Report Software Bugs </a></li>
            <li><a><span class="icon is-small"><i class="fas fa-question-circle"></i></span> Additional Inquires </a></li>

         </ul>
       </nav>

       <div id= buttonContainer class="buttons">
         <button id = "LogoutButton" class="button is-success">Logout</button>
       </div>

   </div>

   <div class="column is-two-fifths">
     <div class="tile is-ancestor">
       <div class="tile is-12 is-vertical is-parent">
         <div class="tile is-child box">
           <p class="title">Your Sports</p>
           <div class="notification is-primary">
             Primar lorem ipsum dolor sit amet, consectetur
             adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet
           </div>
           <div class="notification is-primary">
             Primar lorem ipsum dolor sit amet, consectetur
             adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet
           </div>

         </div>
         <div class="tile is-child box">
           <p class="title">Signed Up Sports</p>
           <div class="columns">
             <div class="column">
               <div id = "content" class="notification is-primary">
                 <strong>Sport: </strong> Basketball <br>
                 <strong>Time: </strong> 12:12PM <br>
                 <strong>Number of people attending: </strong> 20 <br>
                 <strong>Location: </strong>, 1232 scarborught west hood ave <br>
                 <figure id = "SportImage" class="image is-48x48">
                   <img class="is-rounded" src="../assets/basketball.png">
                 </figure>
                 <div id = "signedButtons" class="buttons">
                   <button class="button is-black">Cancel</button>
                 </div>
               </div>
             </div>
             <div class="column">
               <div id = "content" class="notification is-primary">
                 <strong>Sport: </strong> VollyBall <br>
                 <strong>Time: </strong> 12:12PM <br>
                 <strong>Number of people attending: </strong> 2 <br>
                 <strong>Location: </strong> 1232 sdsad west hood aveasdsad
                 <figure id = "SportImage" class="image is-48x48">
                   <img class="is-rounded" src="../assets/vollyball.png">
                 </figure>
                 <div id = "signedButtons" class="buttons">
                   <button class="button is-black">Cancel</button>
                 </div>
               </div>
             </div>
           </div>


         </div>
         <div class="tile is-child box">
           <p class="title">Sport Events Coming up near you</p>
           <div class = "Boxes">
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
           </div>

         </div>
       </div>
     </div>
   </div>

   <div class="column is-two-fifths">
     <div class="tile is-ancestor">
       <div class="tile is-12 is-vertical is-parent">
         <div class="tile is-child box">
           <p class="title">Map</p>
           <figure class="image is-3by2">
             <img src="../assets/temp.png">
           </figure>
         </div>
         <div class="tile is-child box">
           <p class="title">Event happening right now</p>
           <div class="columns is-multiline">

         <table class="table is-bordered is-striped is-narrow is-fullwidth">
              <thead>
                 <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Country</th>
                 </tr>
              </thead>
              <tbody>
                 <tr>
                    <td>1</td>
                    <td>Sachin</td>
                    <td>India</td>
                 </tr>
                 <tr>
                    <td>2</td>
                    <td>Smith</td>
                    <td>Australia</td>
                 </tr>
                 <tr>
                    <td>3</td>
                    <td>Joe Root</td>
                    <td>England</td>
                 </tr>
              </tbody>

     </table>
      </div>
         </div>

       </div>
     </div>

 </div>
</div>
</template>
<script>
export default {
  name: "AfterLogin",
  props: {

  }
};
</script>
<style scoped lang="scss">
#LogoutButton{
  background-color: red;
}
#buttonContainer{
  position: absolute;
  bottom: 0;
  padding-bottom:20px;
  padding-left: 15px
}
div.Boxes{
    height: 100px;
    overflow-y: scroll;
}
#Image{
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
div.Info{
  text-align: center;
  padding-bottom: 35px;
}
h1.title, h2.subtitle{
  color: black;
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
  padding: 10px

}
body,html{
  height: 100%;
  width: 100%;
}

</style>
