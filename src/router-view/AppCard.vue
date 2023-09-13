<script>
import axios from 'axios';
import { store } from "../store";
import TypeCard from '../components/TypeCard.vue';
import UserCard from '../components/UserCard.vue';

const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'Card',
    components: {
        TypeCard,
        UserCard
    },

    data() {
        return {
            types: [],
            pivotTypeUserData: [],
            pivotUsersIDs: [],
            matchingUserIds: [],
            store,
        }
    },
    methods: {
        searchRestaurant() {

            console.log(this.pivotTypeUserData);

            // cicla la pivot
            this.pivotTypeUserData.forEach(pivotElement => {

                // cicla l'array id checkbox(tipologie)
                for (let i = 0; i < store.checkboxIDs.length; i++) {
                    // se type_id ==== a type della checkbox
                    if (pivotElement.type_id === store.checkboxIDs[i])  {
                        
                        // prendi il relativo user_id e salvalo
                        this.pivotUsersIDs.push(pivotElement.user_id);
    
                        // cicla gli user_id e solo quelli che hanno la tipologia


                        // console.log('ID degli user nella pivot che combaciano con la tipologia:', this.pivotUsersIDs);
                        // console.log('TypeUser Data:', this.pivotTypeUserData);
                    } 
                }
            });

            axios.post(apiURL + '/restaurants/', { data: this.pivotUsersIDs })
                .then(response => {

                    this.matchingUserIds = response.data.users;

                    console.log('Gli user che combaciano con i ristoranti:', this.matchingUserIds);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },

    mounted() {
        axios.get(apiURL + '/home')
            .then(response => {
                // monta i dati le Tipologie e la tabella pivot Type_User
                this.types = response.data.types;
                this.pivotTypeUserData = response.data.pivotData;
            })
            .catch(error => {
                console.log(error);
            });
    },
}

</script>

<template>
    <h3>Questa e' la HOMEPAGE</h3>

    <div>
        <TypeCard v-for="(t, idxType) in this.types" :key="idxType" :detailsType="t" @id-emitted="searchRestaurant" />

    </div>
    <div>
        <!-- <div v-if="this.matchingUserIds.length"> -->
        <UserCard v-for="(match, idxMatch) in this.matchingUserIds" :key="idxMatch" :detailsUser="match" />
        <!-- </div> -->
    </div>

    <button @click="searchRestaurant()">
        Cerca tipologia 6 e 9
    </button>
</template>

<style lang="scss" scoped>
h3 {
    text-align: center;
}
</style>
