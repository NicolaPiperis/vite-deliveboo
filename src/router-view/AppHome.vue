<script>
import axios from 'axios';
import TypeCard from '../components/TypeCard.vue';

const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'Home',
    components: {
        TypeCard
    },
    data: function () {
        return {
            types: [],
        }
    },
    // methods: {
    //     // changePage(pageURL) {
    //     //     axios.get(pageURL)
    //     //         .then(response => {

    //     //             this.projects = response.data.projects.data;
    //     //             this.pages = response.data.projects.links;

    //     //         })
    //     //         .catch(error => {
    //     //             console.log(error);
    //     //         });
    //     // }
    // },

    mounted() {
        axios.get(apiURL + '/home')
            .then(response => {

                this.types = response.data.types;
                console.log(response.data.types);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

<template>
    <h3>Questa e' la Homepage</h3>

    <div class="container">
        <TypeCard v-for="t in types" :key="t.id" :type="t" />
    </div>


    <!-- <div class="pages">
    //     <div v-for="(page, index) in pages" v-html="page.label" @click="changePage(page.url)">

    //     </div>
    // </div> -->
</template>

<style lang="scss" scoped>
h3 {
    text-align: center;
}
</style>
