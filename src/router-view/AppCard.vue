<script>
import axios from 'axios';
import { store } from '../store';
import TypeCard from '../components/TypeCard.vue';
import RestaurantCard from '../components/RestaurantCard.vue';

const apiURL = 'http://localhost:8000/api/v1'; // Sostituisci con la tua URL API

export default {
  name: 'Card',
  components: {
    TypeCard,
    RestaurantCard
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    // Funzione per cercare un ristorante in base all'ID del tipo
    searchRestaurant(id) {
      this.typesID.push(id);

      console.log(this.typesID.join(','));

      axios.get(apiURL + '/restaurants/' + this.typesID.join('-'))
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // Funzione per salvare gli ID dei tipi selezionati nello store
    saveTypeSearch() {
      const typeSearch = [];

      // Itera attraverso tutti i tag `input` di tipo `checkbox`
      const inputs = document.querySelectorAll('input[type="checkbox"]');
      for (const input of inputs) {
        // Se il tag `input` è selezionato, aggiungi il valore del suo ID all'array `typeSearch`
        if (input.checked) {
          typeSearch.push(input.name);
        }
      }

      // Salva l'array `typeSearch` nello store
      store.typeSearch = typeSearch;
      console.log('store.typeSearch aggiornato: ', store.typeSearch);
    },
    // Funzione per cercare ristoranti in base ai tipi selezionati
    searchTypeRestaurant() {
      this.saveTypeSearch();

      // Inizializza un array vuoto per memorizzare i ristoranti che soddisfano tutti i tipi selezionati
      const ristorantiFiltrati = [];

      // Se store.typeSearch è vuoto, mostra tutti i ristoranti
      if (store.typeSearch.length === 0) {
        store.restaurantSearch = store.restaurantList;
        return;
      }

      // Itera attraverso tutti i ristoranti
      store.restaurantList.forEach(singleRestaurant => {
        // Estrai gli ID dei tipi associati a questo ristorante come stringhe
        const tipiRistorante = singleRestaurant.types.map(type => String(type.id));

        // Verifica se tutti gli ID dei tipi selezionati sono presenti nell'array dei tipi del ristorante
        const tipiTuttiPresenti = store.typeSearch.every(id => tipiRistorante.includes(id));

        // Se tutti i tipi selezionati sono presenti, aggiungi il ristorante all'array dei ristoranti filtrati
        if (tipiTuttiPresenti) {
          ristorantiFiltrati.push(singleRestaurant);
        }
      });

      // Aggiorna lo store con l'array dei ristoranti filtrati
      store.restaurantSearch = ristorantiFiltrati;
      console.log('store.restaurantSearch aggiornato: ', store.restaurantSearch);
    },
  },

  mounted() {
    // Chiamata Axios per ottenere i dati iniziali
    axios.get(apiURL + '/home')
      .then(response => {
        store.typeList = response.data.types;
        store.restaurantList = response.data.restaurant;

        // Esegui la ricerca dei ristoranti una volta che i dati sono stati caricati
        this.searchTypeRestaurant();

        console.log('lista ristoranti: ', store.restaurantList);
        console.log('lista type: ', store.typeSearch);
        console.log('tutti type: ', store.typeList);
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
    
  </div>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <h4>Tipologie</h4>
        <form @change="searchTypeRestaurant()">
            <div v-for="t in store.typeList" :key="t.id" class="border-bottom">
                <TypeCard  :type="t" />
            </div>
        </form>
      </div>
      <div class="col-10">
        <h2>ristoranti cercati</h2>
        <div class="container d-flex flex-wrap">
          <RestaurantCard v-for="r in store.restaurantSearch" :key="r.id" :restaurant="r" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
h3 {
  text-align: center;
}
</style>