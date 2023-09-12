<script>
import axios from 'axios';
import { store } from '../store';


const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'TypeCard',
    props: {
        type: {
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

<template>
    <input type="checkbox" :name="type.id" /> {{ type.type_name }}
</template>

<style lang="scss" scoped>
.card {
    display: inline-block;
    width: calc(100% / 4 - 10px);
    border: 2px solid greenyellow;
    margin: 10px;

    div {
        margin: 3px;

    }
}
</style>
