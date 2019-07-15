<template>
  <div class="submitform">
    <h3>Actualizar Juego</h3>
    <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name" required v-model="juegos.nombre" name="nombre">
        </div>
    
        <div class="form-group">
          <label for="anio">Año</label>
          <input type="number" class="form-control" id="anio" required v-model="juegos.anio" name="anio">
        </div>

        <div class="form-group">
          <label for="anio">Ranking</label>
          <input type="number" class="form-control" id="ranking" required v-model="juegos.ranking" name="ranking">
        </div>

        <div class="form-group">
          <label for="jugadores ">Jugadores</label>
          <input type="number" class="form-control" id="jugadores" required v-model="juegos.jugadores" name="jugadores">
        </div>
    
        <button v-on:click="savejuegos" class="btn btn-success">Actualizar</button>
    </div>
    <div v-else-if="validation_error">
       <h4>No se completo correctamente el formulario</h4>
    </div>
    <div v-else>
      <h4>Se ha actualizado exitosamente el juego!</h4>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "update-juegos",
  data() {
    return {
      juegos: {
        nombre: "",
        anio:0,
        jugadores: 0,
        ranking:0,
      },
      submitted: false,
      validation_error: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    savejuegos() {
      var params = {
        nombre: this.juegos.nombre,
        anio: this.juegos.anio,
        jugadores: this.juegos.jugadores,
        ranking: this.juegos.ranking,
      };
      console.log(params)

      http
        .put("/juegos/" + this.$route.params.id, params)
        .then(response => { 
          this.juegos.nombre = response.data.nombre;
          this.juegos.anio = response.data.anio;
          this.juegos.jugadores = response.data.jugadores;
          this.juegos.ranking = response.data.ranking;
        })
        .catch(e => {
          this.validation_error = true
        }).finally(() => {
          this.submitted = true
        });
    },
    updatejuegos() {
      this.submitted = false
      this.validation_error = false
      this.juegos = {};
    }
    /* eslint-enable no-console */
  },
  beforeMount(){
    http
      .get("/juegos/" + this.$route.params.id)
      .then(response => {
        this.juegos.nombre = response.data.nombre;
        this.juegos.anio = response.data.anio;
        this.juegos.jugadores = response.data.jugadores;
        this.juegos.ranking = response.data.ranking;
      })
  }
};
</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
