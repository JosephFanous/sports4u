<template>
<div>
  <div id="chat" v-on:click="handleChatOpen" v-bind:style="{display: chatBox}">
    <div class="has-text-centered has-text-weight-bold">
      Chat
      <span class="icon">
        <i class="fas fa-comment"></i>
      </span>
    </div>
  </div>

  <div id="chatPopup" class="has-text-weight-bold" v-bind:style="{ display: chatWindow }">
    <i id="close" v-on:click="handleChatClose" class="fas fa-times"></i>
    <div id="textForm">
      <div v-for="message in messages">
        <div v-bind:class="{ 'message': message.isSelf, 'othersMessage':!message.isSelf }">{{message.content}}</div>
      </div>
      <div id="chatForm">
        <input id="inputbox" class="input" type="text" v-model="socketMessage" v-on:keyup="handleOnEnter" placeholder="type message here" />
      </div>
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
.message{
  background-color: deepskyblue;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px;
  padding-left: 30px;
  margin-bottom: 15px;
  width: 300px;
  float: right;
  
}
.othersMessage{
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
  display: block;
	padding-left: 0.5em;
	padding-right: 0.5em;
	position: fixed;
	right: 0;
	bottom: 0px;
	height: 40px;
	width: 300px;;
	background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
	border: 1px solid black;
  font-size: 20px;
}
#chatPopup {
	display: none;
	position:fixed;
	bottom: 0px;
	right: 0;
  height:500px;
	width: 400px;
	padding: 0.25em 1em 0.25em 1em;
	background: white;
	border: 1px solid black;
  border-radius: 5px;
  z-index: 999;
}
#textForm{
  height:442px;
  overflow-y: auto;
  padding-top: 30px;
}

#messagesBox {
	padding: 10px;
}

</style>
<script >
import io from 'socket.io-client';
  export default {
    name: 'Chatbox',
    props: {
    },
    data: function() {
      return {
        socket: '',
        chatOpend: true,
        chatBox: 'block',
        chatWindow: 'none',
        isConnected: false,  
        messages: [],
        socketMessage: '',
        messageStart: false,
      }
    },
    methods: {
      handleChatOpen(event){
        this.chatOpend = true;
        console.log("ChatOpened");
        this.chatBox = 'none';
        this.chatWindow = 'block';
        this.messageStart = true;
        //Only connect when the chatbox is open
        this.socket = io.connect('http://localhost:3000');
        //Recieve messages from the server TODO FORMAT INCOMING MESSAGES
         this.socket.on('chat message', ([msg,UserName]) => {
           if(UserName == this.$globalStore.user.username){
           }else{
             this.messages = [...this.messages, {content: UserName + ': ' + msg ,isSelf: false}]
             console.log(UserName + ': ' + msg);
           }
         });
        
      },
      handleChatClose(){
        this.chatBox = 'block';
        this.chatWindow = 'none';
        this.messages = [];
      },
      handleOnEnter: function(e){
        if(e.keyCode ===13){
          e.preventDefault();
          this.socket.emit('chat message',[this.socketMessage, this.$globalStore.user.username]);
          this.messages = [...this.messages, {content: this.socketMessage, isSelf: true}]
          this.socketMessage = '';

        }  
      },
    },
    computed: {
    }
  }
</script>
