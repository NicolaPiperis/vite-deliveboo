<script>
import axios from 'axios';
import { store } from '../store';
import TypeCard from '../components/TypeCard.vue';

const apiURL = 'http://localhost:8000/api/v1'; // Sostituisci con la tua URL API

export default {
  name: 'TypeMenu',
  components: {
    TypeCard,
  },
  data() {
    return {
      store,
    }
  },
  methods: {

  },

  mounted() {

  },
}
</script>

<template>

        <form>
            <div v-for="singleType in store.typeList" :key="singleType.id" class="border-bottom">
                <TypeCard  :type="singleType" />
            </div>
        </form>

</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

</style>