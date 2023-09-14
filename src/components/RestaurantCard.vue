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
    handleImageError(event) {
      event.target.src = store.errorImageURL; 
    }
  }
}
</script>

<template>
  <router-link
    class="btn btn-outline-light border-0 mb-3 p-0"
    :to="{ 
      name: 'DishesShow',
      params: { id: restaurant.id }
    }"
  >
    <div class="card w-100 bg-transparent border-0" style="width: 18rem;">
        <img :src="store.imageURL + restaurant.img" class="img-fluid rounded-start"
            @error="handleImageError"
            :alt="restaurant.restaurant_name"
            >
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.restaurant_name }}</h5>
            <ul class="list-group list-group-flush bg-transparent">
                <li class="list-group-item bg-transparent border-0">{{ restaurant.email }}</li>
                <li class="list-group-item bg-transparent border-0">{{ restaurant.address }}</li>
                <li class="list-group-item bg-transparent border-0">{{ restaurant.phone_number }}</li>
            </ul>
        </div>
       
    </div>

  </router-link>
</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';

</style>
