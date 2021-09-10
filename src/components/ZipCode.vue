<template>

<v-row>
    <v-col align="center"
    justify="center">

      <v-form @submit='e => e.preventDefault()'>
          <v-text-field
            v-model="zipCode"
            type='number'
            outlined
            :counter="5"
            label="What Zip Code Are You In?"
            required
          ></v-text-field>
      </v-form>
      <v-btn
        :outlined='disable'
        color='primary'
        elevation="9"
        x-large
        center
        :disabled='disable'
        @click='handleZip'
      >
        <span v-if='disable'><strong>. . .</strong></span>
        <span v-else>Sweet area code, babe</span>
      </v-btn>

    </v-col>
</v-row>

</template>

<script>
export default {
  name: 'ZipCode',
  data() {
    return {
      zipCode: ''
    }
  },
  computed: {
    disable: function() {
      return this.zipCode.length === 5 ? false : true
    }
  },
  methods: {
    handleZip() {
      this.$emit('handleZip', this.zipCode)
    }
  }
}
</script>

<style>

</style>
