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
            isCartVisible: false,
            headerOpacity: 0
        };
    },
    computed: {
        totalDishesInCart() {
            return store.cart.reduce((acc, dish) => acc + dish.quantity, 0);
        },
        headerStyle() {
            return {
                backgroundColor: `rgba(0, 0, 0, ${this.headerOpacity})`
            };
        }
    },
    methods: {
        openCart() {
            this.isCartVisible = !this.isCartVisible;
        },
        updateHeaderOpacity() {
            const containerHeight = document.getElementById('header-container').offsetHeight;
            const scrollY = window.scrollY;
            const opacity = Math.min(scrollY / containerHeight, 1);
            this.headerOpacity = opacity;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateHeaderOpacity);
        this.updateHeaderOpacity(); // Imposta l'opacità iniziale
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.updateHeaderOpacity);
    }
}
</script>

<template>
    <div id="header-container">
        <div class="d-flex justify-content-around header-style" :style="headerStyle">
            <router-link :to="{ name: 'AppHome' }">
                <img id="logo" src="../assets/img/Logo-Bianco-DeliveBoo.png" alt="logo">
            </router-link>
            <h1>
                Header di Deliveboo
            </h1>
            <div class="cart-container" @click="openCart">
                <span id="cart-logo"><font-awesome-icon icon="cart-shopping" /></span>
                <span id="dish-counter">{{ totalDishesInCart }}</span>
            </div>
            <Cart class="cart" :class="isCartVisible ? 'visible-cart' : 'invisible-cart'" />
        </div>
        <!-- <Cart class="cart" :class="isCartVisible ? 'visible-cart' : 'invisible-cart'" /> -->
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';

#header-container {
    width: 100%;
    position: relative;
}

.header-style {
    padding: 20px;
    width: 100%;
    height: 100px;
    position: fixed;
    z-index: 10;
}

h1 {
    text-align: center;
    color: white;
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

#logo {
    cursor: pointer;
    height: 60px;
}

#cart-logo {
    font-size: 50px;
    color: white;
}
</style>