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
    <div class="card">
        <div class="card-header">
            <h2 class=" text-center">Il tuo carrello</h2>
        </div>
        <div class="card-body">
            <div v-for="details in store.cart" :key="details.id">
                <div class="container">
                    <div class="row">
                        <div class="col-2 text-start quantita">{{ details.quantity }}x</div>
                        <div class="col-7 text-center dish-name">{{ details.name }}</div>
                        <div class="col-3 text-end prezzo">{{ (details.price * details.quantity).toFixed(2) }} &euro;</div>
                    </div>
                    <div class="row">
                        <div class="col-2 text-start">
                            <div class="add-button plus" @click="decreaseQuantity(details)">-</div>
                        </div>
                        <div class="col-7 text-center mod">Modifica</div>
                        <div class="col-3 d-flex justify-content-end">
                            <div class="deduct-button plus" @click="increaseQuantity(details)">+</div>
                        </div>
                    </div>
                </div>

                <hr>
            </div>
            <div id="empty-cart" v-if="store.cart.length < 1">
                <p class="text-center">IL TUO CARRELLO E' VUOTO</p>
                <div class="text-center"><font-awesome-icon icon="cart-shopping" /></div>
            </div>
        </div>
        <!-- <div class="d-flex justify-content-between" id="cart-total" v-if="store.cart.length > 0">
            <p>TOTALE ORDINE:</p>
            <p>&#8364; {{ cartTotal.toFixed(2) }}</p>
        </div> -->

    
    <!-- collegamento pagina checkout -->
        <div class="card-footer text-body-secondary text-center">
            <router-link
            :to="{ 
                name: 'Payment',
            }">

                <button class="btn btn-success " v-if="store.cart.length > 0">
                    Ordina e Paga {{ cartTotal.toFixed(2) }} &euro;
                </button>

            </router-link>

        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/general.scss';

// .cart {
//     min-height: 150px;
//     max-width: 300px;
//     min-width: 400px;
//     background-color: #0099ff;
//     border: 3px solid black;
//     border-radius: 30px;
//     position: fixed;
//     top: 120px;
//     right: 20px;
//     padding-top: 20px;
// }

// .invisible-cart {
//     display: none;
// }

// .visible-cart {
//     display: block;
// }

hr {
    margin-right: 15px;
    margin-left: 15px;
    color: black;
    border: 1px solid black;
}

.prezzo{
    font-size: 12px;
}
.dish-name{
    font-size: 14px;
}
.quantita{
    font-weight: bold;
}
.plus {
    text-align: center;
    line-height: 17px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(155, 211, 72);
    color: rgb(2, 93, 2);
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    }
    .mod{
        font-size: 15px;
        color:  rgb(155, 211, 72);
    }




</style>
