<script>
import axios from 'axios';
import TypeCard from '../components/TypeCard.vue';
import UserCard from '../components/UserCard.vue';

const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'Card',
    components: {
        TypeCard,
        UserCard
    },
    data: function () {
        return {
            types: [],
            pivotTypeUserData: [],
            pivotUsersIDs: [],
            matchingUserIds: [],
            checkBoxID: []

        }
    },
    methods: {
        searchRestaurant(idType) {

            this.pivotTypeUserData.forEach(pivotElement => {

                if (pivotElement.type_id === idType) {

                    this.pivotUsersIDs.push(pivotElement.user_id);

                    console.log('ID degli user nella pivot che combaciano con la tipologia:', this.pivotUsersIDs);
                    console.log('TypeUser Data:', this.pivotTypeUserData);
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
</template>

<style lang="scss" scoped>
h3 {
    text-align: center;
}
</style>
