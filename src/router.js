import Vue from "vue";
import Router from "vue-router";
import juegosList from "./components/juegosList.vue";
import Addjuegos from "./components/Addjuegos.vue";
import Updatejuegos from "./components/Updatejuegos.vue";
import Searchjuegos from "./components/Searchjuegos.vue";
import juegos from "./components/juegos.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "juegos",
      alias: "/juegos",
      component: juegosList,
      children: [
        {
          path: "/juegos/:id",
          name: "juegos-details",
          component: juegos,
          props: true
        }
      ]
    },
    {
      path: "/add",
      name: "add",
      component: Addjuegos
    },
    {
      path: "/search",
      name: "search",
      component: Searchjuegos
    },
    {
      path: "/update/:id",
      name: "update",
      component: Updatejuegos,
      props: true
    }
  ]
});