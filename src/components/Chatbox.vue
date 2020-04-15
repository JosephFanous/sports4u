<template>
<div>
  <div id="chat" v-on:click="handleChatOpen" class="has-text-centered has-text-weight-bold	">
    Chat
    <span class="icon">
      <i class="fas fa-comment"></i>
    </span>
  </div>

  <div id="chatPopup" v-bind:style="{ display: changeDisplay }">
    <div id="messages">
      <div>Sam:  Hey buddy!  How are you?</div>
    </div>
    <div id="chatForm">
    <ul>
      <li>Nandor: </li>
      <li><input type="text" id="messageField" name="message"></li>
    </ul>
      </input>
    </div>
  </div>
</div>
</template>
<style scoped>
li{
  display: inline-block;
}
ul{
  display: inline-block;
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

#messages {
	padding: 1em;
}

#chatForm {
	padding: 1em;
}
.display{display: chatBox;}

</style>
<script>
  export default {
    name: 'Chatbox',
    props: {
    },
    data: function() {
      return {
        chatOpend: false,
        chatBox: 'box',
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
      handleOnEnter(){
        
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
