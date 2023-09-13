import { VueElement, reactive } from "vue"

export const store = reactive({
    apiURL: 'http://localhost:8000/api/v1',
    imageURL: 'http://127.0.0.1:8000/storage/',
    typeList: [],
    typeSearch: [],
    restaurantList: [],
    restaurantSearch: [],
    dishesList: [],
    restaurantSelected: {},
    cart: []

    // loading: true //per disattivare loading
});
