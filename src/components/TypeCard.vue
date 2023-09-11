<script>
import axios from 'axios';


const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'TypeCard',
    props: {
        type: {
            type: Object
        }
    },
    methods: {
        emit() {
            let id = this.type.id;
            this.$emit('id-emitted', id);
        },
    }
}
</script>

<template>
    <div class="card">
        <div>
            {{ type.type_name }}
        </div>
        <div>
            img
        </div>
        <input type="checkbox" @click="emit">
    </div>
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
