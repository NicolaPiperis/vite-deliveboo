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
    <div v-if="dish.visibility && !dish.deleted" class="card-container card mb-3" style="max-width: 540px;" @click="addToCart">
        <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center">
                <div class="container-img">
                    <img :src="store.imageURL + dish.img" class="img-fluid rounded-start card-image" :alt="dish.dish_name">
                </div>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ dish.dish_name }}</h5>
                    <p class="card-text">{{ dish.description }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ dish.price }}</small></p>
                    <div class="container-add">
                        <span class="plus">+</span>
                    </div>
                    <!-- <button class="card-cart" @click="addToCart">
                        aggiungi al carrello
                    </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

.card-container{
    cursor: pointer;
    position: relative;

    .container-img{

        height: 80%;
        width: 80%;
        border-radius: 50%;
        vertical-align: middle;
        margin: 10px;
        .card-image {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }

.container-add{
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    .plus {
        text-align: center;
        line-height: 45px;
        vertical-align: middle;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(155, 211, 72);
        color: rgb(2, 93, 2);
        font-weight: bold;
        font-size: 30px;
    }
}
}
.card-cart {
    text-align: end;
    background-color: #333;
    font-size: 14px;
    color: white;
    border: none;
    padding: 7px 14px;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #555;
        color: white;
    }

    &:active {
        transform: scale(0.97);
    }
}
</style>
