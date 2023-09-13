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
            // Dati locali del componente, se necessario
            // esempio:
            // totalAmount: 0
        }
    },

    computed: {
        // Funzioni calcolate, se necessario
        // esempio:
        // totalPrice() {
        //     return this.items.reduce((sum, item) => sum + item.price, 0);
        // }
    },

    methods: {

    }
}
</script>


<template>
    <h1>hello</h1>
</template>

<style scoped></style>
