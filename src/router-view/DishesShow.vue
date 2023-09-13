<script>
import axios from 'axios';
import { store } from '../store';
import DishCard from '../components/DishCard.vue';
import RestaurantHeader from '../components/RestaurantHeader.vue';

export default {
  name: 'DishesShow',
  components: {
    DishCard,
    RestaurantHeader,
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    // Puoi definire qui eventuali metodi personalizzati per il componente
  },
  mounted() {
    // Ottieni l'ID del ristorante dalla route attuale
    const restaurantId = this.$route.params.id;

    // Effettua una richiesta Axios per ottenere la lista dei piatti del ristorante
    axios.get(store.apiURL + '/restaurant/' + restaurantId + '/dishes')
      .then(response => {
        // Salva la lista dei piatti nello store
        store.dishesList = response.data.dishes;

        // Salva i dati del ristorante selezionato nello store
        store.restaurantSelected = response.data.restaurantSelected;

        console.log('risposta ristorante: ', response.data.restaurantSelected);
        console.log('lista piatti: ', store.dishesList);
        console.log('ristorante: ', store.restaurantSelected);
      })
      .catch(error => {
        console.log(error);
      });
  },
}
</script>

<template>
  <h3>Questa è la card type</h3>

  <div class="container container d-flex flex-wrap justify-content-center mb-5">
    <!-- Utilizza il componente RestaurantHeader -->
    <RestaurantHeader/>
  </div>

  <h2 class="text-center mb-4">piatti</h2>

  <div class="container d-flex flex-wrap justify-content-center gap-4">
    <DishCard v-for="dish in store.dishesList" :key="dish.id" :dish="dish" />
  </div>
</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';
  h3 {
    text-align: center;
  }
</style>
