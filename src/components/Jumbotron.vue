<script>

export default {
    name: 'Jumbotron',
    components: {
    },
    data() {
        return {
        };
    },
}

</script>

<template>
    <div id="header-container">

    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';

#header-container {
    background-image: url(../assets/img/home-background-hero-scaled.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 1200px;
    position: relative;
}
</style>