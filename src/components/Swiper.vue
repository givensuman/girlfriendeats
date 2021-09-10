<template>
    <flickity :options='flickityOptions'>
        <v-card class='cell' v-for='item in data' :key='item.id'
            elevation='9'
            minWidth='100%'
            minHeight='fit-content'
            style='margin-right: 50px'>
            <v-img
            align='center'
            lazy-src='../assets/lazyload.png'
            :src='item.image_url'
            maxHeight='250px'
            relative
            ></v-img>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>
                <v-col align='center'>
                    <v-row align='center'>
                        <v-rating
                        :value='item.rating'
                        color='amber'
                        background-color='grey'
                        dense
                        half-increments
                        readonly
                        size='14'
                        ></v-rating>
                        <span class='text'>{{ item.rating }}</span>
                        <span class='text'>({{ item.review_count }})</span>
                    </v-row>
                    <v-row align='center'>
                        <span class='text' style='font-weight: bold'>{{ item.price }}</span>
                        <span class='type text' v-for='(type, index) in item.categories' :key='index'>
                            {{ type.title }}<span v-if='index !== item.categories.length - 1'>,</span>
                        </span>
                    </v-row>
                    <v-row align='center'>
                        <v-icon left color="purple darken-2">mdi-map-marker</v-icon>
                        <span class='text'>
                            {{ item.location.display_address[0] }} {{ item.location.display_address[1] }}, {{ item.location.city }}
                        </span>
                    </v-row>
                    <v-row>
                        <v-icon left color="purple darken-2">mdi-phone</v-icon>
                        <span class='text'>{{item.display_phone}}</span>
                    </v-row>
                </v-col>
            </v-card-text>
            <v-row align='center'>
                <span class='text method' v-for='(method, index) in item.transactions' :key='index'>
                    {{ method.toUpperCase() }}
                </span>
            </v-row>
            <v-row align='center'>
                    <v-btn 
                    color='primary' 
                    elevation="9" 
                    x-large 
                    style='margin: 0 auto'
                    bottom
                    @click='handleSelection(item.url)'>
                        This one!
                    </v-btn>
            </v-row>
        </v-card>
    </flickity>
</template>

<script>
import Flickity from 'vue-flickity'

export default {
    name: 'Swiper',
    components: {
        Flickity
    },
    props: ['data'],
    data() {
        return {
             flickityOptions: {
                wrapAround: true,
                fullScreen: true,
                accessibility: true,
             }
        }
    },
    methods: {
        handleSelection(url) {
            this.$emit('handleSelection', url)
        }
    }
}
</script>

<style lang='scss'>
.text {
    margin: 5px 5px;
    font-size: 1.2em;
}

.type {
    margin: 5px 0.25ch;
}

.method {
    box-shadow: -2px 2px 7px grey;
    position: relative;
    left: 20px;
    padding: 0 .5ch;
    color: grey;
}

.flickity-enabled {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    top: clamp(10px, 5vw, 20vh);
    min-height: 650px; /* wtf */
}

.flickity-viewport {
    min-height: 650px; /* wtf */
}

.flickity-page-dots {
  bottom: -22px;
  padding: 0 5px!important;

  @media (max-width: 640px) {
      visibility: hidden;
  }
}
/* dots are lines */
.flickity-page-dots .dot {
  height: 4px;
  width: 5%;
  margin: 0;
  border-radius: 0;
}
.flickity-button {
  display: none;
}
/* big previous & next buttons */
.flickity-prev-next-button {
  width: 100px;
  height: 100px;
}
/* icon color */
.flickity-button-icon {
  fill: white;
}
/* hide disabled button */
.flickity-button:disabled {
  display: none;
}
</style>