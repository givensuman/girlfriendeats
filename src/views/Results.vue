<template>

<div id='results' v-if='!loading'>
  <Swiper :data='data' @handleSelection='handleSelection'/>
  <v-alert
  type='success'
  elevation='9'
  prominent
  v-if='selection'
  dismissable
  max-width='200px'
  style='background-color: #3f51b5!important'
  >
  Yay! Redirecting you to their website...
  </v-alert>
  <canvas id='confetti'></canvas>
</div>
<Loading v-else />

</template>

<script>
import Loading from '../components/Loading'
import Swiper from '../components/Swiper'

import axios from 'axios'
import ConfettiGenerator from 'confetti-js'

export default {
  name: 'Results',
  components: {
    Loading, Swiper
  },
  props: ['location', 'categories', 'price', 'range'],
  data() {
    return {
      loading: true,
      selection: false,
      data: {},
      time: 3
    }
  },
  computed: {
    // Yelp's API will take "1, 2, 3" and return prices $$$ or less
    priceCorrected: function() {
      let priceArray = []
      for (let i=1; i<=this.price; i++) {
        priceArray.push(String(i))
      }
      return priceArray.join(", ")
    },
    // The radius parameter requires a value in meters
    rangeCorrected: function() {
      let meters = this.range * 1609.34
      return Math.floor(meters)
    }
  },
  methods: {
    async fetchData() {
        const token = process.env.VUE_APP_TOKEN
        console.log(token)
        let data = await axios('https://proxy.given.codes/https://api.yelp.com/v3/businesses/search', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            term: this.categories,
            location: this.location,
            price: this.priceCorrected,
            radius: this.rangeCorrected
          }
        })
          .then(res => res.data.businesses)
          .catch(err => console.log(err))
        
        return data
    },
    handleSelection(url) {
      this.selection = true

      let confettiSettings = {"target":"confetti",
      "max":"300","size":"1","animate":true,
      "props":["circle","square","triangle","line"],
      "colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
      "clock":"150","rotate":true,"width":"2560","height":"1333",
      "start_from_edge":true,"respawn":false};

      let confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      setTimeout(() => {
        window.open(url, '_self')
      }, 3000)
    }
  },
  async mounted() {
    this.data = await this.fetchData()
    this.loading = false
  }
}
</script>

<style>
#confetti { 
  position: absolute;
  top: 0;
}
</style>
