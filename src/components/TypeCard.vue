<script>
import { store } from '../store';

export default {
  name: 'TypeCard',
  props: {
    type: {
      type: Object,
    },
  },
  data() {
    return {
      store,
    };
  },
  methods: {},
};
</script>

<template>
  <label class="custom-checkbox">
    <input
      type="checkbox"
      :name="type.id"
      :value="type.img"
      v-model="isChecked"
    />
    <span v-html="type.img"></span>
    {{ type.type_name }}
  </label>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

// input[type="checkbox"] {
//   position: absolute;
//   opacity: 0;
// }

label{
    display: block;
    position: relative;
    margin: 5px 0;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    span{
        
    }
}

</style>
