<script>
import axios from 'axios';
import { store } from '../store';
import TypeMenu from '../components/TypeMenu.vue';
import RestaurantShow from '../components/RestaurantShow.vue';

export default {
  name: 'AppHome',
  components: {
    TypeMenu,
    RestaurantShow,
  },
  data() {
    return {
      store,
    }
  },
  methods: {

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

     // Nuovo metodo per cercare i ristoranti in base ai tipi selezionati
     cercaRistorante() {
      this.saveTypeSearch();
      // Converti l'array di ID in una stringa separata da virgole
      const idString = store.typeSearch.join(',');

      // Effettua la chiamata Axios per ottenere i ristoranti
      axios.get(`${store.apiURL}/restaurants/${idString}`)
        .then(response => {
          store.restaurantSearch = response.data.restaurant;
          console.log('Ristoranti filtrati: ', store.restaurantSearch);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  mounted() {
    // Chiamata Axios per ottenere i dati iniziali
    axios.get(store.apiURL + '/home')
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
  <div class="main-container">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <div class="container-element">
            <h4>Tipologie</h4>
            <!-- <TypeMenu  @change="searchTypeRestaurant()"/>    -->
            <TypeMenu  @change="cercaRistorante()"/>   
          </div>
        </div>
        <div class="col-10">
          <div class="container-element">
            <h2>ristoranti cercati</h2>
            <RestaurantShow/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
.main-container{
  // height: calc(100vh - 50px);

  h3 {
    text-align: center;
  }
  .container-element {
    padding-top: 20px;
    height: calc(100vh - 100px);
    overflow-y: scroll; /* Abilita lo scorrimento quando necessario */
    scrollbar-width: thin; /* Larghezza sottile della barra di scorrimento */
    scrollbar-color: transparent transparent; /* Colore trasparente per la barra di scorrimento */
}

.container-element::-webkit-scrollbar {
  width: 6px; /* Larghezza della barra di scorrimento */
}

.container-element::-webkit-scrollbar-thumb {
  background-color: transparent; /* Colore trasparente per il "pulsante" di scorrimento */
}
}
</style>