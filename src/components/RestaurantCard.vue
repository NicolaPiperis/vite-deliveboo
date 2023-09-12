<script>
import axios from 'axios';
import { store } from '../store';


const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'RestaurantCard',
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
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="store.imageURL + restaurant.img" class="img-fluid rounded-start" :alt="restaurant.restaurant_name">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ restaurant.restaurant_name }}</h5>
                    <p class="card-text">{{ restaurant.email }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ restaurant.address }}</small></p>
            </div>
        </div>
    </div>
</div>



</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';
</style>
