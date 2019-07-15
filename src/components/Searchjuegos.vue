
<template>
  <div class="searchform">
    <h4>Buscar Juego</h4>
    <div class="form-group">
      <input type="text" class="form-control" id="id" required v-model="nombre" name="nombre">
    </div>
 
    <div class="btn-group">
      <button v-on:click="searchjuegos" class="btn btn-success">Buscar</button>
    </div>

    <ul class="search-result">
      <li v-for="(juego, index) in juegos" :key="index">
        <router-link :to="{
            name: 'juegos-details',
            params: { juegos: juego, id: juego.id }
          }">
            {{juego.nombre}}
        </router-link>
      </li>
    </ul>

    <div v-if="not_found">
      <h4>No se encontro ningun juego.</h4>
    </div>
  </div>


  

</template>

<script>
import http from "../http-common";

export default {
  nombre: "search-juegos",
  data() {
    return {
      nombre: "",
      juegos: [],
      not_found: false
    };
    
  },
  
  methods: {
    /* eslint-disable no-console */
    searchjuegos() {
      console.log("Busqueda: " + this.nombre)
      this.juegos = []
      this.not_found = false
      http
        .get("/juegos/find" , { params: { nombre: this.nombre }})
        .then(response => {
          console.log(response)
          this.juegos = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
          console.log("CATCH")
          this.not_found = true
        });
        (err) => {
          console.log("error", err);
        };
    }
    /* eslint-enable no-console */
  }
};
</script>

<style>
.searchform {
  max-width: 300px;
  margin: auto;
}
.search-result {
  margin-top: 20px;
  text-align: left;
}
</style>
