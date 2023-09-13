<script>

import { store } from '../store';

export default {
    name: 'Cart',

    // Se desideri passare delle props, come nel componente RestaurantCard, puoi farlo qui
    props: {
        // esempio
        // items: {
        //     type: Array,
        //     default: () => []
        // }
    },

    data() {
        return {
            store
        }
    },

    methods: {

        increaseQuantity(item) {
            item.quantity += 1;
        },

        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Se la quantity diventa 0, rimuovi l'oggetto dal carrello
                const index = this.store.cart.indexOf(item);
                if (index !== -1) {
                    this.store.cart.splice(index, 1);
                }
            }
        },

        removeDishesById(item) {
            const index = this.store.cart.findIndex(dish => dish.id === item.id);
            if (index !== -1) {
                this.store.cart.splice(index, 1);
            }
        },
    }
}
</script>


<template>
    <div>
        <div v-for="details in store.cart" :key="details.id">
            <div class="d-flex align-items-center">
                <div class="delete-button-container">
                    <span @click="removeDishesById(details)">X</span>
                </div>
                <ul class="dish-display-container">
                    <li>Nome: {{ details.name }}</li>
                    <li>Prezzo: {{ details.price }}</li>
                </ul>
                <div class="count-cart-container d-flex">
                    <span class="add-button" @click="decreaseQuantity(details)">-</span>
                    <span class="counter">{{ details.quantity }}</span>
                    <span class="deduct-button" @click="increaseQuantity(details)">+</span>
                </div>
            </div>
            <hr>
        </div>
        <div class="d-flex justify-content-between" id="cart-total" v-if="store.cart.length > 0">
            <p>TOTALE ORDINE:</p>
            <p>&#8364;</p>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center" id="empty-cart"
            v-if="store.cart.length < 1">
            <p>IL TUO CARRELLO E' VUOTO</p>
            <span><font-awesome-icon icon="cart-shopping" /></span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/general.scss';

.cart {
    min-height: 500px;
    max-width: 300px;
    min-width: 400px;
    background-color: #0099ff;
    border: 3px solid black;
    border-radius: 30px;
    position: fixed;
    top: 120px;
    right: 20px;
    padding-top: 20px;
}

.invisible-cart {
    display: none;
}

.visible-cart {
    display: block;
}

ul {
    list-style: none;
}

hr {
    margin-right: 15px;
    margin-left: 15px;
    color: black;
    border: 1px solid black;
}

.delete-button-container {
    width: 10%;

    span {
        color: red;
        font-weight: bold;
        font-size: 18px;
        margin-left: 10px;
        background-color: white;
        padding: 1px 4px;
    }

    &:hover {
        cursor: pointer;
    }
}

.dish-display-container {
    width: 65%;
}

.count-cart-container {
    width: 25%;
    margin-left: 10px;

    .add-button {
        color: black;
        font-weight: bold;
        font-size: 15px;
        background-color: white;
        border: 1px solid gray;
        padding: 0 9px;
        border-radius: 4px;

        &:hover {
            cursor: pointer;
        }
    }

    .counter {
        margin: 0 7px;
        font-size: 18px;
        font-weight: bold;
    }

    .deduct-button {
        color: black;
        font-weight: bold;
        font-size: 15px;
        background-color: white;
        border: 1px solid gray;
        padding: 0 7px;
        border-radius: 4px;

        &:hover {
            cursor: pointer;
        }
    }
}

#cart-total {
    margin: 0 20px;
    font-weight: bold;
    font-size: 18px;
}

#empty-cart {
    color: white;
    height: 100%;

    p {
        font-size: 25px;
        margin: 100px 0;
    }

    span {
        font-size: 70px;
    }
}
</style>
