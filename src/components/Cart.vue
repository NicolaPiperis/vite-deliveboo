<script>

import { store } from '../store';
import { watch } from 'vue';

export default {
    name: 'Cart',

    data() {
        return {
            store
        }
    },

    computed: {
        cartTotal() {
            return this.store.cart.reduce((acc, dish) => {
                return acc + (dish.price * dish.quantity);
            }, 0);
        }
    },

    watch: {
        'store.cart': {
            handler() {
                this.saveCartToSession();
            },
            deep: true
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

        saveCartToSession() {
            sessionStorage.setItem('cart', JSON.stringify(this.store.cart));
        }
    },

    mounted() {
        const savedCart = sessionStorage.getItem('cart');
        if (savedCart) {
            try {
                this.store.cart = JSON.parse(savedCart);
            } catch (e) {
                console.error('Failed to load cart from sessionStorage:', e);
            }
        }
    },
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
            <p>&#8364; {{ cartTotal.toFixed(2) }}</p>
        </div>

        <!-- collegamento pagina checkout -->
        <router-link
        :to="{ 
            name: 'Payment',
        }">

        <button id="checkout-btn" v-if="store.cart.length > 0">Vai al pagamento</button>

        </router-link>

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
    min-height: 150px;
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
        margin: 30px 0;
    }

    span {
        font-size: 70px;
        margin-bottom: 30px;
    }
}

#checkout-btn {
    display: block; // Centra il bottone
    margin: 0 auto 20px; // Centra il bottone
    padding: 10px 20px; // Spazio interno
    background-color: rgb(202, 146, 73); // Colore di sfondo
    color: #ffffff; // Colore del testo
    border: 2px solid black;
    border-radius: 8px; // Angoli arrotondati
    font-size: 16px; // Dimensione del testo
    cursor: pointer; // Cambia il cursore quando sopra il bottone
    transition: background-color 0.3s, transform 0.2s; // Aggiunge una transizione per l'hover e l'active

    &:hover {
        background-color: rgb(182, 126, 53); // Scurisce il colore di sfondo quando il mouse è sopra
    }

    &:active {
        transform: scale(0.97); // Riduce leggermente la dimensione del bottone quando premuto
    }
}
</style>
