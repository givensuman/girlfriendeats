<template>

<v-row>
    <v-col align="center"
    justify="center">

      <v-form>
        <v-label>
            How far are we willing to go?
        </v-label>
          <v-slider
            v-model='range'
            ticks
            thumb-label
            step='1'
            min='1'
            max='20'
          >
            <template v-slot:thumb-label="{ value }">
                {{ value + 'mi' }}
            </template>
          </v-slider>
      </v-form>
      <v-form>
        <v-label>
          What's the most we're willing to spend?
        </v-label>
          <v-slider
            v-model='price'
            ticks
            thumb-label
            step='1'
            min='1'
            max='4'
          >
              <template v-slot:thumb-label="{ value }">
                  {{ priceArray[value - 1] }}
              </template>
          </v-slider>
      </v-form>
      <v-btn
        color='primary'
        elevation="9"
        x-large
        @click='handleFilters'
      >
        Let's eat!
      </v-btn>

    </v-col>
</v-row>

</template>

<script>
export default {
  name: 'Filters',
  data() {
    return {
        price: 2,
        priceArray: ['$', '$$', '$$$', '$$$$'],
        range: 5
    }
  },
  methods: {
      handleFilters() {
          this.$emit('handleFilters', {price: this.price, range: this.range})
          console.log(typeof this.price, typeof this.range)
      }
  },
}
</script>

<style>

</style>