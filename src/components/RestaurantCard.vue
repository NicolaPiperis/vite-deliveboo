<script>
import { store } from '../store';

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
    // Qui puoi definire eventuali metodi personalizzati per il componente
  }
}
</script>

<template>
  <router-link
    class="btn btn-success mb-3"
    :to="{ 
      name: 'DishesShow',
      params: { id: restaurant.id }
    }"
  >
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
  </router-link>
</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';
</style>
