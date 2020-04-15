import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import io from 'socket.io-client';
import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// global variables to be accessed and changed by any component
const globalStore = new Vue({
  data: {
    user: null
  }
})
Vue.prototype.$globalStore = globalStore

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

//export const SocketInstance = socketio('http://localhost:3000');
//Vue.use(VueSocketIO, SocketInstance)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
