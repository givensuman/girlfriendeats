<template>

<div id='wrapper' v-if='!loading' class='elevation-9'>
  <h1>girlfriendeats</h1>
  <v-container>
    <ZipCode v-if='index === 0' @handleZip='handleZip'/>
    <Categories v-if='index === 1' @handleCategories='handleCategories' />
    <Filters v-if='index === 2' @handleFilters='handleFilters' />
  </v-container>
</div>
<Loading v-else />

</template>

<script>
  import ZipCode from '../components/ZipCode'
  import Categories from '../components/Categories'
  import Filters from '../components/Filters'
  import Loading from '../components/Loading'

  export default {
    name: 'Home',
    components: {
      ZipCode, Categories, Filters, Loading
    },
    data() {
      return {
        index: 0,
        zipCode: '',
        categories: '',
        price: '',
        range: '',
        loading: false
      }
    },
    methods: {
      handleZip(value) {
        this.zipCode = value
        this.index++
      },
      handleCategories(value) {
        this.categories = value
        this.index++
      },
      handleFilters({ price, range }) {
        this.price = price
        this.range = range

        this.handleNext()
      },
      async handleNext() {
        this.loading = true

        this.$router.push(`/gf?l=${this.zipCode}&c=${this.categories}&p=${this.price}&r=${this.range}`)
      }
    }
  }
</script>

<style lang='scss'>
#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 250px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  top: clamp(10px, 5vw, 20vh);
  
  background-color: #F8F0E3;
  border-radius: 20px;
  padding: clamp(1rem, 3rem, 5rem);

  h1 {
    font-size: clamp(2rem, 10vw, 4rem)
  }
}
</style>
