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
    <label>
        <input type="checkbox" :name="type.id" />
        <span v-html="type.img"></span>
        {{ type.type_name }}
    </label>
    <div v-html="type.img"></div>
    <i class="fa-solid fa-burger"></i>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
i {

    color: black;
    font-size: 20px;
}
input {
    :checked {

    };

    ::before {
      content: attr(value);
      font-family: 'Font Awesome 5';
      font-weight: 900;
      font-size: 18px;
    }
}
</style>
