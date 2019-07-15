<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Listado de Juegos</h4>
            <ul>
                <li v-for="(juegos, index) in juegos" :key="index">
                    <router-link :to="{
                            name: 'juegos-details',
                            params: { juegos: juegos, id: juegos.id }
                        }">
                            {{juegos.nombre}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
import http from "../http-common";

export default {
  nombre: "juegos-list",
  data() {
    return {
      juegos: [],
      thumbnail_url: ""
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrievejuegos() {
      http
        .get("/juegos")
        .then(response => {
          this.juegos = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          alert("Mariano"),
          console.log(e);
        });
    },
    refreshList() {
      this.retrievejuegos();
    }
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrievejuegos();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 450px;
  margin: auto;
}
</style>
