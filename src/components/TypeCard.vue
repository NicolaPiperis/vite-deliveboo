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

<style lang="scss">
@use '../styles/general.scss';


label{
    display: block;
    position: relative;
    margin: 5px 0;
    cursor: pointer;
    font-size: 20px;
    font-weight: lighter;
    user-select: none;
    span{
        color: rgba(255, 160, 122);
    }

    input[type="checkbox"]{
        position: absolute;
        opacity: 0;
        font-weight: normal;
        transition: font-weight 0.3s; 
    }
    :checked + span{
        color: rgb(246, 92, 31); 
    }
}




</style>
