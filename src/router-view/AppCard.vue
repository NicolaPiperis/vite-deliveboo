<script>
import axios from 'axios';
import TypeCard from '../components/TypeCard.vue';

const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'Card',
    components: {
        TypeCard,
    },
    data: function () {
        return {
            types: [],
            typesID: [],
        }
    },
    methods: {
        searchRestaurant(id) {

            this.typesID.push(id);

            console.log(this.typesID.join(','));

            axios.get(apiURL + '/restaurants/' + this.typesID.join('-'))
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },

    mounted() {
        axios.get(apiURL + '/home')
            .then(response => {

                this.types = response.data.types;
                console.log(response.data.types);
            })
            .catch(error => {
                console.log(error);
            });
    },
}

</script>

<template>
    <h3>Questa e' la card type</h3>

    <div class="card">
        <TypeCard v-for="t in types" :key="t.id" :type="t" @id-emitted="searchRestaurant" />
    </div>
    <div>

    </div>
</template>

<style lang="scss" scoped>
h3 {
    text-align: center;
}
</style>
