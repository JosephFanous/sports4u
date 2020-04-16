<template>
<div>
  <div id="chat" v-on:click="handleChatOpen" class="has-text-centered has-text-weight-bold	">
    Chat
    <span class="icon">
      <i class="fas fa-comment"></i>
    </span>
  </div>

  <div id="chatPopup" class="has-text-weight-bold" v-bind:style="{ display: changeDisplay }">
    <i id="close" class="fas fa-times"></i>
    <div id="messagesBox" v-model="chatMessages" >
      <div v-if="messageStart" v-for="element in OtherMessages">
        <div id="othersMessage" v-html="element[0]"></div> 
      </div>
      <div v-for="element in chatMessages" >
        <div id="message" v-if="messageStart" v-html="element[0]"></div>
      </div>
    </div>
    <div id="chatForm">
      <input class="input" type="text" v-model="socketMessage" v-on:keyup="handleOnEnter" placeholder="type message here" />
    </div>
  </div>
</div>
</template>
<style scoped>
#close{
  float:right;
  padding: 5px;
}
#chatForm{
  position: fixed;
  bottom: 10px;
  width: 370px;
  padding-left: 0.5rem;
  padding-right:0.5rem;
}
#message{
  background-color: deepskyblue;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px;
  padding-left: 30px;
  margin-bottom: 15px;
  width: 300px;
  float:right;
  
}
#othersMessage{
  background-color: lightgray;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px;
  margin-bottom: 15px;
  float: left;
  width: 300px;
}
#chat .icon{
  float:right;
}
#chat {
  display: box;
	padding-left: 0.5em;
	padding-right: 0.5em;
	position: fixed;
	right: 0;
	bottom: 0;
	height: 40px;
	width: 300px;;
	background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
	border: 1px solid black;
  font-size: 20px;
}
#chatPopup {
	display: box;
	position:fixed;
	bottom: 0px;
	right: 0;
  height:500px;
	width: 400px;
	padding: 0.25em 1em 0.25em 1em;
	background: white;
	border: 1px solid black;
  border-radius: 5px;
}

#messagesBox {
	padding: 10px;
}


.display{display: chatBox;}

</style>
<script >
import io from 'socket.io-client';
  export default {
    name: 'Chatbox',
    props: {
    },
    created(){
      this.chatMessages.push(this.UserMessages);
      this.OtherMessages.push(this.PublicMessages);
    },
    data: function() {
      return {
        socket: io.connect('http://localhost:3000'),
        chatOpend: false,
        chatBox: 'box',
        isConnected: false,
        
        chatMessages: [],
        UserMessages: [],
        OtherMessages: [],
        PublicMessages:[],
        
        socketMessage: '',
        messageStart: false,
      }
    },
    methods: {
      handleChatOpen(event){
        this.chatOpend = true;
        console.log("ChatOpened");
        console.log(this.chatBox);
        this.chatBox = 'box';
        
      },
      handleChatClose(){
        this.display = 'none';
        
      },
      handleOnEnter: function(e){
        this.UserMessages = [];
        if(e.keyCode ===13){
          //Recieve messages from the server TODO FORMAT INCOMING MESSAGES
          // this.socket.on('chat message', function([msg,UserName]){
          //   this.OtherMessages.push([`<div>hello</div>`]);
          //   console.log(UserName + ': ' + msg);
          // });
          //Send Message to Server
          this.messageStart = true;
          e.preventDefault();
          this.socket.emit('chat message',[this.socketMessage, "this.$globalStore.user.username"]);
          this.chatMessages.push([`<div>${this.socketMessage} </div>`]);
        }  
      },
      
    },
    computed: {
      changeDisplay: function(){
        return this.display;
      }
    }
  }
</script>
