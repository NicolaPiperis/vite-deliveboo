<script>

import { store } from '../store';

export default {
    name: 'RestaurantCard',
    props: {
        dish: {
            type: Object
        }
    },
    data() {
        return {
            store,
        }
    },
    methods: {

        addToCart() {
            // Cerca il piatto nel carrello usando l'id
            const existingDish = store.cart.find(item => item.id === this.dish.id);

            if (existingDish) {
                // Se il piatto esiste nel carrello, aumenta la sua quantity
                existingDish.quantity += 1;
            } else {
                // Altrimenti, aggiungi un nuovo oggetto al carrello
                const dishToAdd = {
                    id: this.dish.id,  // Assicurati di avere un id per ciascun piatto
                    name: this.dish.dish_name,
                    description: this.dish.description,
                    price: this.dish.price,
                    quantity: 1
                };
                store.cart.push(dishToAdd);
            }
        }

    }
}
</script>

<template>
    <div v-if="dish.visibility && !dish.deleted" class="card-container card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="store.imageURL + dish.img" class="img-fluid rounded-start" :alt="dish.dish_name">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ dish.dish_name }}</h5>
                    <p class="card-text">{{ dish.description }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ dish.price }}</small></p>
                    <button class="card-cart" @click="addToCart">
                        aggiungi al carrello
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

.card-cart {
    display: none;
}

.card-container:hover .card-cart {
    display: block;
}
</style>
