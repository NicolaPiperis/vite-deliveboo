<script>
import { store } from '../store';

export default {
    name: 'Payment',
    props: {
        amount: {
            type: Object
        }
    },
    data() {
        return {
            store,
        }
    },
    methods: {

    }
}

</script>

<template></template>

<style scoped></style>