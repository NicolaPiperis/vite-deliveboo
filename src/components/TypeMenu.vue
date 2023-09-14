<script>
import axios from 'axios';
import { store } from '../store';
import TypeCard from '../components/TypeCard.vue';

const apiURL = 'http://localhost:8000/api/v1'; // Sostituisci con la tua URL API

export default {
  name: 'TypeMenu',
  components: {
    TypeCard,
  },
  data() {
    return {
      store,
    }
  },
  methods: {

  //   // Funzione per salvare gli ID dei tipi selezionati nello store
  //   saveTypeSearch() {
  //     const typeSearch = [];

  //     // Itera attraverso tutti i tag `input` di tipo `checkbox`
  //     const inputs = document.querySelectorAll('input[type="checkbox"]');
  //     for (const input of inputs) {
  //       // Se il tag `input` è selezionato, aggiungi il valore del suo ID all'array `typeSearch`
  //       if (input.checked) {
  //         typeSearch.push(input.name);
  //       }
  //     }
  //     // Salva l'array `typeSearch` nello store
  //     store.typeSearch = typeSearch;
  //     console.log('store.typeSearch aggiornato: ', store.typeSearch);
  //   },

  //   // Funzione per cercare ristoranti in base ai tipi selezionati
  //   searchTypeRestaurant() {
  //     this.saveTypeSearch();

  //     // Inizializza un array vuoto per memorizzare i ristoranti che soddisfano tutti i tipi selezionati
  //     const ristorantiFiltrati = [];

  //     // Se store.typeSearch è vuoto, mostra tutti i ristoranti
  //     if (store.typeSearch.length === 0) {
  //       store.restaurantSearch = store.restaurantList;
  //       return;
  //     }

  //     // Itera attraverso tutti i ristoranti
  //     store.restaurantList.forEach(singleRestaurant => {
  //       // Estrai gli ID dei tipi associati a questo ristorante come stringhe
  //       const tipiRistorante = singleRestaurant.types.map(type => String(type.id));

  //       // Verifica se tutti gli ID dei tipi selezionati sono presenti nell'array dei tipi del ristorante
  //       const tipiTuttiPresenti = store.typeSearch.every(id => tipiRistorante.includes(id));

  //       // Se tutti i tipi selezionati sono presenti, aggiungi il ristorante all'array dei ristoranti filtrati
  //       if (tipiTuttiPresenti) {
  //         ristorantiFiltrati.push(singleRestaurant);
  //       }
  //     });

  //     // Aggiorna lo store con l'array dei ristoranti filtrati
  //     store.restaurantSearch = ristorantiFiltrati;
  //     console.log('store.restaurantSearch aggiornato: ', store.restaurantSearch);
  //   },
  },

  mounted() {

  },
}
</script>

<template>

        <form>
            <div v-for="singleType in store.typeList" :key="singleType.id" class="border-bottom">
                <TypeCard  :type="singleType" />
            </div>
        </form>

</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

</style>