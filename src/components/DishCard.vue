<script>

import { store } from '../store';

export default {
    name: 'RestaurantCard',
    props: {
        dish: {
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

    <div v-if="dish.visibility && !dish.deleted" class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="store.imageURL + dish.img" class="img-fluid rounded-start" :alt="dish.dish_name">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ dish.dish_name }}</h5>
                    <p class="card-text">{{ dish.description }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ dish.price }}</small></p>
                </div>
            </div>
        </div>
    </div>




</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';
</style>
