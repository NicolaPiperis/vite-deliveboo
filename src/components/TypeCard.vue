<script>
import { store } from '../store';

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
