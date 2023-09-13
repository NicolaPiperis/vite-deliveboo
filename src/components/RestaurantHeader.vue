<script>

import { store } from '../store';

export default {
    name: 'RestaurantHeader',
    props: {
        restaurant: {
            type: Object
        }
    },
    data() {
        return {
      store,
    }
  },
    methods: {

    }
}
</script>

<template>
    

    <div class="card text-bg-dark">
        <img :src="store.imageURL + store.restaurantSelected.img" class="card-img" :alt="store.restaurantSelected.restaurant_name">
        <div class="card-img-overlay">
            <h5 class="card-title">{{ store.restaurantSelected.restaurant_name }}</h5>
            <p class="card-text">{{ store.restaurantSelected.email }}</p>
            <p class="card-text"><small>{{ store.restaurantSelected.address }}</small></p>
            <p class="card-text"><small>{{ store.restaurantSelected.phone_number }}</small></p>
        </div>
    </div>


</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';
</style>
