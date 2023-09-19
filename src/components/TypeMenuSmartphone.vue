<script>
import { store } from '../store';
import TypeCard from '../components/TypeCard.vue';

export default {
  name: 'TypeMenu',
  components: {
    TypeCard,
  },
  data() {
    return {
      store,
      selectedTypes: [],
      isFormVisible: false,
    }
  },
  methods: {
    handleCheckboxToggle(typeId, isChecked) {
      if (isChecked) {
        this.selectedTypes.push(typeId);
      } else {
        const index = this.selectedTypes.indexOf(typeId);
        if (index > -1) {
          this.selectedTypes.splice(index, 1);
        }
      }
    },
    toggleFormVisibility() {
      this.isFormVisible = !this.isFormVisible; // Inverti la visibilità del form
    },    
  },

  mounted() {

  },
}
</script>

<template>

<!-- smartphone -->
  <div>
    <button @click="toggleFormVisibility" class="btn btn-dark">Tipologie</button> <!-- Bottone per mostrare il form -->
    <form v-if="isFormVisible" class="container-element-menu">
      <!-- Contenuto del form con le checkbox -->
      <div v-for="singleType in store.typeList" :key="singleType.id" class="border-bottom">
        <TypeCard :type="singleType" @checkboxToggled="handleCheckboxToggle(singleType.id, $event)" />
      </div>
      <hr class="bottom-margin">
    </form>
  </div>

</template>

<style lang="scss">
@use '../styles/general.scss';

</style>