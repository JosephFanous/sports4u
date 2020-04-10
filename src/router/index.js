import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/map",
    name: "Map",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/Map.vue")
  },
  {
<<<<<<< HEAD
    path: "/afterLogin",
    name: "AfterLogin",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/AfterLogin.vue")
=======
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
    import(/* webpackChunkName: "map" */ "../views/Register.vue")
>>>>>>> aeeda851e526bc977cbdc8a9396d7ceb82e60774
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
