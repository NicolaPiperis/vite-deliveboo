<script>
import { store } from '../store';

export default {
  name: 'Confirm',
  components: {
    
  },
  data() {
    return {
      store,
      orderData: [],
    };
  },
  methods: {

  },
  mounted() {
;
  }
}
</script>


<template>
  <div class="main-container">
    <div class="container-element d-flex justify-content-center align-items-center">
      <div class="card border-success mb-3" style="max-width: 18rem;">
        <div class="card-header">Riepilogo del tuo ordine</div>
        <div class="card-body text-success">
          <h5 class="card-title">Nome</h5>
          <p class="card-text">{{ store.order.customer_name }}</p>
          <h5 class="card-title">Indirizzo</h5>
          <p class="card-text">{{ store.order.customer_adress }}</p>
          <h5 class="card-title">Email</h5>
          <p class="card-text">{{ store.order.email }}</p>
          <h5 class="card-title">Telefono</h5>
          <p class="card-text">{{ store.order.phone_number }}</p>
          <h5 class="card-title">Totale</h5>
          <p class="card-text">{{ store.order.total_price }}</p>

        </div>
        <div class="card-footer">
          <router-link :to="{ name: 'AppHome' }" class="btn btn-primary">
            Home
          </router-link>
        </div>
  
      </div>
    </div>
  </div>



</template>

<style lang="scss">
@use '../styles/general.scss';

</style>

