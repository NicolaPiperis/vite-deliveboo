<script>
import Cart from './Cart.vue';
import { store } from '../store';

export default {
    name: 'AppHeader',
    components: {
        Cart
    },
    data() {
        return {
            isCartVisible: false
        };
    },
    computed: {
        totalDishesInCart() {
            // Somma le quantità di tutti gli articoli nel carrello
            return store.cart.reduce((acc, dish) => acc + dish.quantity, 0);
        },
        
    },
    methods: {
        openCart() {
            this.isCartVisible = !this.isCartVisible;
        }
    },
}
</script>

<template>
    <div class="d-flex justify-content-around header-style">
        <h1>
            Header di Deliveboo
        </h1>
        <div class="cart-container" @click="openCart">
            <span id="cart-logo"><font-awesome-icon icon="cart-shopping" /></span>
            <span id="dish-counter">{{ totalDishesInCart }}</span>
        </div>
        <Cart class="cart" :class="isCartVisible ? 'visible-cart' : 'invisible-cart'" />
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';

.header-style {
    background-color: salmon;
    padding: 20px;
    height: 100px;
}

h1 {
    text-align: center;
}

.cart-container {
    position: relative;
    display: inline-block;
}

.cart-container:hover {
    cursor: pointer;
}

#dish-counter {
    position: absolute;
    bottom: 40px;
    right: -13px;
    background-color: #0099ff;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    height: 25px;
    width: 25px;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#cart-logo {
    font-size: 50px;
}
</style>