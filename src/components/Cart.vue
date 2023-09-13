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

    }
}
</script>


<template>
    <div>
        <div class="d-flex align-items-center" v-for="details in store.cart" :key="details.id">
            <div class="delete-button-container">
                <span>X</span>
            </div>
            <ul class="dish-display-container">
                <li>Nome: {{ details.name }}</li>
                <li>Prezzo: {{ details.price }}</li>
                <hr>
            </ul>
            <div class="count-cart-container d-flex">
                <span>-</span>
                <span>X</span>
                <span>+</span>
            </div>
        </div>

    </div>
</template>

<!-- <template>
    <div>
        <div class="d-flex justify-content-between" v-for="details in store.cart" :key="details.id">
            <ul>
                <li>Nome: {{ details.name }}</li>
                <li>Prezzo: {{ details.price }}</li>
                <li></li>
                <hr>
            </ul>
            <span>X</span>
        </div>

    </div>
</template> -->

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

    hr {
        width: 95%;
        margin-left: -10px;
        color: black;
        border: 1px solid black;
    }
}

.delete-button-container {
    width: 10%;

}

.dish-display-container {
    width: 65%;
}

.count-cart-container {
    width: 25%;
}
</style>
