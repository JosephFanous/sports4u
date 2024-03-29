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
    path: "/afterLogin",
    name: "AfterLogin",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/AfterLogin.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/Login.vue")
  },
  {
    path: "checkLogin",
    name: "CheckLogin",
    component: () =>
      import("../components/Checklogin.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
    import(/* webpackChunkName: "map" */ "../views/Register.vue")
  },
  {
    path: "/locationsearch",
    name: "LocationSearch",
    component: () =>
    import(/* webpackChunkName: "locationsearch" */ "../views/LocationSearch.vue")
  },
  {
    path: "/venue/:id",
    name: "VenuePage",
    component: () =>
      import(/* webpackChunkName: "venue" */ "../views/VenuePage.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
    import(/* webpackChunkName: "map" */ "../views/Profile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
