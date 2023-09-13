<script>
import Cart from './Cart.vue';

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
    methods: {
        openCart() {
            this.isCartVisible = !this.isCartVisible;
        }
    }
}
</script>

<template>
    <div class="d-flex justify-content-around">
        <h1>
            Header di Deliveboo
        </h1>
        <div class="cart-container" @click="openCart">
            <span id="cart-logo"><font-awesome-icon icon="cart-shopping" /></span>
            <span id="dish-counter">2</span>
            <Cart class="cart" :class="isCartVisible ? 'visible-cart' : 'invisible-cart'" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
}

#cart-logo {
    font-size: 50px;
}
</style>