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
    class="btn"
    :to="{ 
      name: 'DishesShow',
      params: { id: restaurant.id }
    }"
  >

    <div class="container-img">
      <img :src="store.imageURL + restaurant.img"
            @error="handleImageError"
            :alt="restaurant.restaurant_name"
            >
        <div class="types">
          <span v-for="item in restaurant.types" :key="item.id" v-html="item.img">
        </span>
      </div>
    </div>
    <div class="content">
      <h3>{{ restaurant.restaurant_name }}</h3>

    </div>


  </router-link>
</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';

  
  .container-img{
    position: relative;
    height: 200px;
    width: 100%;
    border-radius: 30px;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 30px;
    }
    .types{
      position: absolute;
      top: 10px;
      left: 10px;
      color: lightblue;
      margin: 0 5px;
      font-size: 20px;
    }
  }
  .content{
    h3{
      font-size: 20px;
      text-align: left;
      font-weight: bold;
      padding-left: 20px;
    }
  }

</style>
