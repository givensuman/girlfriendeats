<template>
  <v-app id='app'>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer 
    padless
    style='background-color: transparent; color: white;'
    z-index='-1'>
      <v-col
        class="text-center"
        cols="12">
      Made with ❤️ for my wonderful girlfriend Elena
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  background-image: linear-gradient(145deg, rgb(221, 160, 245), rgb(86, 124, 228));
  overflow: hidden;
}

/* #footer {
  margin: 0 auto;
  color: #F8F0E3;
  position: relative;
  bottom: 1rem;
  font-size: 1.2rem;
} */
</style>