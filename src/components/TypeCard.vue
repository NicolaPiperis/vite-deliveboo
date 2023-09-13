<script>

import { store } from "../store";

export default {
    name: 'TypeCard',
    props: {
        detailsType: Object
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        emit() {
            // let id = this.detailsType.id;
            // this.$emit('id-emitted', id);
        },
    }
}
</script>

<template>
    <div class="card">
        <div>
            {{ detailsType.type_name }}
        </div>
        <div>
            IMMAGINE TIPOLOGIA
        </div>
        <input type="checkbox" @click="emit">
        <!-- v-model="store.checkboxIDs" -->

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
