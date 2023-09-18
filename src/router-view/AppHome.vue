<script>
import axios from 'axios';
import { store } from '../store';
import TypeMenu from '../components/TypeMenu.vue';
import RestaurantShow from '../components/RestaurantShow.vue';
import Jumbotron from '../components/Jumbotron.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'AppHome',
  components: {
    TypeMenu,
    RestaurantShow,
    Jumbotron,
    Footer,
  },
  data() {
    return {
      store,
      lastScrollPosition: 0,
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
    // Funzione per cercare ristoranti in base ai tipi selezionati nel front end
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

    // Nuovo metodo per cercare i ristoranti in base ai tipi selezionati back end
    cercaRistorante() {
      this.saveTypeSearch();
      // Se store.typeSearch è vuoto, mostra tutti i ristoranti
      if (store.typeSearch.length === 0) {
        store.restaurantSearch = store.restaurantList;
        return;
      }
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
        }
        );
    },

    handleScroll() {
      const currentScrollPosition = window.scrollY;  // Ottieni la posizione corrente di scroll
      const isScrollingDown = currentScrollPosition > this.lastScrollPosition; // Determina se stai scorrendo verso il basso

      const containerElements = document.querySelectorAll('.container-element');

      containerElements.forEach(element => {
        const distanceToTop = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        // Se stai scorrendo verso il basso e l'elemento è nella vista, rendilo visibile
        if (isScrollingDown && distanceToTop < screenHeight / 1.5 && distanceToTop > 0) {
          element.style.opacity = "1";
        }

        // Se stai scorrendo verso l'alto e l'elemento esce dalla vista, rendilo invisibile
        if (!isScrollingDown && distanceToTop > screenHeight / 1.5) {
          element.style.opacity = "0";
        }
      });

      this.lastScrollPosition = currentScrollPosition;  // Aggiorna la tua ultima posizione di scroll
    }
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

    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Chiamato all'inizio per fare il setup iniziale dell'opacità  
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<template>
  <Jumbotron />
  <div class="main-container">
    <img id="wave-home" src="../assets/img/svg-0.svg" alt="wave">
    <div class="container">
      <div class="row">
        <div class="col-md-2 d-sm-none">
          <div class="upper-fade"></div>
          <div class="container-element">
            <h4>Tipologie</h4>
            <!-- <TypeMenu  @change="searchTypeRestaurant()"/>    -->
            <TypeMenu @change="cercaRistorante()" />
          </div>
          <div class="lower-fade"></div>
        </div>
        <div class="col-md-10 col-sm-12">
          <div class="upper-fade"></div>
          <div class="container-element">
            <h2>ristoranti cercati</h2>
            <RestaurantShow />
          </div>
          <div class="lower-fade"></div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

.main-container {
  position: relative;

  #wave-home {
    transform: scaleX(-1) scaleY(-1);
    position: absolute;
    top: -110px;
    left: 0;
    width: 100%;
  }

  h3 {
    text-align: center;
  }

  .col-2 {
    position: relative;
    padding: 20px 0;
  }

  .col-10 {
    position: relative;
    padding: 20px 0;
  }

  .container-element {
    padding-top: 20px;
    height: calc(100vh - 100px);
    overflow-y: scroll;
    /* Abilita lo scorrimento quando necessario */
    scrollbar-width: thin;
    /* Larghezza sottile della barra di scorrimento */
    scrollbar-color: transparent transparent;
    /* Colore trasparente per la barra di scorrimento */
    margin: 100px 0;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    position: relative;
  }

  .upper-fade {
    position: absolute;
    left: 0;
    top: 100px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    height: 80px;
    width: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .lower-fade {
    position: absolute;
    left: 0;
    bottom: 100px;
    background: linear-gradient(to top, rgb(255, 255, 255), rgba(255, 255, 255, 0));
    height: 80px;
    width: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .container-element::-webkit-scrollbar {
    width: 6px;
    /* Larghezza della barra di scorrimento */
  }

  .container-element::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Colore trasparente per il "pulsante" di scorrimento */
  }
}
</style>