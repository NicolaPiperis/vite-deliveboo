<script>
import axios from 'axios';
import { store } from '../store';
import TypeCard from '../components/TypeCard.vue';
import RestaurantCard from '../components/RestaurantCard.vue';

const apiURL = 'http://localhost:8000/api/v1';

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
        saveTypeSearch() {
            // Crea un array vuoto per memorizzare gli ID dei tipi selezionati
            const typeSearch = [];

            // Itera attraverso tutti i tag `input` di tipo `checkbox`
            const inputs = document.querySelectorAll('input[type="checkbox"]');
            for (const input of inputs) {
                // Se il tag `input` è selezionato, aggiungi il valore del suo ID all'array `typeSearch`
                if (input.checked) {
                typeSearch.push(input.name);
                }
            }

            // Salva l'array `typeSearch` nel store
            store.typeSearch = typeSearch;
            console.log('store.typeSearch aggiornato: ', store.typeSearch);
        },
        searchTypeRestaurant() {
            this.saveTypeSearch();
            
            // Inizializza un array vuoto per memorizzare i ristoranti che soddisfano tutti i tipi selezionati
            const ristorantiFiltrati = [];

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
        axios.get(apiURL + '/home')
            .then(response => {
                store.typeList = response.data.types;
                store.restaurantList = response.data.restaurant;
                // this.types = response.data.types;
                // console.log(store.typeList);
                
                console.log('lista ristoranti: ', store.restaurantList);
                console.log('lista type: ', store.typeSearch);
            })
            .catch(error => {
                console.log(error);
            });
    },
}

</script>

<template>
    <h3>Questa e' la card type</h3>

    <div class="container container d-flex flex-wrap justify-content-center mb-5">
        <form @change="searchTypeRestaurant()">
            
            <TypeCard v-for="t in store.typeList" :key="t.id" :type="t" />

        </form>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h2>tutti i ristoranti</h2>
                <div class="container d-flex flex-wrap justify-content-center gap-4">
                    <RestaurantCard v-for="r in store.restaurantList" :key="r.id" :restaurant="r" />
                </div>
            </div>
            <div class="col-6">
                <h2>ristoranti cercati</h2>
                <div class="container d-flex flex-wrap justify-content-center gap-4">
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
