<template>

<v-row>
    <v-col align="center"
    justify="center">

      <v-form @submit='e => e.preventDefault()'>
          <v-text-field
            v-model="categories"
            outlined
            label="What Are You In The Mood For?"
          ></v-text-field>
      </v-form>
      <v-btn
        :outlined='!answered'
        :color='answered ? "primary" : "secondary"'
        elevation="9"
        x-large
        @click='handleCategories'
      >
        <span v-if='!answered'><strong>I don't know</strong></span>
        <span v-else>Ooh, good choice</span>
      </v-btn>

    </v-col>
</v-row>

</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      categories: ''
    }
  },
  computed: {
    answered: function() {
      return this.categories.length > 0 ? true : false
    }
  },
  methods: {
      handleCategories() {
          this.$emit('handleCategories', this.categories)
      }
  }
}
</script>

<style>

</style>