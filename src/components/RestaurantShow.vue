<script>
import axios from 'axios';
import { store } from '../store';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
  name: 'RestaurantShow',
  components: {
    RestaurantCard,
  },
  data() {
    return {
      store,
    }
  },
  methods: {

  },

  mounted() {
  },
}
</script>

<template>

  <div class="container">
    <div class="row">
      <div class="col-4" v-for="singleRestaurant in store.restaurantSearch" :key="singleRestaurant.id" >
        <RestaurantCard :restaurant="singleRestaurant" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

</style>