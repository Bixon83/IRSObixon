<template>
    <div id="app" class="container-fluid">
        <div class="site-info">
            <h3>Juegos De Mesa</h3>
        </div>
        <nav>
            <router-link class="btn btn-primary" to="/">Juegos</router-link>
            <router-link class="btn btn-primary" to="/add">Agregar Juego</router-link>
            <router-link class="btn btn-primary" to="/search">Buscar</router-link>
            <a class="btn btn-primary" href="https://front-irso.herokuapp.com">Clientes</a>
        </nav>
        <br/>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
.site-info {
  color: blue;
  margin-bottom: 20px;
}

.btn-primary {
  margin-right: 5px;
}

.container-fluid {
  text-align: center;
}
</style>
