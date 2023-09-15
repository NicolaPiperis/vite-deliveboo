<script>
import axios from 'axios';
import { store } from '../store';
import DishShow from '../components/DishShow.vue';
import RestaurantHeader from '../components/RestaurantHeader.vue';

export default {
  name: 'DishesShow',
  components: {
    DishShow,
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

  <div class="main-container">



    <div class="container">
      <div class="row">

        <div class="col-9">      

          <div class="container-element">
            <div class="container d-flexjustify-content-center">
    <!-- Utilizza il componente RestaurantHeader -->
    <RestaurantHeader/>
  </div>
            <h2>piatti</h2>
            <DishShow/>
          </div>

        </div>
        <div class="col-3">
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';

</style>
