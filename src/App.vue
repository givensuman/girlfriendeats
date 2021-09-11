<template>
  <v-app id='app'>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer
    id='footer'
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

@media (max-height: 470px) {
  #footer {
    visibility: hidden!important;
  }
}
</style>