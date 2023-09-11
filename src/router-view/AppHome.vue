<script>
import axios from 'axios';
// import ProjectCard from '../components/ProjectCard.vue';

const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'Home',
    // components: {
    //     ProjectCard
    // },
    data: function () {
        return {
            types: [],
            // pages: [],
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

                // this.types = response.data.types;
                // this.pages = response.data.projects.links;
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

<template>
    <!-- <div class="container">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div> -->

    <!-- <div class="pages">
        <div v-for="(page, index) in pages" v-html="page.label" @click="changePage(page.url)">

        </div>
    </div> -->

    <h3>Questa e' la Homepage</h3>
</template>

<style lang="scss" scoped>
h3 {
    text-align: center;
}
</style>
