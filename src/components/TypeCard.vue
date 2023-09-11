<script>

export default {
    name: 'TypeCard',
    props: {
        type: {
            type: Object
        }
    },
    methods: {
        searchRestaurant() {
            console.log('ciao');
        }
    },

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
        <input type="checkbox" @click="searchRestaurant()">
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
