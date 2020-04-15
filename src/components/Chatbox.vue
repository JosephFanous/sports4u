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
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="pingServer()">Ping Server</button>
    <div id="messagesBox">
      <div id="message"> Hello, I'm good you?? dsasdasd</div>
      <div id="othersMessage">Sam:  Hey buddy!  How are you asdasdasdadasdasda </div>
    </div>
    <div id="chatForm">
      <input class="input" type="text" v-on:keyup="handleOnEnter" placeholder="type message here">  
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
    data: function() {
      return {
        socket: io.connect('http://localhost:3000'),
        chatOpend: false,
        chatBox: 'box',
        isConnected: false,
        chatMessages: '',
        socketMessage: ''
      }
    },
    sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data
    },
    },
    methods: {
      pingServer() {
      // Send the "pingServer" event to the server.
      // this.$socket.emit('pingServer', 'PING!')
    },
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
        if(e.keyCode ===13){
          console.log("Enter");
        
        }  
      },
      sendMessage(){
        
      },
    },
    computed: {
      changeDisplay: function(){
        return this.display;
      }
    }
  }
</script>
