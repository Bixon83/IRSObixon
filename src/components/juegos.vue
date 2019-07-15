<template>
  <div v-if="this.juegos">
    <h4>Juego</h4>
    <div>
      <label>Nombre:</label> <b> {{this.juegos.nombre}}</b> 
    </div>
    <div>
      <label>Año: </label> {{this.juegos.anio}}
    </div>
    <div>
      <label>Ranking: </label> {{this.juegos.ranking}}
    </div>
    <div>
      <label>Jugadores: </label> {{this.juegos.jugadores}}
    </div>
    <img v-bind:src="this.juegos.thumbnail_url" />
    <br>
      
    <span v-on:click="getPhoto" class="button is-small btn-primary">Foto</span>

    <router-link class="btn is-small btn-primary" :to="{
            name: 'update',
            params: { id: this.juegos.id }
          }">Update</router-link>
  
    <span class="button is-small btn-danger" v-on:click="deletejuegos()">Borrar</span>
  </div>
  <div v-else>
    <br/>
    <p>Seleccione un juego...</p>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "juegos",
  props: ["juegos"],
  methods: {
    /* eslint-disable no-console */
    getPhoto(status) {
      var data = {
        id: this.juegos.id,
        nombre: this.juegos.nombre,
        anio:this.juegos.anio,
        ranking:this.juegos.ranking,
        jugadores:this.juegos.jugadores,
        thumbnail_url:this.juegos.thumbnail_url
      };

      var parseString = require('xml2js').parseString
      
      http
        .get("https://www.boardgamegeek.com/xmlapi2/search?query=" + this.juegos.nombre)
        .then(response => {
          var bgg_id = null
          var thumbnail_url = ""
          parseString(response.data, function (err, result) {
            try{
              bgg_id = result['items']['item'][0]['$'].id
            }
            catch(e){
              console.log("No se encontro la imagen")
              alert("No se encontro la imagen")
            }
          })

          //var this_obj = this
          http
          .get("https://www.boardgamegeek.com/xmlapi2/thing?id=" + bgg_id)
          .then(response => {
            parseString(response.data, function (err, result) {
              try{
                thumbnail_url = result['items']['item'][0]['thumbnail'][0]
              }
              catch(e){
                console.log("No se encontro la imagen")
              }
            })
            console.log("THUMBNAIL")
            console.log(thumbnail_url)
            this.juegos.thumbnail_url = thumbnail_url
            this.$forceUpdate();
            
          })
        })

      
      /*
      http
        .get("https://www.boardgamegeek.com/xmlapi2/thing?id=174430")
        .then(response => {
          parseString(response.data, function (err, result) {
            console.log(result['items']['item'][0]['thumbnail'][0])
            thumbnail_url = result['items']['item'][0]['thumbnail'][0]
          })
        })
      */
      //this.juegos.thumbnail_url = thumbnail_url
      //console.log("THUMBNAIL")
      //console.log(thumbnail_url)

      http
        .put("/juegos/" + this.juegos.id, data)
        .then(response => {
          this.juegos.active = response.data.active;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deletejuegos() {
      http
        .delete("/juegos/" + this.juegos.id)
        .then(response => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push('/');
        })
        .catch(e => {
          console.log(e);
        });
    }
    /* eslint-enable no-console */
  }
};
</script>