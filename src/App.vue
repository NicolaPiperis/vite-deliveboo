<script>
import { store } from '../src/store';
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader

  },
  data() {
    return {
      store,
    }
  },
}
</script>

<template>
  <AppHeader />
  <router-view></router-view>
</template>

<style  lang="scss">
  @use './styles/general.scss';
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
