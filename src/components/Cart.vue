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
    <p>{{ this.store.cart }}</p>
    
</template>

<style scoped lang="scss">
.cart {
    min-height: 500px;
    max-width: 300px;
    min-width: 300px;
    background-color: #0099ff;
    border: 3px solid black;
    border-radius: 30px;
    position: fixed;
    top: 120px;
    right: 20px;


}

.invisible-cart {
    display: none;
}

.visible-cart {
    display: block;
}
</style>
